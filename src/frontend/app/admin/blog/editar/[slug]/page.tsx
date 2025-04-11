/**
 * Página para editar artículos en el panel de administración del blog.
 * 
 * Este componente obtiene los datos del artículo a través de su 'slug' y los muestra
 * en un formulario editable. Al enviarlo, se actualiza el artículo en la base de datos.
 * 
 * Utiliza:
 * - useParams para obtener el slug del artículo desde la URL
 * - useEffect para cargar los datos del artículo desde la API
 * - useState para gestionar el estado de la carga del artículo y su modificación
 * - BlogArticleForm para editar los campos del artículo
 */

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation' // Obtener el slug de la URL
import { getArticleBySlug } from '@/lib/blogService'
import BlogArticleForm from '@/components/admin/blog/BlogArticleForm'
import Button from '@/components/ui/Button'
import AdminLayout from '@/components/admin/layout/AdminLayout'

export default function EditArticlePage() {
    const [articleData, setArticleData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
    const { slug } = useParams() // Usamos useParams para obtener el slug de la URL

    // Asegurarse de que `slug` sea un string, no un array
    const slugValue = Array.isArray(slug) ? slug[0] : slug

    useEffect(() => {
        if (slugValue) {
            const fetchArticle = async () => {
                try {
                    const article = await getArticleBySlug(slugValue)
                    setArticleData(article)
                } catch (error) {
                    console.error('Error fetching article:', error)
                } finally {
                    setIsLoading(false)
                }
            }

            fetchArticle()
        }
    }, [slugValue])

    const handleSubmit = async (updatedData: any) => {
        try {
            const response = await fetch(`/api/articles/${slugValue}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            })

            if (response.ok) {
                alert('Artículo actualizado correctamente')
                router.push('/admin/blog') // Redirige al listado de artículos
            } else {
                const errorData = await response.json()
                alert(`Error al actualizar el artículo: ${errorData.message}`)
            }
        } catch (error) {
            console.error('Error al actualizar el artículo:', error)
            alert('Error al actualizar el artículo. Por favor, intenta nuevamente.')
        }
    }

    return (
        <AdminLayout>
            <div className="container mx-auto py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-[#1A1341]">Editar Artículo</h1>
                    <Button variant="outline" size="sm" onClick={() => router.push('/admin/blog')}>
                        ← Volver al listado
                    </Button>
                </div>

                {isLoading ? (
                    <p>Cargando...</p>
                ) : (
                    articleData && <BlogArticleForm initialData={articleData} onSubmit={handleSubmit} />
                )}
            </div>
        </AdminLayout>
    )
}
