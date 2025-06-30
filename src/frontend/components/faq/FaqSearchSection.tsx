/**
 * FaqSearchSection.tsx
 *
 * Componente principal de búsqueda para preguntas frecuentes con funcionalidad avanzada.
 * Incluye campo de búsqueda con debounce, filtros por categoría legal y integración con LegalFAQs.
 * Diseño profesional con dropdown animado y contador de resultados en tiempo real.
 * Maneja estados de carga y casos edge como búsquedas sin resultados.
 * ACTUALIZADO: Animaciones para barra de búsqueda y CTA. Portal para dropdown.
 */

'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Search, Filter, ChevronDown, X } from 'lucide-react';
import LegalFAQs from '@/components/areas/sections/LegalFAQs';
import NoResultsSection from '@/components/faq/NoResultsSection';
import { Question } from '@/types/faq';
import SmartLink from '@/components/ui/SmartLink';
import { useInView } from '@/hooks/useInView';

interface FaqSearchSectionProps {
    /** Array de todas las preguntas frecuentes */
    questions: Question[];
}

// Categorías legales disponibles para filtrado
const LEGAL_CATEGORIES = [
    'Todas las áreas',
    'Derecho Administrativo',
    'Derecho Bancario',
    'Derecho Civil',
    'Derecho de Extranjería',
    'Derecho Fiscal',
    'Derecho Laboral',
    'Derecho Mercantil',
    'Derecho Penal',
    'Consultas Generales'
];

/**
 * Mapeo de categorías a nombres de área para filtrado correcto
 */
const CATEGORY_TO_AREA_MAP: Record<string, string> = {
    'Derecho Administrativo': 'derecho-administrativo',
    'Derecho Bancario': 'derecho-bancario',
    'Derecho Civil': 'derecho-civil',
    'Derecho de Extranjería': 'derecho-extranjeria',
    'Derecho Fiscal': 'derecho-fiscal',
    'Derecho Laboral': 'derecho-laboral',
    'Derecho Mercantil': 'derecho-mercantil',
    'Derecho Penal': 'derecho-penal',
    'Consultas Generales': 'General'
};

/**
 * Componente principal de búsqueda avanzada
 * Maneja filtrado por texto y categoría con optimizaciones de performance
 */
