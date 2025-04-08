// Componente de editor enriquecido para artículos del blog (admin).
// Usa TipTap con StarterKit para formato básico: títulos, listas, negritas, links, etc.

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
