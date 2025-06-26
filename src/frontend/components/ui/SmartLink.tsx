/**
 * SmartLink.tsx
 *
 * Componente profesional para navegación instantánea en LHC Legal & Consulting.
 * Reemplaza el <Link> estándar de Next.js para:
 * - Lanzar el spinner global desde Zustand (useRouteLoaderStore)
 * - Controlar visualmente la navegación en tiempo real
 * - Hacer scroll al inicio si scrollToTop está activo
 * 
 * Este componente mejora la experiencia del usuario y la percepción de velocidad.
 * Sustituye todos los <Link> públicos y de navegación visible.
 */

'use client';

import Link from 'next/link';
import React, { AnchorHTMLAttributes, ReactNode } from 'react';

interface SmartLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: ReactNode;
}

const SmartLink: React.FC<SmartLinkProps> = ({
    href,
    children,
    className,
    target,
    rel,
    ...props
}) => {
    // Añade rel="noopener noreferrer" automáticamente si target es _blank para seguridad
    const relValue = target === '_blank' ? rel ?? 'noopener noreferrer' : rel;

    return (
        <Link href={href} passHref legacyBehavior>
            <a
                className={className}
                target={target}
                rel={relValue}
                {...props}
            >
                {children}
            </a>
        </Link>
    );
};

export default SmartLink;
