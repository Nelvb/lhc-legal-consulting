/**
 * WhyChooseUs.tsx
 * 
 * Sección que destaca los 4 diferenciadores únicos de LHC Legal & Consulting.
 * Diseño moderno y fresco orientado a empresa joven con enfoque en confianza,
 * rapidez y transparencia. Incluye iconos SVG personalizados y animaciones suaves.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from '@/hooks/useInView';

// Tipos para los diferenciadores
interface Differentiator {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
}

// Datos de los 4 diferenciadores principales
const differentiators: Differentiator[] = [
  {
    id: 'respuesta-24h',
    title: 'Respuesta garantizada en 24h',
    description: 'Tu tiempo es valioso. Nos comprometemos a responderte en menos de 24 horas, sin excepciones.',
    color: 'text-blue-600',
    bgGradient: 'from-blue-50 to-blue-100',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 'consulta-gratuita',
    title: 'Primera consulta 100% gratuita',
    description: 'Conoce tu situación legal sin riesgo. La primera consulta siempre es completamente gratuita.',
    color: 'text-emerald-600',
    bgGradient: 'from-emerald-50 to-emerald-100',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 'equipo-especializado',
    title: 'Equipo joven y especializado',
    description: 'Profesionales formados en las últimas tendencias legales con enfoque moderno y cercano.',
    color: 'text-purple-600',
    bgGradient: 'from-purple-50 to-purple-100',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    id: 'sin-letra-pequena',
    title: 'Sin letra pequeña ni sorpresas',
    description: 'Transparencia total. Te explicamos todo de forma clara, sin complicaciones ni costes ocultos.',
    color: 'text-amber-600',
    bgGradient: 'from-amber-50 to-amber-100',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  }
];

const WhyChooseUs: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px'
  });

  const [animationDelay, setAnimationDelay] = useState<number[]>([]);

  // Generar delays de animación escalonada
  useEffect(() => {
    const delays = differentiators.map((_, index) => index * 150);
    setAnimationDelay(delays);
  }, []);

  return (
    <section
      ref={ref}
      className="w-full py-16 lg:py-24 relative z-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Grid de diferenciadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {differentiators.map((item, index) => (
            <div
              key={item.id}
              className={`
                transition-all duration-700 transform
                ${inView
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-12 opacity-0'
                }
              `}
              style={{
                transitionDelay: inView ? `${animationDelay[index]}ms` : '0ms'
              }}
            >
              <div className="
                group relative bg-white rounded-3xl p-8 lg:p-10 h-full
                shadow-lg hover:shadow-2xl
                border border-gray-100 hover:border-transparent
                transform transition-all duration-500 ease-out
                hover:scale-105 hover:-translate-y-3
                backdrop-blur-sm bg-white/95
                overflow-hidden
              ">

                {/* Gradiente de fondo en hover */}
                <div className={`
                  absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
                  bg-gradient-to-br ${item.bgGradient}
                  transition-opacity duration-500
                `} />

                {/* Contenido */}
                <div className="relative z-10">

                  {/* Icono con fondo circular */}
                  <div className="mb-6">
                    <div className={`
                      inline-flex items-center justify-center
                      w-16 h-16 lg:w-20 lg:h-20 rounded-2xl
                      bg-gradient-to-br ${item.bgGradient}
                      ${item.color}
                      transform transition-all duration-500
                      group-hover:scale-110 group-hover:rotate-6
                      shadow-lg group-hover:shadow-xl
                      border border-white group-hover:border-transparent
                    `}>
                      {item.icon}
                    </div>
                  </div>

                  {/* Título */}
                  <h3 className="
                    text-xl lg:text-2xl font-bold text-[#1b2f4b] mb-4
                    group-hover:text-[#1b2f4b] transition-colors duration-300
                    leading-tight
                  ">
                    {item.title}
                  </h3>

                  {/* Descripción */}
                  <p className="
                    text-gray-600 group-hover:text-gray-700
                    transition-colors duration-300 
                    leading-relaxed text-base lg:text-lg
                    line-height-relaxed
                  ">
                    {item.description}
                  </p>

                  {/* Indicador visual */}
                  <div className="
                    mt-6 w-12 h-1 bg-gradient-to-r from-[#1b2f4b] to-blue-600
                    rounded-full transform transition-all duration-500
                    group-hover:w-20 group-hover:shadow-lg
                  " />
                </div>

                {/* Efecto de brillo animado */}
                <div className="
                  absolute top-0 -left-6 w-6 h-full
                  bg-gradient-to-r from-transparent via-white/30 to-transparent
                  transform -skew-x-12 -translate-x-full
                  group-hover:translate-x-[400px]
                  transition-transform duration-1000 ease-out
                " />

                {/* Elementos decorativos de fondo */}
                <div className="
                  absolute -top-4 -right-4 w-24 h-24 
                  bg-gradient-to-br from-gray-100/50 to-transparent
                  rounded-full blur-xl
                  group-hover:scale-150 group-hover:rotate-90
                  transition-all duration-700
                  pointer-events-none
                " />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Datos estructurados para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "LHC Legal & Consulting",
            "description": "Asesoría legal moderna con equipo joven y especializado",
            "foundingDate": "2025",
            "areaServed": {
              "@type": "Country",
              "name": "España"
            },
            "serviceType": [
              "Asesoría Legal",
              "Consulta Jurídica",
              "Representación Legal"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Servicios Legales",
              "itemListElement": differentiators.map((item, index) => ({
                "@type": "Offer",
                "name": item.title,
                "description": item.description,
                "position": index + 1
              }))
            }
          })
        }}
      />
    </section>
  );
};

export default WhyChooseUs;