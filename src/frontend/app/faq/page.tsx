/**
 * page.tsx - Vista principal de Preguntas Frecuentes (/faq)
 *
 * Página pública que agrupa todas las preguntas frecuentes de LHC Legal & Consulting.
 * Server Component limpio que importa datos desde combinedFaq.ts y renderiza componentes modulares.
 * Arquitectura optimizada para SEO y performance siguiendo las mejores prácticas de Next.js 13+.
 */

import { Metadata } from 'next';
import FaqHero from '@/components/faq/FaqHero';
import FaqSearchSection from '@/components/faq/FaqSearchSection';
import { allFaqs } from '@/lib/data/combinedFaq';

// Metadata SEO optimizada
export const metadata: Metadata = {
    title: 'Preguntas Frecuentes - LHC Legal & Consulting | Dudas Legales Resueltas',
    description: 'Encuentra respuestas inmediatas a tus dudas legales. Más de 190 preguntas organizadas por área: derecho civil, penal, laboral, administrativo y más. Consulta gratuita.',
    keywords: [
        'preguntas frecuentes legales',
        'dudas jurídicas',
        'consulta legal gratuita',
        'abogados madrid',
        'LHC Legal',
        'derecho civil preguntas',
        'derecho laboral FAQ',
        'derecho penal consultas',
        'asesoría legal'
    ],
    openGraph: {
        title: 'Preguntas Frecuentes - LHC Legal & Consulting',
        description: 'Más de 190 preguntas legales resueltas por nuestros especialistas. Encuentra respuestas inmediatas a tus dudas jurídicas.',
        type: 'website',
        locale: 'es_ES',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: 'https://lhclegal.es/faq',
    },
};

/**
 * Página principal FAQ
 * Usa datos estáticos compilados en build time para mejor performance
 */
const FaqPage = () => {
    return (
        <main className="min-h-screen">
            <FaqHero />
            <FaqSearchSection questions={allFaqs} />
        </main>
    );
};

export default FaqPage;