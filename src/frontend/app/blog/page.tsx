/**
 * Página principal del Blog (/blog) - LHC Legal & Consulting
 *
 * Muestra todos los artículos publicados mediante tarjetas (BlogArticleCard),
 * con paginación profesional y diseño responsive. Header único integrado con gradiente LHC
 * y fondo claro para las cards. Estructura limpia sin duplicación de código.
 */

'use client';

import React, { useState, useEffect } from 'react';
import BlogArticleCard from '@/components/blog/BlogArticleCard';
import Button from '@/components/ui/Button';
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

  return (
    <div className="relative min-h-screen">
      {/* Header único con gradiente LHC */}
      <div
        className="w-full py-20 lg:py-32 px-6 relative overflow-hidden"
        style={{
          background: `
            linear-gradient(135deg, 
              #0f172a 0%, 
              #1b2f4b 30%, 
              #1DA1F2 65%, 
              #1b2f4b 100%
            )
          `
        }}
      >
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: '800',
              letterSpacing: '-0.02em',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
          >
            Blog LHC Legal &{" "}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1DA1F2] via-[#60A5FA] to-[#1DA1F2] mt-4 pb-2 animate-pulse">
              Consulting
            </span>
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-[#1DA1F2] to-[#60A5FA] mx-auto mb-8 rounded-full" />

          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-200 max-w-5xl mx-auto leading-relaxed font-light">
            Toda la actualidad jurídica
            <span className="block mt-4 font-semibold text-blue-200 text-lg sm:text-xl lg:text-2xl">
              Mantente informado de los cambios legales que te afectan
            </span>
          </p>
        </div>
      </div>

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