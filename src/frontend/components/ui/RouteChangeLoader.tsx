/**
 * RouteChangeLoader.tsx
 *
 * Spinner global profesional que se muestra durante la navegación entre rutas.
 * Conectado al store useRouteLoaderStore para activarse automáticamente
 * cuando se usa SmartLink o navegación programática.
 * 
 * Características:
 * - Overlay translúcido que bloquea interacciones
 * - Spinner animado con branding de LHC
 * - Transiciones suaves de entrada y salida
 * - Z-index alto para estar por encima de todo el contenido
 */

'use client';

import React from 'react';
import { useRouteLoaderStore } from '@/stores/useRouteLoaderStore';

const RouteChangeLoader: React.FC = () => {
    const { isNavigating } = useRouteLoaderStore();

    if (!isNavigating) {
        return null;
    }

    return (
        <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm"
            role="status"
            aria-label="Cargando página"
        >
            <div className="flex flex-col items-center space-y-4">
                {/* Spinner principal */}
                <div className="relative">
                    <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin border-t-[#1b2f4b]"></div>
                    <div className="absolute inset-0 w-12 h-12 border-4 border-transparent rounded-full animate-ping border-t-[#1DA1F2]/30"></div>
                </div>
                
                {/* Texto de carga */}
                <div className="text-center">
                    <p className="text-sm font-medium text-[#1b2f4b] animate-pulse">
                        Cargando...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RouteChangeLoader;