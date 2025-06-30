/**
 * BlogArticleCard.tsx
 *
 * Componente de tarjeta para mostrar artículos del blog en la vista pública.
 * Garantiza altura uniforme y diseño responsive. Optimizado para SEO y accesibilidad.
 * Animaciones individuales al entrar en viewport para cada tarjeta.
 */

'use client';

import React from 'react';
import Image from 'next/image';
import SmartLink from "@/components/ui/SmartLink";
import Button from '@/components/ui/Button';
import { useInView } from '@/hooks/useInView';
import { Article } from '@/types';

interface BlogArticleCardProps {
  article: Article;
}

const BlogArticleCard: React.FC<BlogArticleCardProps> = ({ article }) => {
  const { ref, inView } = useInView({ threshold: 0.25 });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    return {
      readable: formattedDate,
      machine: date.toISOString().split('T')[0]
    };
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const formattedDate = formatDate(article.date);
  const readTime = calculateReadTime(article.content);

  return (
    <div
      ref={ref}
      className={`
        transition-all duration-700 transform
        ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
      `}
    >
      <article
        className="group relative flex flex-col overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100 hover:border-[#6290C3]/30 h-full"
        itemScope
        itemType="http://schema.org/BlogPosting"
      >
        {/* Imagen superior */}
        <div className="relative w-full h-60 overflow-hidden">
          <Image
            src={article.image}
            alt={article.image_alt || article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            itemProp="image"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#1A1341] opacity-20 group-hover:opacity-10 transition-opacity duration-300" />
        </div>

        {/* Contenido */}
        <div className="p-6 bg-white flex flex-col justify-between flex-grow min-h-[360px]">
          <div>
            {/* Fecha y lectura */}
            <div className="flex justify-between text-sm text-gray-500 mb-3">
              <time dateTime={formattedDate.machine} itemProp="datePublished">
                {formattedDate.readable}
              </time>
              <span itemProp="timeRequired">{readTime} min de lectura</span>
            </div>

            {/* Título */}
            <h3
              className="text-xl font-bold text-[#1A1341] mb-3 group-hover:text-[#6290C3] transition-colors"
              itemProp="headline"
            >
              {article.title}
            </h3>

            {/* Extracto */}
            <p
              className="text-gray-600 mb-4 line-clamp-4 min-h-[6rem]"
              itemProp="description"
            >
              {article.excerpt || 'No hay descripción disponible.'}
            </p>

            <meta itemProp="author" content={article.author} />
          </div>

          {/* Botón */}
          <SmartLink
            href={`/blog/${article.slug}`}
            className="mt-auto block"
            aria-label={`Leer artículo completo: ${article.title}`}
          >
            <Button
              variant="outline"
              className="w-full"
              aria-label="Leer artículo completo"
            >
              Leer artículo
            </Button>
          </SmartLink>
        </div>
      </article>
    </div>
  );
};

export default BlogArticleCard;