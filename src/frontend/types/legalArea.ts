/**
 * types/legalArea.ts
 *
 * Tipado TypeScript para la estructura de datos de áreas legales.
 * ACTUALIZADO: Añadida interfaz OtherService y propiedad otherServices
 * Define la interface unificada para todos los JSON de áreas legales.
 */

// Subtema dentro de un área legal
export interface LegalSubtopic {
    title: string;
    description: string;
    hasPage: boolean;
    slug?: string; // Solo requerido si hasPage es true
    content?: string; // Contenido adicional si no tiene página propia
    icon?: string; // Icono opcional para el subtema
}

// ✅ NUEVA INTERFAZ: Servicios complementarios
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
    primaryButton: {
        text: string;
        action: 'contact' | 'phone' | 'whatsapp' | 'form';
        value?: string; // URL, teléfono, etc.
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
    canonicalUrl?: string; // ✅ CAMBIADO: Opcional porque puede ser placeholder
    ogImage?: string;
    structuredData?: {
        serviceType: string;
        description: string;
        areaServed?: string; // ✅ AÑADIDO
        provider?: { // ✅ AÑADIDO
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

// Estadísticas del área (opcional)
export interface LegalAreaStats {
    title: string;
    value: string;
    description?: string;
    icon?: string;
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
    contentSections?: ContentSection[]; // ✅ CAMBIADO: Opcional
    
    // Subtemas y servicios
    subtopics?: LegalSubtopic[]; // ✅ CAMBIADO: Opcional
    
    // ✅ NUEVA PROPIEDAD: Servicios complementarios
    otherServices?: OtherService[];

    // Preguntas frecuentes
    faqs?: LegalFAQ[]; // ✅ CAMBIADO: Opcional

    // Call to Action específica
    cta?: LegalAreaCTA; // ✅ CAMBIADO: Opcional

    // SEO y metadata
    seo: LegalAreaSEO;

    // ✅ CAMPOS ELIMINADOS (no se usan):
    // stats, relatedAreas, lastUpdated, displayConfig
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

// Respuesta del servicio de carga de datos
export interface LegalAreaResponse {
    success: boolean;
    data?: LegalAreaData;
    error?: string;
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
    title: string;
    description: string;
    primaryButton: {
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
