/**
 * PostHeroLayout.tsx
 * 
 * Layout wrapper SOLO para fondo parallax de LHC Legal & Consulting.
 * Proporciona únicamente la Dama de Justicia como fondo con overlay azul vibrante.
 * Las secciones hijas gestionan su propio ancho y espaciado - SIN LIMITACIONES.
 */

'use client';

import React from 'react';
import ParallaxBackground from '@/components/ui/ParallaxBackground';

interface PostHeroLayoutProps {
    /** Contenido de las secciones que se renderizan sobre el fondo parallax */
    children: React.ReactNode;
    /** Clase CSS adicional para customización */
    className?: string;
}

const PostHeroLayout: React.FC<PostHeroLayoutProps> = ({
    children,
    className = ''
}) => {
    return (
        <div
            className={`relative w-full -mt-12 sm:-mt-60 ${className}`}
            aria-label="Servicios de LHC Legal & Consulting"
        >
            {/* SOLO fondo parallax - Dama de Justicia suave como te gusta */}
            <ParallaxBackground
                imageUrl="https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749465198/statue_of_Lady_Justice_dxcnac.webp"
                opacity={0.4}
                overlayColor="#1b2f4b"
                overlayOpacity={0.05}
                parallaxSpeed={0.3}
                disableOnMobile={false}
                className="absolute inset-0 w-full h-full z-[-50]"
            />

            {/* Contenido - 100% ancho sin limitaciones */}
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
                        }
                    })
                }}
            />
        </div>
    );
};

export default PostHeroLayout;