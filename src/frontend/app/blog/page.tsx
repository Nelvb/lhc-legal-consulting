/**
 * Página principal del Blog (/blog)
 *
 * Muestra todos los artículos publicados mediante tarjetas (BlogArticleCard),
 * con paginación profesional y diseño responsive. Integra fondo visual dividido,
 * cabecera destacada (BlogHeader), y botón de navegación para cambiar de página.
 * Muestra exactamente 12 artículos por página y oculta el botón “Siguiente”
 * cuando no hay más contenido según el total paginado del backend.
 */

'use client';

import React, { useState, useEffect } from 'react';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogArticleCard from '@/components/blog/BlogArticleCard';
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
    return (
      <div className="relative pt-52 min-h-screen flex justify-center items-center">
        <div className="absolute inset-0 flex">
          <div className="w-[30%] bg-[#C2E7DA]" />
          <div className="w-[70%] bg-[#1A1341]" />
        </div>
        <div className="relative z-10 animate-pulse text-white text-xl">
          Cargando artículos...
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-52">
      <div className="absolute inset-0 flex">
        <div className="w-[30%] bg-[#C2E7DA]" />
        <div className="w-[70%] bg-[#1A1341]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pb-16">
        <BlogHeader />

        {articles.length === 0 ? (
          <div className="text-center text-white py-12">
            <p className="text-2xl font-semibold mb-4">No hay artículos disponibles</p>
            <p className="text-[#C2E7DA]">Próximamente nuevos contenidos</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <BlogArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Paginación */}
            <div className="flex justify-center mt-12 space-x-4">
              {page > 1 && (
                <button
                  onClick={() => handlePageChange(page - 1)}
                  className="px-4 py-2 bg-[#6290C3] text-white rounded-lg hover:bg-[#1A1341] transition-colors"
                >
                  Anterior
                </button>
              )}
              {page < totalPages && (
                <button
                  onClick={() => handlePageChange(page + 1)}
                  className="px-4 py-2 bg-[#6290C3] text-white rounded-lg hover:bg-[#1A1341] transition-colors"
                >
                  Siguiente
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
