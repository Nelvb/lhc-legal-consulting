/**
 * /areas/[slug]/[subtopic]/page.tsx
 *
 * Página individual para servicios específicos de cada área legal.
 * Mantiene la misma estructura que las páginas de área (sidebar + contenido).
 * SEO optimizado con metadata dinámica específica para cada subtopic.
 * Usa legalSubtopicsService para cargar datos del subtopic específico.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalAreaHero from "@/components/areas/LegalAreaHero";
import LegalAreasSidebar from "@/components/areas/LegalAreasSidebar";
import LegalSubtopicContent from "@/components/areas/LegalSubtopicContent";
import { LEGAL_SERVICES } from "@/app/data/legalServices";
import { getLegalSubtopicData, getAllSubtopicRoutes } from "@/lib/services/legalSubtopicsService";

interface LegalSubtopicPageProps {
    params: {
        slug: string;
        subtopic: string;
    };
}

// Generar metadata dinámica para SEO
export async function generateMetadata({ params }: LegalSubtopicPageProps): Promise<Metadata> {
    // Cargar datos del subtopic
    const { success, data: subtopicData, areaData } = await getLegalSubtopicData(
        params.slug, 
        params.subtopic
    );

    // Buscar configuración del área para colores/branding
    const areaConfig = LEGAL_SERVICES.find(service => service.id === params.slug);

    if (!success || !subtopicData || !areaData || !areaConfig) {
        return {
            title: 'Servicio No Encontrado | LHC Legal & Consulting',
            description: 'El servicio solicitado no existe o no está disponible.',
        };
    }

    // Construir título y descripción SEO
    const pageTitle = `${subtopicData.title} ${areaData.title} Madrid | LHC Legal & Consulting`;
    const pageDescription = `${subtopicData.description} Especialistas en ${subtopicData.title.toLowerCase()} en Madrid. ${subtopicData.extendedIntroduction ? subtopicData.extendedIntroduction.substring(0, 120) + '...' : 'Consulta gratuita.'}`;

    // URL canónica
    const canonicalUrl = `https://lhclegal.es/areas/${params.slug}/${params.subtopic}`;

    return {
        title: pageTitle,
        description: pageDescription,
        keywords: [
            subtopicData.title.toLowerCase(),
            `${subtopicData.title.toLowerCase()} madrid`,
            `abogado ${subtopicData.title.toLowerCase()}`,
            areaData.title.toLowerCase(),
            ...areaData.seo.keywords.slice(0, 5) // Algunos keywords del área padre
        ].join(', '),
        openGraph: {
            title: pageTitle,
            description: pageDescription,
            type: 'website',
            url: canonicalUrl,
            images: areaData.seo.ogImage ? [{ url: areaData.seo.ogImage }] : undefined,
        },
        alternates: {
            canonical: canonicalUrl,
        },
        robots: {
            index: true,
            follow: true,
        }
    };
}

// Generar rutas estáticas para todos los subtopics
export async function generateStaticParams() {
    try {
        const routes = await getAllSubtopicRoutes();
        
        return routes.map((route) => ({
            slug: route.areaSlug,
            subtopic: route.subtopicSlug,
        }));
    } catch (error) {
        console.warn('Error generando rutas estáticas para subtopics:', error);
        return [];
    }
}

export default async function LegalSubtopicPage({ params }: LegalSubtopicPageProps) {
    // Cargar datos del subtopic específico
    const { success, data: subtopicData, areaData, error } = await getLegalSubtopicData(
        params.slug, 
        params.subtopic
    );

    // Buscar configuración del área para colores y branding
    const areaConfig = LEGAL_SERVICES.find(service => service.id === params.slug);

    // Si no existe el subtopic o falla la carga, mostrar 404
    if (!success || !subtopicData || !areaData || !areaConfig) {
        console.error(`Error cargando subtopic ${params.slug}/${params.subtopic}:`, error);
        notFound();
    }

    // Schema markup específico para el subtopic
    const subtopicSchema = {
        "@context": "https://schema.org",
        "@type": "LegalService",
        "name": `${subtopicData.title} - LHC Legal & Consulting`,
        "description": subtopicData.description,
        "provider": {
            "@type": "LegalService",
            "name": "LHC Legal & Consulting",
            "url": "https://lhclegal.es",
            "telephone": "+34691818071",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Madrid",
                "addressCountry": "ES"
            }
        },
        "areaServed": "Madrid, España",
        "serviceType": subtopicData.title,
        "category": areaData.title,
        "offers": {
            "@type": "Offer",
            "name": "Consulta Legal Gratuita",
            "description": `Primera consulta gratuita para ${subtopicData.title.toLowerCase()}`,
            "price": "0",
            "priceCurrency": "EUR"
        },
        // Incluir puntos clave como características del servicio
        "additionalProperty": subtopicData.keyPoints?.map((point, index) => ({
            "@type": "PropertyValue",
            "name": `Característica ${index + 1}`,
            "value": point
        })) || []
    };

    // CTA específico del subtopic o fallback al del área
    const subtopicCTA = {
        title: `¿Necesitas ayuda con ${subtopicData.title.toLowerCase()}?`,
        description: `Nuestros especialistas en ${subtopicData.title.toLowerCase()} te ofrecerán la mejor solución para tu caso. Primera consulta completamente gratuita.`,
        primaryButton: {
            text: "Consulta Gratuita",
            action: "contact" as const
        }
    };

    return (
        <>
            {/* Schema markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(subtopicSchema)
                }}
            />

            <main className="min-h-screen bg-white">
                {/* Hero Section del Subtopic */}
                <LegalAreaHero
                    areaTitle={subtopicData.title}
                    areaDescription={subtopicData.description}
                    areaColor={areaConfig.color}
                    cta={subtopicCTA}
                />

                {/* Layout Principal: Sidebar + Contenido */}
                <div className="flex flex-col lg:flex-row">
                    {/* Sidebar - Solo visible en desktop */}
                    <div className="hidden lg:block lg:w-1/4 bg-white shadow-lg">
                        <LegalAreasSidebar />
                    </div>

                    {/* Contenido Principal del Subtopic */}
                    <div className="flex-1 lg:w-3/4">
                        <LegalSubtopicContent
                            subtopicData={subtopicData}
                            areaConfig={{
                                color: areaConfig.color,
                                hoverColor: areaConfig.hoverColor,
                                slug: areaConfig.id
                            }}
                        />
                    </div>
                </div>

                {/* Menú móvil de áreas legales */}
                <div className="lg:hidden bg-gray-50 border-t border-gray-200">
                    <div className="container mx-auto px-4 py-4">
                        <details className="group">
                            <summary className="flex items-center justify-between cursor-pointer text-[#1b2f4b] font-semibold">
                                <span>Otras Áreas Legales</span>
                                <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <div className="mt-4">
                                <LegalAreasSidebar className="shadow-none" />
                            </div>
                        </details>
                    </div>
                </div>
            </main>
        </>
    );
}