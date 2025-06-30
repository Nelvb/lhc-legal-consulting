/**
 * FaqHero.tsx
 *
 * Componente Hero para la página de preguntas frecuentes (/faq).
 * Mantiene consistencia visual con Blog y Areas usando gradiente LHC corporativo.
 * Diseño responsive con tipografías Inter y elementos decorativos animados.
 * Optimizado para engagement y claridad en el mensaje principal.
 * ACTUALIZADO: Animación del contenido al entrar en viewport.
 */

'use client';

import React from 'react';
import { useInView } from '@/hooks/useInView';

/**
 * Hero Section para FAQ
 * Gradiente corporativo LHC con mensaje claro sobre el contenido disponible
 */
const FaqHero: React.FC = () => {
    // Hook para animación del contenido
    const { ref, inView } = useInView();

    return (
        <section 
            className="w-full py-20 lg:py-32 px-6 relative overflow-hidden"
            style={{
                background: `
                    linear-gradient(135deg, 
                        #0f172a 0%, 
                        #1b2f4b 30%, 
                        #1DA1F2 65%, 
                        #1b2f4b 100%
                    )
                `
            }}
        >
            <div className="max-w-6xl mx-auto text-center relative z-10">
                <div
                    ref={ref}
                    className={`
                        transition-all duration-700 transform
                        ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                    `}
                >
                    {/* Badge informativo */}
                    <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-8 border border-white/30">
                        Más de 200 respuestas disponibles
                    </div>

                    {/* Título principal */}
                    <h1
                        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8"
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: '800',
                            letterSpacing: '-0.02em',
                            textShadow: '0 4px 20px rgba(0,0,0,0.3)'
                        }}
                    >
                        Preguntas{" "}
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1DA1F2] via-[#60A5FA] to-[#1DA1F2] mt-4 pb-2 animate-pulse">
                            Frecuentes
                        </span>
                    </h1>

                    {/* Línea decorativa animada */}
                    <div className="w-24 h-1 bg-gradient-to-r from-[#1DA1F2] to-[#60A5FA] mx-auto mb-8 rounded-full transform hover:scale-110 transition-transform duration-300"></div>

                    {/* Descripción principal */}
                    <p className="text-xl sm:text-2xl lg:text-3xl text-gray-200 max-w-5xl mx-auto leading-relaxed font-light mb-6">
                        Encuentra respuestas inmediatas a tus dudas legales
                    </p>

                    {/* Descripción secundaria */}
                    <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-blue-200 max-w-4xl mx-auto">
                        Organizadas por área de especialización y actualizadas constantemente
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FaqHero;