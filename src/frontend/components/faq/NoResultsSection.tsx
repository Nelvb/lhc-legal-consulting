/**
 * NoResultsSection.tsx
 *
 * Componente mostrado cuando no hay resultados en la búsqueda de FAQ.
 * Diseño empático que convierte la frustración en oportunidad de contacto.
 * Incluye CTAs inteligentes y sugerencias basadas en el contexto de búsqueda.
 * Optimizado para conversión con múltiples opciones de engagement.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Phone, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';

interface NoResultsSectionProps {
    /** Término de búsqueda que no obtuvo resultados */
    searchTerm?: string;
    /** Categoría seleccionada cuando no hay resultados */
    selectedCategory?: string;
}

/**
 * Sección optimizada para cuando no hay resultados
 * Convierte la frustración en oportunidad de contacto directo
 */
const NoResultsSection: React.FC<NoResultsSectionProps> = ({
    searchTerm,
    selectedCategory
}) => {
    // Generar mensaje contextual basado en la búsqueda
    const getContextualMessage = () => {
        if (searchTerm && selectedCategory) {
            return `No encontramos preguntas sobre "${searchTerm}" en ${selectedCategory}`;
        } else if (searchTerm) {
            return `No hay preguntas que coincidan con "${searchTerm}"`;
        } else if (selectedCategory) {
            return `No hay preguntas disponibles en ${selectedCategory}`;
        }
        return 'No se encontraron resultados';
    };

    // Sugerencias inteligentes basadas en el contexto
    const getSmartSuggestions = () => {
        const suggestions = [];
        
        if (searchTerm) {
            suggestions.push('Intenta usar términos más generales');
            suggestions.push('Revisa la ortografía de tu búsqueda');
        }
        
        if (selectedCategory) {
            suggestions.push('Prueba con "Todas las áreas"');
        }
        
        suggestions.push('Consulta nuestras áreas legales principales');
        
        return suggestions;
    };

    return (
        <div className="text-center py-0 sm:py-16">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-gray-100">
                    {/* Icono principal */}
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
                        <Search className="w-10 h-10 text-gray-400" />
                    </div>
                    
                    {/* Título principal */}
                    <h3 className="text-2xl lg:text-3xl font-bold text-[#1b2f4b] mb-4">
                        No encontramos resultados
                    </h3>
                    
                    {/* Mensaje contextual */}
                    <p className="text-lg text-gray-600 mb-6">
                        {getContextualMessage()}
                    </p>

                    {/* Sugerencias rápidas - FLECHA SÓLIDA AL PRINCIPIO */}
                    <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                        <h4 className="text-lg font-semibold text-[#1b2f4b] mb-4">
                            Sugerencias para tu búsqueda:
                        </h4>
                        <ul className="space-y-2 text-gray-700 text-left">
                            {getSmartSuggestions().map((suggestion, index) => (
                                <li key={index}>
                                    <span className="text-[#1DA1F2] mr-2">➤</span>{suggestion}
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Mensaje principal de conversión */}
                    <div className="mb-8">
                        <h4 className="text-xl lg:text-2xl font-semibold text-[#1b2f4b] mb-4">
                            ¿No encuentras respuesta a tu consulta específica?
                        </h4>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Nuestros especialistas están aquí para ayudarte.
                            <br />
                            <span className="text-[#1DA1F2] font-medium">
                                Respuesta garantizada en menos de 24 horas.
                            </span>
                        </p>
                    </div>

                    {/* CTAs principales */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                        <Link href="/contact" className="flex-1 sm:flex-initial">
                            <Button variant="cta" size="md" className="w-full sm:w-auto">
                                Consulta gratuita
                            </Button>
                        </Link>
                        <Link href="/areas" className="flex-1 sm:flex-initial">
                            <Button variant="outline" size="md" className="w-full sm:w-auto">
                                Ver nuestras áreas
                            </Button>
                        </Link>
                    </div>

                    {/* Métodos de contacto alternativos - TEXTOS SECUNDARIOS OCULTOS EN MÓVIL */}
                    <div className="border-t border-gray-200 pt-8">
                        <h5 className="text-lg font-semibold text-[#1b2f4b] mb-6">
                            O contáctanos directamente:
                        </h5>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* WhatsApp */}
                            <a 
                                href="https://wa.me/34691818071" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors duration-300"
                            >
                                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                    <Phone className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold text-green-800">WhatsApp</div>
                                    <div className="text-sm text-green-600 hidden sm:block">Respuesta inmediata</div>
                                </div>
                            </a>

                            {/* Email */}
                            <a 
                                href="mailto:lhclegalandconsulting@gmail.com"
                                className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors duration-300"
                            >
                                <div className="w-10 h-10 bg-[#1DA1F2] rounded-full flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold text-blue-800">Email</div>
                                    <div className="text-sm text-blue-600 hidden sm:block">lhclegalandconsulting@gmail.com</div>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Garantía final - CENTRO EN DESKTOP, IZQUIERDA EN MÓVIL */}
                    <div className="mt-8 p-4 bg-gradient-to-r from-[#1DA1F2]/10 to-[#60A5FA]/10 rounded-xl border border-[#1DA1F2]/20">
                        <ul className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-2 sm:gap-4 text-sm text-[#1b2f4b] font-medium text-left sm:text-center">
                            <li className='before:content-["✅"] before:mr-2'>Primera consulta gratuita</li>
                            <li className='before:content-["✅"] before:mr-2'>Sin compromiso</li>
                            <li className='before:content-["✅"] before:mr-2'>Respuesta en 24h</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoResultsSection;