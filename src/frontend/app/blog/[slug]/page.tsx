/**
 * Vista de artículo del blog.
 *
 * Carga un artículo por su slug, muestra su contenido y los artículos relacionados
 * seleccionados por el administrador en el formulario de creación/edición.
 * 
 * - Usa `getArticleBySlug` para obtener el artículo.
 * - Filtra los relacionados desde todos los artículos disponibles según `related[]`.
 * - Diseño responsive con fondo dividido.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getArticleBySlug, getArticles } from '@/lib/blogService';
import { Article } from '@/types';
import { ArrowLeft } from 'lucide-react';
import ArticleHeader from '@/components/articles/ArticleHeader';
import ArticleContent from '@/components/articles/ArticleContent';
import ArticleRelated from '@/components/articles/ArticleRelated';

const ArticlePage: React.FC = () => {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        if (!slug) {
          throw new Error('No se proporcionó un slug válido');
        }

        // Obtener el artículo principal
        const articleData = await getArticleBySlug(slug);
        if (!articleData) {
          throw new Error('Artículo no encontrado');
        }

        setArticle(articleData);

        // Obtener artículos relacionados seleccionados manualmente por slug
        if (articleData.related && articleData.related.length > 0) {
          const allArticles = await getArticles({ limit: 999 });
          const related = allArticles.articles.filter(a =>
            articleData.related.includes(a.slug)
          );
          setRelatedArticles(related);
        } else {
          setRelatedArticles([]);
        }

      } catch (error) {
        console.error('Error al cargar el artículo:', error);
        setError(error instanceof Error ? error.message : 'Ocurrió un error al cargar el artículo');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="relative min-h-screen pt-20">
        <div className="absolute inset-0 flex">
          <div className="w-[30%] bg-[#C2E7DA]" />
          <div className="w-[70%] bg-[#1A1341]" />
        </div>
        <div className="relative z-10 flex justify-center items-center min-h-screen">
          <div className="animate-pulse text-white text-xl">
            Cargando artículo...
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="relative min-h-screen pt-20">
        <div className="absolute inset-0 flex">
          <div className="w-[30%] bg-[#C2E7DA]" />
          <div className="w-[70%] bg-[#1A1341]" />
        </div>
        <div className="relative z-10 flex flex-col justify-center items-center min-h-screen text-center px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Artículo no encontrado
          </h1>
          <p className="text-[#C2E7DA] mb-8">
            {error || 'No se pudo encontrar el artículo solicitado'}
          </p>
          <Link 
            href="/blog" 
            className="inline-flex items-center px-6 py-3 bg-[#6290C3] text-white rounded-lg hover:bg-[#1A1341] transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <ArticleHeader 
        article={article} 
        onBackClick={() => window.history.back()} 
      />
      
      <ArticleContent article={article} />
      
      {relatedArticles.length > 0 && (
        <ArticleRelated articles={relatedArticles} />
      )}
    </div>
  );
};

export default ArticlePage;
