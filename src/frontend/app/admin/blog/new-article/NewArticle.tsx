'use client'

import React, { useState } from 'react'
import BlogArticleForm from '@/components/admin/blog/BlogArticleForm'
import Link from 'next/link'
import Button from '@/components/ui/Button'

const NewArticle = () => {
  const [isEditMode, setIsEditMode] = useState(false) // Suponiendo que se pasa el estado para edición si es necesario.

  const handleSubmit = async (articleData: any) => {
    try {
      const response = isEditMode
        ? await fetch(`/api/articles/${articleData.slug}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(articleData),
          })
        : await fetch('/api/articles/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(articleData),
          })

      if (response.ok) {
        alert(isEditMode ? 'Artículo actualizado correctamente' : 'Artículo creado correctamente')
      } else {
        const errorData = await response.json()
        alert(`Error al ${isEditMode ? 'actualizar' : 'crear'} el artículo: ${errorData.message}`)
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error)
      alert('Error al guardar el artículo. Por favor, intenta nuevamente.')
    }
  }

  return (
    <div className="container mx-auto py-8">
      {/* Título y Botón de Volver */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#1A1341]">Editor de artículo</h1>
        <Link href="/admin/blog">
          <Button variant="outline" size="sm">← Volver al listado</Button>
        </Link>
      </div>

      {/* Formulario de creación de artículo */}
      <BlogArticleForm onSubmit={handleSubmit} />
    </div>
  )
}

export default NewArticle
