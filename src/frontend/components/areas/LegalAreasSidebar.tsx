/**
 * LegalAreasSidebar.tsx
 *
 * Sidebar de navegación para las páginas de áreas legales.
 * Cards con los mismos colores y efectos que LegalServiceCard del home.
 * Header gris como el footer, sin scroll interno, área activa solo con subrayado.
 * ACTUALIZADO: Incluye sección de últimos artículos del blog.
 */

'use client';

import React from 'react';
import SmartLink from "@/components/ui/SmartLink";
import { usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import LatestArticles from './LatestArticles';
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
            {/* Header del sidebar - igual que footer */}
            <div className="bg-gray-50 p-6 text-center border-b border-gray-200">
                <h3
                    className="text-xl font-bold text-[#1b2f4b]"
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: '700',
                        letterSpacing: '-0.01em'
                    }}
                >
                    Áreas Legales
                </h3>
                <div className="w-12 h-0.5 bg-[#1DA1F2] mx-auto mt-3 rounded-full" />
            </div>

            {/* Cards sin scroll interno */}
            <div className="bg-white">
                {LEGAL_SERVICES.map((area, index) => {
                    const isActive = currentSlug === area.id;

                    return (
                        <SmartLink
                            key={area.id}
                            href={area.slug}
                            className="block w-full text-left transition-all duration-300 hover:z-10 relative group"
                        >
                            <div
                                className={`
                                    relative p-5 lg:p-6
                                    transition-all duration-300 ease-out
                                    hover:-translate-y-1 hover:shadow-xl
                                    shadow-lg group overflow-hidden
                                    backdrop-blur-sm
                                    ${index !== LEGAL_SERVICES.length - 1 ? 'border-b border-white/10' : ''}
                                `}
                                style={{
                                    backgroundColor: area.color,
                                    boxShadow: `0 10px 25px -5px ${area.color}25`
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

                                {/* Contenido de la card */}
                                <div className="relative z-10">
                                    {/* Título del área */}
                                    <h4
                                        className="
                                            font-bold text-base lg:text-lg mb-3 
                                            text-white group-hover:text-white transition-colors duration-300
                                            filter drop-shadow-sm
                                        "
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
                                        className="
                                            text-sm leading-relaxed transition-colors duration-300
                                            text-white/90 group-hover:text-white/95
                                            filter drop-shadow-sm
                                        "
                                    >
                                        {area.description}
                                    </p>

                                    {/* Subrayado para área activa */}
                                    {isActive && (
                                        <div className="mt-4 w-full h-0.5 bg-[white] rounded-full" />
                                    )}

                                    {/* Flecha para hover */}
                                    <div
                                        className={`
                                            absolute right-0 top-1/2 transform -translate-y-1/2 
                                            transition-all duration-300
                                            ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-80'}
                                        `}
                                    >
                                        <svg
                                            className="w-4 h-4 text-white filter drop-shadow-sm"
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
                        </SmartLink>
                    );
                })}
            </div>

           

            {/* Footer del sidebar con botón outline */}
            <div className="bg-gray-50 p-5 text-center border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">
                    ¿No encuentras tu área específica?
                </p>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.href = '/contact'}
                >
                    Contactar Ahora
                </Button>
            </div>

            {/* Sección de Últimos Artículos */}
            <LatestArticles limit={3} />
        </aside>
    );
};

export default LegalAreasSidebar;