/**
 * HeroCarousel.tsx
 * 
 * Componente principal del carousel hero para LHC Legal & Consulting con efecto noria infinito.
 * Los slides se mueven continuamente como una rueda sin saltos visuales ni repeticiones.
 * Implementa movimiento suave, autoplay, navegación manual y accesibilidad completa.
 * Perfecto para 7 áreas legales que rotan infinitamente de derecha a izquierda.
 */
'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { CarouselProps } from '@/types/carousel';
import CarouselSlide from './CarouselSlide';

const HeroCarousel: React.FC<CarouselProps> = ({
    areas,
    autoPlay = true,
    autoPlayInterval = 4000
}) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Avanzar al siguiente slide (noria hacia la izquierda)
    const nextSlide = useCallback(() => {
        if (isTransitioning || areas.length === 0) return;
        
        setIsTransitioning(true);
        setCurrentSlide(prev => (prev + 1) % areas.length);
        
        // Desbloquear después de la transición
        setTimeout(() => setIsTransitioning(false), 700);
    }, [isTransitioning, areas.length]);

    // Retroceder al slide anterior (noria hacia la derecha)
    const prevSlide = useCallback(() => {
        if (isTransitioning || areas.length === 0) return;
        
        setIsTransitioning(true);
        setCurrentSlide(prev => (prev - 1 + areas.length) % areas.length);
        
        // Desbloquear después de la transición
        setTimeout(() => setIsTransitioning(false), 700);
    }, [isTransitioning, areas.length]);

    // Ir a slide específico
    const goToSlide = useCallback((index: number) => {
        if (isTransitioning || index === currentSlide) return;
        
        setIsTransitioning(true);
        setCurrentSlide(index);
        
        // Desbloquear después de la transición
        setTimeout(() => setIsTransitioning(false), 700);
    }, [isTransitioning, currentSlide]);

    // Lógica de autoplay
    useEffect(() => {
        if (!autoPlay || isPaused || areas.length <= 1 || isTransitioning) return;

        const interval = setInterval(nextSlide, autoPlayInterval);
        return () => clearInterval(interval);
    }, [autoPlay, isPaused, autoPlayInterval, nextSlide, areas.length, isTransitioning]);

    // Pausar autoplay en hover
    const handleMouseEnter = useCallback(() => {
        setIsPaused(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsPaused(false);
    }, []);

    // Navegación con teclado para accesibilidad
    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
        if (isTransitioning) return;
        
        if (event.key === 'ArrowLeft') {
            prevSlide();
        } else if (event.key === 'ArrowRight') {
            nextSlide();
        }
    }, [nextSlide, prevSlide, isTransitioning]);

    // Calcular posición de cada slide en la noria (memoizado)
    const slidePositions = useMemo(() => {
        const totalSlides = areas.length;
        return areas.map((_, index) => {
            let position = index - currentSlide;
            
            // Normalizar posición para efecto noria circular
            if (position < -Math.floor(totalSlides / 2)) {
                position += totalSlides;
            } else if (position > Math.floor(totalSlides / 2)) {
                position -= totalSlides;
            }
            
            return position * 100; // Cada slide se mueve 100% del ancho
        });
    }, [currentSlide, areas.length]);

    // Función auxiliar para obtener posición (mantiene compatibilidad)
    const getSlidePosition = useCallback((index: number): number => {
        return slidePositions[index] || 0;
    }, [slidePositions]);

    if (areas.length === 0) {
        return (
            <section className="w-full h-[500px] bg-gray-100 flex items-center justify-center">
                <p className="text-gray-600 text-xl">No hay áreas legales disponibles</p>
            </section>
        );
    }

    return (
        <section
            className="w-full h-[500px] relative overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-label="Carousel de áreas legales de LHC Legal & Consulting"
            aria-live="polite"
        >
            {/* Container de slides con efecto noria */}
            <div 
                ref={carouselRef}
                className="relative w-full h-full"
            >
                {areas.map((area, index) => {
                    const translateX = slidePositions[index];
                    // Solo renderizar slides visibles + buffer (optimización)
                    const isVisible = Math.abs(translateX) <= 100;
                    
                    // No renderizar slides fuera del viewport para mejor rendimiento
                    if (!isVisible) {
                        return null;
                    }
                    
                    return (
                        <div
                            key={area.id}
                            className="absolute inset-0 w-full h-full transition-transform duration-700 ease-in-out"
                            style={{
                                transform: `translateX(${translateX}%)`
                            }}
                        >
                            <CarouselSlide
                                area={area}
                                isActive={index === currentSlide}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Indicadores de navegación */}
            {areas.length > 1 && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
                    <div className="flex space-x-3">
                        {areas.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                disabled={isTransitioning}
                                className={`
                                    w-3 h-3 rounded-full transition-all duration-300 
                                    focus:outline-none focus:ring-2 focus:ring-white/50
                                    disabled:cursor-not-allowed
                                    ${index === currentSlide
                                        ? 'bg-white scale-125'
                                        : 'bg-white/50 hover:bg-white/75'
                                    }
                                `}
                                aria-label={`Ir al área legal ${index + 1}: ${areas[index].titleText}`}
                                type="button"
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Controles de navegación lateral */}
            {areas.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        disabled={isTransitioning}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 
                                 bg-white/20 hover:bg-white/30 disabled:hover:bg-white/20
                                 text-white p-3 rounded-full transition-all duration-300 
                                 focus:outline-none focus:ring-2 focus:ring-white/50
                                 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Área legal anterior"
                        type="button"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={nextSlide}
                        disabled={isTransitioning}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 
                                 bg-white/20 hover:bg-white/30 disabled:hover:bg-white/20
                                 text-white p-3 rounded-full transition-all duration-300 
                                 focus:outline-none focus:ring-2 focus:ring-white/50
                                 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Siguiente área legal"
                        type="button"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}

            {/* Información del slide actual para lectores de pantalla */}
            <div className="sr-only" aria-live="polite">
                Slide {currentSlide + 1} de {areas.length}: {areas[currentSlide]?.titleText}
            </div>

            {/* Datos estructurados para SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LegalService",
                        "name": "LHC Legal & Consulting",
                        "description": "Asesoría legal profesional especializada en múltiples áreas del derecho en España",
                        "serviceType": areas.map(area => area.titleText),
                        "areaServed": {
                            "@type": "Country",
                            "name": "España"
                        },
                        "url": "https://lhclegal.es",
                        "provider": {
                            "@type": "LegalService",
                            "name": "LHC Legal & Consulting"
                        },
                        "offers": areas.map(area => ({
                            "@type": "Offer",
                            "name": area.titleText,
                            "description": area.subtitle,
                            "url": `https://lhclegal.es${area.link}`
                        }))
                    })
                }}
            />
        </section>
    );
};

export default HeroCarousel;