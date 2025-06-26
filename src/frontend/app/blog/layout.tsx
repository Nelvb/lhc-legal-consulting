import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    title: {
        template: '%s | Blog Jurídico | LHC Legal & Consulting',
        default: 'Blog Jurídico | LHC Legal & Consulting'
    },
    description: 'Actualidad jurídica 2025: nueva ley de vivienda, reforma del código penal, extranjería, despidos, herencias digitales y más. Asesoramiento legal profesional.',
    openGraph: {
        title: 'Blog Jurídico | LHC Legal & Consulting',
        description: 'Actualidad jurídica y cambios legales 2025. Asesoramiento legal profesional en Madrid.',
        type: 'website',
        images: ['/og-blog-image.jpg']
    },
    keywords: [
        'nueva ley de vivienda 2025',
        'reforma código penal 2025',
        'ley extranjería actualizada',
        'despidos reforma laboral',
        'pensiones divorcio 2025',
        'GDPR sanciones cookies',
        'herencias digitales criptomonedas',
        'ayudas autónomos 2025',
        'recurrir multas tráfico',
        'ley antifraude obligaciones',
        'contratos bancarios abusivos',
        'custodia compartida criterios',
        'abogados madrid',
        'asesoramiento legal',
        'actualidad jurídica',
        'cambios legales 2025',
        'blog jurídico'
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