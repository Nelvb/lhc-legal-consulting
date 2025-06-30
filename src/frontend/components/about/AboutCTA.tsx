/**
 * AboutCTA.tsx
 *
 * Componente Call to Action final para la página Sobre Nosotros.
 * Sección con fondo gradiente LHC que invita al usuario a contactar.
 * Ajustado para eliminar huecos innecesarios en resoluciones entre 1024 y 1412px.
 * ACTUALIZADO: Animación del contenido de texto al entrar en viewport.
 */

'use client';

import React from 'react';
import Link from "next/link";
import Button from "@/components/ui/Button";
import SmartLink from "@/components/ui/SmartLink";
import { useInView } from '@/hooks/useInView';

const AboutCTA = () => {
    // Hook para animación del contenido
    const { ref, inView } = useInView();

    return (
        <section className="py-20 lg:py-28 relative overflow-hidden">

            {/* Fondo gradiente base */}
            <div className="absolute inset-0 bg-lhc-gradient" />

            {/* Layout móvil: imagen arriba, texto abajo */}
            <div className="absolute inset-0 lg:hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749855626/abogada-micro_mnnrn3.webp')`,
                        backgroundPosition: '20% top',
                        backgroundSize: 'cover',
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(to bottom, 
                            transparent 0%, 
                            transparent 50%, 
                            rgba(15, 23, 42, 0.3) 60%, 
                            rgba(15, 23, 42, 0.6) 70%, 
                            rgba(15, 23, 42, 0.8) 80%, 
                            rgba(15, 23, 42, 0.95) 90%, 
                            rgba(15, 23, 42, 1) 100%
                        )`,
                    }}
                />
            </div>

            {/* Layout desktop: imagen izquierda, texto derecha */}
            <div className="absolute inset-0 hidden lg:block">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat lg:bg-[length:90%] xl:bg-[length:70%] 2xl:bg-[length:60%]"
                    style={{
                        backgroundImage: `url('https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749855626/abogada-micro_mnnrn3.webp')`,
                        backgroundPosition: 'left top',
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(to right, 
                            rgba(15, 23, 42, 0.1) 0%, 
                            rgba(15, 23, 42, 0.2) 10%, 
                            rgba(15, 23, 42, 0.3) 20%, 
                            rgba(15, 23, 42, 0.4) 30%, 
                            rgba(15, 23, 42, 0.6) 40%, 
                            rgba(15, 23, 42, 0.8) 50%, 
                            rgba(15, 23, 42, 1) 60%
                        )`,
                    }}
                />
            </div>

            {/* Contenido del CTA con animación */}
            <div className="relative z-10">
                <div className="container mx-auto px-6 lg:px-8">
                    <div 
                        ref={ref}
                        className={`
                            text-center lg:text-left lg:ml-auto lg:max-w-3xl pt-64 sm:pt-72 lg:pt-16 xl:pt-0
                            transition-all duration-700 transform
                            ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                        `}
                    >
                        <h2
                            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 lg:mb-8"
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: '800',
                                letterSpacing: '-0.02em',
                                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                            }}
                        >
                            Conoce cómo nuestro equipo puede ayudarte
                        </h2>

                        <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-white/90 mb-6 lg:mb-8 font-light leading-relaxed">
                            con tu situación específica. Primera consulta completamente gratuita.
                        </p>

                        <SmartLink href="/contacto">
                            <Button variant="outline" size="md" className="shadow-2xl">
                                Contactar ahora
                            </Button>
                        </SmartLink>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutCTA;