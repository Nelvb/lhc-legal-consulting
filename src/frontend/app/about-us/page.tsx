/**
 * page.tsx - About Us
 *
 * Página principal "Sobre Nosotros" para LHC Legal & Consulting.
 * Arquitectura modular con componentes separados para mejor mantenibilidad.
 * Incluye metadata SEO optimizada y estructura JSON-LD para search engines.
 * Componentes organizados en flujo lógico: Hero → Quiénes somos → Equipo → Proceso → Diferenciadores → CTA.
 */

import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import AboutWhoWeAre from "@/components/about/AboutWhoWeAre";
import AboutTeam from "@/components/about/AboutTeam";
import AboutPhilosophy from "@/components/about/AboutPhilosophy";
import AboutDifference from "@/components/about/AboutDifference";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata: Metadata = {
    title: "Sobre Nosotros | LHC Legal & Consulting - Equipo de Abogados Especialistas",
    description:
        "Conoce a nuestro equipo de abogados especialistas en LHC Legal & Consulting. Detrás de cada caso, un compromiso personal. Experiencia, transparencia y resultados garantizados.",
    keywords: "equipo legal, abogados especialistas, LHC Legal, sobre nosotros, compromiso personal, asesoría legal Madrid, abogados Madrid",
    authors: [{ name: "LHC Legal & Consulting" }],
    creator: "LHC Legal & Consulting",
    publisher: "LHC Legal & Consulting",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        title: "Sobre Nosotros | LHC Legal & Consulting - Equipo Especializado",
        description: "Detrás de cada caso, un compromiso personal. Conoce nuestro equipo de abogados especialistas y nuestra metodología de trabajo.",
        type: "website",
        locale: "es_ES",
        url: "https://lhclegal.es/about-us",
        siteName: "LHC Legal & Consulting",
        images: [
            {
                url: "https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749825385/oficina-balanza_savyyd.webp",
                width: 1200,
                height: 800,
                alt: "Balanza de la justicia moderna - LHC Legal & Consulting",
                type: "image/webp",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Sobre Nosotros | LHC Legal & Consulting",
        description: "Conoce a nuestro equipo de abogados especialistas. Compromiso personal en cada caso.",
        images: ["https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749825385/oficina-balanza_savyyd.webp"],
        creator: "@LHCLegal",
        site: "@LHCLegal",
    },
    verification: {
        google: "your-google-verification-code",
        other: {
            "msvalidate.01": "your-bing-verification-code",
        },
    },
    alternates: {
        canonical: "https://lhclegal.es/about-us",
        languages: {
            "es-ES": "https://lhclegal.es/about-us",
            "en-US": "https://lhclegal.es/en/about-us",
        },
    },
    category: "Legal Services",
};

export default function AboutUsPage() {
    // Schema markup para SEO estructurado
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "LegalService",
        "name": "LHC Legal & Consulting",
        "description": "Despacho de abogados especializado en múltiples áreas del derecho con enfoque moderno y personalizado",
        "url": "https://lhclegal.es",
        "logo": "https://lhclegal.es/logo.png",
        "image": "https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749825385/oficina-balanza_savyyd.webp",
        "telephone": "+34691818071",
        "email": "contacto@lhclegal.es",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "ES",
            "addressRegion": "Madrid",
            "addressLocality": "Madrid"
        },
        "areaServed": {
            "@type": "Country",
            "name": "España"
        },
        "serviceType": [
            "Derecho Laboral",
            "Herencias y Sucesiones", 
            "Derecho de Familia",
            "Derecho Inmobiliario",
            "Derecho Penal",
            "Derecho de Extranjería",
            "Asesoría Empresarial",
            "Derecho Administrativo"
        ],
        "priceRange": "€€",
        "currenciesAccepted": "EUR",
        "paymentAccepted": "Cash, Credit Card, Bank Transfer",
        "foundingDate": "2025",
        "founder": {
            "@type": "Person",
            "name": "LHC Legal Team"
        },
        "numberOfEmployees": {
            "@type": "QuantitativeValue",
            "value": "5-15"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Servicios Legales LHC",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Consulta Legal Gratuita",
                        "description": "Primera consulta completamente gratuita"
                    },
                    "price": "0",
                    "priceCurrency": "EUR"
                },
                {
                    "@type": "Offer", 
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Asesoramiento Legal Especializado",
                        "description": "Representación legal profesional en múltiples áreas"
                    }
                }
            ]
        },
        "sameAs": [
            "https://www.linkedin.com/company/lhc-legal-consulting",
            "https://twitter.com/LHCLegal",
            "https://www.facebook.com/LHCLegalConsulting"
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": "50+"
        }
    };

    const webPageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Sobre Nosotros - LHC Legal & Consulting",
        "description": "Conoce a nuestro equipo de abogados especialistas y nuestra metodología de trabajo",
        "url": "https://lhclegal.es/about-us",
        "mainEntity": organizationSchema,
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Inicio",
                    "item": "https://lhclegal.es"
                },
                {
                    "@type": "ListItem", 
                    "position": 2,
                    "name": "Sobre Nosotros",
                    "item": "https://lhclegal.es/about-us"
                }
            ]
        },
        "isPartOf": {
            "@type": "WebSite",
            "name": "LHC Legal & Consulting",
            "url": "https://lhclegal.es"
        },
        "inLanguage": "es-ES",
        "datePublished": "2025-01-01",
        "dateModified": new Date().toISOString(),
        "author": organizationSchema,
        "publisher": organizationSchema
    };

    return (
        <>
            {/* Schema markup para SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([organizationSchema, webPageSchema])
                }}
            />

            <main className="w-full relative min-h-screen">
                {/* Hero Section */}
                <AboutHero />

                {/* Quiénes somos */}
                <AboutWhoWeAre />

                {/* Nuestro Equipo */}
                <AboutTeam />

                {/* Cómo trabajamos */}
                <AboutPhilosophy />

                {/* Por qué somos diferentes */}
                <AboutDifference />

                {/* Call to Action Final */}
                <AboutCTA />
            </main>
        </>
    );
}