/**
 * LegalOtherServices.tsx
 *
 * Servicios secundarios sin container, integrado en el flujo.
 * ACTUALIZADO: Sin cards ni sombras, diseño limpio y directo.
 * Título cambiado a "Otras Especialidades" para mayor relevancia.
 */

'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';
import SectionWrapper, { SectionHeader } from '../shared/SectionWrapper';

interface OtherService {
    title: string;
    content: string;
}

interface LegalOtherServicesProps {
    /** Array de servicios secundarios */
    services: OtherService[];
    /** Color de acento del área */
    accentColor: string;
    /** Título de la sección */
    sectionTitle?: string;
    /** Clases CSS adicionales */
    className?: string;
}

/**
 * Componente LegalOtherServices
 * Renderiza servicios complementarios sin container, integrado en el flujo
 */
const LegalOtherServices: React.FC<LegalOtherServicesProps> = ({
    services,
    accentColor,
    sectionTitle = "Otras Especialidades",
    className = ''
}) => {
    // No renderizar si no hay servicios
    if (!services || services.length === 0) {
        return null;
    }

    return (
        <SectionWrapper
            spacing="lg"
            maxWidth="lg"
            background="transparent"
            className={className}
        >
            {/* Título centrado */}
            <SectionHeader
                title={sectionTitle}
                accentColor={accentColor}
                alignment="center"
                size="md"
            />

            {/* Lista de servicios sin container */}
            <div className="space-y-6">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="flex items-start space-x-4 group py-4 transition-all duration-300 hover:transform hover:translate-x-2"
                    >
                        {/* Icono de check */}
                        <div className="flex-shrink-0 mt-1">
                            <CheckCircle
                                className="w-6 h-6 transition-all duration-300 group-hover:scale-110"
                                style={{
                                    color: accentColor,
                                    opacity: 0.8
                                }}
                            />
                        </div>

                        {/* Contenido del servicio */}
                        <div className="flex-1">
                            <h4
                                className="text-lg font-semibold text-[#1b2f4b] mb-2 group-hover:text-opacity-80 transition-colors duration-300"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                {service.title}
                            </h4>

                            <p className="text-gray-600 leading-relaxed">
                                {service.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer informativo con formato unificado */}
            <div className="mt-12 text-center">
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
                    <p className="text-gray-600 mb-2">
                        ¿No encuentras el servicio que necesitas?
                    </p>
                    <p className="text-sm text-gray-500">
                        Contáctanos para una{' '}
                        <span
                            className="font-medium cursor-pointer hover:underline transition-all duration-300"
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

export default LegalOtherServices;