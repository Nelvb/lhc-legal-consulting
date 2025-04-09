// Componente de editor enriquecido para artículos del blog (admin).
// Utiliza TipTap con StarterKit y configuración optimizada para evitar errores de SSR.

'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface EditorContentArticleProps {
  content: string;
  onChange: (value: string) => void;
}

const EditorContentArticle: React.FC<EditorContentArticleProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none',
      },
    },
    
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="border border-gray-300 rounded-md p-4 bg-white">
      {editor ? (
        <EditorContent editor={editor} />
      ) : (
        <p className="text-sm text-gray-500">Cargando editor...</p>
      )}
    </div>
  );
};

export default EditorContentArticle;
