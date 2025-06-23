/**
 * LatestArticles.tsx
 *
 * Componente para mostrar los últimos artículos del blog en el sidebar.
 * Diseñado para encajar debajo de LegalAreasSidebar en páginas de áreas legales.
 * Muestra título, extracto y fecha con enlaces a los artículos completos.
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getArticles } from '@/lib/blogService';
import { Article } from '@/types/blog';
import { Calendar, ArrowRight } from 'lucide-react';

interface LatestArticlesProps {
  limit?: number;
  className?: string;
}

const LatestArticles: React.FC<LatestArticlesProps> = ({ 
  limit = 3, 
  className = "" 
}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        setIsLoading(true);
        const response = await getArticles({ page: 1, limit });
        setArticles(response.articles);
      } catch (err) {
        console.error('Error cargando últimos artículos:', err);
        setError('Error al cargar artículos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestArticles();
  }, [limit]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
  };

  if (isLoading) {
    return (
      <div className={`p-6 border-t border-gray-200 ${className}`}>
        <h3 className="text-lg font-bold text-[#1b2f4b] mb-4">
          Te Puede Interesar
        </h3>
        <div className="space-y-4">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="flex space-x-3">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || articles.length === 0) {
    return (
      <div className={`p-6 border-t border-gray-200 ${className}`}>
        <h3 className="text-lg font-bold text-[#1b2f4b] mb-4">
          Te Puede Interesar
        </h3>
        <p className="text-sm text-gray-500 text-center py-4">
          {error || 'No hay artículos disponibles'}
        </p>
      </div>
    );
  }

  return (
    <div className={`p-6 border-t border-gray-200 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-[#1b2f4b]">
          Te Puede Interesar
        </h3>
        <Link 
          href="/blog"
          className="text-sm text-[#1DA1F2] hover:text-[#1b2f4b] transition-colors duration-200 flex items-center"
        >
          Ver todos
          <ArrowRight className="w-3 h-3 ml-1" />
        </Link>
      </div>

      <div className="space-y-4">
        {articles.map((article) => (
          <article key={article.slug} className="group">
            <Link 
              href={`/blog/${article.slug}`}
              className="flex space-x-3 p-3 rounded-lg hover:bg-white/50 hover:shadow-md transition-all duration-200"
            >
              <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={article.image}
                  alt={article.image_alt || article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                  sizes="64px"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-[#1b2f4b] group-hover:text-[#1DA1F2] transition-colors duration-200 line-clamp-2 leading-tight mb-1">
                  {article.title}
                </h4>

                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-2">
                  {truncateText(article.excerpt || 'Sin descripción disponible', 80)}
                </p>

                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  <time dateTime={article.date}>
                    {formatDate(article.date)}
                  </time>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <Link 
          href="/blog"
          className="block text-center text-sm font-medium text-[#1DA1F2] hover:text-[#1b2f4b] transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-white/30"
        >
          Explorar nuestro blog →
        </Link>
      </div>
    </div>
  );
};

export default LatestArticles;