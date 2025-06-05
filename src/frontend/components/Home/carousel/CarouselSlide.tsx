// Componente de slide individual responsive para el carousel hero de LHC Legal & Consulting
// Ajustado para mantener la imagen de la persona centrada en el corte 70/30 en resoluciones grandes
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
            style={{
                paddingLeft: 'clamp(16px, 5vw, 80px)',
                paddingRight: 'clamp(16px, 5vw, 80px)',
            }}
        >
            {/* Imagen de fondo derecha */}
            <div className="absolute right-0 h-full w-[50%] lg:w-[30%]">
                <Image
                    src={area.backgroundImage}
                    alt={`Fondo ${area.title}`}
                    fill
                    className="object-cover"
                    priority={area.order === 1}
                />
            </div>

            {/* Gradiente overlay izquierda */}
            <div
                className="absolute inset-0 h-full w-[50%] lg:w-[70%]"
                style={{
                    background: `linear-gradient(90deg, #1b2f4b 0%, ${area.gradientEnd} 60%, transparent 100%)`,
                }}
            />

            {/* Contenido del slide */}
            <div className="relative z-20 h-[500px]">
                <div className="max-w-[1600px] mx-auto w-full h-full flex flex-col justify-center">


                    {/* Layout Desktop: texto + persona */}
                    <div className="hidden lg:flex items-center justify-between h-full">
                        {/* Texto izquierda */}
                        <div className="w-[55%] lg:w-[55%] xl:w-[65%] flex flex-col justify-center gap-6 text-white">
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
                            <Link href="/contact">
                                <Button variant="lhc" size="md">
                                    {area.ctaText}
                                </Button>
                            </Link>

                        </div>

                        {/* Persona posicionada en corte 70/30 */}
                        <div className="absolute top-0 left-[70%] -translate-x-1/2 h-full z-10 flex justify-center items-center">
                            <div
                                className="relative h-[500px]"
                                style={{
                                    width: '460px',
                                    minWidth: '460px',
                                }}
                            >


                                <Image
                                    src={area.personImage}
                                    alt={`Cliente satisfecho - ${area.title}`}
                                    fill
                                    className="object-contain"
                                    priority={area.order === 1}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Layout Tablet/Mobile */}
                    <div className="flex lg:hidden relative h-full">
                        {/* Persona centrada */}
                        <div className="absolute inset-0 flex justify-center items-center h-full">
                            <div
                                className="relative h-[500px]"
                                style={{
                                    width: 'clamp(340px, 25vw, 450px)',
                                }}
                            >

                                <Image
                                    src={area.personImage}
                                    alt={`Cliente satisfecho - ${area.title}`}
                                    fill
                                    className="object-cover"
                                    priority={area.order === 1}
                                />
                            </div>
                        </div>

                        {/* Texto centrado */}
                        <div
                            className="relative z-10 w-full flex flex-col justify-center items-center text-center text-white"
                            style={{
                                paddingLeft: 'clamp(12px, 5vw, 40px)',
                                paddingRight: 'clamp(12px, 5vw, 40px)',
                            }}
                        >
                            <div className="mt-[54%] sm:mt-[32%] space-y-4 ">

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
                                    className="text-white/90 font-bold max-w-xl md:mx-auto leading-relaxed"
                                    style={{
                                        fontSize: 'clamp(1rem, 3.5vw, 1.4rem)',
                                    }}
                                >
                                    {area.subtitle}
                                </p>
                                <div className="mt-6 sm:mt-8">
                                    <Link href="/contact">
                                        <Button variant="lhc" size="sm">
                                            {area.ctaText}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarouselSlide;
