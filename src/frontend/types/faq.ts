/**
 * faq.ts
 *
 * Tipos TypeScript para el sistema de Preguntas Frecuentes (FAQs).
 * Compartido entre componentes, servicios y combinadores de JSON.
 * Mantiene consistencia en toda la app al trabajar con preguntas.
 */

export interface Question {
    /** Pregunta mostrada al usuario */
    question: string;
    /** Respuesta detallada a la pregunta */
    answer: string;
    /** Área legal a la que pertenece (si aplica) */
    area?: string;
    /** Categoría general (solo en global.json) */
    category?: string;
}
