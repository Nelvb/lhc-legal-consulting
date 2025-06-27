/**
 * ScrollToTop.tsx
 *
 * Componente de utilidad para scroll optimizado en cambios de ruta.
 * Trabajar coordinadamente con SmartLink para evitar dobles scrolls.
 * Solo actúa cuando NO se usa SmartLink (navegación directa por URL, back/forward, etc.)
 * 
 * Optimizaciones:
 * - Detecta si el scroll ya fue manejado por SmartLink
 * - Scroll instantáneo en lugar de smooth para mejor UX
 * - Debounce para evitar múltiples triggers
 */

'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useRouteLoaderStore } from '@/stores/useRouteLoaderStore';

const ScrollToTop = () => {
    const pathname = usePathname();
    const { isNavigating } = useRouteLoaderStore();
    const lastPathnameRef = useRef<string>('');
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Limpiar timeout anterior si existe
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Solo hacer scroll si:
        // 1. La ruta realmente cambió
        // 2. NO estamos en medio de una navegación de SmartLink
        if (pathname !== lastPathnameRef.current && !isNavigating) {
            // Pequeño delay para asegurar que el DOM se ha actualizado
            timeoutRef.current = setTimeout(() => {
                // Siempre ir al top absoluto de la página
                window.scrollTo(0, 0);
            }, 50);
        }

        // Actualizar la referencia de la ruta anterior
        lastPathnameRef.current = pathname;

        // Cleanup
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [pathname, isNavigating]);

    return null;
};

export default ScrollToTop;