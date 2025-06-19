/**
 * LegalIntro.tsx
 *
 * Componente para mostrar la introducción de un área legal.
 * ACTUALIZADO: Con título "Introducción" y alineación a la izquierda.
 * Diseño profesional con tipografía optimizada para legibilidad.
 */

'use client';

import React from 'react';
import SectionWrapper, { SectionHeader } from '../shared/SectionWrapper';

interface LegalIntroProps {
    /** Texto de introducción del área legal */
    introduction: string;
    /** Color de acento del área (opcional) */
    accentColor?: string;
    /** Clases CSS adicionales */
    className?: string;
}

/**
 * Componente LegalIntro
 * Muestra el texto introductorio con título y alineación izquierda
 */
const LegalIntro: React.FC<LegalIntroProps> = ({
    introduction,
    accentColor = '#1b2f4b',
    className = ''
}) => {
    return (
        <SectionWrapper
            spacing="lg"
            maxWidth="lg"
            background="white"
            className={className}
        >
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-gray-100">
                <SectionHeader
                    title="Introducción"
                    accentColor={accentColor}
                    alignment="left"
                    size="md"
                />

                <div className="text-left">
                    <p
                        className="text-lg lg:text-xl text-gray-700 leading-relaxed"
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            lineHeight: '1.75'
                        }}
                    >
                        {introduction}
                    </p>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default LegalIntro;