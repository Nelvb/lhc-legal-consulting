/**
 * Hook personalizado para obtener artículos estáticos desde el JSON local.
 *
 * Utiliza el servicio centralizado blogService para obtener los artículos estáticos
 * y mantiene estados de carga y error.
 * Este hook se utiliza, por ejemplo, en el selector de artículos relacionados
 * dentro del formulario de creación de artículos del administrador.
 */

import { useEffect, useState } from 'react'
import { getStaticArticles, ArticleListItem } from '@/lib/blogService'

export const useStaticArticles = () => {
  const [articles, setArticles] = useState<ArticleListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true)
        const articlesList = await getStaticArticles()
        setArticles(articlesList)
        setError(null)
      } catch (err: any) {
        setError(err.message || 'Error al obtener los artículos')
        console.error('Error en useStaticArticles:', err)
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [])

  return { articles, loading, error }
}