'use client'

// Este componente permite al admin seleccionar hasta 3 artículos relacionados.
// Recupera los artículos desde el backend (json + artículos nuevos).
// Está listo para producción.

import React from 'react';

import { useEffect, useState } from 'react'
import { getArticleTitles, ArticleListItem } from '@/lib/blogService'

interface ArticlesSelectorProps {
  selected: string[]
  setSelected: (slugs: string[]) => void
}

const ArticlesSelector = ({ selected, setSelected }: ArticlesSelectorProps) => {
  const [articles, setArticles] = useState<ArticleListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true)
        const articlesList = await getArticleTitles()
        setArticles(articlesList)
        setError(null)
      } catch (err) {
        console.error('Error al cargar los artículos:', err)
        setError('No se pudieron cargar los artículos')
      } finally {
        setIsLoading(false)
      }
    }

    loadArticles()
  }, [])

  const toggleArticle = (slug: string) => {
    if (selected.includes(slug)) {
      setSelected(selected.filter((s) => s !== slug))
    } else {
      if (selected.length >= 3) return
      setSelected([...selected, slug])
    }
  }

  return (
    <div className="mt-6">
      <label className="text-sm font-medium text-gray-700 mb-2 block">
        Artículos relacionados (máx. 3)
      </label>
      <div className="flex flex-col gap-2 max-h-48 overflow-y-auto border rounded-md p-3 bg-slate-50">
        {isLoading ? (
          <p className="text-sm text-gray-500 p-2">Cargando artículos...</p>
        ) : error ? (
          <p className="text-sm text-red-500 p-2">{error}</p>
        ) : articles.length === 0 ? (
          <p className="text-sm text-gray-500 p-2">No hay artículos disponibles</p>
        ) : (
          articles.map((article) => (
            <button
              key={article.slug}
              onClick={() => toggleArticle(article.slug)}
              type="button"
              className={`text-left px-3 py-2 rounded-md transition-all text-sm border ${
                selected.includes(article.slug)
                  ? 'bg-slate-800 text-white border-slate-800'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
              }`}
            >
              {article.title}
            </button>
          ))
        )}
      </div>
      {selected.length === 0 && (
        <p className="text-xs text-gray-500 mt-3">
          Selecciona al menos un artículo relacionado.
        </p>
      )}
    </div>
  )
}

export default ArticlesSelector