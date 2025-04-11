// src/frontend/app/admin/blog/editar/[slug]/layout.tsx

// Metadata para SEO
export const metadata = {
    title: 'Editar Artículo | Boost A Project',
    description: 'Editor para modificar artículos existentes en el blog.',
    robots: 'noindex, nofollow', // No indexar esta página
    openGraph: {
        title: 'Editar Artículo | Boost A Project',
        description: 'Editor para modificar artículos existentes en el blog',
        type: 'website',
    },
}

// No necesitas 'use client' aquí, ya que 'metadata' es del lado servidor
import { ReactNode } from 'react'
import AdminLayout from '@/components/admin/layout/AdminLayout'

interface EditArticleLayoutProps {
    children: ReactNode
}

export default function EditArticleLayout({ children }: EditArticleLayoutProps) {
    return <AdminLayout>{children}</AdminLayout>
}
