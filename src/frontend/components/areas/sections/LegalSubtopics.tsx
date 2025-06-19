/**
 * LegalSubtopics.tsx
 *
 * Grid de servicios principales con cards de altura uniforme.
 * ACTUALIZADO: Cards con mismo tamaño independientemente del contenido.
 * Usa IconMapper centralizado y animaciones escalonadas profesionales.
 */

'use client';

import React from 'react';
import SectionWrapper, { SectionHeader, AnimatedGrid } from '../shared/SectionWrapper';
import { renderIcon } from '../shared/IconMapper';

interface Subtopic {
    title: string;
    description: string;
    content?: string;
    icon?: string;
}

interface LegalSubtopicsProps {
    /** Array de subtemas/servicios principales */
    subtopics: Subtopic[];
    /** Color de acento del área */
    accentColor: string;
    /** Color hover del área */
    hoverColor: string;
    /** Título de la sección */
    sectionTitle?: string;
    /** Número de columnas en desktop */
    columns?: 2 | 3 | 4;
    /** Clases CSS adicionales */
    className?: string;
}

/**
 * Componente LegalSubtopics
 * Grid de servicios principales con cards de altura uniforme
 */
const LegalSubtopics: React.FC<LegalSubtopicsProps> = ({
    subtopics,
    accentColor,
    hoverColor,
    sectionTitle = "Nuestros Servicios Especializados",
    columns = 3,
    className = ''
}) => {
    // No renderizar si no hay subtemas
    if (!subtopics || subtopics.length === 0) {
        return null;
    }

    return (
        <SectionWrapper
            spacing="lg"
            maxWidth="xl"
            background="transparent"
            className={className}
        >
            <SectionHeader
                title={sectionTitle}
                accentColor={accentColor}
                alignment="center"
                size="md"
            />

            <AnimatedGrid
                columns={columns}
                gap="lg"
                staggerDelay={150}
            >
                {subtopics.map((subtopic, index) => (
                    <SubtopicCard
                        key={index}
                        subtopic={subtopic}
                        accentColor={accentColor}
                        hoverColor={hoverColor}
                    />
                ))}
            </AnimatedGrid>
        </SectionWrapper>
    );
};

/**
 * Card individual para cada subtema con altura uniforme
 */
interface SubtopicCardProps {
    subtopic: Subtopic;
    accentColor: string;
    hoverColor: string;
}

const SubtopicCard: React.FC<SubtopicCardProps> = ({
    subtopic,
    accentColor,
    hoverColor
}) => {
    return (
        <article className="group bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer h-full flex flex-col">
            {/* Icono del servicio */}
            <div className="mb-6">
                <div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-xl text-white shadow-lg transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: accentColor }}
                >
                    {renderIcon(subtopic.icon, 'md')}
                </div>
            </div>

            {/* Contenido de la card - flex-1 para ocupar espacio disponible */}
            <div className="space-y-4 flex-1 flex flex-col">
                <h3
                    className="text-xl font-bold text-[#1b2f4b] group-hover:text-opacity-80 transition-colors duration-300"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    {subtopic.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                    {subtopic.description}
                </p>

                {/* Contenido adicional si existe - flex-1 para empujar indicador abajo */}
                {subtopic.content && (
                    <div className="flex-1">
                        <p className="text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4">
                            {subtopic.content}
                        </p>
                    </div>
                )}

                {/* Indicador visual animado - siempre al final */}
                <div className="mt-auto pt-4">
                    <div
                        className="w-12 h-1 rounded-full group-hover:w-20 transition-all duration-300"
                        style={{ backgroundColor: accentColor }}
                    />
                </div>
            </div>
        </article>
    );
};

export default LegalSubtopics;