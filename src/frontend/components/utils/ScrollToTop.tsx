/**
 * ScrollToTop.tsx
 *
 * Componente de utilidad para forzar scroll al principio en cada cambio de ruta.
 * Soluciona el comportamiento por defecto del App Router que mantiene la posición de scroll.
 * Se debe colocar una sola vez en ClientLayout y AdminLayout.
 */

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ScrollToTop = () => {
    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);

    return null;
};

export default ScrollToTop;
