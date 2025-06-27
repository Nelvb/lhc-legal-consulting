/**
 * SmartLink.tsx
 *
 * Componente simplificado para navegación con loading inteligente.
 * Solo muestra spinner si la navegación tarda más de 300ms.
 * Elimina transiciones complejas que causan parpadeos.
 */

'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React, { AnchorHTMLAttributes, ReactNode, useCallback } from 'react';
import { useRouteLoaderStore } from '@/stores/useRouteLoaderStore';

interface SmartLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
    href: string;
    children: ReactNode;
    scrollToTop?: boolean;
    prefetch?: boolean;
    replace?: boolean;
}

const SmartLink: React.FC<SmartLinkProps> = ({
    href,
    children,
    className,
    target,
    rel,
    scrollToTop = true,
    prefetch = true,
    replace = false,
    onClick,
    ...props
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const { startNavigation, endNavigation } = useRouteLoaderStore();

    // Añade rel="noopener noreferrer" automáticamente si target es _blank para seguridad
    const relValue = target === '_blank' ? rel ?? 'noopener noreferrer' : rel;

    // Determina si es navegación externa
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
    
    // Determina si es la misma página
    const isSamePage = href === pathname;

    const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        // Ejecuta onClick personalizado si existe
        onClick?.(e);

        // No interceptar si es navegación externa, nueva pestaña, etc.
        if (
            isExternal || 
            e.ctrlKey || 
            e.metaKey || 
            target === '_blank' ||
            isSamePage ||
            e.defaultPrevented
        ) {
            return;
        }

        // Previene navegación por defecto
        e.preventDefault();

        // Timer para mostrar loading solo si tarda
        let loadingTimer: NodeJS.Timeout;
        let hasNavigated = false;

        // Mostrar loading solo si tarda más de 300ms
        loadingTimer = setTimeout(() => {
            if (!hasNavigated) {
                startNavigation();
            }
        }, 300);

        // Scroll al inicio si está habilitado
        if (scrollToTop) {
            window.scrollTo(0, 0);
        }

        // Navegación
        const navigate = async () => {
            try {
                if (replace) {
                    router.replace(href);
                } else {
                    router.push(href);
                }
                
                // Marcar como navegado y limpiar loading
                hasNavigated = true;
                clearTimeout(loadingTimer);
                endNavigation();
                
            } catch (error) {
                // En caso de error, limpiar todo
                hasNavigated = true;
                clearTimeout(loadingTimer);
                endNavigation();
            }
        };

        navigate();

    }, [
        href, 
        pathname, 
        router, 
        startNavigation, 
        endNavigation, 
        scrollToTop, 
        replace, 
        onClick, 
        isExternal, 
        isSamePage, 
        target
    ]);

    // Si es enlace externo, usar <a> normal
    if (isExternal) {
        return (
            <a
                href={href}
                className={className}
                target={target}
                rel={relValue}
                onClick={onClick}
                {...props}
            >
                {children}
            </a>
        );
    }

    return (
        <Link 
            href={href} 
            prefetch={prefetch}
            className={className}
            onClick={handleClick}
            {...props}
        >
            {children}
        </Link>
    );
};

export default SmartLink;