import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    title: {
        template: '%s | Blog de Inversión Inmobiliaria | Boost A Project',
        default: 'Blog de Inversión Inmobiliaria | Boost A Project'
    },
    description: 'Descubre insights, tendencias y estrategias de inversión inmobiliaria con Boost A Project.',
    openGraph: {
        title: 'Blog de Inversión Inmobiliaria | Boost A Project',
        description: 'Insights y estrategias de inversión inmobiliaria',
        type: 'website',
        images: ['/og-blog-image.jpg'] // Añade una imagen de Open Graph para el blog
    },
    keywords: [
        'inversión inmobiliaria',
        'estrategias de inversión',
        'bienes raíces',
        'tendencias inmobiliarias',
        'blog de inversión'
    ]
};

export default function BlogLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="blog-layout">
            {children}
        </div>
    );
}