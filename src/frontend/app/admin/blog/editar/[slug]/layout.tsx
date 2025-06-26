// src/frontend/app/admin/blog/editar/[slug]/layout.tsx

// Metadata para SEO
export const metadata = {
    title: 'Editar Artículo | LHC Legal & Consulting',
    description: 'Editor para modificar artículos existentes en el blog legal.',
    openGraph: {
        title: 'Editar Artículo | LHC Legal & Consulting',
        description: 'Editor para modificar artículos existentes en el blog legal',
        type: 'website',
    },
}

// No necesitas 'use client' aquí, ya que 'metadata' es del lado servidor
import { ReactNode } from 'react'

interface EditArticleLayoutProps {
    children: ReactNode
}

export default function EditArticleLayout({ children }: EditArticleLayoutProps) {
    return <>{children}</>
}
