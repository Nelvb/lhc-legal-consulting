/**
 * LegalSubtopicHero.tsx
 *
 * Hero específico para páginas de subtopics.
 * Reutiliza LegalAreaHero pero con props adaptadas para servicios individuales.
 * Mantiene consistencia visual con las páginas de área.
 */

'use client';

import React from 'react';
import LegalAreaHero from './LegalAreaHero';

interface LegalSubtopicHeroProps {
    subtopicTitle: string;
    subtopicDescription: string;
    areaColor: string;
}

const LegalSubtopicHero: React.FC<LegalSubtopicHeroProps> = ({
    subtopicTitle,
    subtopicDescription,
    areaColor
}) => {
    // CTA simplificado para subtopics
    const subtopicCTA = {
        title: `¿Necesitas ayuda con ${subtopicTitle.toLowerCase()}?`,
        description: `Nuestros especialistas te ofrecerán la mejor solución. Primera consulta gratuita.`,
        primaryButton: {
            text: "Consulta Gratuita",
            action: "contact" as const
        }
    };

    return (
        <LegalAreaHero
            areaTitle={subtopicTitle}
            areaDescription={subtopicDescription}
            areaColor={areaColor}
            cta={subtopicCTA}
        />
    );
};

export default LegalSubtopicHero;