/**
 * LegalServiceCard.tsx
 * 
 * Componente de tarjeta individual para servicios legales de LHC Legal & Consulting.
 * Diseño moderno más bajo y ancho con animaciones, efectos hover y optimización SEO.
 * Reutilizable y responsive con TypeScript estricto.
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
            relative h-48 rounded-2xl p-6 
            transform transition-all duration-500 ease-out
            hover:scale-105 hover:-translate-y-3
            shadow-2xl hover:shadow-3xl
            group overflow-hidden
            border border-white/10 hover:border-white/20
          "
                    style={{
                        backgroundColor: service.color,
                        boxShadow: `0 25px 50px -12px ${service.color}40`
                    }}
                >
                    {/* Gradiente overlay para hover */}
                    <div
                        className="
              absolute inset-0 opacity-0 group-hover:opacity-100
              transition-opacity duration-500
            "
                        style={{
                            background: `linear-gradient(135deg, ${service.hoverColor} 0%, ${service.color} 100%)`
                        }}
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
                text-white/90 group-hover:text-white 
                transition-colors duration-300 
                leading-relaxed text-sm font-medium
                filter drop-shadow-sm
                line-clamp-2
              ">
                                {service.description}
                            </p>

                            {/* Indicador de acción */}
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

                    {/* Efecto de brillo */}
                    <div className="
            absolute top-0 -left-6 w-6 h-full
            bg-gradient-to-r from-transparent via-white/30 to-transparent
            transform -skew-x-12 -translate-x-full
            group-hover:translate-x-[300px]
            transition-transform duration-1000 ease-out
          " />

                    {/* Elementos decorativos */}
                    <div className="
            absolute -top-4 -right-4 w-16 h-16 
            bg-white/10 rounded-full blur-xl
            group-hover:scale-150 group-hover:bg-white/20
            transition-all duration-700
            pointer-events-none
          " />
                </article>
            </Link>
        </div>
    );
};

export default LegalServiceCard;