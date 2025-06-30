/**
 * AboutDifference.tsx
 *
 * Componente "Por qué somos diferentes" para la página Sobre Nosotros.
 * Cards modernas con números, efectos hover y gradientes según el estilo WhyChooseUs.
 * Incluye elementos decorativos de fondo y animaciones suaves.
 * ACTUALIZADO: Animaciones separadas para título/párrafo y grid de cards.
 */

'use client';

import React from 'react';
import { useInView } from '@/hooks/useInView';

const AboutDifference = () => {
    // Hooks para animaciones separadas
    const { ref: titleRef, inView: titleInView } = useInView();
    const { ref: cardsRef, inView: cardsInView } = useInView();

    return (
        <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-20 right-10 w-32 h-32 bg-[#1DA1F2] opacity-5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#1b2f4b] opacity-5 rounded-full blur-3xl"></div>
            
            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                {/* Título y párrafo con animación */}
                <div 
                    ref={titleRef}
                    className={`
                        text-center mb-20
                        transition-all duration-700 transform
                        ${titleInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                    `}
                >
                    <h2 
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1b2f4b] mb-8"
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: '800',
                            letterSpacing: '-0.02em'
                        }}
                    >
                        Por qué somos diferentes
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#1DA1F2] to-[#60A5FA] mx-auto mb-8 rounded-full" />
                    <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 max-w-4xl mx-auto font-light">
                        Nuestro compromiso va más allá de la representación legal tradicional
                    </p>
                </div>

                {/* Grid de cards con animación separada */}
                <div 
                    ref={cardsRef}
                    className={`
                        grid md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto
                        transition-all duration-700 transform
                        ${cardsInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                    `}
                >
                    <div className="group relative bg-white rounded-3xl p-8 lg:p-10 h-full
                                  shadow-lg hover:shadow-2xl
                                  border border-gray-100 hover:border-transparent
                                  transform transition-all duration-500 ease-out
                                  hover:scale-105 hover:-translate-y-3
                                  backdrop-blur-sm bg-white/95
                                  overflow-hidden">
                        
                        {/* Gradiente de fondo en hover */}
                        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
                                      bg-gradient-to-br from-blue-50 to-blue-100
                                      transition-opacity duration-500" />

                        {/* Contenido */}
                        <div className="relative z-10">
                            {/* Número con fondo circular */}
                            <div className="mb-6">
                                <div className="inline-flex items-center justify-center
                                              w-16 h-16 lg:w-20 lg:h-20 rounded-2xl
                                              bg-gradient-to-br from-blue-50 to-blue-100
                                              text-blue-600
                                              transform transition-all duration-500
                                              group-hover:scale-110 group-hover:rotate-6
                                              shadow-lg group-hover:shadow-xl
                                              border border-white group-hover:border-transparent">
                                    <span className="text-2xl font-bold">01</span>
                                </div>
                            </div>

                            <h3 className="text-xl lg:text-2xl font-bold text-[#1b2f4b] mb-4
                                         group-hover:text-[#1b2f4b] transition-colors duration-300
                                         leading-tight">
                                Enfoque completamente personalizado
                            </h3>

                            <p className="text-gray-600 group-hover:text-gray-700
                                         transition-colors duration-300 
                                         leading-relaxed text-base lg:text-lg">
                                Cada caso recibe un tratamiento único adaptado a tu situación específica
                            </p>

                            {/* Indicador visual */}
                            <div className="mt-6 w-12 h-1 bg-gradient-to-r from-[#1b2f4b] to-blue-600
                                           rounded-full transform transition-all duration-500
                                           group-hover:w-20 group-hover:shadow-lg" />
                        </div>

                        {/* Efecto de brillo animado */}
                        <div className="absolute top-0 -left-6 w-6 h-full
                                      bg-gradient-to-r from-transparent via-white/30 to-transparent
                                      transform -skew-x-12 -translate-x-full
                                      group-hover:translate-x-[400px]
                                      transition-transform duration-1000 ease-out" />
                    </div>

                    <div className="group relative bg-white rounded-3xl p-8 lg:p-10 h-full
                                  shadow-lg hover:shadow-2xl
                                  border border-gray-100 hover:border-transparent
                                  transform transition-all duration-500 ease-out
                                  hover:scale-105 hover:-translate-y-3
                                  backdrop-blur-sm bg-white/95
                                  overflow-hidden">
                        
                        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
                                      bg-gradient-to-br from-emerald-50 to-emerald-100
                                      transition-opacity duration-500" />

                        <div className="relative z-10">
                            <div className="mb-6">
                                <div className="inline-flex items-center justify-center
                                              w-16 h-16 lg:w-20 lg:h-20 rounded-2xl
                                              bg-gradient-to-br from-emerald-50 to-emerald-100
                                              text-emerald-600
                                              transform transition-all duration-500
                                              group-hover:scale-110 group-hover:rotate-6
                                              shadow-lg group-hover:shadow-xl
                                              border border-white group-hover:border-transparent">
                                    <span className="text-2xl font-bold">02</span>
                                </div>
                            </div>

                            <h3 className="text-xl lg:text-2xl font-bold text-[#1b2f4b] mb-4
                                         group-hover:text-[#1b2f4b] transition-colors duration-300
                                         leading-tight">
                                Tecnología al servicio del cliente
                            </h3>

                            <p className="text-gray-600 group-hover:text-gray-700
                                         transition-colors duration-300 
                                         leading-relaxed text-base lg:text-lg">
                                Herramientas modernas para seguimiento en tiempo real de tu caso
                            </p>

                            <div className="mt-6 w-12 h-1 bg-gradient-to-r from-[#1b2f4b] to-emerald-600
                                           rounded-full transform transition-all duration-500
                                           group-hover:w-20 group-hover:shadow-lg" />
                        </div>

                        <div className="absolute top-0 -left-6 w-6 h-full
                                      bg-gradient-to-r from-transparent via-white/30 to-transparent
                                      transform -skew-x-12 -translate-x-full
                                      group-hover:translate-x-[400px]
                                      transition-transform duration-1000 ease-out" />
                    </div>

                    <div className="group relative bg-white rounded-3xl p-8 lg:p-10 h-full
                                  shadow-lg hover:shadow-2xl
                                  border border-gray-100 hover:border-transparent
                                  transform transition-all duration-500 ease-out
                                  hover:scale-105 hover:-translate-y-3
                                  backdrop-blur-sm bg-white/95
                                  overflow-hidden">
                        
                        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
                                      bg-gradient-to-br from-purple-50 to-purple-100
                                      transition-opacity duration-500" />

                        <div className="relative z-10">
                            <div className="mb-6">
                                <div className="inline-flex items-center justify-center
                                              w-16 h-16 lg:w-20 lg:h-20 rounded-2xl
                                              bg-gradient-to-br from-purple-50 to-purple-100
                                              text-purple-600
                                              transform transition-all duration-500
                                              group-hover:scale-110 group-hover:rotate-6
                                              shadow-lg group-hover:shadow-xl
                                              border border-white group-hover:border-transparent">
                                    <span className="text-2xl font-bold">03</span>
                                </div>
                            </div>

                            <h3 className="text-xl lg:text-2xl font-bold text-[#1b2f4b] mb-4
                                         group-hover:text-[#1b2f4b] transition-colors duration-300
                                         leading-tight">
                                Transparencia en honorarios
                            </h3>

                            <p className="text-gray-600 group-hover:text-gray-700
                                         transition-colors duration-300 
                                         leading-relaxed text-base lg:text-lg">
                                Presupuestos claros desde el inicio, sin sorpresas ni costes ocultos
                            </p>

                            <div className="mt-6 w-12 h-1 bg-gradient-to-r from-[#1b2f4b] to-purple-600
                                           rounded-full transform transition-all duration-500
                                           group-hover:w-20 group-hover:shadow-lg" />
                        </div>

                        <div className="absolute top-0 -left-6 w-6 h-full
                                      bg-gradient-to-r from-transparent via-white/30 to-transparent
                                      transform -skew-x-12 -translate-x-full
                                      group-hover:translate-x-[400px]
                                      transition-transform duration-1000 ease-out" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutDifference;