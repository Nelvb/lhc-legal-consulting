// Componente de slide individual responsive para el carousel hero de LHC Legal & Consulting
// Optimizado para eliminar franjas laterales en tablet y móvil, manteniendo diseño profesional
'use client';

import React from 'react';
import Image from 'next/image';
import SmartLink from '@/components/ui/SmartLink';
import { CarouselSlideProps } from '@/types/carousel';
import Button from '@/components/ui/Button';

const CarouselSlide: React.FC<CarouselSlideProps> = ({ area, isActive }) => {
    return (
        <div
            className={`
                absolute inset-0 w-full h-[500px]
                transition-opacity duration-700 ease-in-out
                ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}
            `}
        >
            {/* Layout Desktop */}
            <div className="hidden lg:block relative w-full h-full"
                style={{
                    paddingLeft: 'clamp(16px, 5vw, 80px)',
                    paddingRight: 'clamp(16px, 5vw, 80px)',
                }}>

                {/* Imagen de fondo derecha en desktop */}
                <div className="absolute right-0 h-full w-[30%]">
                    <Image
                        src={area.backgroundImage}
                        alt={`Fondo ${area.title}`}
                        fill
                        sizes="30vw"
                        className="object-cover"
                        priority={area.order === 1}
                    />
                </div>

                {/* Gradiente overlay izquierda en desktop */}
                <div
                    className="absolute inset-0 h-full w-[70%]"
                    style={{
                        background: `linear-gradient(90deg, #1b2f4b 0%, ${area.gradientEnd} 60%, transparent 100%)`,
                    }}
                />

                {/* Contenido desktop */}
                <div className="relative z-20 h-[500px]">
                    <div className="max-w-[1600px] mx-auto w-full h-full flex items-center justify-between">
                        {/* Texto izquierda */}
                        <div className="w-[55%] xl:w-[65%] flex flex-col justify-center gap-6 text-white">
                            <h1
                                className="font-medium tracking-tight"
                                style={{
                                    fontSize: 'clamp(2rem, 4vw, 4.5rem)',
                                    lineHeight: 1.1,
                                }}
                            >
                                {area.title}
                            </h1>
                            <p
                                className="text-white/90 font-bold max-w-2xl leading-relaxed"
                                style={{
                                    fontSize: 'clamp(1.1rem, 2vw, 2rem)',
                                }}
                            >
                                {area.subtitle}
                            </p>
                            <SmartLink href="/contact">
                                <Button variant="lhc" size="md">
                                    {area.ctaText}
                                </Button>
                            </SmartLink>
                        </div>

                        {/* Persona posicionada en corte 70/30 */}
                        <div className="absolute top-0 left-[70%] -translate-x-1/2 h-full z-10 flex justify-center items-center">
                            <div
                                className="relative overflow-hidden"
                                style={{
                                    width: '460px',
                                    height: '500px',
                                    minWidth: '460px',
                                    minHeight: '500px',
                                }}
                            >
                                <Image
                                    src={area.personImage}
                                    alt={`Cliente satisfecho - ${area.title}`}
                                    fill
                                    sizes="460px"
                                    className="object-contain"
                                    priority={area.order === 1}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Layout Tablet/Mobile */}
            <div className="lg:hidden relative w-full h-full overflow-hidden">
                {/* Fondo de pantalla completa sin franjas */}
                <div className="absolute inset-0 w-full h-full z-0">
                    {/* Gradiente izquierda que cubre toda la pantalla */}
                    <div
                        className="absolute inset-0 w-full h-full"
                        style={{
                            background: `linear-gradient(to right, #1b2f4b 0%, ${area.gradientEnd} 45%, ${area.gradientEnd} 55%, transparent 100%)`,
                        }}
                    />

                    {/* Imagen de fondo derecha */}
                    <div className="absolute right-0 top-0 w-[50%] h-full">
                        <Image
                            src={area.backgroundImage}
                            alt={`Fondo ${area.title}`}
                            fill
                            sizes="50vw"
                            className="object-cover"
                            priority={area.order === 1}
                        />
                    </div>
                </div>

                {/* Persona centrada */}
                <div className="absolute inset-0 flex justify-center items-center z-10">
                    <div
                        className="relative overflow-hidden"
                        style={{
                            width: '460px',
                            height: '500px',
                            minWidth: '460px',
                            minHeight: '500px',
                        }}
                    >
                        <Image
                            src={area.personImage}
                            alt={`Cliente satisfecho - ${area.title}`}
                            fill
                            sizes="460px"
                            className="object-contain"
                            priority={area.order === 1}
                        />
                    </div>
                </div>

                {/* Contenido de texto */}
                <div className="relative z-20 w-full h-full flex flex-col justify-center items-center text-center text-white px-4 sm:px-6">
                <div className="mt-[10%] sm:mt-[15%] space-y-4 max-w-sm sm:max-w-xl md:max-w-2xl mx-auto">
                        <h1
                            className="font-medium tracking-tight"
                            style={{
                                fontSize: 'clamp(1.4rem, 6vw, 2.6rem)',
                                lineHeight: 1.15,
                            }}
                        >
                            {area.title}
                        </h1>
                        <p
                            className="text-white/90 font-bold leading-relaxed"
                            style={{
                                fontSize: 'clamp(1rem, 3.5vw, 1.4rem)',
                            }}
                        >
                            {area.subtitle}
                        </p>
                        <div className="mt-6 sm:mt-8">
                            <SmartLink href="/contact">
                                <Button variant="lhc" size="sm">
                                    {area.ctaText}
                                </Button>
                            </SmartLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarouselSlide;