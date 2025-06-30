/**
 * Contact Layout - Metadata SEO optimizado
 *
 * Layout específico para la página de contacto con metadata profesional
 * optimizado para búsquedas locales y consultas legales gratuitas.
 * Incluye Open Graph, Twitter Cards y structured data para máximo SEO.
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contacto - Consulta Legal Gratuita | LHC Legal & Consulting',
    description: 'Contacta con nuestro equipo de abogados especialistas en Madrid, Las Rozas, Majadahonda, Pozuelo, Torrelodones y Boadilla. Primera consulta completamente gratuita. Respuesta garantizada en 24h.',
    keywords: [
        'contacto abogado madrid',
        'consulta legal gratuita',
        'asesoramiento jurídico madrid',
        'abogados madrid contacto',
        'consulta abogado gratis',
        'LHC Legal Consulting contacto',
        'despacho abogados madrid',
        'asesoría legal telefono',
        'consulta legal online',
        'primera consulta gratis abogado',
        // Localización específica zona noroeste Madrid
        'abogado Las Rozas de Madrid',
        'abogado Majadahonda',
        'abogado Pozuelo de Alarcón',
        'abogado Torrelodones',
        'abogado Boadilla del Monte',
        'despacho abogados zona oeste madrid',
        'asesoría legal Las Rozas',
        'consulta legal Majadahonda',
        'abogados zona noroeste madrid'
    ],
    authors: [{ name: 'LHC Legal & Consulting' }],
    creator: 'LHC Legal & Consulting',
    publisher: 'LHC Legal & Consulting',

    // Open Graph para redes sociales
    openGraph: {
        title: 'Contacto - Consulta Legal Gratuita | LHC Legal & Consulting',
        description: '¿Necesitas asesoramiento legal en Madrid, Las Rozas, Majadahonda, Pozuelo, Torrelodones o Boadilla? Primera consulta completamente gratuita. Respuesta en 24h.',
        url: 'https://lhclegal.es/contact',
        siteName: 'LHC Legal & Consulting',
        locale: 'es_ES',
        type: 'website',
        images: [
            {
                url: '/og-contact.jpg',
                width: 1200,
                height: 630,
                alt: 'Contacto LHC Legal & Consulting - Consulta Legal Gratuita'
            }
        ]
    },

    // Twitter Cards
    twitter: {
        card: 'summary_large_image',
        title: 'Contacto - Consulta Legal Gratuita | LHC Legal & Consulting',
        description: 'Primera consulta completamente gratuita. Respuesta en 24h. Contacta con nuestro equipo de abogados especialistas.',
        images: ['/og-contact.jpg'],
        creator: '@LHCLegal'
    },

    // Configuración de robots
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    // URLs alternativas y canónica
    alternates: {
        canonical: 'https://lhclegal.es/contact',
        languages: {
            'es-ES': 'https://lhclegal.es/contact',
        },
    },

    // Información adicional
    category: 'Legal Services',
    classification: 'Servicios Legales',

    // Metadatos adicionales para SEO local
    other: {
        'geo.region': 'ES-MD',
        'geo.placename': 'Madrid',
        'geo.position': '40.4168;-3.7038',
        'ICBM': '40.4168, -3.7038',
        'business:contact_data:locality': 'Madrid',
        'business:contact_data:region': 'Madrid',
        'business:contact_data:country_name': 'España',
    },
};

interface ContactLayoutProps {
    children: React.ReactNode;
}

/**
 * Layout para la página de contacto
 * Proporciona metadata SEO optimizado y estructura base
 */
export default function ContactLayout({ children }: ContactLayoutProps) {
    return (
        <>
            {/* JSON-LD Structured Data para SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'ContactPage',
                        '@id': 'https://lhclegal.es/contact',
                        mainEntity: {
                            '@type': 'LegalService',
                            '@id': 'https://lhclegal.es/#legalservice',
                            name: 'LHC Legal & Consulting',
                            description: 'Despacho de abogados especialistas en Madrid y zona noroeste: Las Rozas, Majadahonda, Pozuelo, Torrelodones, Boadilla. Primera consulta gratuita.',
                            provider: {
                                '@type': 'LegalService',
                                name: 'LHC Legal & Consulting',
                                url: 'https://lhclegal.es',
                                telephone: '+34-691-81-80-71',
                                email: 'lhclegalandconsulting@gmail.com',
                                address: {
                                    '@type': 'PostalAddress',
                                    addressLocality: 'Madrid',
                                    addressRegion: 'Madrid',
                                    addressCountry: 'ES'
                                },
                                areaServed: [
                                    {
                                        '@type': 'City',
                                        name: 'Madrid',
                                        addressRegion: 'Madrid',
                                        addressCountry: 'ES'
                                    },
                                    {
                                        '@type': 'City',
                                        name: 'Las Rozas de Madrid',
                                        addressRegion: 'Madrid',
                                        addressCountry: 'ES'
                                    },
                                    {
                                        '@type': 'City',
                                        name: 'Majadahonda',
                                        addressRegion: 'Madrid',
                                        addressCountry: 'ES'
                                    },
                                    {
                                        '@type': 'City',
                                        name: 'Pozuelo de Alarcón',
                                        addressRegion: 'Madrid',
                                        addressCountry: 'ES'
                                    },
                                    {
                                        '@type': 'City',
                                        name: 'Torrelodones',
                                        addressRegion: 'Madrid',
                                        addressCountry: 'ES'
                                    },
                                    {
                                        '@type': 'City',
                                        name: 'Boadilla del Monte',
                                        addressRegion: 'Madrid',
                                        addressCountry: 'ES'
                                    }
                                ],
                                serviceType: [
                                    'Derecho Civil',
                                    'Derecho Penal',
                                    'Derecho Laboral',
                                    'Derecho Administrativo',
                                    'Derecho de Extranjería',
                                    'Derecho Fiscal',
                                    'Derecho Mercantil',
                                    'Derecho Bancario'
                                ],
                                offers: {
                                    '@type': 'Offer',
                                    description: 'Primera consulta legal completamente gratuita',
                                    price: '0',
                                    priceCurrency: 'EUR'
                                }
                            },
                            contactPoint: {
                                '@type': 'ContactPoint',
                                telephone: '+34-691-81-80-71',
                                contactType: 'customer service',
                                areaServed: 'ES',
                                availableLanguage: 'Spanish',
                                contactOption: 'TollFree'
                            }
                        },
                        breadcrumb: {
                            '@type': 'BreadcrumbList',
                            itemListElement: [
                                {
                                    '@type': 'ListItem',
                                    position: 1,
                                    name: 'Inicio',
                                    item: 'https://lhclegal.es'
                                },
                                {
                                    '@type': 'ListItem',
                                    position: 2,
                                    name: 'Contacto',
                                    item: 'https://lhclegal.es/contact'
                                }
                            ]
                        }
                    })
                }}
            />
            {children}
        </>
    );
}