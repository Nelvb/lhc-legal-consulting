/**
 * Hook personalizado para obtener artículos estáticos desde el JSON local.
 *
 * Realiza una petición al endpoint `/api/articles/static-articles`
 * y devuelve la lista de artículos con título y slug.
 * Este hook se utiliza, por ejemplo, en el selector de artículos relacionados
 * dentro del formulario de creación de artículos del administrador.
 */

import { useEffect, useState } from 'react'

type Article = {
  title: string
  slug: string
}

export const useStaticArticles = () => {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/articles/static-articles')
        if (!res.ok) throw new Error('Error al obtener los artículos')
        const data = await res.json()
        setArticles(data.map((a: any) => ({ title: a.title, slug: a.slug })))
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  return { articles, loading, error }
}
