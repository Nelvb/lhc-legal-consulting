/**
 * LegalCTA.tsx
 *
 * Componente CTA unificado para todas las áreas legales.
 * Texto hardcodeado para consistencia: "Realizar Consulta" + "O llama al" (desktop) / "Llamar Ahora" (móvil).
 * Misma lógica que /areas/page.tsx para mantener coherencia visual y funcional.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import SectionWrapper from '../shared/SectionWrapper';
import SmartLink from "@/components/ui/SmartLink";


interface LegalCTAProps {
    /** Color principal del área */
    accentColor: string;
    /** Color hover del área */
    hoverColor: string;
    /** Clases CSS adicionales */
    className?: string;
}

/**
 * Componente LegalCTA
 * CTA final unificado para todas las áreas legales con texto consistent con /areas
 */
const LegalCTA: React.FC<LegalCTAProps> = ({
    accentColor,
    hoverColor,
    className = ''
}) => {
    return (
        <SectionWrapper
            spacing="lg"
            maxWidth="lg"
            background="transparent"
            className={className}
        >
            <div
                className="rounded-3xl p-12 lg:p-16 text-center shadow-2xl overflow-hidden relative"
                style={{
                    background: `linear-gradient(135deg, ${accentColor} 0%, ${hoverColor} 100%)`
                }}
            >
                {/* Efecto de overlay sutil */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

                <div className="relative z-10 max-w-3xl mx-auto">
                    {/* Título del CTA */}
                    <h2
                        className="text-3xl lg:text-4xl font-bold text-white mb-6"
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            textShadow: '0 2px 10px rgba(0,0,0,0.1)'
                        }}
                    >
                        ¿Necesitas asesoramiento especializado?
                    </h2>

                    {/* Descripción */}
                    <p className="text-xl text-white/90 mb-8 leading-relaxed">
                        No dejes pasar los plazos. Nuestros especialistas analizarán tu caso y te ofrecerán la mejor estrategia de defensa.
                    </p>

                    {/* Botones de acción - IGUAL QUE /AREAS */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        {/* Botón primario - Realizar Consulta */}
                        <SmartLink href="/contact">
                            <Button variant="lhc" size="md">
                                Realizar Consulta
                            </Button>
                        </SmartLink>

                        {/* Móvil: Botón clickeable "Llamar Ahora" */}
                        <a href="tel:+34691818071" className="md:hidden">
                            <Button variant="outline" size="md">
                                Llamar Ahora
                            </Button>
                        </a>

                        {/* Desktop/Tablet: Texto "O llama al" */}
                        <div className="hidden md:flex items-center text-white font-semibold text-lg">
                            O llama al{' '}
                            <span className="ml-2 text-white/90">
                                691 81 80 71
                            </span>
                        </div>
                    </div>

                    {/* Información adicional */}
                    <div className="mt-8 pt-6 border-t border-white/20">
                        <p className="text-sm text-white/80">
                            <strong>Respuesta garantizada en 24h</strong> • Primera consulta gratuita
                        </p>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default LegalCTA;