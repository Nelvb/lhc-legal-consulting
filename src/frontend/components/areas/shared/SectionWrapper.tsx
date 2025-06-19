/**
 * SectionWrapper.tsx
 *
 * Wrapper reutilizable para secciones con animaciones de scroll consistentes.
 * CORREGIDO: Tipo RefObject con HTMLDivElement específico.
 * Centraliza la lógica de animaciones y espaciado entre secciones.
 */

'use client';

import React from 'react';
import { useInView } from '@/hooks/useInView';

interface SectionWrapperProps {
    /** Contenido de la sección */
    children: React.ReactNode;
    /** ID único para la sección (útil para anclas y SEO) */
    id?: string;
    /** Clases CSS adicionales */
    className?: string;
    /** Espaciado inferior de la sección */
    spacing?: 'sm' | 'md' | 'lg' | 'xl';
    /** Configuración de animación */
    animation?: {
        /** Retraso inicial en milisegundos */
        delay?: number;
        /** Umbral de visibilidad para activar animación */
        threshold?: number;
        /** Si la animación debe ejecutarse solo una vez */
        triggerOnce?: boolean;
    };
    /** Fondo de la sección */
    background?: 'transparent' | 'white' | 'gray' | 'gradient';
    /** Ancho máximo del contenido */
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    /** Si debe incluir padding horizontal automático */
    withPadding?: boolean;
}

// Mapeo de espaciados
const spacingMap = {
    sm: 'mb-8 lg:mb-12',
    md: 'mb-12 lg:mb-16',
    lg: 'mb-16 lg:mb-20',
    xl: 'mb-20 lg:mb-24'
};

// Mapeo de fondos
const backgroundMap = {
    transparent: '',
    white: 'bg-white',
    gray: 'bg-gray-50',
    gradient: 'bg-gradient-to-b from-white to-gray-50'
};

// Mapeo de anchos máximos
const maxWidthMap = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-5xl',
    xl: 'max-w-6xl',
    full: 'max-w-full'
};

/**
 * Componente SectionWrapper para animaciones y layout consistente
 */
const SectionWrapper: React.FC<SectionWrapperProps> = ({
    children,
    id,
    className = '',
    spacing = 'lg',
    animation = {
        delay: 0,
        threshold: 0.1,
        triggerOnce: true
    },
    background = 'transparent',
    maxWidth = 'lg',
    withPadding = true
}) => {
    const { ref, inView } = useInView({
        threshold: animation.threshold || 0.1,
        triggerOnce: animation.triggerOnce !== false
    });

    const spacingClass = spacingMap[spacing];
    const backgroundClass = backgroundMap[background];
    const maxWidthClass = maxWidthMap[maxWidth];
    const paddingClass = withPadding ? 'px-6 lg:px-8' : '';

    return (
        <section
            ref={ref}
            id={id}
            className={`
        ${spacingClass}
        ${backgroundClass}
        ${className}
      `.trim()}
        >
            <div className={`
        container mx-auto ${paddingClass}
        transition-all duration-700 transform
        ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
      `.trim()}
                style={{
                    transitionDelay: `${animation.delay || 0}ms`
                }}>
                <div className={`${maxWidthClass} mx-auto`}>
                    {children}
                </div>
            </div>
        </section>
    );
};

/**
 * Variante especializada para títulos de sección
 */
interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    description?: string;
    accentColor?: string;
    alignment?: 'left' | 'center' | 'right';
    size?: 'sm' | 'md' | 'lg';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
    description,
    accentColor = '#1b2f4b',
    alignment = 'center',
    size = 'md'
}) => {
    const alignmentClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
    }[alignment];

    const titleSizeClass = {
        sm: 'text-2xl lg:text-3xl',
        md: 'text-3xl lg:text-4xl',
        lg: 'text-4xl lg:text-5xl'
    }[size];

    return (
        <div className={`mb-12 ${alignmentClass}`}>
            {subtitle && (
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    {subtitle}
                </p>
            )}

            <h2
                className={`${titleSizeClass} font-bold text-[#1b2f4b] mb-4`}
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                {title}
            </h2>

            <div
                className={`w-24 h-1 rounded-full mb-6 ${alignment === 'center' ? 'mx-auto' : ''}`}
                style={{ backgroundColor: accentColor }}
            />

            {description && (
                <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                    {description}
                </p>
            )}
        </div>
    );
};

/**
 * Variante para grids con animación escalonada
 * CORREGIDO: Tipo de ref específico para div
 */
interface AnimatedGridProps {
    children: React.ReactNode;
    columns?: 1 | 2 | 3 | 4;
    gap?: 'sm' | 'md' | 'lg';
    staggerDelay?: number;
}

export const AnimatedGrid: React.FC<AnimatedGridProps> = ({
    children,
    columns = 3,
    gap = 'lg',
    staggerDelay = 150
}) => {
    // CORREGIDO: Especificar HTMLDivElement explícitamente
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true
    }) as {
        ref: React.RefObject<HTMLDivElement>,
        inView: boolean
    };

    const gridClass = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    }[columns];

    const gapClass = {
        sm: 'gap-4',
        md: 'gap-6',
        lg: 'gap-8'
    }[gap];

    return (
        <div
            ref={ref}
            className={`grid ${gridClass} ${gapClass}`}
        >
            {React.Children.map(children, (child, index) => (
                <div
                    key={index}
                    className={`
            transition-all duration-700 transform
            ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        `}
                    style={{
                        transitionDelay: inView ? `${index * staggerDelay}ms` : '0ms'
                    }}
                >
                    {child}
                </div>
            ))}
        </div>
    );
};

export default SectionWrapper;