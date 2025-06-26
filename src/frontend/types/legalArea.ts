/**
 * types/legalArea.ts
 *
 * Tipado TypeScript para la estructura de datos de áreas legales.
 * ACTUALIZADO: Subtopics expandidos con páginas individuales.
 * Define la interface unificada para todos los JSON de áreas legales.
 */

// Subtema dentro de un área legal con contenido expandido
export interface LegalSubtopic {
    title: string;
    description: string;
    content?: string; // Contenido breve para la card del área padre
    icon?: string; // Icono opcional para el subtema
    
    // Nuevos campos para páginas individuales
    hasPage?: boolean; // Si tiene página individual (por defecto true)
    slug?: string; // URL slug, se genera automáticamente si no se especifica
    extendedIntroduction?: string; // Introducción extendida para la página individual
    keyPoints?: string[]; // Puntos clave del servicio para la página individual
}

// Servicios complementarios
export interface OtherService {
    title: string;
    content: string;
}

// FAQ específica de un área legal
export interface LegalFAQ {
    question: string;
    answer: string;
    category?: string; // Para agrupar FAQs si hay muchas
}

// Información de contacto/CTA específica del área
export interface LegalAreaCTA {
    title: string;
    description: string;
    primaryButton: {  // <-- obligatorio sin ?
        text: string;
        action: 'contact' | 'phone' | 'whatsapp' | 'form';
        value?: string;
    };
    secondaryButton?: {
        text: string;
        action: 'contact' | 'phone' | 'whatsapp' | 'form';
        value?: string;
    };
}


// Información SEO específica del área
export interface LegalAreaSEO {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    canonicalUrl?: string;
    ogImage?: string;
    structuredData?: {
        serviceType: string;
        description: string;
        areaServed?: string;
        provider?: {
            name: string;
            url: string;
            telephone?: string;
        };
        offers?: Array<{
            name: string;
            description: string;
            price?: string;
            priceCurrency?: string;
        }>;
    };
}

// Sección de contenido con texto enriquecido
export interface ContentSection {
    title: string;
    content: string; // HTML o Markdown
    order: number;
    type?: 'text' | 'list' | 'table' | 'quote';
}

// Estructura principal del área legal
export interface LegalAreaData {
    // Información básica
    id: string;
    title: string;
    subtitle: string;
    heroDescription: string;

    // Contenido principal
    introduction: string; // Texto introductorio después del hero
    contentSections?: ContentSection[];
    
    // Subtemas y servicios
    subtopics?: LegalSubtopic[];
    otherServices?: OtherService[];

    // Preguntas frecuentes
    faqs?: LegalFAQ[];

    // Call to Action específica
    cta?: LegalAreaCTA;

    // SEO y metadata
    seo: LegalAreaSEO;
}

// Props para componentes que usan datos de área legal
export interface LegalAreaContentProps {
    areaData: LegalAreaData;
    areaConfig: {
        color: string;
        hoverColor: string;
        slug: string;
    };
}

// Props para páginas individuales de subtopics
export interface LegalSubtopicPageProps {
    subtopicData: LegalSubtopic;
    areaData: Pick<LegalAreaData, 'id' | 'title' | 'seo'>;
    areaConfig: {
        color: string;
        hoverColor: string;
        slug: string;
    };
}

// Props para el contenido de páginas individuales de subtopics
export interface LegalSubtopicContentProps {
    subtopicData: LegalSubtopic;
    areaConfig: {
        color: string;
        hoverColor: string;
        slug: string;
    };
}

// Respuesta del servicio de carga de datos
export interface LegalAreaResponse {
    success: boolean;
    data?: LegalAreaData;
    error?: string;
}

// Respuesta del servicio de carga de datos de subtopics
export interface LegalSubtopicResponse {
    success: boolean;
    data?: LegalSubtopic;
    error?: string;
    areaData?: Pick<LegalAreaData, 'id' | 'title' | 'seo'>;
}

// Configuración para el servicio de áreas legales
export interface LegalAreasServiceConfig {
    baseUrl: string;
    cacheTTL: number; // Time to live del cache en ms
    retryAttempts: number;
}

// Utilidad para validación de datos
export interface LegalAreaValidation {
    isValid: boolean;
    errors: string[];
    warnings: string[];
}

// Props del componente LegalCTA
export interface LegalCTAProps {
    title?: string;
    description?: string;
    primaryButton?: {
        text: string;
        action: 'contact' | 'phone' | 'whatsapp' | 'form';
        value?: string;
    };
    secondaryButton?: {
        text: string;
        action: 'contact' | 'phone' | 'whatsapp' | 'form';
        value?: string;
    };
    accentColor: string;
    hoverColor: string;
}