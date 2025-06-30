/**
 * AreasPageContent.tsx
 *
 * Componente cliente que contiene el contenido principal de /areas con animaciones.
 * Separado del page.tsx para mantener SEO en Server Component y animaciones en Client.
 * Incluye todas las secciones: título, descripción, orientación, diferencias y CTA.
 * CORREGIDO: Título + párrafo se animan como un bloque único.
 */

'use client';

import React from 'react';
import SmartLink from '@/components/ui/SmartLink';
import Button from '@/components/ui/Button';
import { useInView } from '@/hooks/useInView';

const AreasPageContent: React.FC = () => {
    // Hooks para animaciones independientes por sección
    const { ref: titleDescRef, inView: titleDescInView } = useInView();
    const { ref: orientRef, inView: orientInView } = useInView();
    const { ref: differRef, inView: differInView } = useInView();
    const { ref: ctaRef, inView: ctaInView } = useInView();

    return (
        <div className="container mx-auto px-6 lg:px-8 py-16">

            {/* Título + Párrafo principal como bloque único */}
            <div
                ref={titleDescRef}
                className={`
                    max-w-4xl mx-auto mb-12
                    transition-all duration-700 transform
                    ${titleDescInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                `}
            >
                {/* Título principal */}
                <h2
                    className="text-3xl lg:text-4xl font-bold text-[#1b2f4b] mb-6"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    Áreas de Actuación del Despacho
                </h2>

                <div className="w-24 h-1 bg-gradient-to-r from-[#1DA1F2] to-[#60A5FA] mb-8 rounded-full" />

                {/* Párrafo principal (ahora dentro del mismo bloque) */}
                <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg border border-gray-100">
                    <p
                        className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        <strong className="text-[#1b2f4b]">LHC Legal & Consulting</strong> abarca prácticamente todas las ramas del Derecho,
                        encontrándose especialmente especializado en aquellas áreas que vienen avaladas por la confianza
                        de nuestros clientes y los procedimientos que hemos estado defendiendo exitosamente durante los últimos años.
                    </p>

                    <p className="text-lg text-gray-600 leading-relaxed">
                        Nuestro enfoque combina <strong>dinamismo y experiencia</strong>, ofreciendo un trato cercano y personalizado
                        sin renunciar al máximo rigor profesional que exige cada caso.
                    </p>
                </div>
            </div>

            {/* Contenido restante */}
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Nuestra orientación */}
                <div
                    ref={orientRef}
                    className={`
                        bg-white rounded-2xl p-8 lg:p-12 shadow-lg border border-gray-100
                        transition-all duration-700 transform
                        ${orientInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                    `}
                >
                    <h3
                        className="text-2xl lg:text-3xl font-bold text-[#1b2f4b] mb-6"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Nuestra Orientación Profesional
                    </h3>

                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="w-2 h-2 bg-[#1DA1F2] rounded-full mt-3 flex-shrink-0"></div>
                            <p className="text-gray-700 leading-relaxed">
                                <strong>Defensa integral:</strong> Asumimos la defensa, acusación y asesoramiento legal,
                                así como la elaboración de dictámenes especializados en cuestiones del Derecho civil,
                                mercantil, administrativo, penal y constitucional.
                            </p>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="w-2 h-2 bg-[#1DA1F2] rounded-full mt-3 flex-shrink-0"></div>
                            <p className="text-gray-700 leading-relaxed">
                                <strong>Asesoramiento empresarial:</strong> Prestamos servicios tanto a particulares como a empresas
                                y administraciones públicas, adaptando nuestro enfoque a las necesidades específicas de cada cliente.
                            </p>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="w-2 h-2 bg-[#1DA1F2] rounded-full mt-3 flex-shrink-0"></div>
                            <p className="text-gray-700 leading-relaxed">
                                <strong>Prevención legal:</strong> Ofrecemos asesoramiento preventivo para evitar futuras responsabilidades,
                                porque sabemos que <em>prevenir siempre es mejor que curar</em>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Lo que nos diferencia */}
                <div
                    ref={differRef}
                    className={`
                        bg-gradient-to-br from-[#1DA1F2]/5 to-[#1b2f4b]/5 rounded-2xl p-8 lg:p-12 border border-[#1DA1F2]/20
                        transition-all duration-700 transform
                        ${differInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                    `}
                >
                    <h3
                        className="text-2xl lg:text-3xl font-bold text-[#1b2f4b] mb-6"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Lo que nos hace diferentes
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-[#1DA1F2] rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">✓</span>
                                </div>
                                <span className="font-semibold text-[#1b2f4b]">Respuesta en 24h garantizada</span>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-[#1DA1F2] rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">✓</span>
                                </div>
                                <span className="font-semibold text-[#1b2f4b]">Primera consulta gratuita</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-[#1DA1F2] rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">✓</span>
                                </div>
                                <span className="font-semibold text-[#1b2f4b]">Equipo dinámico y especializado</span>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-[#1DA1F2] rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">✓</span>
                                </div>
                                <span className="font-semibold text-[#1b2f4b]">Transparencia total</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div
                    ref={ctaRef}
                    className={`
                        text-center bg-white rounded-2xl p-8 lg:p-12 shadow-lg border border-gray-100
                        transition-all duration-700 transform
                        ${ctaInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                    `}
                >
                    <h3
                        className="text-2xl lg:text-3xl font-bold text-[#1b2f4b] mb-4"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        ¿Necesitas asesoramiento especializado?
                    </h3>

                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                        Explora nuestras áreas de práctica o solicita una consulta personalizada para casos específicos.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <SmartLink href="/contact">
                            <Button variant="lhc" size="md">
                                Realizar Consulta
                            </Button>
                        </SmartLink>

                        {/* Móvil: Botón clickeable */}
                        <a href="tel:+34691818071" className="md:hidden">
                            <Button variant="outline" size="md">
                                Llamar Ahora
                            </Button>
                        </a>

                        {/* Desktop/Tablet: Solo texto con número destacado */}
                        <div className="hidden md:flex items-center text-[#1b2f4b] font-semibold text-lg">
                            O llama al <span className="text-[#1DA1F2] ml-1">691 81 80 71</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AreasPageContent;