'use client';

import React from 'react';
import { Article } from '@/types';

interface ArticleContentProps {
  article: Article;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  // Funciones para compartir en redes sociales
  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`,
      '_blank'
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
      '_blank'
    );
  };

  const shareByEmail = () => {
    window.open(
      `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(`Te recomiendo este artículo: ${window.location.href}`)}`,
      '_blank'
    );
  };

  return (
    <div className="bg-gradient-to-b from-[#C2E7DA]/20 via-[#F7FAFF] to-[#C2E7DA]/20 py-16">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Extracto destacado */}
        {article.excerpt && (
          <div className="text-lg md:text-xl text-[#1A1341] font-medium border-l-4 border-[#6290C3] pl-4 mb-12 italic">
            {article.excerpt}
          </div>
        )}

        {/* Contenido HTML del artículo con estilos directos de Tailwind */}
        <div
          className="prose prose-lg max-w-none text-[#1A1341] article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />



        {/* Botones para compartir */}
        <div className="flex justify-center mt-16 space-x-4">
          <button
            className="text-[#6290C3] hover:text-[#1A1341] transition-colors p-2 rounded-full bg-[#F7FAFF] shadow-md hover:shadow-lg"
            aria-label="Compartir en Twitter"
            onClick={shareOnTwitter}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </button>
          <button
            className="text-[#6290C3] hover:text-[#1A1341] transition-colors p-2 rounded-full bg-[#F7FAFF] shadow-md hover:shadow-lg"
            aria-label="Compartir en LinkedIn"
            onClick={shareOnLinkedIn}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </button>
          <button
            className="text-[#6290C3] hover:text-[#1A1341] transition-colors p-2 rounded-full bg-[#F7FAFF] shadow-md hover:shadow-lg"
            aria-label="Compartir por correo"
            onClick={shareByEmail}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleContent;