'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '@/types';

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
  if (!articles || articles.length === 0) return null;

  return (
    <div className="py-16 bg-gradient-to-t from-[#C2E7DA]/10 to-[#F7FAFF]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#1A1341] mb-12 text-center">
          Artículos que podrían interesarte
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link 
              href={`/blog/${article.slug}`} 
              key={article.id}
              className="group"
            >
              <div className="rounded-lg overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:-translate-y-1">
                <div className="relative h-48 w-full">
                  <Image
                    src={article.image}
                    alt={article.image_alt || article.title}
                    fill
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
                    <p className="text-gray-700 line-clamp-2">
                      {article.excerpt}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleRelated;