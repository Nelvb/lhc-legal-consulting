/**
 * LegalSubtopics.tsx
 *
 * Grid de servicios principales con cards de altura uniforme y navegación.
 * Cards clicables que navegan a páginas individuales de subtemas.
 * Usa IconMapper centralizado y animaciones escalonadas profesionales.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import SectionWrapper, { SectionHeader, AnimatedGrid } from './shared/SectionWrapper';
import { renderIcon } from './shared/IconMapper';

interface Subtopic {
    title: string;
    description: string;
    content?: string;
    icon?: string;
    hasPage?: boolean;
    slug?: string;
}

interface LegalSubtopicsProps {
    /** Array de subtemas/servicios principales */
    subtopics: Subtopic[];
    /** Color de acento del área */
    accentColor: string;
    /** Color hover del área */
    hoverColor: string;
    /** Slug del área legal para navegación */
    areaSlug: string;
    /** Título de la sección */
    sectionTitle?: string;
    /** Número de columnas en desktop */
    columns?: 2 | 3 | 4;
    /** Clases CSS adicionales */
    className?: string;
}

/**
 * Componente LegalSubtopics
 * Grid de servicios principales con cards de altura uniforme y navegación
 */
const LegalSubtopics: React.FC<LegalSubtopicsProps> = ({
    subtopics,
    accentColor,
    hoverColor,
    areaSlug,
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
                        areaSlug={areaSlug}
                    />
                ))}
            </AnimatedGrid>
        </SectionWrapper>
    );
};

/**
 * Card individual para cada subtema con altura uniforme y navegación
 */
interface SubtopicCardProps {
    subtopic: Subtopic;
    accentColor: string;
    hoverColor: string;
    areaSlug: string;
}

const SubtopicCard: React.FC<SubtopicCardProps> = ({
    subtopic,
    accentColor,
    hoverColor,
    areaSlug
}) => {
    // Generar slug del subtema basado en el título si no existe
    const subtopicSlug = subtopic.slug || subtopic.title
        .toLowerCase()
        .replace(/[áéíóúü]/g, (match) => {
            const accents: { [key: string]: string } = {
                'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ü': 'u'
            };
            return accents[match] || match;
        })
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

    // URL completa del subtema
    const subtopicUrl = `/areas/${areaSlug}/${subtopicSlug}`;

    // Contenido de la card
    const cardContent = (
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
                    <div className="flex items-center justify-between">
                        <div
                            className="w-12 h-1 rounded-full group-hover:w-20 transition-all duration-300"
                            style={{ backgroundColor: accentColor }}
                        />
                        
                        {/* Indicador de "ver más" */}
                        <div className="flex items-center text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                            <span className="mr-1">Ver más</span>
                            <svg 
                                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );

    // Envolver con Link si el subtema tiene página individual
    if (subtopic.hasPage !== false) {
        return (
            <Link 
                href={subtopicUrl}
                className="block h-full"
                aria-label={`Ver más información sobre ${subtopic.title}`}
            >
                {cardContent}
            </Link>
        );
    }

    // Si no tiene página, mostrar card sin enlace
    return cardContent;
};

export default LegalSubtopics;