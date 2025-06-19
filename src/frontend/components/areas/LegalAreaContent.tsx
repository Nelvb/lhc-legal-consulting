/**
 * LegalAreaContent.tsx
 *
 * Componente principal que orquesta la vista de cada área legal (/areas/[slug]).
 * Arquitectura modular con componentes reutilizables.
 * Incluye mejoras visuales, tipográficas y de accesibilidad.
 * Cada sección hereda el color principal del área definido en el JSON correspondiente.
 */

'use client';

import React from 'react';
import { LegalAreaContentProps } from '@/types/legalArea';

// Importar componentes modulares
import LegalIntro from './sections/LegalIntro';
import LegalContentSections from './sections/LegalContentSections';
import LegalSubtopics from './sections/LegalSubtopics';
import LegalOtherServices from './sections/LegalOtherServices';
import LegalDifferentials from './LegalDifferentials';
import LegalFAQs from './sections/LegalFAQs';
import LegalCTA from './sections/LegalCTA';

/**
 * Componente orquestador de contenido para cada área legal
 * Utiliza los datos cargados desde el JSON del área
 */
const LegalAreaContent: React.FC<LegalAreaContentProps> = ({
    areaData,
    areaConfig
}) => {
    return (
        <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
            <div className="py-16">

                {/* Introducción general del área */}
                <LegalIntro
                    introduction={areaData.introduction}
                    accentColor={areaConfig.color}
                />

                {/* Secciones de contenido principales */}
                {areaData.contentSections?.length > 0 && (
                    <LegalContentSections
                        contentSections={areaData.contentSections}
                        accentColor={areaConfig.color}
                    />
                )}

                {/* Servicios principales en formato card */}
                {areaData.subtopics?.length > 0 && (
                    <LegalSubtopics
                        subtopics={areaData.subtopics}
                        accentColor={areaConfig.color}
                        hoverColor={areaConfig.hoverColor}
                    />
                )}

                {/* Servicios complementarios sin container */}
                {areaData.otherServices?.length > 0 && (
                    <LegalOtherServices
                        services={areaData.otherServices}
                        accentColor={areaConfig.color}
                    />
                )}

                {/* Diferenciales del despacho adaptados al área */}
                <LegalDifferentials
                    accentColor={areaConfig.color}
                />

                {/* Preguntas frecuentes si existen en el JSON */}
                {areaData.faqs?.length > 0 && (
                    <LegalFAQs
                        faqs={areaData.faqs}
                        accentColor={areaConfig.color}
                    />
                )}

                {/* Call to Action final con botón de contacto */}
                {areaData.cta && (
                    <LegalCTA
                        accentColor={areaConfig.color}
                        hoverColor={areaConfig.hoverColor}
                    />
                )}
            </div>
        </div>
    );
};

export default LegalAreaContent;
