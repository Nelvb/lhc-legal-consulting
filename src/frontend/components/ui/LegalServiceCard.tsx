/**
 * LegalServiceCard.tsx
 * 
 * Componente de tarjeta individual para servicios legales de LHC Legal & Consulting.
 * Diseño limpio y profesional inspirado en cards rectangulares sin elementos decorativos.
 * Efectos hover sutiles con paleta suave de salmón, rosa empolvado y verde agua.
 * Optimizado para SEO, accesibilidad y experiencia de usuario premium.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { LegalServiceCardProps } from '@/types/legalService';

const LegalServiceCard: React.FC<LegalServiceCardProps> = ({
    service,
    index,
    inView,
    animationDelay
}) => {
    return (
        <div
            className={`
                transition-all duration-700 transform
                ${inView
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-12 opacity-0'
                }
            `}
            style={{
                transitionDelay: inView ? `${animationDelay}ms` : '0ms'
            }}
        >
            <Link
                href={service.slug}
                className="block group h-full"
                aria-label={`Ir a ${service.title} - ${service.description}`}
            >
                <article
                    className="
                        relative h-48 p-6 
                        transform transition-all duration-300 ease-out
                        hover:-translate-y-1 hover:shadow-xl
                        shadow-lg
                        group overflow-hidden
                        backdrop-blur-sm
                    "
                    style={{
                        backgroundColor: service.color,
                        boxShadow: `0 10px 25px -5px ${service.color}25`
                    }}
                >
                    {/* Overlay sutil para hover */}
                    <div
                        className="
                            absolute inset-0 opacity-0 group-hover:opacity-10
                            transition-opacity duration-300
                            bg-white
                        "
                    />

                    {/* Gradiente sutil para profundidad */}
                    <div
                        className="
                            absolute inset-0
                            bg-gradient-to-br from-white/5 to-transparent
                        "
                    />

                    {/* Contenido principal */}
                    <div className="relative z-10 h-full flex flex-col justify-center text-white">
                        <div className="text-center">
                            {/* Título del servicio legal */}
                            <h3
                                className="
                                    text-xl font-bold mb-3 leading-tight
                                    group-hover:text-white transition-colors duration-300
                                    filter drop-shadow-sm
                                "
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: '700'
                                }}
                            >
                                {service.title}
                            </h3>

                            {/* Descripción del servicio */}
                            <p className="
                                text-white/90 group-hover:text-white/95
                                transition-colors duration-300 
                                leading-relaxed text-sm font-medium
                                filter drop-shadow-sm
                                line-clamp-2
                            ">
                                {service.description}
                            </p>

                            {/* Indicador de acción profesional */}
                            <div className="
                                mt-4 flex items-center justify-center text-white/80 group-hover:text-white
                                transition-all duration-300
                            ">
                                <span className="text-xs font-semibold mr-2">Más información</span>
                                <svg
                                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Schema markup para SEO por tarjeta */}
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "Service",
                                "name": service.title,
                                "description": service.description,
                                "provider": {
                                    "@type": "LegalService",
                                    "name": "LHC Legal & Consulting"
                                },
                                "areaServed": {
                                    "@type": "Country",
                                    "name": "España"
                                },
                                "serviceType": service.title,
                                "url": `https://lhclegal.es${service.slug}`
                            })
                        }}
                    />
                </article>
            </Link>
        </div>
    );
};

export default LegalServiceCard;