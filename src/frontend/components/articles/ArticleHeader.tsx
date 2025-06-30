/**
 * ArticleHeader.tsx
 * 
 * Hero de artículo individual en LHC Legal & Consulting.
 * Fondo dividido (salmón y azul oscuro) con overlay sobre imagen destacada.
 * Título centrado y animado al entrar en viewport.
 */

'use client';

import React from 'react';
import Image from 'next/image';
import SmartLink from "@/components/ui/SmartLink";
import { ArrowLeft } from 'lucide-react';
import { Article } from '@/types';
import { useInView } from '@/hooks/useInView';

interface ArticleHeaderProps {
  article: Article;
  onBackClick: () => void;
}

const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article, onBackClick }) => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Fondo dividido LHC */}
      <div className="absolute inset-0 flex z-0">
        <div className="w-[30%] bg-[#C2E7DA]" />
        <div className="w-[70%] bg-[#1A1341]" />
      </div>

      {/* Imagen destacada con overlay */}
      {article.image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={article.image}
            alt={article.image_alt || article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1341]/70 via-[#1A1341]/40 to-transparent" />
        </div>
      )}

      {/* Contenido del Hero */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <div
          ref={ref}
          className={`
            max-w-4xl transition-all duration-700 transform
            ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}
        >
          <SmartLink
            href="/blog"
            className="inline-flex items-center text-white hover:text-[#C2E7DA] transition-colors mb-6"
            onClick={(e) => {
              e.preventDefault();
              onBackClick();
            }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al blog
          </SmartLink>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-md">
            {article.title}
          </h1>

          <div className="text-white text-sm md:text-base font-medium">
            {article.author && <span className="mr-2">{article.author}</span>}
            <time dateTime={article.date || article.created_at}>
              {formatDate(article.date || article.created_at)}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleHeader;
