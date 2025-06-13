/**
 * Icon.tsx
 * 
 * Componente reutilizable para iconos con fondo gradiente corporativo LHC.
 * Soporte para múltiples tamaños y variantes de estilo.
 * Optimizado para consistencia visual en toda la aplicación.
 * Utiliza gradientes CSS globales para mantenibilidad.
 * Implementa estructura de dos capas para efectos blur correctos.
 * Incluye modo transparente para usar sobre fondos gradiente existentes.
 */

'use client';

import React from 'react';
import clsx from 'clsx';

interface IconProps {
    /** Icono de Lucide React a renderizar */
    children: React.ReactNode;
    /** Tamaño del contenedor del icono */
    size?: 'small' | 'medium' | 'large';
    /** Variante del gradiente de fondo */
    variant?: 'normal' | 'inverted';
    /** Intensidad del efecto blur */
    blur?: 'sm' | 'md' | 'lg';
    /** Radio de bordes redondeados */
    rounded?: 'lg' | 'xl' | '2xl' | '3xl';
    /** Clases CSS adicionales */
    className?: string;
    /** Posicionamiento automático centrado */
    centered?: boolean;
    /** Modo transparente para usar sobre fondos gradiente */
    transparent?: boolean;
    /** Referencia al elemento DOM */
    ref?: React.Ref<HTMLDivElement>;
}

/**
 * Componente Icon para mostrar iconos con fondo gradiente corporativo LHC.
 * Mantiene consistencia visual y permite múltiples configuraciones.
 */
const Icon: React.FC<IconProps> = ({
    children,
    size = 'large',
    variant = 'normal',
    blur = 'sm',
    rounded = '2xl',
    className = '',
    centered = false,
    transparent = false,
    ref
}) => {
    // Configuración de tamaños
    const sizeConfig = {
        small: {
            container: 'w-12 h-12',
            icon: 'w-6 h-6'
        },
        medium: {
            container: 'w-14 h-14',
            icon: 'w-7 h-7'
        },
        large: {
            container: 'w-16 h-16',
            icon: 'w-8 h-8'
        }
    };

    // Clases de gradiente según variante
    const gradientClasses = variant === 'inverted' ? 'bg-lhc-gradient-inverted' : 'bg-lhc-gradient';

    // Clases de blur
    const blurClasses = {
        sm: 'backdrop-blur-sm',
        md: 'backdrop-blur-md',
        lg: 'backdrop-blur-lg'
    };

    // Clases de bordes redondeados
    const roundedClasses = {
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        '3xl': 'rounded-3xl'
    };

    // Clases de posicionamiento
    const positionClasses = centered ? 'mx-auto' : '';

    // Clonar el icono hijo con las clases apropiadas
    const iconElement = React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<any>, {
            className: clsx(
                sizeConfig[size].icon,
                'text-white',
                (children.props as any)?.className
            )
        })
        : children;

    // Modo transparente: solo una capa con bg-white/20
    if (transparent) {
        const transparentClasses = clsx(
            'inline-flex items-center justify-center',
            sizeConfig[size].container,
            'bg-white/20',
            roundedClasses[rounded],
            positionClasses,
            className
        );

        return (
            <div ref={ref} className={transparentClasses}>
                {iconElement}
            </div>
        );
    }

    // Modo normal: dos capas con gradiente + blur
    const outerContainerClasses = clsx(
        sizeConfig[size].container,
        gradientClasses,
        roundedClasses[rounded],
        positionClasses,
        className
    );

    const innerContainerClasses = clsx(
        'bg-white/20',
        blurClasses[blur],
        sizeConfig[size].container,
        roundedClasses[rounded],
        'flex items-center justify-center transition-all duration-300'
    );

    return (
        <div ref={ref} className={outerContainerClasses}>
            <div className={innerContainerClasses}>
                {iconElement}
            </div>
        </div>
    );
};

export default Icon;