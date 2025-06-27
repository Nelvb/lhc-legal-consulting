/**
 * PageWrapper.tsx
 *
 * Wrapper profesional para páginas individuales que añade transiciones suaves.
 * Debe envolver cada página para conseguir el efecto de transición perfecto.
 * 
 * Uso: Envolver el contenido de cada page.tsx con este componente
 * Ejemplo: <PageWrapper><HomePage /></PageWrapper>
 */

'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface PageWrapperProps {
    children: React.ReactNode;
    className?: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, className = '' }) => {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Reset visibility on route change
        setIsVisible(false);

        // Trigger fade in after a short delay
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 50);

        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <div
            className={`
        transition-all duration-500 ease-out transform
        ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }
        ${className}
        `}
        >
            {children}
        </div>
    );
};

export default PageWrapper;