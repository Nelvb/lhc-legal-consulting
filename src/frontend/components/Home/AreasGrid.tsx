/**
 * AreasGrid.tsx
 * 
 * Grid responsive y optimizado de áreas legales para LHC Legal & Consulting.
 * Componente modular con animaciones escalonadas, SEO optimizado y configuración
 * flexible. Fondo profesional con gradientes corporativos y elementos decorativos.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from '@/hooks/useInView';
import LegalServiceCard from '@/components/ui/LegalServiceCard';
import Button from '@/components/ui/Button';
import { LEGAL_SERVICES, DEFAULT_ANIMATION_CONFIG, SECTION_CONTENT } from '@/app/data/legalServices';
import { ServicesGridProps } from '@/types/legalService';
import SmartLink from '@/components/ui/SmartLink';


const AreasGrid: React.FC<ServicesGridProps> = ({
  services = LEGAL_SERVICES,
  title = SECTION_CONTENT.title,
  subtitle = SECTION_CONTENT.subtitle,
  animationConfig = DEFAULT_ANIMATION_CONFIG
}) => {
  const { ref, inView } = useInView({
    threshold: animationConfig.threshold,
    triggerOnce: animationConfig.triggerOnce,
    rootMargin: animationConfig.rootMargin
  });

  const [animationDelays, setAnimationDelays] = useState<number[]>([]);

  // Generar delays de animación una sola vez
  useEffect(() => {
    const delays = services.map((_, index) => index * animationConfig.staggerDelay);
    setAnimationDelays(delays);
  }, [services, animationConfig.staggerDelay]);

  // Schema markup para SEO
  const generateSchemaMarkup = () => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    provider: {
      '@type': 'LegalService',
      name: 'LHC Legal & Consulting',
      url: 'https://lhclegal.es',
      areaServed: 'Madrid, España'
    },
    serviceType: services.map(service => service.title),
    description: 'Servicios de asesoría legal profesional en múltiples áreas del derecho',
    offers: services.map(service => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        provider: {
          '@type': 'LegalService',
          name: 'LHC Legal & Consulting'
        }
      }
    }))
  });

  return (
    <section
      ref={ref}
      className="w-full relative overflow-hidden bg-lhc-gradient-inverted"
      aria-labelledby="areas-legales-heading"
    >

      {/* Contenedor principal con padding generoso */}
      <div className="relative z-10 max-w-none mx-auto px-6 lg:px-8 py-20 lg:py-32">
        {/* Encabezado de la sección */}
        <header className="text-center mb-20 lg:mb-28">
          <div className={`
            transition-all duration-700 transform
            ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}>
            <h2
              id="areas-legales-heading"
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: '800',
                letterSpacing: '-0.02em',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)'
              }}
            >
              {title}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1DA1F2] via-[#60A5FA] to-[#1DA1F2] mt-4 animate-pulse">
                {SECTION_CONTENT.titleHighlight}
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-[#1DA1F2] to-[#60A5FA] mx-auto mb-8 rounded-full" />

            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-200 max-w-5xl mx-auto leading-relaxed font-light">
              {subtitle}
              <span className="block mt-4 font-semibold text-blue-200 text-lg sm:text-xl lg:text-2xl">
                {SECTION_CONTENT.subtitleHighlight}
              </span>
            </p>
          </div>
        </header>

        {/* Grid de áreas legales con padding extra */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10 mb-12 lg:mb-16">
          {services.map((service, index) => (
            <LegalServiceCard
              key={service.id}
              service={service}
              index={index}
              inView={inView}
              animationDelay={animationDelays[index] || 0}
            />
          ))}
        </div>

        {/* CTA de consulta personalizada con diseño mejorado */}
        <footer
          className={`
    text-center
    transition-all duration-700 transform
    ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
  `}
          style={{ transitionDelay: inView ? '800ms' : '0ms' }}
        >
          <div className="text-center py-6 lg:py-8">
            <h3 className="text-white text-3xl lg:text-4xl font-bold mb-4">
              {SECTION_CONTENT.ctaTitle}
            </h3>
            <p className="font-semibold text-blue-200 text-lg sm:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto">
              {SECTION_CONTENT.ctaSubtitle}
            </p>
            <SmartLink href="/contact">
              <Button variant="outline" size="md">
                {SECTION_CONTENT.ctaButtonText}
              </Button>
            </SmartLink>
          </div>
        </footer>

      </div>

      {/* Schema markup para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateSchemaMarkup())
        }}
      />
    </section>
  );
};

export default AreasGrid;