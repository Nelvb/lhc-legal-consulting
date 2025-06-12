/**
 * PostHeroLayout.tsx
 * 
 * Layout wrapper profesional para fondo parallax de LHC Legal & Consulting.
 * Proporciona la Dama de Justicia como fondo con overlay azul vibrante.
 * Soporta sección de título sobre parallax y contenido adicional.
 * Arquitectura escalable y separación de responsabilidades.
 */

'use client';

import React from 'react';
import ParallaxBackground from '@/components/ui/ParallaxBackground';

interface PostHeroLayoutProps {
    /** Sección de título que se renderiza SOBRE el parallax */
    titleSection?: React.ReactNode;
    /** Contenido de las secciones que se renderizan sobre el fondo parallax */
    children: React.ReactNode;
    /** Clase CSS adicional para customización */
    className?: string;
    /** Configuración personalizada del parallax */
    parallaxConfig?: {
        imageUrl?: string;
        opacity?: number;
        overlayColor?: string;
        overlayOpacity?: number;
        parallaxSpeed?: number;
    };
}

const PostHeroLayout: React.FC<PostHeroLayoutProps> = ({
    titleSection,
    children,
    className = '',
    parallaxConfig = {
        imageUrl: "https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749470257/Flux_Dev_statue_of_Lady_Justice_standing_proudly_against_a_ser_1_1_jpb0tn.webp",
        opacity: 0.4,
        overlayColor: "#1b2f4b",
        overlayOpacity: 0.05,
        parallaxSpeed: 0.3,
    }
}) => {
    return (
        <div
            className={`relative w-full -mt-12 sm:-mt-60 ${className}`}
            aria-label="Servicios de LHC Legal & Consulting"
        >
            {/* Fondo parallax - Dama de Justicia */}
            <ParallaxBackground
                imageUrl={parallaxConfig.imageUrl}
                opacity={parallaxConfig.opacity}
                overlayColor={parallaxConfig.overlayColor}
                overlayOpacity={parallaxConfig.overlayOpacity}
                parallaxSpeed={parallaxConfig.parallaxSpeed}
                className="absolute inset-0 w-full h-full z-[-50]"
            >
                {/* Título DENTRO del parallax - renderizado como children */}
                {titleSection}
            </ParallaxBackground>

            {/* Contenido adicional FUERA del parallax */}
            <div className="relative z-10 w-full">
                {children}
            </div>

            {/* Datos estructurados para SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPageElement",
                        "name": "Servicios Legales LHC",
                        "description": "Servicios profesionales de asesoría legal con fondo parallax de la Dama de Justicia",
                        "provider": {
                            "@type": "LegalService",
                            "name": "LHC Legal & Consulting"
                        },
                        "mainContentOfPage": titleSection ? true : false
                    })
                }}
            />
        </div>
    );
};

export default PostHeroLayout;