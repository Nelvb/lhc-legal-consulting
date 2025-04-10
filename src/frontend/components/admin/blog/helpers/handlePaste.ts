import { EditorView } from '@tiptap/pm/view';
import { Slice } from '@tiptap/pm/model';

export function handlePaste(view: EditorView, event: ClipboardEvent, _slice: Slice): boolean {
  const text = event.clipboardData?.getData('text/plain');
  if (!text) return false;

  const lines = text.split('\n');
  const nodes: any[] = [];
  let buffer: string[] = [];
  let currentListType: 'orderedList' | 'bulletList' | null = null;
  let listItems: any[] = [];

  // Función para finalizar una lista y añadirla a los nodos
  const flushList = () => {
    if (listItems.length === 0 || !currentListType) return;
    
    nodes.push({
      type: currentListType,
      content: listItems.map(text => ({
        type: 'listItem',
        content: [{
          type: 'paragraph',
          content: [{ type: 'text', text }]
        }]
      }))
    });
    
    listItems = [];
    currentListType = null;
  };

  // Función para finalizar un párrafo y añadirlo a los nodos
  const flushParagraph = () => {
    if (buffer.length === 0) return;
    const paragraphText = buffer.join(' ').trim();
    if (paragraphText) {
      nodes.push({
        type: 'paragraph',
        content: [{ type: 'text', text: paragraphText }],
      });
    }
    buffer = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const current = lines[i].trim();
    
    // Saltar líneas vacías pero manteniendo el contexto de una lista
    if (current === '') {
      if (currentListType) {
        // Si estamos dentro de una lista y hay una línea vacía,
        // probablemente significa el final de la lista
        flushList();
      } else {
        flushParagraph();
      }
      continue;
    }

    // Detectar lista numerada (1. Item, 2. Item, etc.)
    const numberedListMatch = current.match(/^(\d+)[\.\)]\s+(.*)/);
    if (numberedListMatch) {
      // Si estamos en un tipo de lista diferente, terminar la lista actual
      if (currentListType && currentListType !== 'orderedList') {
        flushList();
      }
      
      // Si no estamos en una lista ordenada, iniciarla
      if (!currentListType) {
        flushParagraph();
        currentListType = 'orderedList';
      }
      
      listItems.push(numberedListMatch[2].trim());
      continue;
    }

    // Detectar lista con guiones (- Item, * Item, etc.)
    const bulletListMatch = current.match(/^[-*•]\s+(.*)/);
    if (bulletListMatch) {
      // Si estamos en un tipo de lista diferente, terminar la lista actual
      if (currentListType && currentListType !== 'bulletList') {
        flushList();
      }
      
      // Si no estamos en una lista de viñetas, iniciarla
      if (!currentListType) {
        flushParagraph();
        currentListType = 'bulletList';
      }
      
      listItems.push(bulletListMatch[1].trim());
      continue;
    }

    // Si llegamos aquí, esta línea no es parte de una lista
    // Cerrar cualquier lista activa
    if (currentListType) {
      flushList();
    }

    // Detectar título (línea corta, sin punto final, seguida o precedida por línea vacía)
    const isPrecedingLineEmpty = i === 0 || lines[i - 1].trim() === '';
    const isFollowingLineEmpty = i + 1 >= lines.length || lines[i + 1].trim() === '';
    const isShortLine = current.length <= 100; // Umbral razonable para un título
    const doesNotEndWithPeriod = !current.endsWith('.');
    
    if (isShortLine && doesNotEndWithPeriod && (isPrecedingLineEmpty || isFollowingLineEmpty)) {
      flushParagraph();
      nodes.push({
        type: 'heading',
        attrs: { level: 2 },
        content: [{ type: 'text', text: current }]
      });
      continue;
    }

    // Si nada más coincide, tratar como texto normal de párrafo
    buffer.push(current);
  }

  // Asegurarse de procesar cualquier contenido pendiente
  if (currentListType) {
    flushList();
  } else {
    flushParagraph();
  }

  if (nodes.length === 0) return false;

  // Crear el fragmento y reemplazar la selección
  try {
    const fragment = view.state.schema.nodeFromJSON({
      type: 'doc',
      content: nodes,
    });

    const tr = view.state.tr.replaceSelectionWith(fragment);
    view.dispatch(tr);
    
    return true;
  } catch (error) {
    console.error('Error al procesar el texto pegado:', error);
    return false;
  }
}