/**
 * ArticleRelated.tsx
 *
 * Componente que muestra una lista de artículos relacionados al final de un artículo.
 * Diseño LHC consistente con animación suave al entrar en viewport.
 *
 * - Máx. 3 artículos relacionados (ya filtrados desde el componente padre).
 * - Animación profesional desde abajo con useInView.
 * - Hover elegante, responsive, sin duplicación de lógica.
 */

'use client';

import React from 'react';
import SmartLink from "@/components/ui/SmartLink";
import Image from 'next/image';
import { Article } from '@/types';
import { useInView } from '@/hooks/useInView';

interface ArticleRelatedProps {
  articles: Article[];
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const ArticleRelated: React.FC<ArticleRelatedProps> = ({ articles }) => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  if (!articles || articles.length === 0) return null;

  return (
    <div className="py-16 bg-gradient-to-t from-[#C2E7DA]/10 to-[#F7FAFF]">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-4 transition-all duration-700 transform ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <h2 className="text-2xl font-bold text-[#1A1341] mb-12 text-center">
          Artículos que podrían interesarte
        </h2>

        <div
          className={`grid gap-8 ${
            articles.length === 1
              ? 'grid-cols-1 justify-items-center'
              : articles.length === 2
              ? 'grid-cols-1 sm:grid-cols-2 sm:mx-auto sm:w-[80%] justify-items-center'
              : 'grid-cols-1 sm:grid-cols-3'
          }`}
        >
          {articles.map((article) => (
            <SmartLink
              href={`/blog/${article.slug}`}
              key={article.id}
              className="group w-full max-w-md"
            >
              <div className="rounded-lg overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1">
                <div className="relative h-48 w-full">
                  <Image
                    src={article.image}
                    alt={article.image_alt || article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1341] to-transparent opacity-60"></div>
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-lg font-bold text-[#1A1341] mb-2 line-clamp-2 group-hover:text-[#6290C3] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {formatDate(article.date || article.created_at)}
                  </p>
                  {article.excerpt && (
                    <p className="text-gray-700 line-clamp-2">{article.excerpt}</p>
                  )}
                </div>
              </div>
            </SmartLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleRelated;
