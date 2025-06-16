/**
 * /areas/[slug]/page.tsx
 *
 * Template dinámico para páginas de áreas legales de LHC Legal & Consulting.
 * Layout profesional con sidebar de navegación y contenido principal del área.
 * Hero personalizado con gradiente y color específico del área legal.
 * Ahora usa el servicio legalAreasService para cargar datos desde JSON.
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
  // Buscar área en LEGAL_SERVICES para info básica
  const area = LEGAL_SERVICES.find(service => service.id === params.slug);
  
  // Cargar datos completos desde JSON
  const { success, data: areaData } = await getLegalAreaData(params.slug);

  if (!area || !success || !areaData) {
    return {
      title: 'Área Legal No Encontrada | LHC Legal & Consulting',
      description: 'La página solicitada no existe o no está disponible.',
    };
  }

  // Usar datos SEO del JSON si están disponibles
  const seoData = areaData.seo;

  return {
    title: seoData?.metaTitle || `${areaData.title} | LHC Legal & Consulting - Abogados Especialistas`,
    description: seoData?.metaDescription || `${areaData.heroDescription} Consulta gratuita con nuestros especialistas en ${areaData.title.toLowerCase()}.`,
    keywords: seoData?.keywords?.join(', ') || `${areaData.title.toLowerCase()}, abogados ${areaData.title.toLowerCase()}, ${area.description.toLowerCase()}, LHC Legal`,
    openGraph: {
      title: seoData?.metaTitle || `${areaData.title} | LHC Legal & Consulting`,
      description: seoData?.metaDescription || areaData.heroDescription,
      type: 'website',
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
  return LEGAL_SERVICES.map((area) => ({
    slug: area.id,
  }));
}

export default async function LegalAreaPage({ params }: LegalAreaPageProps) {
  // Buscar el área en los datos de configuración (colores, etc.)
  const area = LEGAL_SERVICES.find(service => service.id === params.slug);
  
  // Cargar datos completos desde JSON usando el servicio
  const { success, data: areaData, error } = await getLegalAreaData(params.slug);

  // Si no existe el área o falla la carga, mostrar 404
  if (!area || !success || !areaData) {
    console.error(`Error cargando área ${params.slug}:`, error);
    notFound();
  }

  // Schema markup para SEO usando datos del JSON
  const areaSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": `${areaData.title} - LHC Legal & Consulting`,
    "description": areaData.heroDescription,
    "provider": {
      "@type": "LegalService",
      "name": "LHC Legal & Consulting",
      "url": "https://lhclegal.es"
    },
    "areaServed": "Madrid, España",
    "serviceType": areaData.title,
    "offers": areaData.seo?.structuredData?.offers || [
      {
        "@type": "Offer",
        "name": "Consulta Legal Gratuita",
        "description": "Primera consulta completamente gratuita",
        "price": "0",
        "priceCurrency": "EUR"
      }
    ],
    // Agregar subtemas como servicios adicionales
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Servicios de ${areaData.title}`,
      "itemListElement": areaData.subtopics?.map((subtopic, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": subtopic.title,
          "description": subtopic.description
        },
        "position": index + 1
      })) || []
    }
  };

  return (
    <>
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(areaSchema)
        }}
      />

      <main className="min-h-screen bg-white">
        {/* Hero Section del Área */}
        <section className="relative overflow-hidden">
          {/* Fondo gradiente con color específico del área */}
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, #1b2f4b 0%, ${area.color} 50%, #1b2f4b 100%)`
            }}
          />
          
          <div className="relative z-10 py-20 lg:py-32">
            <div className="container mx-auto px-6 lg:px-8 text-center">
              <div className="max-w-4xl mx-auto">
                <h1
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: '800',
                    letterSpacing: '-0.02em',
                    textShadow: '0 4px 20px rgba(0,0,0,0.3)'
                  }}
                >
                  {areaData.title.split(' ')[0]}{" "}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1DA1F2] via-[#60A5FA] to-[#1DA1F2] mt-4 animate-pulse pb-2">
                    {areaData.title.split(' ').slice(1).join(' ')}
                  </span>
                </h1>

                <div className="w-24 h-1 bg-gradient-to-r from-[#1DA1F2] to-[#60A5FA] mx-auto mb-8 rounded-full" />

                <p className="text-xl sm:text-2xl lg:text-3xl text-white/95 leading-relaxed font-light mb-8">
                  {areaData.heroDescription}
                </p>

                {/* Botones CTA desde datos JSON */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    className="bg-white text-[#1b2f4b] font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
                    onClick={() => {
                      if (areaData.cta?.primaryButton?.action === 'contact') {
                        window.location.href = '/contacto';
                      } else if (areaData.cta?.primaryButton?.action === 'phone') {
                        window.location.href = `tel:${areaData.cta.primaryButton.value}`;
                      }
                    }}
                  >
                    {areaData.cta?.primaryButton?.text || 'Consulta Gratuita'}
                  </button>
                  
                  {areaData.cta?.secondaryButton && (
                    <button 
                      className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-[#1b2f4b] transition-all duration-300"
                      onClick={() => {
                        if (areaData.cta.secondaryButton?.action === 'phone') {
                          window.location.href = `tel:${areaData.cta.secondaryButton.value}`;
                        } else if (areaData.cta.secondaryButton?.action === 'whatsapp') {
                          window.open(`https://wa.me/${areaData.cta.secondaryButton.value}`, '_blank');
                        }
                      }}
                    >
                      {areaData.cta.secondaryButton.text}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Layout Principal: Sidebar + Contenido */}
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar - Solo visible en desktop */}
          <div className="hidden lg:block lg:w-1/4 bg-white shadow-lg">
            <div className="sticky top-0">
              <LegalAreasSidebar />
            </div>
          </div>

          {/* Contenido Principal */}
          <div className="flex-1 lg:w-3/4">
            <LegalAreaContent 
              areaData={areaData}
              areaConfig={{
                color: area.color,
                hoverColor: area.hoverColor,
                slug: area.id
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