/**
 * LegalAreasSidebar.tsx
 *
 * Sidebar de navegación para las páginas de áreas legales.
 * Cards apiladas SIN MÁRGENES (pegadas) con colores del sistema.
 * Estado activo para el área actual y efectos hover profesionales.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LEGAL_SERVICES } from '@/app/data/legalServices';

interface LegalAreasSidebarProps {
    className?: string;
}

const LegalAreasSidebar: React.FC<LegalAreasSidebarProps> = ({ className = '' }) => {
    const pathname = usePathname();

    // Extraer el slug actual de la URL
    const currentSlug = pathname.split('/areas/')[1]?.split('/')[0];

    return (
        <aside className={`w-full ${className}`}>
            {/* Header del sidebar */}
            <div className="bg-gradient-to-r from-[#1b2f4b] to-[#1DA1F2] p-6 text-center">
                <h3
                    className="text-xl font-bold text-white"
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: '700',
                        letterSpacing: '-0.01em'
                    }}
                >
                    Áreas Legales
                </h3>
                <div className="w-12 h-0.5 bg-white/60 mx-auto mt-3 rounded-full" />
            </div>

            {/* Cards pegadas sin márgenes */}
            <div className="bg-white">
                {LEGAL_SERVICES.map((area, index) => {
                    const isActive = currentSlug === area.id;

                    return (
                        <Link
                            key={area.id}
                            href={area.slug}
                            className="block w-full text-left transition-all duration-300 hover:z-10 relative group"
                        >
                            <div
                                className={`
                                    relative p-5 lg:p-6
                                    transition-all duration-300
                                    ${isActive 
                                        ? 'shadow-lg transform scale-[1.02] z-10' 
                                        : 'hover:shadow-md hover:transform hover:scale-[1.01]'
                                    }
                                    ${index !== LEGAL_SERVICES.length - 1 ? 'border-b border-gray-200' : ''}
                                `}
                                style={{
                                    backgroundColor: isActive ? area.color : undefined,
                                    borderLeftWidth: isActive ? '4px' : '0px',
                                    borderLeftColor: isActive ? area.hoverColor : 'transparent'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.backgroundColor = `${area.color}15`;
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.backgroundColor = '';
                                    }
                                }}
                            >
                                {/* Contenido de la card */}
                                <div className="relative">
                                    {/* Título del área */}
                                    <h4
                                        className={`
                                            font-bold text-base lg:text-lg mb-3 transition-colors duration-300
                                            ${isActive ? 'text-white' : 'text-[#1b2f4b]'}
                                        `}
                                        style={{
                                            fontFamily: "'Inter', sans-serif",
                                            fontWeight: '600',
                                            letterSpacing: '-0.01em'
                                        }}
                                    >
                                        {area.title}
                                    </h4>

                                    {/* Descripción */}
                                    <p
                                        className={`
                                            text-sm leading-relaxed transition-colors duration-300
                                            ${isActive ? 'text-white/90' : 'text-gray-600'}
                                        `}
                                    >
                                        {area.description}
                                    </p>

                                    {/* Indicador visual para área activa */}
                                    {isActive && (
                                        <div className="mt-4 w-8 h-0.5 rounded-full bg-white/80" />
                                    )}

                                    {/* Flecha para hover */}
                                    <div
                                        className={`
                                            absolute right-0 top-1/2 transform -translate-y-1/2 
                                            transition-all duration-300
                                            ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}
                                        `}
                                    >
                                        <svg
                                            className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Footer del sidebar con CTA */}
            <div className="bg-gray-50 p-5 text-center border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">
                    ¿No encuentras tu área específica?
                </p>
                <Link
                    href="/contacto"
                    className="inline-block bg-[#1DA1F2] text-white text-sm font-medium px-5 py-3 rounded-lg hover:bg-[#1b8fd1] transition-colors duration-300 shadow-md"
                >
                    Contactar Ahora
                </Link>
            </div>
        </aside>
    );
};

export default LegalAreasSidebar;