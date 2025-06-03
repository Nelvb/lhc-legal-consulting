'use client'

/**
 * ArticlesSelector.tsx
 *
 * Selector profesional para elegir artículos relacionados en la vista del administrador.
 * Permite seleccionar entre 1 y 3 artículos, muestra errores visuales integrados si los hay
 * y está totalmente preparado para producción.
 */

import React, { useEffect, useState } from 'react'
import { getArticleTitles, ArticleListItem } from '@/lib/blogService'

interface ArticlesSelectorProps {
  selected: string[]
  setSelected: (slugs: string[]) => void
  error?: string
}

const ArticlesSelector: React.FC<ArticlesSelectorProps> = ({
  selected,
  setSelected,
  error
}) => {
  const [articles, setArticles] = useState<ArticleListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true)
        const articlesList = await getArticleTitles()
        setArticles(articlesList)
        setFetchError(null)
      } catch (err) {
        console.error('Error al cargar los artículos:', err)
        setFetchError('No se pudieron cargar los artículos')
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
        Marca al menos un artículo relacionado (máx. 3)
      </label>

      <div className={`flex flex-col gap-2 max-h-48 overflow-y-auto border rounded-md p-3 ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-slate-50'}`}>
        {isLoading ? (
          <p className="text-sm text-gray-500 p-2">Cargando artículos...</p>
        ) : fetchError ? (
          <p className="text-sm text-red-500 p-2">{fetchError}</p>
        ) : articles.length === 0 ? (
          <p className="text-sm text-gray-500 p-2">No hay artículos disponibles</p>
        ) : (
          articles.map((article) => (
            <button
              key={article.slug}
              onClick={() => toggleArticle(article.slug)}
              type="button"
              className={`text-left px-3 py-2 rounded-md transition-all text-sm border ${selected.includes(article.slug)
                  ? 'bg-slate-800 text-white border-slate-800'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
                }`}
            >
              {article.title}
            </button>
          ))
        )}
      </div>

      {/* Indicador de selección */}
      <p className="text-xs text-gray-500 mt-2">
        {selected.length === 0 && 'Ningún artículo seleccionado'}
        {selected.length === 1 && '1 artículo seleccionado'}
        {selected.length > 1 && `${selected.length} artículos seleccionados`}
      </p>

      {/* Mensaje de error visible y consistente con resto del formulario */}
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  )
}

export default ArticlesSelector
