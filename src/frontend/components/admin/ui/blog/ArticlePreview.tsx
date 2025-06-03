'use client';

/**
 * ArticlePreview.tsx
 *
 * Vista previa completa del artículo antes de publicarlo.
 * Se utiliza dentro del panel de administración para validar el contenido final.
 * Muestra título, resumen, imagen, contenido HTML renderizado y artículos relacionados reales.
 *
 * Características:
 * - Simula la vista final del artículo.
 * - Usa componentes reales para garantizar consistencia visual.
 * - Carga artículos relacionados por slug desde el backend.
 * - Todo el contenido es local (no se guarda aún).
 */

import React, { useEffect, useState } from 'react';
import ArticleHeader from '@/components/articles/ArticleHeader';
import ArticleContent from '@/components/articles/ArticleContent';
import ArticleRelated from '@/components/articles/ArticleRelated';
import Button from '@/components/ui/Button';
import { Article } from '@/types';
import { getArticlesBySlugs } from '@/lib/blogService';

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
  // Simulación del artículo principal con props temporales
  const previewArticle: Article = {
    id: 0,
    title: articleData.title,
    slug: 'preview',
    author: 'Administrador',
    date: new Date().toISOString(),
    excerpt: articleData.excerpt,
    image: articleData.image,
    content: articleData.content,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // Estado local para los artículos relacionados reales
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  // Al montar, cargar los artículos relacionados por slug
  useEffect(() => {
    const loadRelated = async () => {
      try {
        if (articleData.related.length > 0) {
          const articles = await getArticlesBySlugs(articleData.related);
          setRelatedArticles(articles);
        }
      } catch (error) {
        console.error('Error al cargar artículos relacionados:', error);
      }
    };

    loadRelated();
  }, [articleData.related]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Encabezado fijo con botón para volver al editor */}
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

      {/* Contenido del artículo */}
      <div className="flex-grow">
        <ArticleHeader article={previewArticle} onBackClick={onBack} />
        <ArticleContent article={previewArticle} />

        {/* Artículos relacionados (solo si hay) */}
        {relatedArticles.length > 0 && (
          <ArticleRelated articles={relatedArticles} />
        )}
      </div>
    </div>
  );
};

export default ArticlePreview;
