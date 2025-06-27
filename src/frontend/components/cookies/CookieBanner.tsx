/**
 * CookieBanner.tsx
 *
 * Banner principal de cookies para LHC Legal & Consulting.
 * Diseño minimalista y discreto con gradiente corporativo.
 * Se muestra en la parte inferior de la pantalla hasta que el usuario tome una decisión.
 * Animación suave de slide-up desde abajo. Cumple normativa RGPD.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import Button from '@/components/ui/Button';
import { Cookie, Settings } from 'lucide-react';

/**
 * Banner de consentimiento de cookies con lógica y diseño corporativo
 */
const CookieBanner: React.FC = () => {
    const {
        isVisible,
        acceptAll,
        acceptNecessary,
        openModal,
    } = useCookieConsent();

    if (!isVisible) return null;

    return (
        <>
            {/* Overlay sutil para destacar el banner */}
            <div
                className="fixed inset-0 bg-black/10 backdrop-blur-[0.5px] z-40 pointer-events-none"
                style={{ animation: 'fadeIn 0.3s ease-out' }}
            />

            {/* Banner principal */}
            <div
                className="fixed bottom-0 left-0 right-0 z-50 transform transition-smooth"
                style={{ animation: 'slideUp 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)' }}
            >
                <div className="bg-lhc-gradient shadow-2xl border-t border-white/20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
                            {/* Icono y contenido */}
                            <div className="flex items-start gap-3 flex-1">
                                <div className="flex-shrink-0 mt-1">
                                    <Cookie className="w-5 h-5 text-[#1DA1F2]" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white font-semibold text-sm sm:text-base mb-1">
                                        Configuración de Cookies
                                    </h3>
                                    <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">
                                        Utilizamos cookies para mejorar tu experiencia de navegación y analizar el uso del sitio web.{' '}
                                        <Link
                                            href="/legal/cookies"
                                            className="text-[#1DA1F2] hover:text-white underline underline-offset-2 transition-colors"
                                        >
                                            Más información
                                        </Link>
                                    </p>
                                </div>
                            </div>

                            {/* Botones de acción */}
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto">
                                {/* Botón configurar */}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        openModal();
                                    }}
                                    className="
                    border-white/30 text-white bg-white/10 hover:bg-white hover:text-[#1b2f4b] 
                    hover:border-white transition-all duration-300 text-xs sm:text-sm
                    backdrop-blur-sm
                  "
                                    icon={<Settings className="w-3 h-3" />}
                                    iconPosition="left"
                                >
                                    Configurar
                                </Button>

                                {/* Botón solo necesarias */}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={acceptNecessary}
                                    className="
                    text-gray-200 hover:text-white hover:bg-white/10 
                    transition-all duration-300 text-xs sm:text-sm
                  "
                                >
                                    Solo necesarias
                                </Button>

                                {/* Botón aceptar todo */}
                                <Button
                                    variant="lhc"
                                    size="sm"
                                    onClick={acceptAll}
                                    className="
                    bg-[#1DA1F2] text-white hover:bg-white hover:text-[#1DA1F2] 
                    border-[#1DA1F2] hover:border-white font-medium text-xs sm:text-sm
                    shadow-lg hover:shadow-xl transform hover:scale-105
                  "
                                >
                                    Aceptar todo
                                </Button>
                            </div>
                        </div>

                        {/* Indicador de progreso sutil */}
                        <div className="mt-3 lg:mt-4">
                            <div className="flex items-center gap-2">
                                <div className="h-0.5 bg-white/20 rounded-full flex-1">
                                    <div
                                        className="h-full bg-[#1DA1F2] rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: '33%' }}
                                    />
                                </div>
                                <span className="text-xs text-gray-300">
                                    Configuración de privacidad
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sombra adicional para elevación */}
                <div className="absolute -top-4 left-0 right-0 h-4 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
            </div>

            {/* Estilos de animación */}
            <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
        </>
    );
};

export default CookieBanner;
