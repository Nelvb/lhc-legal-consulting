/**
 * Página principal del Blog (/blog) - LHC Legal & Consulting
 *
 * Muestra todos los artículos publicados mediante tarjetas (BlogArticleCard),
 * con paginación profesional y diseño responsive. El hero está separado y animado.
 */

'use client';

import React, { useState, useEffect } from 'react';
import BlogHero from '@/components/blog/BlogHero';
import BlogArticleCard from '@/components/blog/BlogArticleCard';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { getArticles } from '@/lib/blogService';
import { Article } from '@/types';

const BlogPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const response = await getArticles({ page, limit: 12 });
        setArticles(response.articles);
        setTotalPages(response.total_pages);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [page]);

  if (isLoading) {
    return <LoadingSpinner text="Cargando artículos..." size="md" />;
  }

  return (
    <div className="relative min-h-screen">
      {/* Header animado del blog */}
      <BlogHero />

      {/* Contenido principal con fondo claro */}
      <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          {articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-2xl font-semibold mb-4 text-[#1b2f4b]">No hay artículos disponibles</p>
              <p className="text-gray-600">Próximamente nuevos contenidos</p>
            </div>
          ) : (
            <>
              {/* Grid de artículos */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <BlogArticleCard key={article.id} article={article} />
                ))}
              </div>

              {/* Paginación profesional */}
              <div className="flex justify-center items-center mt-12 space-x-6">
                {page > 1 && (
                  <Button variant="outline" size="md" onClick={() => handlePageChange(page - 1)}>
                    Anterior
                  </Button>
                )}

                <span className="text-[#1b2f4b] font-medium">
                  Página {page} de {totalPages}
                </span>

                {page < totalPages && (
                  <Button variant="outline" size="md" onClick={() => handlePageChange(page + 1)}>
                    Siguiente
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
