// Barra informativa superior para LHC Legal & Consulting
'use client';

import React from 'react';
import Link from 'next/link';

interface AnnouncementBarProps {
    message?: string;
    ctaText?: string;
    ctaLink?: string;
    isVisible?: boolean;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
    message = "Primera consulta gratuita - Respuesta garantizada en 24h",
    ctaText = "Contacta ahora",
    ctaLink = "/contacto",
    isVisible = true
}) => {
    if (!isVisible) return null;

    return (
        <div className="w-full bg-emerald-600 text-white py-3 shadow-sm relative overflow-hidden">
            {/* Patrón sutil de fondo */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '30px 30px'
                }} />
            </div>

            <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-24">
                <div className="flex items-center justify-center gap-4 text-center sm:text-left">

                    {/* Icono de escala */}
                    <div className="hidden sm:flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">
                        <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>

                    {/* Mensaje principal */}
                    <div className="flex-1">
                        <p className="text-sm sm:text-base font-medium tracking-wide">
                            <span className="inline-block mr-2">⚖️</span>
                            {message}
                        </p>
                    </div>

                    {/* CTA Button */}
                    <Link
                        href={ctaLink}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white text-emerald-600 font-semibold text-sm rounded-lg hover:bg-emerald-50 transition-all duration-300 hover:scale-105 shadow-sm"
                    >
                        {ctaText}
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default AnnouncementBar;