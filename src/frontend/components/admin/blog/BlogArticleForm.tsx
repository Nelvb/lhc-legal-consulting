'use client'

// Formulario para crear nuevos artículos en el blog del admin.
// Integra validaciones, subida de imagen destacada, editor enriquecido y selector de artículos relacionados.

import React, { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import ImageUpload from '@/components/ui/ImageUpload'
import EditorContentArticle from '@/components/admin/ui/blog/EditorContentArticle'
import ArticlesSelector from '@/components/admin/ui/blog/ArticlesSelector'
import ArticlePreview from '@/components/admin/ui/blog/ArticlePreview'
import { createSlug } from '@/lib/utils/string-utils'

interface BlogArticleFormProps {
  onSubmit: (articleData: any) => void
}

const BlogArticleForm: React.FC<BlogArticleFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState('')
  const [related, setRelated] = useState<string[]>([])
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: { [key: string]: string } = {}

    if (title.length < 10 || title.length > 100) {
      newErrors.title = 'El título debe tener entre 10 y 100 caracteres'
    }

    if (excerpt.length < 50 || excerpt.length > 200) {
      newErrors.excerpt = 'El extracto debe tener entre 50 y 200 caracteres'
    }

    const plainText = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    const wordCount = plainText.split(' ').length

    console.log(`Contenido plano: ${plainText.substring(0, 100)}...`)
    console.log(`Palabras contadas: ${wordCount}`)

    if (wordCount < 1000) {
      newErrors.content = 'El contenido debe tener al menos 1000 palabras'
    }

    if (!image) {
      newErrors.image = 'Debes subir una imagen antes de continuar'
    }

    if (related.length === 0) {
      newErrors.related = 'Debes seleccionar al menos un artículo relacionado'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const articleData = {
      title,
      excerpt,
      content,
      image,
      related,
    }

    console.log('Contenido a enviar:', articleData)

    onSubmit(articleData)
  }

  const handlePreview = () => {
    const newErrors: { [key: string]: string } = {}

    if (title.length < 10 || title.length > 100) {
      newErrors.title = 'El título debe tener entre 10 y 100 caracteres'
    }

    if (excerpt.length < 50 || excerpt.length > 200) {
      newErrors.excerpt = 'El extracto debe tener entre 50 y 200 caracteres'
    }

    const plainText = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    const wordCount = plainText.split(' ').length

    if (wordCount < 1000) {
      newErrors.content = 'El contenido debe tener al menos 1000 palabras'
    }

    if (!image) {
      newErrors.image = 'Debes subir una imagen antes de continuar'
    }

    if (related.length === 0) {
      newErrors.related = 'Debes seleccionar al menos un artículo relacionado'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsPreviewMode(true)
  }

  const handleImageUpload = (imageUrl: string) => {
    setImage(imageUrl)
    setErrors((prev) => ({ ...prev, image: '' }))
  }

  if (isPreviewMode) {
    return (
      <ArticlePreview
        articleData={{
          title,
          excerpt,
          content,
          image,
          related,
        }}
        onBack={() => setIsPreviewMode(false)}
      />
    )
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-[#F1FFEF] to-[#C2E7DA] flex items-start justify-center">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-[#1A1341]">Crear nuevo artículo</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <Input
              label="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: IA en el sector inmobiliario"
              required
            />
            <p className="text-xs text-gray-500 mt-3">Entre 10 y 100 caracteres</p>
            {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <Input
              label="Extracto"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Resumen breve para vista previa"
              required
            />
            <p className="text-xs text-gray-500 mt-3">
              Entre 50 y 200 caracteres. Se usará como introducción del artículo.
            </p>
            {errors.excerpt && <p className="text-red-600 text-sm mt-1">⚠️ {errors.excerpt}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contenido del artículo</label>
            <EditorContentArticle content={content} onChange={setContent} />
            <p className="text-xs text-gray-500 mt-3">
              El contenido debe tener entre 1000 y 2000 palabras. El editor reconoce texto enriquecido de Google Docs o Word. Simplemente copia y pega manteniendo el formato según las guías del placeholder.
            </p>
            {errors.content && <p className="text-red-600 text-sm mt-1">⚠️ {errors.content}</p>}
          </div>

          <div>
            <p className="block text-sm font-medium text-gray-700 mb-2">Imagen destacada</p>
            <ImageUpload onImageUpload={handleImageUpload} />
            {errors.image && <p className="text-red-600 text-sm mt-1">⚠️ {errors.image}</p>}
          </div>

          <div>
            <ArticlesSelector selected={related} setSelected={setRelated} />
            {errors.related && <p className="text-red-600 text-sm mt-1">⚠️ {errors.related}</p>}
          </div>

          <div className="flex justify-between gap-4 pt-4">
            <Button type="button" variant="secondary" onClick={() => history.back()}>
              Cancelar
            </Button>
            <div className="flex gap-4">
              <Button type="button" variant="secondary" onClick={handlePreview}>
                Vista previa
              </Button>
              <Button type="submit" variant="primary">
                Publicar artículo
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BlogArticleForm