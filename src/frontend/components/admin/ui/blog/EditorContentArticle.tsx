'use client';

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { handlePaste } from '@/components/admin/blog/helpers/handlePaste';
import WordCounter from '@/components/admin/ui/blog/WordCounter';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Definir la interfaz para las props del TipTapEditor
interface TipTapEditorProps {
  editor: Editor | null;
}

// Crear el componente dinámico con tipado correcto
const TipTapEditor = dynamic<TipTapEditorProps>(() => 
  Promise.resolve(({ editor }) => {
    if (!editor) return null;
    return <EditorContent editor={editor} className="h-full" />;
  })
, { ssr: false });

interface EditorContentArticleProps {
  content: string;
  onChange: (value: string) => void;
}

const EditorContentArticle: React.FC<EditorContentArticleProps> = ({ content, onChange }) => {
  const [html, setHtml] = useState(content || '');
  const [isMounted, setIsMounted] = useState(false);
  
  // Variable para almacenar las instrucciones del placeholder
  const placeholderInstructions = `Guía para redactar correctamente:

- Títulos → Escríbelos en negrita. Empieza con mayúscula, el resto en minúscula. No pongas punto al final.
  Ejemplo: Tendencias inmobiliarias en 2025
  (Deja una línea en blanco después del primer título y una antes y después de los siguientes)

- Listas numeradas → Usa números seguidos de punto. 
  Ejemplo:
  1. Primera tendencia
  2. Segunda tendencia
  3. Tercera tendencia

- Listas con guiones → Usa guión medio.
  Ejemplo:
  - Beneficio principal
  - Ventaja secundaria

- Párrafos → Deja una línea en blanco entre cada párrafo para mejor legibilidad.

- Negritas → Usa negrita en los puntos que quieras destacar o palabras clave.

Cuando pegues el texto, el sistema lo convertirá automáticamente al formato correcto.`;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          heading: { levels: [1, 2] },
        }),
        Placeholder.configure({
          placeholder: ({ node }) => {
            if (node.type.name === 'paragraph') {
              return placeholderInstructions;
            }
            return '';
          },
          showOnlyCurrent: false,
          showOnlyWhenEditable: true,
        }),
      ],
      content: content || '',
      editorProps: {
        attributes: {
          class: 'tiptap prose max-w-none focus:outline-none p-4',
        },
        handlePaste,
      },
      onUpdate: ({ editor }) => {
        const newHtml = editor.getHTML();
        setHtml(newHtml);
        onChange(newHtml);
      },
      immediatelyRender: false,
    },
    [isMounted] // Solo intentar crear el editor cuando el componente está montado
  );

  if (!isMounted) {
    return (
      <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
        <div className="min-h-[1000px] md:min-h-[650px] lg:min-h-[650px] p-4">
          <p className="text-gray-400">Cargando editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Editor sin el contador dentro */}
      <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
        {editor ? (
          <div className="min-h-[1000px] md:min-h-[650px] lg:min-h-[650px]">
            <TipTapEditor editor={editor} />
          </div>
        ) : (
          <p className="text-sm text-gray-500 p-4">Cargando editor...</p>
        )}
      </div>
      
      {/* Instrucciones seleccionables fuera del editor */}
      <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-200">
        <details>
          <summary className="font-medium text-blue-600 cursor-pointer">Ver instrucciones de formato (seleccionables)</summary>
          <pre className="mt-2 whitespace-pre-wrap text-sm text-gray-700 bg-white p-3 rounded border border-gray-200 overflow-auto max-h-60">
            {placeholderInstructions}
          </pre>
        </details>
      </div>
      
      {/* Contador de palabras fuera del editor */}
      <div className="mt-3">
        <WordCounter htmlContent={html} />
      </div>
    </div>
  );
};

// Definir el tipo adecuado para el componente dinámico
const DynamicEditorContentArticle = dynamic<EditorContentArticleProps>(() => 
  Promise.resolve(EditorContentArticle)
, { ssr: false });

export default DynamicEditorContentArticle;