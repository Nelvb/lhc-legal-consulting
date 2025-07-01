'use client';

import React from 'react';

const BlogHeader: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl mb-12">
      {/* Fondo con gradiente */}
      <div 
        className="bg-gradient-to-r from-[#1A1341] to-[#6290C3] py-16 px-6 md:px-12"
      >
        {/* Elementos decorativos */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#C2E7DA] opacity-10 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#F1FFEF] opacity-10 rounded-tr-full"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Badge opcional */}
          <span className="inline-block bg-[#C2E7DA] text-[#1A1341] text-sm font-medium px-4 py-1 rounded-full mb-4">
            Boost A Project
          </span>
          
          {/* Título principal */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Centro de Conocimiento Inmobiliario
          </h1>
          
          {/* Descripción */}
          <p className="text-lg md:text-xl text-[#F1FFEF] opacity-90 max-w-3xl mx-auto">
            Descubre las últimas tendencias y oportunidades en inversión inmobiliaria. 
            Aprende, crece y transforma tu capital con nuestros artículos especializados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;