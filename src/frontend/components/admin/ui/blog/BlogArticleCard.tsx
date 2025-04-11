'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Article } from '@/types'
import Button from '@/components/ui/Button'

interface BlogArticleCardProps extends Pick<Article, 'title' | 'slug' | 'image' | 'excerpt' | 'created_at'> {
  onDelete: (slug: string) => void
}

const BlogArticleCard: React.FC<BlogArticleCardProps> = ({ title, slug, image, excerpt, created_at, onDelete }) => {
  const router = useRouter()

  const handleDelete = () => {
    if (confirm('¿Estás seguro de que deseas eliminar este artículo?')) {
      onDelete(slug)
    }
  }

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
        />
      </div>

      <h2 className="text-[#1A1341] font-bold text-lg line-clamp-2">{title}</h2>
      <p className="text-sm text-[#1A1341] opacity-70">{formatDate(created_at)}</p>
      <p className="text-[#1A1341] text-sm line-clamp-2">{excerpt}</p>

      <div className="flex flex-wrap gap-2 pt-2">
        <Link href={`/blog/${slug}`} target="_blank">
          <Button variant="primary" size="sm">Ver</Button>
        </Link>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => router.push(`/admin/blog/editar/${slug}`)}
        >
          Editar
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
        >
          Eliminar
        </Button>
      </div>
    </div>
  )
}

export default BlogArticleCard
