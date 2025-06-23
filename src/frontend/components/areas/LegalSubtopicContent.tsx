/**
 * LegalSubtopicContent.tsx
 *
 * Componente simplificado para páginas de subtopics.
 * Solo introducción, puntos clave y CTA reutilizable.
 * Todos los contenedores con mismo ancho para consistencia visual.
 */

'use client';

import React from 'react';
import { LegalSubtopicContentProps } from '@/types/legalArea';
import SectionWrapper, { SectionHeader } from './shared/SectionWrapper';
import LegalCTA from './sections/LegalCTA';
import { Check } from 'lucide-react';

const LegalSubtopicContent: React.FC<LegalSubtopicContentProps> = ({
    subtopicData,
    areaConfig
}) => {
    return (
        <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
            <div className="py-16">

                {/* Introducción Extendida */}
                {subtopicData.extendedIntroduction && (
                    <SectionWrapper spacing="lg" maxWidth="lg" background="white">
                        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-gray-100">
                            <SectionHeader
                                title="Sobre Este Servicio"
                                accentColor={areaConfig.color}
                                alignment="left"
                                size="md"
                            />
                            <div className="text-left">
                                <p className="text-lg lg:text-xl text-gray-700 leading-relaxed"
                                    style={{ fontFamily: "'Inter', sans-serif", lineHeight: '1.75' }}>
                                    {subtopicData.extendedIntroduction}
                                </p>
                            </div>
                        </div>
                    </SectionWrapper>
                )}

                {/* Puntos Clave */}
                {subtopicData.keyPoints && subtopicData.keyPoints.length > 0 && (
                    <SectionWrapper spacing="lg" maxWidth="lg" background="transparent">
                        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-gray-100">
                            <SectionHeader
                                title={`¿Qué incluye nuestro servicio de ${subtopicData.title}?`}
                                accentColor={areaConfig.color}
                                alignment="center"
                                size="md"
                            />
                            <div className="grid gap-6 lg:gap-8 mt-8">
                                {subtopicData.keyPoints.map((point, index) => (
                                    <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 group">
                                        <div
                                            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300"
                                            style={{ backgroundColor: areaConfig.color }}
                                        >
                                            <Check className="w-5 h-5 text-white" strokeWidth={3} />
                                        </div>
                                        <p className="text-gray-700 leading-relaxed flex-1"
                                            style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', lineHeight: '1.6' }}>
                                            {point}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SectionWrapper>
                )}

                {/* CTA Reutilizable */}
                <LegalCTA
                    accentColor={areaConfig.color}
                    hoverColor={areaConfig.hoverColor}
                />

            </div>
        </div>
    );
};

export default LegalSubtopicContent;