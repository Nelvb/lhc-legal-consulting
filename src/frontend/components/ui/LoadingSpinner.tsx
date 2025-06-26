/**
 * LoadingSpinner.tsx
 * 
 * Componente reutilizable de loading para LHC Legal & Consulting.
 * Diseño consistente con gradiente corporativo y spinner profesional.
 * Se usa en todas las páginas que necesiten mostrar estado de carga.
 */

'use client';

import React from 'react';

interface LoadingSpinnerProps {
    /** Texto a mostrar debajo del spinner */
    text?: string;
    /** Tamaño del spinner */
    size?: 'sm' | 'md' | 'lg';
    /** Mostrar en pantalla completa o como componente inline */
    fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    text = 'Cargando...',
    size = 'md',
    fullScreen = true
}) => {
    const spinnerSizes = {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    const textSizes = {
        sm: 'text-base',
        md: 'text-xl',
        lg: 'text-2xl'
    };

    const containerClasses = fullScreen
        ? 'fixed inset-0 z-50 flex justify-center items-center'
        : 'flex justify-center items-center py-12';

    return (
        <div className={containerClasses}>
            {/* Fondo gradiente LHC solo si es pantalla completa */}
            {fullScreen && <div className="absolute inset-0 bg-lhc-gradient-inverted" />}

            {/* Contenido del spinner */}
            <div className="relative z-10 text-center">
                {/* Spinner circular */}
                <div className="flex justify-center mb-6">
                    <div className={`${spinnerSizes[size]} border-2 border-white/30 border-t-white rounded-full animate-spin`} />
                </div>

                {/* Texto de carga */}
                <div className={`${textSizes[size]} text-white font-medium`}>
                    {text}
                </div>

                {/* Puntos animados */}
                <div className="flex justify-center space-x-1 mt-3">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                </div>
            </div>
        </div>
    );
};

export default LoadingSpinner;