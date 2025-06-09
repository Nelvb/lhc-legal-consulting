/**
 * page.tsx
 * 
 * Página principal de LHC Legal & Consulting.
 * Home con estructura limpia, secciones optimizadas para SEO y conversión.
 * Layout profesional con separación clara entre secciones.
 */

import React from "react";
import type { Metadata } from "next";
import HeroSection from "@/components/Home/HeroSection";
import PostHeroLayout from "@/components/Home/PostHeroLayout";
import AreasGrid from "@/components/Home/AreasGrid";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
// import BasicContact from "@/components/Home/BasicContact";
// import CTASection from "@/components/Home/CTASection";

// Metadata REAL para SEO
export const metadata: Metadata = {
  title: "LHC Legal & Consulting | Asesoría Legal Profesional en España",
  description: "Asesoría legal moderna especializada en derecho laboral, herencias, divorcios, extranjería y más. Primera consulta gratuita.",
  keywords: [
    "abogado españa",
    "asesoría legal",
    "consulta legal gratuita",
    "derecho laboral",
    "herencias",
    "divorcios",
    "extranjería",
    "derecho penal",
    "LHC Legal"
  ].join(", "),
  authors: [{ name: "LHC Legal & Consulting" }],
  creator: "LHC Legal & Consulting",
  publisher: "LHC Legal & Consulting",
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
};

/**
 * Componente principal de la página home
 * Estructura optimizada para conversión y SEO con layout profesional
 */
export default function Home() {
  return (
    <main
      className="min-h-screen"
      role="main"
      aria-label="Página principal de LHC Legal & Consulting"
    >
      {/* Hero Section con carousel de áreas legales */}
      <HeroSection />

      {/* Grid de las 8 áreas legales principales - Sección independiente */}
      <AreasGrid />

      {/* Secciones con parallax - Layout separado */}
      <PostHeroLayout>
        {/* Por qué elegir LHC - 4 diferenciadores */}
        <WhyChooseUs />

        {/* Contacto básico con CTAs principales */}
        {/* Comentado hasta crear el componente */}
        {/* <BasicContact /> */}

        {/* Sección de CTAs adicionales (FAQ, Blog, Nosotros) */}
        {/* Comentado hasta crear el componente */}
        {/* <CTASection /> */}

      </PostHeroLayout>

      {/* Datos estructurados REALES para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LegalService",
            "name": "LHC Legal & Consulting",
            "description": "Asesoría legal profesional moderna especializada en múltiples áreas del derecho en España.",
            "serviceType": [
              "Derecho Laboral",
              "Derecho Civil",
              "Derecho de Extranjería",
              "Derecho Penal",
              "Derecho Administrativo",
              "Derecho Bancario",
              "Derecho Mercantil",
              "Derecho Fiscal"
            ],
            "areaServed": {
              "@type": "Country",
              "name": "España"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Servicios de Asesoría Legal",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Primera Consulta Gratuita",
                    "description": "Consulta legal gratuita sin compromiso"
                  },
                  "price": "0",
                  "priceCurrency": "EUR"
                }
              ]
            }
          })
        }}
      />
    </main>
  );
}