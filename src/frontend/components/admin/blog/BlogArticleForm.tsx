/**
 * Formulario reutilizable para crear o editar artículos del blog en el panel de administración.
 *
 * Este componente incluye:
 * - Validaciones estrictas (longitud mínima y máxima por campo)
 * - Contador de caracteres en Título y Resumen
 * - Prompt para IA (instrucciones + textarea opcional)
 * - Subida de imagen destacada (con vista previa y validación)
 * - Editor enriquecido simplificado (textarea + formateo automático)
 * - Selector de artículos relacionados (1 a 3)
 * - Vista previa del artículo antes de publicar
 * - Totalmente responsive con Tailwind CSS
 */

'use client'

import React, { useState, useEffect } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import ImageUpload from '@/components/ui/ImageUpload'
import EditorContentArticle from '@/components/admin/ui/blog/EditorContentArticle'
import ArticlesSelector from '@/components/admin/ui/blog/ArticlesSelector'
import ArticlePreview from '@/components/admin/ui/blog/ArticlePreview'

interface BlogArticleFormProps {
  onSubmit: (articleData: any) => void
  initialData?: {
    title: string
    excerpt: string
    content: string
    image: string
    related: string[]
    ai_prompt?: string
  }
}

const BlogArticleForm: React.FC<BlogArticleFormProps> = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '')
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [image, setImage] = useState(initialData?.image || '')
  const [related, setRelated] = useState<string[]>(initialData?.related || [])
  const [aiPrompt, setAiPrompt] = useState(initialData?.ai_prompt || '')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  useEffect(() => {
    if (initialData?.image) setImage(initialData.image)
  }, [initialData?.image])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: { [key: string]: string } = {}

    if (title.length < 10 || title.length > 100) {
      newErrors.title = 'El título debe tener entre 10 y 100 caracteres'
    }

    if (excerpt.length < 50 || excerpt.length > 200) {
      newErrors.excerpt = 'El resumen debe tener entre 50 y 200 caracteres'
    }

    const plainText = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    const wordCount = plainText.split(' ').length

    if (wordCount < 1000) {
      newErrors.content = 'El contenido debe tener al menos 1000 palabras'
    }

    if (!image) {
      newErrors.image = 'Debes subir una imagen antes de continuar'
    }

    if (related.length < 1 || related.length > 3) {
      newErrors.related = 'Selecciona entre 1 y 3 artículos relacionados'
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
      ai_prompt: aiPrompt
    }

    onSubmit(articleData)
  }

  const handlePreview = () => {
    setIsPreviewMode(true)
  }

  const handleImageUpload = (imageUrl: string) => {
    setImage(imageUrl)
    setErrors(prev => ({ ...prev, image: '' }))
  }

  if (isPreviewMode) {
    return (
      <ArticlePreview
        articleData={{
          title,
          excerpt,
          content,
          image,
          related
        }}
        onBack={() => setIsPreviewMode(false)}
      />
    )
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-[#F1FFEF] to-[#C2E7DA] flex items-start justify-center">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-[#1A1341]">
          {initialData ? 'Editar artículo' : 'Crear nuevo artículo'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* TÍTULO */}
          <div>
            <Input
              label="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: IA en el sector inmobiliario"
              required
            />
            <p className="text-xs text-gray-500 mt-2">Entre 10 y 100 caracteres</p>
            <p className="text-xs text-gray-400">({title.length} caracteres)</p>
            {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* RESUMEN */}
          <div>
            <Input
              label="Resumen"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Resumen breve para vista previa"
              required
            />
            <p className="text-xs text-gray-500 mt-2">Entre 50 y 200 caracteres</p>
            <p className="text-xs text-gray-400">({excerpt.length} caracteres)</p>
            {errors.excerpt && <p className="text-red-600 text-sm mt-1">{errors.excerpt}</p>}
          </div>

          {/* CONTENIDO */}
          <div>
            <label htmlFor="editor-content" className="block text-sm font-medium text-gray-700 mb-2">Contenido del artículo</label>
            <EditorContentArticle content={content} onChange={setContent} />
            <p className="text-xs text-gray-500 mt-3">
              El contenido debe tener al menos 1000 palabras. Puedes pegar desde Word o Google Docs.
            </p>
            {errors.content && <p className="text-red-600 text-sm mt-1">{errors.content}</p>}
          </div>

          {/* IMAGEN */}
          <div>
            <p className="block text-sm font-medium text-gray-700 mb-2">Imagen destacada</p>
            <ImageUpload onImageUpload={handleImageUpload} initialImage={image} />
            {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image}</p>}
          </div>

          {/* RELACIONADOS */}
          <div>
            <ArticlesSelector selected={related} setSelected={setRelated} />
            {errors.related && <p className="text-red-600 text-sm mt-1">{errors.related}</p>}
          </div>

          {/* ACCIONES */}
          <div className="flex justify-between gap-4 pt-4">
            <Button type="button" variant="secondary" onClick={() => history.back()}>
              Cancelar
            </Button>
            <div className="flex gap-4">
              <Button type="button" variant="secondary" onClick={handlePreview}>
                Vista previa
              </Button>
              <Button type="submit" variant="primary">
                {initialData ? 'Guardar cambios' : 'Publicar artículo'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BlogArticleForm
