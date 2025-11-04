/**
 * PageLoader.tsx - Loader inicial de pantalla completa para LHC Legal & Consulting
 * 
 * Sistema cinematográfico que aparece al cargar la aplicación por primera vez.
 * Proporciona una experiencia de usuario suave y profesional.
 * 
 * Características:
 * - Loader de pantalla completa con z-index 9999
 * - Gradiente corporativo LHC (from-[#1b2f4b] to-[#1DA1F2])
 * - Spinner animado con diseño profesional
 * - Espera carga de imágenes críticas
 * - Control global vía window.pageLoaderActive
 * - Emite evento pageLoaderComplete para sincronización
 * - Fade-out suave de 0.8 segundos
 */

'use client';

import { useState, useEffect } from 'react';

// Establecer estado global del loader
if (typeof window !== 'undefined') {
    window.pageLoaderActive = true;
}

export default function PageLoader() {
    const [visible, setVisible] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        // Bloquear scroll durante la carga
        document.body.style.overflow = 'hidden';

        // Función para esperar a que todas las imágenes se carguen
        const waitForImages = async () => {
            const images = Array.from(document.images);
            if (images.length === 0) return;
            
            await Promise.allSettled(
                images.map(img => new Promise<void>((resolve) => {
                    if (img.complete) return resolve();
                    
                    const timeout = setTimeout(() => resolve(), 5000); // Timeout máximo de 5s
                    
                    img.addEventListener('load', () => {
                        clearTimeout(timeout);
                        resolve();
                    }, { once: true });
                    
                    img.addEventListener('error', () => {
                        clearTimeout(timeout);
                        resolve();
                    }, { once: true });
                }))
            );
        };

        // Esperar imágenes + 1.3 segundos adicionales, luego fade-out
        waitForImages().then(() => {
            setTimeout(() => {
                setVisible(false);
                document.body.style.overflow = '';
                
                if (typeof window !== 'undefined') {
                    window.pageLoaderActive = false;
                    window.dispatchEvent(new Event('pageLoaderComplete'));
                }
            }, 1300);
        });

        // Cleanup: restaurar scroll si el componente se desmonta
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    // Evitar problemas de hidratación en Next.js
    if (!mounted) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#1b2f4b] via-[#1b2f4b] to-[#1DA1F2] transition-opacity duration-700 ${
                visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{
                transition: 'opacity 0.8s ease'
            }}
            role="status"
            aria-label="Cargando aplicación"
        >
            {/* Spinner principal con diseño LHC */}
            <div className="flex flex-col items-center gap-6">
                {/* Spinner animado */}
                <div 
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-4 sm:border-[6px] border-white border-t-transparent rounded-full animate-spin drop-shadow-2xl"
                    style={{
                        boxShadow: '0 0 20px rgba(29, 161, 242, 0.3)'
                    }}
                />
                
                {/* Texto opcional (puede removerse si no se desea) */}
                <div className="text-center">
                    <p className="text-white text-lg sm:text-xl font-semibold tracking-wide">
                        LHC Legal & Consulting
                    </p>
                    <p className="text-white/70 text-sm sm:text-base mt-1">
                        Cargando...
                    </p>
                </div>
            </div>
        </div>
    );
}

