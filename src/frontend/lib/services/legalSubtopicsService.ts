/**
 * legalSubtopicsService.ts
 *
 * Servicio simplificado para cargar datos de subtopics individuales.
 * Solo incluye las funciones esenciales para la navegación de páginas.
 * Extrae subtopics desde los JSON de áreas legales existentes.
 */

import { LegalSubtopic, LegalSubtopicResponse, LegalAreaData } from '@/types/legalArea';
import { getLegalAreaData } from './legalAreasService';

/**
 * Función principal para obtener datos de un subtopic específico
 */
export async function getLegalSubtopicData(
    areaSlug: string, 
    subtopicSlug: string
): Promise<LegalSubtopicResponse> {
    try {
        // Cargar datos del área padre
        const areaResponse = await getLegalAreaData(areaSlug);
        
        if (!areaResponse.success || !areaResponse.data) {
            return {
                success: false,
                error: `Área legal '${areaSlug}' no encontrada`
            };
        }

        const areaData = areaResponse.data;

        // Buscar el subtopic específico
        const subtopic = findSubtopicBySlug(areaData.subtopics || [], subtopicSlug);
        
        if (!subtopic) {
            return {
                success: false,
                error: `Subtopic '${subtopicSlug}' no encontrado en área '${areaSlug}'`
            };
        }

        // Verificar que el subtopic tenga página individual
        if (subtopic.hasPage === false) {
            return {
                success: false,
                error: `Subtopic '${subtopicSlug}' no tiene página individual`
            };
        }

        // Datos del área para contexto SEO
        const contextAreaData = {
            id: areaData.id,
            title: areaData.title,
            seo: areaData.seo
        };

        return {
            success: true,
            data: subtopic,
            areaData: contextAreaData
        };

    } catch (error) {
        console.error(`Error cargando subtopic ${areaSlug}/${subtopicSlug}:`, error);
        return {
            success: false,
            error: `Error interno cargando subtopic ${subtopicSlug}`
        };
    }
}

/**
 * Generar rutas estáticas para generateStaticParams de Next.js
 */
export async function getAllSubtopicRoutes(): Promise<Array<{
    areaSlug: string;
    subtopicSlug: string;
}>> {
    const routes: Array<{ areaSlug: string; subtopicSlug: string; }> = [];

    // Lista de áreas válidas
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

    // Obtener subtopics de cada área
    for (const areaSlug of VALID_AREA_SLUGS) {
        try {
            const areaResponse = await getLegalAreaData(areaSlug);
            
            if (areaResponse.success && areaResponse.data?.subtopics) {
                areaResponse.data.subtopics.forEach(subtopic => {
                    // Solo incluir subtopics con página individual
                    if (subtopic.hasPage !== false) {
                        const subtopicSlug = subtopic.slug || generateSlugFromTitle(subtopic.title);
                        routes.push({
                            areaSlug,
                            subtopicSlug
                        });
                    }
                });
            }
        } catch (error) {
            console.warn(`No se pudieron cargar subtopics de ${areaSlug}:`, error);
        }
    }

    return routes;
}

/**
 * Buscar un subtopic por slug dentro del array de subtopics
 */
function findSubtopicBySlug(subtopics: LegalSubtopic[], targetSlug: string): LegalSubtopic | null {
    return subtopics.find(subtopic => {
        const subtopicSlug = subtopic.slug || generateSlugFromTitle(subtopic.title);
        return subtopicSlug === targetSlug;
    }) || null;
}

/**
 * Generar slug URL-friendly desde el título
 */
function generateSlugFromTitle(title: string): string {
    return title
        .toLowerCase()
        .replace(/[áéíóúü]/g, (match) => {
            const accents: { [key: string]: string } = {
                'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ü': 'u'
            };
            return accents[match] || match;
        })
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}