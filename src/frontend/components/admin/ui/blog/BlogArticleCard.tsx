/**
 * Componente de tarjeta para artículos del blog en el panel de administración
 * 
 * @description Muestra la información resumida de un artículo de blog
 * Permite acciones rápidas como ver, editar y eliminar artículos
 * 
 * Características:
 * - Diseño responsivo
 * - Miniatura de imagen
 * - Extracto del contenido
 * - Botones de acción contextuales
 * 
 * Utiliza la paleta de colores corporativa y componentes reutilizables
 */

"use client";

import React from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Link from 'next/link';

interface BlogArticleCardProps {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  image: string;
  date: string;
}

const BlogArticleCard: React.FC<BlogArticleCardProps> = ({
  id,
  title,
  excerpt,
  slug,
  image,
  date
}) => {
  return (
    <div 
      className="bg-[#F1FFEZ] border border-[#6290C3] rounded-lg shadow-md p-4 flex flex-col space-y-4"
    >
      <div className="flex items-center space-x-4">
        <Image 
          src={image} 
          alt={title} 
          width={100} 
          height={100} 
          className="rounded-md object-cover"
        />
        <div>
          <h2 className="text-[#1A1341] font-bold text-xl">{title}</h2>
          <p className="text-[#1A1341] text-sm opacity-70">{new Date(date).toLocaleDateString()}</p>
        </div>
      </div>
      
      <p className="text-[#1A1341] line-clamp-2">{excerpt}</p>
      
      <div className="flex items-center space-x-2">
        <Link href={`/blog/${slug}`} target="_blank">
          <Button variant="primary" size="sm">
            Ver artículo
          </Button>
        </Link>
        
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={() => {/* Lógica de edición */}}
        >
          Editar
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {/* Lógica de eliminación */}}
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export default BlogArticleCard;