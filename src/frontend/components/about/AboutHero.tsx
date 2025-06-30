/**
 * AboutHero.tsx
 *
 * Componente Hero para la página Sobre Nosotros de LHC Legal & Consulting.
 * Incluye imagen de balanza de la justicia con overlay y contenido superpuesto.
 * Animación de entrada del bloque de contenido al hacer scroll (useInView).
 */

'use client';

import Link from "next/link";
import Button from "@/components/ui/Button";
import SmartLink from "@/components/ui/SmartLink";
import { useInView } from "@/hooks/useInView";

const AboutHero = () => {
    const { ref, inView } = useInView({
        threshold: 0.4,
        triggerOnce: true,
    });

    return (
        <section className="relative w-full h-[600px] lg:h-[700px] overflow-hidden">
            {/* Imagen de fondo con overlay */}
            <div className="absolute inset-0">
                <img
                    src="https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749825385/oficina-balanza_savyyd.webp"
                    alt="Balanza de la justicia moderna - LHC Legal & Consulting"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
            </div>

            {/* Contenido animado */}
            <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-6 lg:px-8">
                    <div
                        ref={ref}
                        className={`max-w-4xl transition-all duration-700 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                            }`}
                    >
                        <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-8">
                            Conoce nuestro equipo
                        </div>
                        <h1
                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-8"
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: '800',
                                letterSpacing: '-0.02em',
                                textShadow: '0 4px 20px rgba(0,0,0,0.3)'
                            }}
                        >
                            Detrás de cada caso, un{" "}
                            <span className="text-[#1DA1F2]">compromiso personal</span>
                        </h1>
                        <p className="text-xl sm:text-2xl lg:text-3xl text-white/95 leading-relaxed mb-8 font-light">
                            En LHC Legal & Consulting entendemos que cada situación legal es única y merece toda nuestra atención
                        </p>
                        <SmartLink href="/contact">
                            <Button variant="lhc" size="lg">
                                Consulta gratuita
                            </Button>
                        </SmartLink>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutHero;
