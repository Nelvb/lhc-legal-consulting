/**
 * combinedFaq.ts
 *
 * Combina todos los archivos JSON de preguntas frecuentes (áreas + global)
 * en una única estructura accesible desde cualquier componente.
 * Usado en el buscador global y para agrupar por categoría/área en la vista FAQ.
 */

import derechoPenal from '@/app/data/faq/derecho-penal.json';
import derechoCivil from '@/app/data/faq/derecho-civil.json';
import derechoLaboral from '@/app/data/faq/derecho-laboral.json';
import derechoExtranjeria from '@/app/data/faq/derecho-extranjeria.json';
import derechoAdministrativo from '@/app/data/faq/derecho-administrativo.json';
import derechoFiscal from '@/app/data/faq/derecho-fiscal.json';
import derechoBancario from '@/app/data/faq/derecho-bancario.json';
import derechoMercantil from '@/app/data/faq/derecho-mercantil.json';
import globalFaqs from '@/app/data/faq/global.json';

import { Question } from '@/types/faq';

/**
 * Añade metadatos (area o category) a un listado de preguntas
 */
const tagWith = (questions: { question: string; answer: string }[], tag: Partial<Question>): Question[] =>
    questions.map((q) => ({ ...q, ...tag }));

/**
 * Exporta todas las FAQs en una lista única tipada como Question[]
 */
export const allFaqs: Question[] = [
    ...tagWith(globalFaqs.questions, { category: 'General' }),
    ...tagWith(derechoCivil.questions, { area: 'derecho-civil' }),
    ...tagWith(derechoPenal.questions, { area: 'derecho-penal' }),
    ...tagWith(derechoLaboral.questions, { area: 'derecho-laboral' }),
    ...tagWith(derechoExtranjeria.questions, { area: 'derecho-extranjeria' }),
    ...tagWith(derechoAdministrativo.questions, { area: 'derecho-administrativo' }),
    ...tagWith(derechoFiscal.questions, { area: 'derecho-fiscal' }),
    ...tagWith(derechoBancario.questions, { area: 'derecho-bancario' }),
    ...tagWith(derechoMercantil.questions, { area: 'derecho-mercantil' })
];
