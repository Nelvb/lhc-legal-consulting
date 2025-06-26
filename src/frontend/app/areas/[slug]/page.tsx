/**
 * /areas/[slug]/page.tsx
 *
 * Template dinámico para páginas de áreas legales de LHC Legal & Consulting.
 * Layout profesional con sidebar de navegación y contenido principal del área.
 * Hero extraído a componente LegalAreaHero para mejor modularidad.
 * Usa el servicio legalAreasService para cargar datos desde JSON.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalAreaHero from "@/components/areas/LegalAreaHero";
import LegalAreasSidebar from "@/components/areas/LegalAreasSidebar";
import LegalAreaContent from "@/components/areas/LegalAreaContent";
import { LEGAL_SERVICES } from "@/app/data/legalServices";
import { getLegalAreaData } from "@/lib/services/legalAreasService";

interface LegalAreaPageProps {
    params: {
        slug: string;
    };
}

// Generar metadata dinámica
export async function generateMetadata({ params }: LegalAreaPageProps): Promise<Metadata> {
    const area = LEGAL_SERVICES.find(service => service.id === params.slug);
    const { success, data: areaData } = await getLegalAreaData(params.slug);

    if (!area || !success || !areaData) {
        return {
            title: "Área Legal No Encontrada | LHC Legal & Consulting",
            description: "La página solicitada no existe o no está disponible.",
        };
    }

    const seoData = areaData.seo;

    return {
        title: seoData?.metaTitle || `${areaData.title} | LHC Legal & Consulting - Abogados Especialistas`,
        description:
            seoData?.metaDescription || `${areaData.heroDescription} Consulta gratuita con nuestros especialistas en ${areaData.title.toLowerCase()}.`,
        keywords:
            seoData?.keywords?.join(", ") || `${areaData.title.toLowerCase()}, abogados ${areaData.title.toLowerCase()}, ${area.description.toLowerCase()}, LHC Legal`,
        openGraph: {
            title: seoData?.metaTitle || `${areaData.title} | LHC Legal & Consulting`,
            description: seoData?.metaDescription || areaData.heroDescription,
            type: "website",
            url: seoData?.canonicalUrl || `https://lhclegal.es/areas/${params.slug}`,
            images: seoData?.ogImage ? [{ url: seoData.ogImage }] : undefined,
        },
        alternates: {
            canonical: seoData?.canonicalUrl || `https://lhclegal.es/areas/${params.slug}`,
        },
    };
}

// Generar rutas estáticas para las áreas legales
export async function generateStaticParams() {
    return LEGAL_SERVICES.map(area => ({
        slug: area.id,
    }));
}

export default async function LegalAreaPage({ params }: LegalAreaPageProps) {
    const area = LEGAL_SERVICES.find(service => service.id === params.slug);
    const { success, data: areaData, error } = await getLegalAreaData(params.slug);

    if (!area || !success || !areaData) {
        console.error(`Error cargando área ${params.slug}:`, error);
        notFound();
    }

    // Schema markup para SEO
    const areaSchema = {
        "@context": "https://schema.org",
        "@type": "LegalService",
        name: `${areaData.title} - LHC Legal & Consulting`,
        description: areaData.heroDescription,
        provider: {
            "@type": "LegalService",
            name: "LHC Legal & Consulting",
            url: "https://lhclegal.es",
        },
        areaServed: "Madrid, España",
        serviceType: areaData.title,
        offers: areaData.seo?.structuredData?.offers || [
            {
                "@type": "Offer",
                name: "Consulta Legal Gratuita",
                description: "Primera consulta completamente gratuita",
                price: "0",
                priceCurrency: "EUR",
            },
        ],
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `Servicios de ${areaData.title}`,
            itemListElement:
                areaData.subtopics?.map((subtopic, index) => ({
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: subtopic.title,
                        description: subtopic.description,
                    },
                    position: index + 1,
                })) || [],
        },
    };

    // Garantizar que cta tiene primaryButton (tipo seguro)
    const safeCTA =
        areaData.cta && areaData.cta.primaryButton
            ? areaData.cta
            : {
                  primaryButton: {
                      text: "Consulta Gratuita",
                      action: "contact" as const,
                  },
              };

    return (
        <>
            {/* Schema markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(areaSchema),
                }}
            />

            <main className="min-h-screen bg-white">
                {/* Hero Section del Área */}
                <LegalAreaHero
                    areaTitle={areaData.title}
                    areaDescription={areaData.heroDescription}
                    areaColor={area.color}
                    cta={safeCTA}
                />

                {/* Layout Principal: Sidebar + Contenido */}
                <div className="flex flex-col lg:flex-row">
                    {/* Sidebar - Solo visible en desktop */}
                    <div className="hidden lg:block lg:w-1/4 bg-white shadow-lg">
                        <LegalAreasSidebar />
                    </div>

                    {/* Contenido Principal */}
                    <div className="flex-1 lg:w-3/4">
                        <LegalAreaContent
                            areaData={areaData}
                            areaConfig={{
                                color: area.color,
                                hoverColor: area.hoverColor,
                                slug: area.id,
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
                                <svg
                                    className="w-5 h-5 transition-transform group-open:rotate-180"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
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
