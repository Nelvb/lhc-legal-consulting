import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getArticleBySlug } from '@/lib/blogService'

export const useArticle = () => {
    const { slug } = useParams() // Obtener el slug de la URL
    const [article, setArticle] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Asegurarse de que `slug` es un string, no un array
    const slugValue = Array.isArray(slug) ? slug[0] : slug

    useEffect(() => {
        if (slugValue) {
            const fetchArticle = async () => {
                try {
                    const articleData = await getArticleBySlug(slugValue)
                    setArticle(articleData)
                } catch (error) {
                    setError('Error al obtener el artículo')
                } finally {
                    setIsLoading(false)
                }
            }

            fetchArticle()
        }
    }, [slugValue])

    return { article, isLoading, error }
}
