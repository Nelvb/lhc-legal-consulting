/**
 * legalArea.ts
 * 
 * Tipos TypeScript para las áreas legales de LHC Legal & Consulting.
 * Define la estructura de datos para servicios legales, tarjetas de áreas
 * y configuraciones de colores corporativos.
 */

export interface LegalService {
    /** Identificador único del área legal */
    id: string;
    /** Título principal del área legal */
    title: string;
    /** Descripción breve del servicio */
    description: string;
    /** Color principal del área */
    color: string;
    /** Color para estado hover */
    hoverColor: string;
    /** Ruta de navegación */
    slug: string;
    /** Meta título para SEO */
    metaTitle?: string;
    /** Meta descripción para SEO */
    metaDescription?: string;
}

export interface LegalServiceCardProps {
    service: LegalService;  // ← CAMBIAR de "area" a "service"
    index: number;
    inView: boolean;
    animationDelay: number;
}

export interface ServicesGridProps {
    services?: LegalService[];  // ← CAMBIAR de "areas" a "services"
    title?: string;
    subtitle?: string;
    animationConfig?: {
        threshold?: number;
        staggerDelay?: number;
        triggerOnce?: boolean;
        rootMargin?: string;  // ← AÑADIR esta línea
    };
}