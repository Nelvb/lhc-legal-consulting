'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Article } from '@/types'
import Button from '@/components/ui/Button'

interface BlogArticleCardProps extends Pick<Article, 'title' | 'slug' | 'image' | 'excerpt' | 'created_at'> {
  onDelete: (slug: string) => void
}

const BlogArticleCard: React.FC<BlogArticleCardProps> = ({ title, slug, image, excerpt, created_at, onDelete }) => {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })

  return (
    <div className="bg-[#F1FFEF] border border-[#6290C3] rounded-lg shadow-md p-4 flex flex-col space-y-3">
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

      <h2 className="text-[#1A1341] font-bold text-lg line-clamp-2">{title}</h2>
      <p className="text-sm text-[#1A1341] opacity-70">{formatDate(created_at)}</p>
      <p className="text-[#1A1341] text-sm line-clamp-2">{excerpt}</p>

      <div className="flex flex-wrap gap-2 pt-2">
        <Link href={`/blog/${slug}`} target="_blank">
          <Button variant="primary" size="sm">Ver</Button>
        </Link>
        
        {/* Botón Editar */}
        <Link href={`/admin/blog/editar/${slug}`}>
          <Button variant="secondary" size="sm">Editar</Button>
        </Link>
        
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
