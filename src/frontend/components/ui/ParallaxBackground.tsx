/**
 * ParallaxBackground.tsx
 * 
 * Componente de fondo parallax para LHC Legal & Consulting.
 * Muestra una imagen suave con efecto parallax,
 * siempre en el fondo absoluto sin interferir con el layout.
 * Compatible con blur, overlay y responsive completo.
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface ParallaxBackgroundProps {
  imageUrl?: string;
  opacity?: number;
  overlayColor?: string;
  overlayOpacity?: number;
  parallaxSpeed?: number;
  minHeight?: string;
  className?: string;
  children?: React.ReactNode;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  imageUrl = 'https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749470257/Flux_Dev_statue_of_Lady_Justice_standing_proudly_against_a_ser_1_1_jpb0tn.webp',
  opacity = 0.15,
  overlayColor = '#1b2f4b',
  overlayOpacity = 0.3,
  parallaxSpeed = 0.5,
  minHeight = '100vh',
  className = '',
  children
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageTransformRef = useRef<HTMLDivElement>(null);
  const offsetYRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current || !imageTransformRef.current) return;

    let ticking = false;
    let lastFrame = 0;
    const throttleDelay = 16; // ~60fps (una vez por frame)

    const handleScroll = () => {
      const now = Date.now();
      if (!ticking && now - lastFrame >= throttleDelay) {
        requestAnimationFrame(() => {
          if (containerRef.current && imageTransformRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const elementTop = rect.top;
            const elementHeight = rect.height;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight && elementTop + elementHeight > 0) {
              const scrolled = window.pageYOffset;
              const newOffsetY = scrolled * parallaxSpeed;
              
              // Actualizar ref sin causar re-render
              offsetYRef.current = newOffsetY;
              
              // Aplicar transform directamente al DOM
              imageTransformRef.current.style.transform = `translate3d(0, ${newOffsetY}px, 0)`;
            }
          }
          ticking = false;
          lastFrame = Date.now();
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Ejecutar una vez al montar

    return () => window.removeEventListener('scroll', handleScroll);
  }, [parallaxSpeed]);

  const hexToRgba = (hex: string, alpha: number): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden z-[-10] ${className}`}
      style={{ minHeight }}
    >
      {/* Imagen de fondo */}
      <div
        ref={imageTransformRef}
        className="absolute inset-0 w-full h-full"
        style={{
          willChange: 'transform'
        }}
      >
        <div
          className="relative w-full h-[200%] sm:h-[150%] md:h-[120%] top-[-180%] min-[390px]:top-[-140%] sm:top-[-80%] md:top-[-50%]"
          style={{
            opacity: isLoaded ? opacity : 0,
            transition: 'opacity 0.5s ease-in-out'
          }}
        >
          <Image
            src={imageUrl}
            alt="Fondo - Dama de la Justicia"
            fill
            sizes="100vw"
            className="object-cover"
            quality={85}
            priority={false}
            onLoad={() => setIsLoaded(true)}
            style={{
              filter: 'blur(0.5px)',
              objectPosition: 'center 40%'
            }}
          />
        </div>
      </div>

      {/* Overlay suave */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: `linear-gradient(
            135deg,
            ${hexToRgba(overlayColor, overlayOpacity)} 0%,
            ${hexToRgba(overlayColor, overlayOpacity * 0.7)} 50%,
            ${hexToRgba(overlayColor, overlayOpacity * 0.5)} 100%
          )`
        }}
      />

      {/* Contenido opcional encima */}
      {children && (
        <div className="relative z-10 w-full">
          {children}
        </div>
      )}
    </div>
  );
};

export default ParallaxBackground;