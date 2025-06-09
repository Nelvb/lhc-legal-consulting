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
      aria-labelledby="why-choose-us-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header de la sección */}
        <div className="text-center mb-16 lg:mb-20">
          <div className={`
            transition-all duration-700 transform
            ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}>
            <h2
              id="why-choose-us-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1b2f4b] mb-6"
            >
              ¿Por qué elegir
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1b2f4b] to-blue-600">
                LHC Legal?
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Somos una asesoría legal moderna que combina profesionalidad con cercanía.
              <span className="block mt-2 font-medium text-[#1b2f4b]">
                Estos son nuestros compromisos contigo.
              </span>
            </p>
          </div>
        </div>

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

        {/* CTA bottom section */}
        <div className={`
          mt-16 lg:mt-20 text-center
          transition-all duration-700 transform
          ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        `}
          style={{
            transitionDelay: inView ? '600ms' : '0ms'
          }}
        >
          <div className="
            bg-gradient-to-r from-[#1b2f4b] to-blue-600 
            rounded-3xl p-8 lg:p-12 
            shadow-2xl transform hover:scale-105 transition-all duration-300
            relative overflow-hidden
          ">

            {/* Elementos decorativos de fondo */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1b2f4b]/90 to-blue-600/90" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />

            <div className="relative z-10">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                ¿Listo para resolver tu situación legal?
              </h3>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Contacta con nosotros y comprueba por qué somos diferentes.
                Tu primera consulta es completamente gratuita.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/contacto"
                  className="
                    inline-flex items-center justify-center
                    bg-white text-[#1b2f4b] font-semibold
                    px-8 py-4 rounded-xl
                    hover:bg-gray-50 transition-all duration-300
                    transform hover:scale-105 hover:shadow-xl
                    min-w-[200px]
                  "
                >
                  Consulta Gratuita
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>

                <a
                  href="tel:+34XXX-XXX-XXX"
                  className="
                    inline-flex items-center justify-center
                    border-2 border-white text-white font-semibold
                    px-8 py-4 rounded-xl
                    hover:bg-white hover:text-[#1b2f4b] transition-all duration-300
                    transform hover:scale-105
                    min-w-[200px]
                  "
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Llamar Ahora
                </a>
              </div>
            </div>
          </div>
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