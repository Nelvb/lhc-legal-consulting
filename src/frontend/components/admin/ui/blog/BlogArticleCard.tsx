'use client'

/**
 * BlogArticleCard - Tarjeta de artículo para panel de administración
 * 
 * Componente que muestra la información básica de un artículo del blog con controles
 * de administración (ver, editar, eliminar). Optimizado para legibilidad del admin
 * con esquema de colores azul suave profesional.
 */

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Article } from '@/types'
import Button from '@/components/ui/Button'
import SmartLink from '@/components/ui/SmartLink'


interface BlogArticleCardProps extends Pick<Article, 'title' | 'slug' | 'image' | 'excerpt' | 'created_at'> {
  onDelete: (slug: string) => void
}

const BlogArticleCard: React.FC<BlogArticleCardProps> = ({ 
  title, 
  slug, 
  image, 
  excerpt, 
  created_at, 
  onDelete 
}) => {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  
  return (
    <div className="bg-[#E3F2FD] border border-[#1b2f4b]/20 rounded-lg shadow-md p-4 flex flex-col space-y-3 hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-48 rounded overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      <h2 className="text-[#1b2f4b] font-bold text-lg line-clamp-2">{title}</h2>
      <p className="text-sm text-[#1b2f4b] opacity-70">{formatDate(created_at)}</p>
      <p className="text-[#1b2f4b] text-sm line-clamp-2">{excerpt}</p>

      <div className="flex flex-wrap gap-2 pt-2">
        <SmartLink href={`/blog/${slug}`}>
          <Button variant="primary" size="sm">Ver</Button>
        </SmartLink>

        <SmartLink href={`/admin/blog/editar/${slug}`}>
          <Button variant="outline" size="sm">Editar</Button>
        </SmartLink>

        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(slug)}
        >
          Eliminar
        </Button>
      </div>
    </div>
  )
}

export default BlogArticleCard