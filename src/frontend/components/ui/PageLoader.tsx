/**
 * PageLoader.tsx - Loader inicial de pantalla completa para LHC Legal & Consulting
 * 
 * Sistema cinematográfico optimizado que aparece al cargar la aplicación por primera vez.
 * Proporciona una experiencia de usuario suave y profesional sin bloquear innecesariamente.
 * 
 * Optimizaciones:
 * - Espera solo imágenes críticas (above-the-fold o con priority)
 * - Mantiene mínimo de 1 segundo para efecto cinematográfico
 * - Timeout máximo de 2s para imágenes críticas (vs 5s anterior)
 * - Libera contenido mucho antes que la versión anterior
 * 
 * Características:
 * - Loader de pantalla completa con z-index 9999
 * - Gradiente corporativo LHC (from-[#1b2f4b] to-[#1DA1F2])
 * - Spinner animado con diseño profesional
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

        // Marcar tiempo de inicio para garantizar mínimo de 1 segundo
        const startTime = Date.now();
        const MIN_DISPLAY_TIME = 1000; // Mínimo 1 segundo para efecto cinematográfico

        // Función optimizada: espera solo imágenes críticas (above-the-fold o con priority)
        const waitForCriticalImages = async (): Promise<void> => {
            // Pequeño delay para asegurar que el DOM está renderizado (especialmente imágenes del hero)
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Estrategia 1: Imágenes con priority en Next.js Image (fetchpriority="high")
            const priorityImages = Array.from(
                document.querySelectorAll('img[fetchpriority="high"]')
            ) as HTMLImageElement[];
            
            // Estrategia 2: Imágenes en el viewport inicial (above-the-fold)
            // Incluye específicamente las imágenes del hero (primeros 600px)
            const viewportImages = Array.from(document.images).filter(img => {
                const rect = img.getBoundingClientRect();
                // Considerar críticas si están en el viewport inicial o en la zona del hero (top 600px)
                return (rect.top < window.innerHeight && rect.bottom > 0) || 
                       (rect.top < 600 && rect.bottom > 0);
            });
            
            // Estrategia 3: Imágenes dentro de elementos del hero (carousel)
            // Buscar imágenes dentro de elementos que contengan "hero" o "carousel" en sus clases o estructura
            const heroImages = Array.from(document.images).filter(img => {
                const parent = img.closest('section, div');
                if (!parent) return false;
                // Verificar si está dentro del hero (primeros elementos del main)
                const mainElement = document.querySelector('main');
                if (mainElement && mainElement.contains(img)) {
                    const firstSection = mainElement.querySelector('section, div');
                    if (firstSection && firstSection.contains(img)) {
                        return true;
                    }
                }
                return false;
            });
            
            // Combinar todas las estrategias (sin duplicados)
            const criticalImages = [...new Set([...priorityImages, ...viewportImages, ...heroImages])];
            
            // Si no hay imágenes críticas, retornar inmediatamente
            if (criticalImages.length === 0) {
                return;
            }
            
            // Esperar carga de imágenes críticas con timeout máximo de 2s
            await Promise.allSettled(
                criticalImages.map(img =>
                    new Promise<void>((resolve) => {
                        if (img.complete) return resolve();
                        
                        const timer = setTimeout(() => resolve(), 2000); // Máx 2s de espera
                        
                        img.addEventListener('load', () => {
                            clearTimeout(timer);
                            resolve();
                        }, { once: true });
                        
                        img.addEventListener('error', () => {
                            clearTimeout(timer);
                            resolve();
                        }, { once: true });
                    })
                )
            );
        };

        // Esperar imágenes críticas y luego garantizar mínimo de 1 segundo
        waitForCriticalImages().then(() => {
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, MIN_DISPLAY_TIME - elapsedTime);
            
            // Esperar el tiempo restante para completar el mínimo de 1 segundo
            setTimeout(() => {
                setVisible(false);
                document.body.style.overflow = '';
                
                if (typeof window !== 'undefined') {
                    window.pageLoaderActive = false;
                    window.dispatchEvent(new Event('pageLoaderComplete'));
                }
            }, remainingTime);
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

