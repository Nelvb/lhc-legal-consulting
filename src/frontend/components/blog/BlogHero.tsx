/**
 * BlogHero.tsx
 *
 * Hero de cabecera para la página del blog (/blog) de LHC Legal & Consulting.
 * Incluye animación al hacer scroll, gradiente LHC y tipografía profesional.
 */

'use client';

import React from 'react';
import { useInView } from '@/hooks/useInView';

const BlogHero: React.FC = () => {
    const { ref, inView } = useInView({ threshold: 0.4, triggerOnce: true });

    return (
        <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-lhc-gradient-inverted" />

            <div className="relative z-10 py-20 lg:py-32">
                <div className="container mx-auto px-6 lg:px-8 text-center">
                    <div
                        ref={ref}
                        className={`
              max-w-6xl mx-auto
              transition-all duration-700 transform
              ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
            `}
                    >
                        <h1
                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8"
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: '800',
                                letterSpacing: '-0.02em',
                                textShadow: '0 4px 20px rgba(0,0,0,0.3)'
                            }}
                        >
                            Blog LHC Legal &{' '}
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1DA1F2] via-[#60A5FA] to-[#1DA1F2] mt-4 pb-2 animate-pulse">
                                Consulting
                            </span>
                        </h1>

                        <div className="w-24 h-1 bg-gradient-to-r from-[#1DA1F2] to-[#60A5FA] mx-auto mb-8 rounded-full" />

                        <p className="text-xl sm:text-2xl lg:text-3xl text-gray-200 max-w-5xl mx-auto leading-relaxed font-light">
                            Toda la actualidad jurídica
                            <span className="block mt-4 font-semibold text-blue-200 text-lg sm:text-xl lg:text-2xl">
                                Mantente informado de los cambios legales que te afectan
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogHero;
