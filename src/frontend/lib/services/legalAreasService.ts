/**
 * legalAreasService.ts
 *
 * Servicio centralizado para el manejo de datos de áreas legales.
 * Carga dinámicamente los JSON de cada área, gestiona cache en memoria
 * y proporciona funciones de utilidad para validación y procesamiento.
 * Optimizado para performance y manejo de errores robusto.
 */

import { LegalAreaData, LegalAreaResponse, LegalAreaValidation } from '@/types/legalArea';

// Cache en memoria para evitar cargas repetidas
const areaDataCache = new Map<string, LegalAreaData>();
const cacheTimestamps = new Map<string, number>();

// Configuración del servicio
const SERVICE_CONFIG = {
    cacheTTL: 5 * 60 * 1000, // 5 minutos en desarrollo, ajustar para producción
    retryAttempts: 3,
    retryDelay: 1000, // 1 segundo
};

// Lista de slugs válidos (sincronizar con LEGAL_SERVICES)
const VALID_AREA_SLUGS = [
    'derecho-laboral',
    'derecho-civil',
    'derecho-extranjeria',
    'derecho-penal',
    'derecho-administrativo',
    'derecho-bancario',
    'derecho-mercantil',
    'derecho-fiscal'
];

/**
 * Función principal para obtener datos de un área legal específica
 */
export async function getLegalAreaData(slug: string): Promise<LegalAreaResponse> {
    try {
        // Validar que el slug sea válido
        if (!VALID_AREA_SLUGS.includes(slug)) {
            return {
                success: false,
                error: `Área legal '${slug}' no encontrada`
            };
        }

        // Verificar cache
        const cachedData = getCachedAreaData(slug);
        if (cachedData) {
            return {
                success: true,
                data: cachedData
            };
        }

        // Cargar datos desde JSON con reintentos
        const areaData = await loadAreaDataWithRetry(slug);

        // Validar estructura de datos
        const validation = validateLegalAreaData(areaData);
        if (!validation.isValid) {
            console.warn(`Advertencias en datos de ${slug}:`, validation.warnings);
            if (validation.errors.length > 0) {
                return {
                    success: false,
                    error: `Datos inválidos para ${slug}: ${validation.errors.join(', ')}`
                };
            }
        }

        // Guardar en cache
        setCachedAreaData(slug, areaData);

        return {
            success: true,
            data: areaData
        };

    } catch (error) {
        console.error(`Error cargando área legal ${slug}:`, error);
        return {
            success: false,
            error: `Error interno cargando datos de ${slug}`
        };
    }
}

/**
 * Carga datos de área con reintentos automáticos
 */
async function loadAreaDataWithRetry(slug: string, attempt: number = 1): Promise<LegalAreaData> {
    try {
        // Importación dinámica del JSON
        const areaModule = await import(`@/app/data/areas/${slug}.json`);
        return areaModule.default || areaModule;

    } catch (error) {
        if (attempt < SERVICE_CONFIG.retryAttempts) {
            console.warn(`Intento ${attempt} fallido para ${slug}, reintentando...`);
            await new Promise(resolve => setTimeout(resolve, SERVICE_CONFIG.retryDelay));
            return loadAreaDataWithRetry(slug, attempt + 1);
        }
        throw new Error(`No se pudo cargar ${slug}.json después de ${SERVICE_CONFIG.retryAttempts} intentos`);
    }
}

/**
 * Obtener todas las áreas legales (útil para sitemap, búsqueda)
 */
export async function getAllLegalAreasData(): Promise<LegalAreaData[]> {
    const results = await Promise.allSettled(
        VALID_AREA_SLUGS.map(slug => getLegalAreaData(slug))
    );

    return results
        .filter((result): result is PromiseFulfilledResult<LegalAreaResponse> =>
            result.status === 'fulfilled' && result.value.success
        )
        .map(result => result.value.data!)
        .filter(Boolean);
}

/**
 * Buscar en contenido de áreas legales
 */
