/**
 * SmartLink.tsx
 *
 * Componente simplificado para navegación con loading inteligente.
 * Solo muestra spinner si la navegación tarda más de 300ms.
 * Elimina transiciones complejas que causan parpadeos.
 * 
 */

'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React, { AnchorHTMLAttributes, ReactNode, useCallback } from 'react';
import { useRouteLoaderStore } from '@/stores/useRouteLoaderStore';

interface SmartLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
    href: string;
    children: ReactNode;
    prefetch?: boolean;
    replace?: boolean;
}

const SmartLink: React.FC<SmartLinkProps> = ({
    href,
    children,
    className,
    target,
    rel,
    prefetch = true,
    replace = false,
    onClick,
    ...props
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const { startNavigation, endNavigation } = useRouteLoaderStore();

    const relValue = target === '_blank' ? rel ?? 'noopener noreferrer' : rel;
    const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
    const isSamePage = href === pathname;

    const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);

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

        e.preventDefault();

        let loadingTimer: NodeJS.Timeout;
        let hasNavigated = false;

        loadingTimer = setTimeout(() => {
            if (!hasNavigated) {
                startNavigation();
            }
        }, 300);

        const navigate = async () => {
            try {
                if (replace) {
                    router.replace(href);
                } else {
                    router.push(href);
                }

                hasNavigated = true;
                clearTimeout(loadingTimer);
                endNavigation();
            } catch (error) {
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
        replace,
        onClick,
        isExternal,
        isSamePage,
        target
    ]);

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
