/**
 * LegalFAQs.tsx
 *
 * Componente de preguntas frecuentes con accordion interactivo.
 * CORREGIDO: Error de focusRingColor en style object.
 * Optimizado para SEO con marcado semántico y animaciones suaves.
 */

'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import SectionWrapper, { SectionHeader } from '../shared/SectionWrapper';
import { Question } from '@/types/faq';


interface LegalFAQsProps {
    /** Array de preguntas frecuentes */
    faqs: Question[];
    /** Color de acento del área */
    accentColor: string;
    /** Título de la sección */
    sectionTitle?: string;
    /** Clases CSS adicionales */
    className?: string;
}

/**
 * Componente LegalFAQs
 * Accordion interactivo para preguntas frecuentes específicas del área
 */
const LegalFAQs: React.FC<LegalFAQsProps> = ({
    faqs,
    accentColor,
    sectionTitle = "Preguntas Frecuentes",
    className = ''
}) => {
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    // No renderizar si no hay FAQs
    if (!faqs || faqs.length === 0) {
        return null;
    }

    const toggleFaq = (index: number) => {
        setExpandedFaq(expandedFaq === index ? null : index);
    };

    // Manejar navegación por teclado
    const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleFaq(index);
        }
    };

    return (
        <SectionWrapper
            spacing="lg"
            maxWidth="lg"
            background="transparent"
            className={className}
        >
            <SectionHeader
                title={sectionTitle}
                accentColor={accentColor}
                alignment="center"
                size="md"
            />

            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl"
                    >
                        {/* Botón de pregunta - CORREGIDO: Eliminado style con focusRingColor */}
                        <button
                            onClick={() => toggleFaq(index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-full text-left p-6 lg:p-8 hover:bg-gray-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500"
                            aria-expanded={expandedFaq === index}
                            aria-controls={`faq-answer-${index}`}
                        >
                            <div className="flex items-center justify-between">
                                <h3
                                    className="text-lg lg:text-xl font-semibold text-[#1b2f4b] pr-4 leading-relaxed"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    {faq.question}
                                </h3>

                                <div className="flex-shrink-0">
                                    {expandedFaq === index ? (
                                        <ChevronDown
                                            className="w-6 h-6 transition-all duration-300"
                                            style={{ color: accentColor }}
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <ChevronRight
                                            className="w-6 h-6 text-gray-400 group-hover:text-[#1b2f4b] transition-colors duration-300"
                                            aria-hidden="true"
                                        />
                                    )}
                                </div>
                            </div>
                        </button>

                        {/* Respuesta expandible */}
                        {expandedFaq === index && (
                            <div
                                id={`faq-answer-${index}`}
                                className="px-6 lg:px-8 pb-6 lg:pb-8 animate-in slide-in-from-top-2 duration-300"
                                role="region"
                                aria-labelledby={`faq-question-${index}`}
                            >
                                <div className="pt-4 border-t border-gray-100">
                                    <p
                                        className="text-gray-700 leading-relaxed"
                                        style={{ fontFamily: "'Inter', sans-serif" }}
                                    >
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Footer informativo */}
            <div className="mt-12 text-center">
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
                    <p className="text-gray-600 mb-2">
                        ¿No encuentras respuesta a tu pregunta?
                    </p>
                    <p className="text-sm text-gray-500">
                        Contáctanos para una{' '}
                        <span
                            className="font-medium cursor-pointer hover:underline transition-colors duration-300"
                            style={{ color: accentColor }}
                            onClick={() => window.location.href = '/contact'}
                        >
                            consulta personalizada gratuita
                        </span>
                    </p>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default LegalFAQs;