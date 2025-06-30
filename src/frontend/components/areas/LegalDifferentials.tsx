/**
 * LegalDifferentials.tsx
 *
 * Sección de diferenciales con colores dinámicos del área legal.
 * ACTUALIZADO: Recibe accentColor para personalizar iconos y elementos.
 * Mantiene consistencia visual con el área específica.
 * Animaciones individuales por elemento al entrar en viewport.
 */

'use client';

import { FileCheck, Users, Clock, Trophy } from 'lucide-react';
import React from 'react';
import { useInView } from '@/hooks/useInView';

interface LegalDifferentialsProps {
    /** Color de acento del área legal */
    accentColor?: string;
    /** Clases CSS adicionales */
    className?: string;
}

const items = [
    {
        icon: <Trophy className="w-8 h-8 text-white" />,
        title: 'Análisis jurídico experto',
        description: 'Valoramos cada caso con mirada técnica y realista',
    },
    {
        icon: <Clock className="w-8 h-8 text-white" />,
        title: 'Comunicación continua',
        description: 'Informamos en cada fase del procedimiento',
    },
    {
        icon: <FileCheck className="w-8 h-8 text-white" />,
        title: 'Recursos sólidos',
        description: 'Argumentamos con base normativa y jurisprudencia',
    },
    {
        icon: <Users className="w-8 h-8 text-white" />,
        title: 'Defensa personalizada',
        description: 'El abogado que empieza tu caso, lo termina contigo',
    },
];

const LegalDifferentials: React.FC<LegalDifferentialsProps> = ({
    accentColor = '#1b2f4b',
    className = ''
}) => {
    // Hook para el título
    const { ref: titleRef, inView: titleInView } = useInView();

    return (
        <section className={`py-20 bg-gradient-to-b from-white to-gray-50 ${className}`}>
            <div className="container mx-auto px-6 lg:px-8">
                {/* Título con animación */}
                <div 
                    ref={titleRef}
                    className={`
                        text-center mb-12
                        transition-all duration-700 transform
                        ${titleInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                    `}
                >
                    <h2
                        className="text-3xl lg:text-4xl font-bold text-[#1b2f4b] mb-4"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        Lo que nos hace diferentes
                    </h2>
                    <div
                        className="w-24 h-1 mx-auto rounded-full"
                        style={{ backgroundColor: accentColor }}
                    />
                </div>

                {/* Grid de tarjetas - cada una con su propia animación */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {items.map((item, index) => {
                        const { ref, inView } = useInView();

                        return (
                            <div
                                ref={ref}
                                key={index}
                                className={`
                                    bg-white p-8 rounded-2xl shadow-lg text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group
                                    transform duration-700
                                    ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                                `}
                            >
                                <div
                                    className="flex items-center justify-center w-16 h-16 mx-auto rounded-full mb-6 transition-all duration-300 group-hover:scale-110"
                                    style={{ backgroundColor: accentColor }}
                                >
                                    {item.icon}
                                </div>
                                <h3
                                    className="text-xl font-semibold text-[#1b2f4b] mb-2"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default LegalDifferentials;