/**
 * AboutPhilosophy.tsx
 *
 * Componente "Cómo trabajamos en LHC Legal & Consulting" para la página Sobre Nosotros.
 * Explica paso a paso la metodología de trabajo del despacho con fondo gradiente.
 * Cards sólidas con colores inspirados en el AreasGrid para cada paso del proceso legal.
 * Título con gradiente animado siguiendo el estilo corporativo del AreasGrid.
 * ACTUALIZADO: Animaciones separadas para título/párrafo y cards de metodología.
 */

'use client';

import React from 'react';
import { useInView } from '@/hooks/useInView';

const AboutPhilosophy = () => {
  // Hooks para animaciones separadas
  const { ref: titleRef, inView: titleInView } = useInView();
  const { ref: cardsRef, inView: cardsInView } = useInView();

  const workflowColors = [
    '#5A7FA7', // Azul profundo suavizado
    '#7BA396', // Verde salvia suavizado
    '#A67B8A', // Burdeos suavizado
    '#6B9CAD', // Azul acero
    '#C4967A'  // Terracota
  ];

  const workflowSteps = [
    {
      title: "1. Escuchamos antes de actuar.",
      content: "Cada cliente empieza con una consulta donde recogemos todos los datos relevantes. Preguntamos lo que nadie pregunta."
    },
    {
      title: "2. Asignamos al abogado más adecuado.",
      content: "En función del caso, designamos un especialista con experiencia directa en esa materia."
    },
    {
      title: "3. Comunicación constante.",
      content: "Nunca dejamos a un cliente sin respuesta. Puedes escribirnos o llamarnos durante todo el proceso. Respondemos en menos de 24h."
    },
    {
      title: "4. Documentación clara.",
      content: "Enviamos propuestas, contratos o recursos legales explicados punto por punto, para que entiendas qué estamos haciendo y por qué."
    },
    {
      title: "5. Seguimiento y cierre profesional.",
      content: "Cerramos cada caso con informe final, resumen de acciones y próximos pasos si los hay. Porque una buena experiencia no acaba con una firma."
    }
  ];

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-lhc-gradient-inverted" />

      <div className="relative z-10">
        <div className="container mx-auto px-6 lg:px-8">
          {/* Título y párrafo con animación */}
          <div 
            ref={titleRef}
            className={`
              text-center mb-16
              transition-all duration-700 transform
              ${titleInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
            `}
          >
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: '800',
                letterSpacing: '-0.02em',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)'
              }}
            >
              Cómo trabajamos en{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1DA1F2] via-[#60A5FA] to-[#1DA1F2] mt-4 animate-pulse pb-2">
                LHC Legal & Consulting
              </span>
            </h2>

            <div className="w-24 h-1 bg-gradient-to-r from-[#1DA1F2] to-[#60A5FA] mx-auto mb-8 rounded-full" />

            <p className="text-xl sm:text-2xl lg:text-3xl text-white/95 max-w-4xl mx-auto leading-relaxed font-light">
              Nuestra metodología de trabajo se basa en la transparencia, especialización y comunicación continua
              <span className="block mt-4 font-semibold text-blue-200 text-lg sm:text-xl lg:text-2xl">
                Cada paso está diseñado para ofrecerte la mejor experiencia legal
              </span>
            </p>
          </div>

          {/* Cards de metodología con animación separada */}
          <div
            ref={cardsRef}
            className={`
              max-w-5xl mx-auto space-y-8 text-left
              transition-all duration-700 transform
              ${cardsInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
            `}
          >
            {workflowSteps.map((step, index) => {
              const color = workflowColors[index];

              return (
                <div
                  key={index}
                  className="rounded-2xl p-6 lg:p-8 transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl min-h-[140px] lg:min-h-[160px]"
                  style={{ backgroundColor: color }}
                >
                  <p className="text-white text-lg leading-relaxed">
                    <strong className="text-white text-xl block mb-3">
                      {step.title}
                    </strong>
                    {step.content}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPhilosophy;