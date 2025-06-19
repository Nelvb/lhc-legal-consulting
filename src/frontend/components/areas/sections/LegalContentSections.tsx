/**
 * LegalContentSections.tsx
 *
 * Componente para renderizar las secciones de contenido desde el JSON.
 * Maneja contenido HTML con dangerouslySetInnerHTML de forma segura.
 * Animaciones escalonadas y tipografía optimizada para legibilidad.
 */

'use client';

import React from 'react';
import SectionWrapper, { AnimatedGrid } from '../shared/SectionWrapper';

interface ContentSection {
    title: string;
    content: string;
    order: number;
}

interface LegalContentSectionsProps {
    /** Array de secciones de contenido */
    contentSections: ContentSection[];
    /** Color de acento del área */
    accentColor: string;
    /** Clases CSS adicionales */
    className?: string;
}

/**
 * Componente LegalContentSections
 * Renderiza secciones de contenido ordenadas con diseño profesional
 */
const LegalContentSections: React.FC<LegalContentSectionsProps> = ({
    contentSections,
    accentColor,
    className = ''
}) => {
    // No renderizar si no hay secciones
    if (!contentSections || contentSections.length === 0) {
        return null;
    }

    // Ordenar secciones por el campo order
    const sortedSections = [...contentSections].sort((a, b) => a.order - b.order);

    return (
        <SectionWrapper
            spacing="lg"
            maxWidth="lg"
            background="transparent"
            className={className}
        >
            <div className="space-y-12">
                {sortedSections.map((section, index) => (
                    <ContentSectionCard
                        key={index}
                        section={section}
                        accentColor={accentColor}
                        delay={index * 200}
                    />
                ))}
            </div>
        </SectionWrapper>
    );
};

/**
 * Card individual para cada sección de contenido
 */
interface ContentSectionCardProps {
    section: ContentSection;
    accentColor: string;
    delay: number;
}

const ContentSectionCard: React.FC<ContentSectionCardProps> = ({
    section,
    accentColor,
    delay
}) => {
    return (
        <article
            className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-500"
            style={{
                animationDelay: `${delay}ms`
            }}
        >
            {/* Título de la sección */}
            <header className="mb-6">
                <h3
                    className="text-2xl lg:text-3xl font-bold text-[#1b2f4b] mb-4"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    {section.title}
                </h3>

                {/* Línea decorativa */}
                <div
                    className="w-16 h-1 rounded-full"
                    style={{ backgroundColor: accentColor }}
                />
            </header>

            {/* Contenido HTML */}
            <div
                className="prose prose-lg max-w-none text-gray-700 [&>p]:mb-4 [&>ul]:my-4 [&>ol]:my-4 [&>li]:mb-2 [&>strong]:text-[#1b2f4b] [&>strong]:font-semibold"
                style={{ fontFamily: "'Inter', sans-serif" }}
                dangerouslySetInnerHTML={{ __html: section.content }}
            />
        </article>
    );
};

export default LegalContentSections;