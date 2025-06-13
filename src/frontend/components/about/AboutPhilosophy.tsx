/**
 * AboutPhilosophy.tsx
 *
 * Componente "Cómo trabajamos en LHC Legal & Consulting" para la página Sobre Nosotros.
 * Explica paso a paso la metodología de trabajo del despacho con fondo gradiente.
 * Cards sólidas con colores inspirados en el AreasGrid para cada paso del proceso legal.
 * Título con gradiente animado siguiendo el estilo corporativo del AreasGrid.
 */

'use client';

import React from 'react';

const AboutPhilosophy = () => {
  // Colores específicos para cada paso (tomados del AreasGrid)
  const workflowColors = [
    '#5A7FA7', // Azul profundo suavizado (Derecho Laboral)
    '#7BA396', // Verde salvia suavizado (Derecho Civil)
    '#A67B8A', // Burdeos muy suavizado (Derecho Extranjería)
    '#6B9CAD', // Azul acero suavizado (Derecho Penal)
    '#C4967A'  // Terracota muy suavizada (Derecho Administrativo)
  ];

  // Contenido de cada paso
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
        <div className="container mx-auto px-6 lg:px-8 text-center">
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
          
          <div className="w-24 h-1 bg-gradient-to-r from-[#1DA1F2] to-[#60A5FA] mx-auto mb-12 rounded-full" />
          
          <div className="max-w-5xl mx-auto space-y-8 text-left">
            {workflowSteps.map((step, index) => {
              const color = workflowColors[index];
              
              return (
                <div 
                  key={index}
                  className="rounded-2xl p-6 lg:p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl min-h-[140px] lg:min-h-[160px]"
                  style={{
                    backgroundColor: color
                  }}
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