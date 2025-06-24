/**
 * ParallaxTitleSection.tsx
 * 
 * Componente de título principal sobre fondo parallax para LHC Legal & Consulting.
 * Diseñado para renderizar sobre la Dama de la Justicia con tipografía elegante
 * y efectos visuales profesionales. Completamente configurable y reutilizable.
 */

'use client';

import React from 'react';
import { useInView } from '@/hooks/useInView';

interface ParallaxTitleSectionProps {
    /** Título principal (primera línea) */
    title?: string;
    /** Título destacado (segunda línea con gradiente) */
    highlightTitle?: string;
    /** Subtítulo descriptivo */
    subtitle?: string;
    /** Texto adicional destacado */
    highlightText?: string;
    /** Espaciado vertical personalizado */
    paddingY?: string;
    /** Clases CSS adicionales */
    className?: string;
    /** Configuración de animaciones */
    animationConfig?: {
        threshold?: number;
        triggerOnce?: boolean;
        rootMargin?: string;
    };
}

const ParallaxTitleSection: React.FC<ParallaxTitleSectionProps> = ({
    title = '¿Por qué elegir',
    highlightTitle = 'LHC Legal & Consulting?',
    subtitle = 'Somos una asesoría legal moderna que combina profesionalidad con cercanía.',
    highlightText = 'Nos comprometemos contigo.',
    paddingY = 'pt-48 lg:pt-64 pb-32 lg:pb-48',
    className = '',
    animationConfig = {
        threshold: 0.1,
        triggerOnce: true,
        rootMargin: '50px'
    }
}) => {
    const { ref, inView } = useInView(animationConfig);

    return (
        <section
            ref={ref}
            className={`text-center ${paddingY} relative z-10 ${className}`}
            aria-labelledby="parallax-title-heading"
        >
            <div className="max-w-6xl mx-auto px-6 pt-[12rem] sm:pt-[3rem] md:pt-96 lg:pt-96">

                {/* Título principal con animación */}
                <div className={`
          transition-all duration-700 transform
          ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        `}>
                    <h2
                        id="parallax-title-heading"
                        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8"
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: '800',
                            letterSpacing: '-0.02em',
                            textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                        }}
                    >
                        {title}
                        <span className="block text-[#20314A] mt-4 pb-2">
                            {highlightTitle}
                        </span>
                    </h2>
                </div>

                {/* Subtítulo con animación retrasada */}
                <div className={`
          transition-all duration-700 transform
          ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        `}
                    style={{
                        transitionDelay: inView ? '200ms' : '0ms'
                    }}
                >
                    <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light mb-6">
                        {subtitle}
                    </p>

                    {/* Texto destacado */}
                    {highlightText && (
                        <p className="font-semibold text-[#1b2f4b] text-lg sm:text-xl lg:text-2xl">
                            {highlightText}
                        </p>
                    )}
                </div>

            </div>

            {/* Datos estructurados para SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebPageElement",
                        "name": `${title} ${highlightTitle}`,
                        "description": subtitle,
                        "provider": {
                            "@type": "LegalService",
                            "name": "LHC Legal & Consulting"
                        },
                        "mainContentOfPage": true
                    })
                }}
            />
        </section>
    );
};

export default ParallaxTitleSection;