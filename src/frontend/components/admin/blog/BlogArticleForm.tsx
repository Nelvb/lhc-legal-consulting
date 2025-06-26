'use client'

/**
 * Formulario reutilizable para crear o editar artículos del blog en el panel de administración.
 *
 * Este componente incluye:
 * - Validaciones inteligentes unificadas (cada campo se auto-valida)
 * - Contador de caracteres en Título y Resumen
 * - Prompt para IA (instrucciones + textarea opcional)
 * - Subida de imagen destacada (con vista previa y validación)
 * - Editor enriquecido simplificado (textarea + formateo automático)
 * - Selector de artículos relacionados (1 a 3)
 * - Vista previa del artículo antes de publicar
 * - Totalmente responsive con Tailwind CSS
 */

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
  }
}

const BlogArticleForm: React.FC<BlogArticleFormProps> = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '')
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [image, setImage] = useState(initialData?.image || '')
  const [related, setRelated] = useState<string[]>(initialData?.related || [])
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  // Estados de error para cada campo
  const [titleError, setTitleError] = useState(false)
  const [excerptError, setExcerptError] = useState(false)
  const [contentError, setContentError] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [relatedError, setRelatedError] = useState(false)

  useEffect(() => {
    if (initialData?.image) setImage(initialData.image)
  }, [initialData?.image])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Si algún campo tiene error, no enviar
    if (titleError || excerptError || contentError || imageError || relatedError) {
      return
    }

    const articleData = {
      title,
      excerpt,
      content,
      image,
      related,
    }

    onSubmit(articleData)
  }

  const handlePreview = () => {
    setIsPreviewMode(true)
  }

  const handleImageUpload = (imageUrl: string) => {
    setImage(imageUrl)
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
    <div className="min-h-screen py-12 px-4 bg-lhc-gradient
 flex items-start justify-center border border-[#6290C3]/30 rounded-2xl shadow-md">
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-[#1A1341]">
          {initialData ? 'Editar artículo' : 'Crear nuevo artículo'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* TÍTULO */}
          <div>
            <Input
              compact
              label="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: IA en el sector inmobiliario"
              required
              validationRules={{
                minLength: 10,
                maxLength: 100,
                required: true
              }}
              validateOnChange={true}
              onErrorChange={setTitleError}
            />
            <p className="text-xs text-gray-500 mt-2">Entre 10 y 100 caracteres</p>
            <p className="text-xs text-gray-400">({title.length} caracteres)</p>
          </div>

          {/* RESUMEN */}
          <div>
            <Input
              compact
              label="Resumen"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Resumen breve para vista previa"
              required
              validationRules={{
                minLength: 50,
                maxLength: 200,
                required: true
              }}
              validateOnChange={true}
              onErrorChange={setExcerptError}
            />
            <p className="text-xs text-gray-500 mt-2">Entre 50 y 200 caracteres</p>
            <p className="text-xs text-gray-400">({excerpt.length} caracteres)</p>
          </div>

          {/* CONTENIDO */}
          <div>
            <EditorContentArticle
              content={content}
              onChange={setContent}
              onErrorChange={setContentError}
            />
            <p className="text-xs text-gray-500 mt-3">
              El contenido debe tener al menos 1000 palabras. Puedes pegar desde Word o Google Docs.
            </p>
          </div>

          {/* IMAGEN */}
          <div>
            <ImageUpload
              onImageUpload={handleImageUpload}
              initialImage={image}
              onErrorChange={setImageError}
            />
          </div>

          {/* RELACIONADOS */}
          <div>
            <ArticlesSelector
              selected={related}
              setSelected={(slugs) => {
                setRelated(slugs)
                // Validar artículos relacionados
                setRelatedError(slugs.length < 1 || slugs.length > 3)
              }}
              error={relatedError ? 'Selecciona entre 1 y 3 artículos relacionados' : undefined}
            />
          </div>

          {/* ACCIONES */}
          <div className="flex justify-between gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => history.back()}>
              Cancelar
            </Button>
            <div className="flex gap-4">
              <Button type="button" variant="lhc" onClick={handlePreview}>
                Vista previa
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={titleError || excerptError || contentError || imageError || relatedError}
              >
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