'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Article } from '@/types';

interface BlogArticleCardProps {
  article: Article;
}

const BlogArticleCard: React.FC<BlogArticleCardProps> = ({ article }) => {
  // Función para formatear la fecha con atributo datetime para SEO
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

  // Calcular tiempo de lectura (aproximado)
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
    return readTimeMinutes;
  };

  const formattedDate = formatDate(article.date);
  const readTime = calculateReadTime(article.content);

  return (
    <article 
      className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100 hover:border-[#6290C3]/30"
      itemScope 
      itemType="http://schema.org/BlogPosting"
    >
      {/* Imagen del artículo */}
      <div className="relative w-full h-60 overflow-hidden">
        <Image 
          src={article.image}
          alt={article.image_alt || article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          itemProp="image"
          loading="lazy"
        />
        {/* Overlay sutil */}
        <div className="absolute inset-0 bg-[#1A1341] opacity-20 group-hover:opacity-10 transition-opacity duration-300"></div>
      </div>

      {/* Contenido del artículo */}
      <div className="p-6 bg-white">
        {/* Fecha y tiempo de lectura */}
        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
          <time 
            dateTime={formattedDate.machine}
            itemProp="datePublished"
            className="hover:underline"
          >
            {formattedDate.readable}
          </time>
          <span 
            aria-label="Tiempo de lectura"
            itemProp="timeRequired"
          >
            {readTime} min de lectura
          </span>
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
          className="text-gray-600 mb-4 line-clamp-3"
          itemProp="description"
        >
          {article.excerpt || 'No hay descripción disponible.'}
        </p>

        {/* Metadatos ocultos para SEO */}
        <meta itemProp="author" content={article.author} />

        {/* Botón Leer más */}
        <Link 
          href={`/blog/${article.slug}`} 
          className="block"
          aria-label={`Leer artículo completo: ${article.title}`}
        >
          <Button 
            variant="outline" 
            className="w-full"
            aria-label="Leer artículo completo"
          >
            Leer artículo
          </Button>
        </Link>
      </div>
    </article>
  );
};

export default BlogArticleCard;