// Componente principal del carousel hero para LHC Legal & Consulting
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { CarouselProps } from '@/types/carousel';
import CarouselSlide from './CarouselSlide';

const HeroCarousel: React.FC<CarouselProps> = ({
    areas,
    autoPlay = true,
    autoPlayInterval = 5000
}) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    // Avanzar al siguiente slide
    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % areas.length);
    }, [areas.length]);

    // Ir a slide específico
    const goToSlide = useCallback((index: number) => {
        setCurrentSlide(index);
    }, []);

    // Autoplay logic
    useEffect(() => {
        if (!autoPlay || isPaused || areas.length <= 1) return;

        const interval = setInterval(nextSlide, autoPlayInterval);
        return () => clearInterval(interval);
    }, [autoPlay, isPaused, autoPlayInterval, nextSlide, areas.length]);

    // Pausar autoplay en hover
    const handleMouseEnter = useCallback(() => {
        setIsPaused(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsPaused(false);
    }, []);

    // Navegación con teclado para accesibilidad
    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
        if (event.key === 'ArrowLeft') {
            setCurrentSlide((prev) => (prev - 1 + areas.length) % areas.length);
        } else if (event.key === 'ArrowRight') {
            nextSlide();
        }
    }, [nextSlide, areas.length]);

    if (areas.length === 0) {
        return (
            <section className="w-full h-[500px] bg-lhc-secondary flex items-center justify-center">
                <p className="text-lhc-primary text-xl">No hay áreas legales disponibles</p>
            </section>
        );
    }

    return (
        <section
        className="
          w-full
          h-[500px]
          relative overflow-hidden
        "
      

            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="region"
            aria-label="Carousel de áreas legales"
            aria-live="polite"
        >
            {/* Slides del carousel */}
            {areas.map((area, index) => (
                <CarouselSlide
                    key={area.id}
                    area={area}
                    isActive={index === currentSlide}
                />
            ))}

            {/* Indicadores de navegación (dots) */}
            {areas.length > 1 && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
                    <div className="flex space-x-3">
                        {areas.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`
                  w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50
                  ${index === currentSlide
                                        ? 'bg-white scale-125'
                                        : 'bg-white/50 hover:bg-white/75'
                                    }
                `}
                                aria-label={`Ir al slide ${index + 1}: ${areas[index].title}`}
                                type="button"
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Botones de navegación lateral */}
            {areas.length > 1 && (
                <>
                    <button
                        onClick={() => setCurrentSlide((prev) => (prev - 1 + areas.length) % areas.length)}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                        aria-label="Slide anterior"
                        type="button"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                        aria-label="Siguiente slide"
                        type="button"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}

            {/* Información estructurada para SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LegalService",
                        "name": "LHC Legal & Consulting",
                        "description": "Asesoría legal profesional especializada en múltiples áreas del derecho",
                        "serviceType": areas.map(area => area.titleText),
                        "areaServed": "España",
                        "url": "https://lhclegal.es"
                    })
                }}
            />
        </section>
    );
};

export default HeroCarousel;