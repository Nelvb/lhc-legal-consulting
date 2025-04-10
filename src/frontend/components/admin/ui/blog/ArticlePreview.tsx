'use client';

import React from 'react';
import ArticleHeader from '@/components/articles/ArticleHeader';
import ArticleContent from '@/components/articles/ArticleContent';
import Button from '@/components/ui/Button';
import { Article } from '@/types';

interface ArticlePreviewProps {
  articleData: {
    title: string;
    excerpt: string;
    content: string;
    image: string;
    related: string[];
  };
  onBack: () => void;
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({
  articleData,
  onBack,
}) => {
  // Crear un objeto de tipo Article para pasar a los componentes
  const previewArticle: Article = {
    id: 0, // Temporal
    title: articleData.title,
    slug: 'preview', // Temporal
    author: 'Administrador', // Puedes personalizarlo
    date: new Date().toISOString(),
    excerpt: articleData.excerpt,
    image: articleData.image,
    content: articleData.content,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Barra superior con acciones */}
      <div className="sticky top-0 z-50 bg-[#1A1341] text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="font-bold text-lg">Vista previa</span>
            <span className="text-sm bg-yellow-500 text-yellow-900 px-2 py-1 rounded">
              No publicado
            </span>
          </div>
          <Button variant="secondary" onClick={onBack}>
            Volver al editor
          </Button>
        </div>
      </div>

      {/* Artículo */}
      <div className="flex-grow">
        <ArticleHeader
          article={previewArticle}
          onBackClick={onBack}
        />
        <ArticleContent article={previewArticle} />
      </div>
    </div>
  );
};

export default ArticlePreview;