export async function searchLegalContent(query: string): Promise<{
    area: string;
    matches: Array<{ type: 'title' | 'content' | 'subtopic' | 'faq'; text: string; }>
}[]> {
    const allAreas = await getAllLegalAreasData();
    const results: any[] = [];

    allAreas.forEach(area => {
        const matches: any[] = [];
        const searchTerm = query.toLowerCase();

        // Buscar en título y descripción
        if (area.title.toLowerCase().includes(searchTerm)) {
            matches.push({ type: 'title', text: area.title });
        }

        // Buscar en secciones de contenido
        area.contentSections?.forEach(section => {
            if (section.title.toLowerCase().includes(searchTerm) ||
                section.content.toLowerCase().includes(searchTerm)) {
                matches.push({ type: 'content', text: section.title });
            }
        });

        // Buscar en subtemas
        area.subtopics?.forEach(subtopic => {
            if (subtopic.title.toLowerCase().includes(searchTerm) ||
                subtopic.description.toLowerCase().includes(searchTerm)) {
                matches.push({ type: 'subtopic', text: subtopic.title });
            }
        });

        // Buscar en FAQs
        area.faqs?.forEach(faq => {
            if (faq.question.toLowerCase().includes(searchTerm) ||
                faq.answer.toLowerCase().includes(searchTerm)) {
                matches.push({ type: 'faq', text: faq.question });
            }
        });

        if (matches.length > 0) {
            results.push({ area: area.id, matches });
        }
    });

    return results;
}

/**
 * Obtener áreas relacionadas
 */
export async function getRelatedAreas(currentAreaId: string): Promise<LegalAreaData[]> {
    const currentArea = await getLegalAreaData(currentAreaId);

    if (!currentArea.success || !currentArea.data?.relatedAreas) {
        return [];
    }

    const relatedAreasData = await Promise.allSettled(
        currentArea.data.relatedAreas.map(slug => getLegalAreaData(slug))
    );

    return relatedAreasData
        .filter((result): result is PromiseFulfilledResult<LegalAreaResponse> =>
            result.status === 'fulfilled' && result.value.success
        )
        .map(result => result.value.data!)
        .filter(Boolean);
}

/**
 * Validar estructura de datos de área legal
 */
function validateLegalAreaData(data: any): LegalAreaValidation {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validaciones obligatorias
    if (!data.id) errors.push('Campo id es obligatorio');
    if (!data.title) errors.push('Campo title es obligatorio');
    if (!data.subtitle) errors.push('Campo subtitle es obligatorio');
    if (!data.heroDescription) errors.push('Campo heroDescription es obligatorio');
    if (!data.introduction) errors.push('Campo introduction es obligatorio');

    // Validaciones de arrays
    if (!Array.isArray(data.contentSections)) {
        errors.push('contentSections debe ser un array');
    } else if (data.contentSections.length === 0) {
        warnings.push('No hay secciones de contenido definidas');
    }

    if (!Array.isArray(data.subtopics)) {
        warnings.push('subtopics no está definido o no es un array');
    }

    if (!Array.isArray(data.faqs)) {
        warnings.push('faqs no está definido o no es un array');
    }

    // Validar estructura SEO
    if (!data.seo) {
        warnings.push('Información SEO no está definida');
    } else {
        if (!data.seo.metaTitle) warnings.push('SEO: metaTitle no definido');
        if (!data.seo.metaDescription) warnings.push('SEO: metaDescription no definido');
    }

    // Validar CTA
    if (!data.cta) {
        warnings.push('CTA no está definida');
    } else if (!data.cta.title || !data.cta.primaryButton) {
        warnings.push('CTA incompleta (falta title o primaryButton)');
    }

    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
}

/**
 * Funciones de cache
 */
function getCachedAreaData(slug: string): LegalAreaData | null {
    const timestamp = cacheTimestamps.get(slug);
    if (!timestamp || Date.now() - timestamp > SERVICE_CONFIG.cacheTTL) {
        // Cache expirado
        areaDataCache.delete(slug);
        cacheTimestamps.delete(slug);
        return null;
    }
    return areaDataCache.get(slug) || null;
}

function setCachedAreaData(slug: string, data: LegalAreaData): void {
    areaDataCache.set(slug, data);
    cacheTimestamps.set(slug, Date.now());
}

/**
 * Limpiar cache (útil para desarrollo)
 */
export function clearCache(): void {
    areaDataCache.clear();
    cacheTimestamps.clear();
}

/**
 * Obtener estadísticas del cache
 */
export function getCacheStats(): {
    size: number;
    entries: string[];
    oldestEntry?: string;
} {
    const entries = Array.from(cacheTimestamps.keys());
    let oldestEntry: string | undefined;
    let oldestTime = Date.now();

    cacheTimestamps.forEach((timestamp, slug) => {
        if (timestamp < oldestTime) {
            oldestTime = timestamp;
            oldestEntry = slug;
        }
    });

    return {
        size: areaDataCache.size,
        entries,
        oldestEntry
    };
}