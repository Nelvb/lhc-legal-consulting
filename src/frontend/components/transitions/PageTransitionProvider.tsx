/**
 * PageTransitionProvider.tsx
 *
 * Proveedor de transiciones suaves entre páginas para LHC Legal & Consulting.
 * Elimina el parpadeo y añade efectos de transición profesionales.
 * Soluciona el problema del "first navigation flash" de Next.js.
 * 
 * Características:
 * - Fade in/out suave entre páginas
 * - Overlay durante la transición para evitar parpadeos
 * - Loading inteligente (solo si tarda > 200ms)
 * - Fix para primera navegación
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRouteLoaderStore } from '@/stores/useRouteLoaderStore';

interface PageTransitionContextType {
    isTransitioning: boolean;
    showLoader: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextType>({
    isTransitioning: false,
    showLoader: false,
});

export const usePageTransition = () => useContext(PageTransitionContext);

interface PageTransitionProviderProps {
    children: React.ReactNode;
}

const PageTransitionProvider: React.FC<PageTransitionProviderProps> = ({ children }) => {
    const pathname = usePathname();
    const { isNavigating } = useRouteLoaderStore();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [displayChildren, setDisplayChildren] = useState(children);
    const [key, setKey] = useState(pathname);

    useEffect(() => {
        let loaderTimer: NodeJS.Timeout;
        let transitionTimer: NodeJS.Timeout;

        if (isNavigating) {
            // INMEDIATAMENTE ocultar contenido para evitar parpadeo
            setIsTransitioning(true);

            // Solo mostrar loader si la navegación tarda más de 150ms
            loaderTimer = setTimeout(() => {
                if (isNavigating) {
                    setShowLoader(true);
                }
            }, 150);

        } else if (isTransitioning) {
            // Limpiar timer del loader
            clearTimeout(loaderTimer);
            setShowLoader(false);

            // Actualizar contenido inmediatamente
            setDisplayChildren(children);
            setKey(pathname);

            // Pequeño delay para mostrar la nueva página
            transitionTimer = setTimeout(() => {
                setIsTransitioning(false);
            }, 50);
        }

        return () => {
            clearTimeout(loaderTimer);
            clearTimeout(transitionTimer);
        };
    }, [isNavigating, pathname, children, isTransitioning]);

    return (
        <PageTransitionContext.Provider value={{ isTransitioning, showLoader }}>
            <div className="relative">
                {/* Contenido actual - se oculta INMEDIATAMENTE al navegar */}
                <div
                    key={key}
                    className={`transition-opacity duration-150 ease-out ${isTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'
                        }`}
                >
                    {displayChildren}
                </div>

                {/* Overlay de transición que cubre todo - Solo si showLoader es true */}
                {isTransitioning && showLoader && (
                    <div
                        className="absolute inset-0 z-50 bg-white flex items-center justify-center"
                    >
                        <div className="flex flex-col items-center space-y-4">
                            {/* Spinner elegante */}
                            <div className="relative">
                                <div className="w-8 h-8 border-2 border-gray-200 rounded-full animate-spin border-t-[#1b2f4b]"></div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Overlay blanco simple cuando no hay loader - evita parpadeo */}
                {isTransitioning && !showLoader && (
                    <div className="absolute inset-0 z-40 bg-white"></div>
                )}
            </div>

            <style jsx>{`
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        `}</style>
        </PageTransitionContext.Provider>
    );
};

export default PageTransitionProvider;