const FaqSearchSection: React.FC<FaqSearchSectionProps> = ({ questions }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas las áreas');
    const [debouncedTerm, setDebouncedTerm] = useState('');
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number; width: number } | null>(null);

    const buttonRef = useRef<HTMLButtonElement>(null);

    // Hooks para animaciones
    const { ref: searchBarRef, inView: searchBarInView } = useInView();
    const { ref: ctaRef, inView: ctaInView } = useInView();

    // Verificación de seguridad para datos
    if (!questions || !Array.isArray(questions)) {
        return (
            <div className="bg-white py-16 px-6 lg:px-8 text-center">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-48 mx-auto"></div>
                </div>
            </div>
        );
    }

    // Calcular posición del dropdown
    const updateDropdownPosition = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + window.scrollY + 8,
                left: rect.left + window.scrollX,
                width: rect.width
            });
        }
    };

    // Actualizar posición al hacer scroll
    useEffect(() => {
        if (showCategoryDropdown) {
            updateDropdownPosition();
            
            const handleScroll = () => updateDropdownPosition();
            const handleResize = () => updateDropdownPosition();
            
            window.addEventListener('scroll', handleScroll);
            window.addEventListener('resize', handleResize);
            
            return () => {
                window.removeEventListener('scroll', handleScroll);
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [showCategoryDropdown]);

    // Debounce para optimizar búsqueda en tiempo real
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedTerm(searchTerm), 300);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    // Cerrar dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = () => setShowCategoryDropdown(false);
        if (showCategoryDropdown) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [showCategoryDropdown]);

    // Filtrado optimizado con useMemo para evitar recálculos innecesarios
    const filteredQuestions = useMemo(() => {
        let filtered = questions;

        // Si no hay búsqueda ni filtro, mostrar solo Consultas Generales por defecto
        if (!debouncedTerm.trim() && selectedCategory === 'Todas las áreas') {
            filtered = questions.filter(q =>
                q.category === 'General' ||
                q.category === 'Consultas Generales'
            );
        } else {
            // Filtrar por categoría/área seleccionada (cuando NO es "Todas las áreas")
            if (selectedCategory !== 'Todas las áreas') {
                const areaCode = CATEGORY_TO_AREA_MAP[selectedCategory];
                filtered = filtered.filter(q =>
                    q.category === selectedCategory ||
                    q.category === areaCode ||
                    q.area === areaCode
                );
            }

            // Filtrar por término de búsqueda (se aplica después del filtro de categoría)
            if (debouncedTerm.trim()) {
                const searchLower = debouncedTerm.toLowerCase();
                filtered = filtered.filter(q =>
                    q.question.toLowerCase().includes(searchLower) ||
                    q.answer.toLowerCase().includes(searchLower)
                );
            }
        }

        return filtered;
    }, [questions, selectedCategory, debouncedTerm]);

    // Función para limpiar búsqueda
    const clearSearch = () => {
        setSearchTerm('');
        setSelectedCategory('Todas las áreas');
    };

    // Generar título dinámico para resultados
    const getResultsTitle = () => {
        if (debouncedTerm && selectedCategory !== 'Todas las áreas') {
            return `Resultados para "${debouncedTerm}" en ${selectedCategory}`;
        } else if (debouncedTerm) {
            return `Resultados para "${debouncedTerm}"`;
        } else if (selectedCategory !== 'Todas las áreas') {
            return `Preguntas de ${selectedCategory}`;
        }
        return 'Consultas Generales';
    };

    const handleDropdownToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!showCategoryDropdown) {
            updateDropdownPosition();
        }
        setShowCategoryDropdown(!showCategoryDropdown);
    };

    return (
        <section className="bg-gradient-to-b from-white to-gray-50 py-16 px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Barra de búsqueda y filtros con animación */}
                <div
                    ref={searchBarRef}
                    className={`
                        bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-100 mb-12
                        transition-all duration-700 transform
                        ${searchBarInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                    `}
                >
                    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                        {/* Campo de búsqueda */}
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Buscar en preguntas y respuestas..."
                                className="w-full rounded-xl border border-gray-300 px-6 py-4 pr-12 text-lg focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent transition-all duration-300 placeholder:text-gray-400"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
                        </div>

                        {/* Filtro por categoría */}
                        <div className="relative lg:w-80">
                            <button
                                ref={buttonRef}
                                onClick={handleDropdownToggle}
                                className="w-full flex items-center justify-between px-6 py-4 border border-gray-300 rounded-xl text-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] focus:border-transparent transition-all duration-300"
                            >
                                <span className="flex items-center gap-2">
                                    <Filter className="w-5 h-5 text-gray-500" />
                                    <span className="truncate">{selectedCategory}</span>
                                </span>
                                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                            </button>
                        </div>

                        {/* Botón de limpiar filtros */}
                        {(searchTerm || selectedCategory !== 'Todas las áreas') && (
                            <button
                                onClick={clearSearch}
                                className="flex items-center gap-2 px-4 py-4 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-colors duration-200"
                                title="Limpiar búsqueda"
                            >
                                <X className="w-5 h-5" />
                                <span>Limpiar</span>
                            </button>
                        )}
                    </div>

                    {/* Contador de resultados y estadísticas */}
                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-600">
                        <div>
                            {debouncedTerm || selectedCategory !== 'Todas las áreas' ? (
                                <span className="font-medium">
                                    {filteredQuestions.length} resultado{filteredQuestions.length !== 1 ? 's' : ''} encontrado{filteredQuestions.length !== 1 ? 's' : ''}
                                </span>
                            ) : (
                                <span>
                                    {questions.length} preguntas frecuentes disponibles
                                </span>
                            )}
                        </div>

                        {debouncedTerm && (
                            <div className="text-[#1DA1F2] font-medium">
                                Búsqueda activa: "{debouncedTerm}"
                            </div>
                        )}
                    </div>
                </div>

                {/* Dropdown de categorías usando Portal */}
                {showCategoryDropdown && dropdownPosition && createPortal(
                    <div
                        className="absolute bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto"
                        style={{
                            top: dropdownPosition.top,
                            left: dropdownPosition.left,
                            width: dropdownPosition.width
                        }}
                    >
                        {LEGAL_CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => {
                                    setSelectedCategory(category);
                                    setShowCategoryDropdown(false);
                                }}
                                className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl ${selectedCategory === category
                                    ? 'bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]'
                                    : 'text-gray-700'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>,
                    document.body
                )}

                {/* Resultados */}
                {filteredQuestions.length > 0 ? (
                    <>
                        <LegalFAQs
                            faqs={filteredQuestions}
                            accentColor="#1DA1F2"
                            sectionTitle={getResultsTitle()}
                        />

                        {/* CTA Final - Solo cuando hay resultados */}
                        <div
                            ref={ctaRef}
                            className={`
                                mt-16 text-center
                                transition-all duration-700 transform
                                ${ctaInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                            `}
                        >
                            <div className="bg-gradient-to-r from-[#1b2f4b] to-[#1DA1F2] rounded-2xl p-8 lg:p-12 text-white">
                                <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                                    ¿Necesitas asesoramiento personalizado?
                                </h3>
                                <p className="text-lg lg:text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
                                    Nuestros especialistas resolverán tu consulta legal de forma personalizada
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <SmartLink href="/contact">
                                        <Button variant="outline" size="md">
                                            Consulta gratuita
                                        </Button>
                                    </SmartLink>
                                    <SmartLink href="/areas">
                                        <Button variant="ghost" size="md" className="text-white border-white hover:bg-white hover:text-[#1b2f4b]">
                                            Ver áreas legales
                                        </Button>
                                    </SmartLink>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <NoResultsSection
                        searchTerm={debouncedTerm}
                        selectedCategory={selectedCategory !== 'Todas las áreas' ? selectedCategory : undefined}
                    />
                )}
            </div>
        </section>
    );
};

export default FaqSearchSection;