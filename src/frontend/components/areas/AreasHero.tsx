/**
 * AreasHero.tsx
 *
 * Hero section para la página general de áreas legales (/areas).
 * Diseño consistente con el resto de heroes de LHC Legal & Consulting.
 * Usa gradiente corporativo normal (no inverted) y tipografías Inter.
 */

'use client';

import React from 'react';

interface AreasHeroProps {
    title?: string;
    subtitle?: string;
    description?: string;
    className?: string;
}

const AreasHero: React.FC<AreasHeroProps> = ({
    title = "Nuestras Áreas",
    subtitle = "Legales",
    description = "Especialistas en todas las ramas del derecho con enfoque cercano y profesional",
    className = ""
}) => {
    return (
        <section className={`relative overflow-hidden ${className}`}>
            {/* Fondo gradiente corporativo */}
            <div className="absolute inset-0 bg-lhc-gradient-inverted" />

            <div className="relative z-10 py-20 lg:py-32">
                <div className="container mx-auto px-6 lg:px-8 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1
                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8"
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: '800',
                                letterSpacing: '-0.02em',
                                textShadow: '0 4px 20px rgba(0,0,0,0.3)'
                            }}
                        >
                            {title}{" "}
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1DA1F2] via-[#60A5FA] to-[#1DA1F2] mt-4 animate-pulse pb-2">
                                {subtitle}
                            </span>
                        </h1>

                        <div className="w-24 h-1 bg-gradient-to-r from-[#1DA1F2] to-[#60A5FA] mx-auto mb-8 rounded-full" />

                        <p className="text-xl sm:text-2xl lg:text-3xl text-white/95 leading-relaxed font-light">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AreasHero;