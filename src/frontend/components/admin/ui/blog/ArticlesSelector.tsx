'use client'

// Este componente permite al admin seleccionar hasta 3 artículos relacionados.
// Recupera los artículos desde el backend (json + artículos nuevos).
// Está listo para producción.

import { useEffect, useState } from 'react'

type Article = {
  title: string
  slug: string
}

interface ArticlesSelectorProps {
  selected: string[]
  setSelected: (slugs: string[]) => void
}

const ArticlesSelector = ({ selected, setSelected }: ArticlesSelectorProps) => {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`)
        const data = await res.json()
        setArticles(data.map((a: any) => ({ title: a.title, slug: a.slug })))
      } catch (err) {
        console.error('Error al cargar los artículos:', err)
      }
    }

    fetchArticles()
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
        {articles.map((article) => (
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
        ))}
      </div>
      {selected.length === 0 && (
        <p className="text-sm text-gray-500 mt-1">
          Selecciona al menos un artículo relacionado.
        </p>
      )}
    </div>
  )
}

export default ArticlesSelector
