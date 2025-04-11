/**
 * htmlFormatter.ts
 *
 * Utilidad para convertir texto plano con formato sencillo a HTML estructurado.
 * Diseñado para el editor de artículos de blog de Boost A Project.
 *
 * Este formateador convierte:
 * - Líneas sin terminadores (punto, coma, dos puntos) y separadas por líneas en blanco en títulos H2
 * - Líneas que comienzan con números y punto en listas ordenadas
 * - Líneas que comienzan con guiones en listas desordenadas (NO se acepta asterisco)
 * - Texto entre dobles asteriscos en negritas
 * - Texto separado por líneas en blanco en párrafos
 *
 * @author Boost A Project Team
 * @version 1.4.0
 */

export function formatToHtml(input: string): string {
    if (!input || input.trim() === '') return ''

    const lines = input.split('\n')
    let output = ''
    let inList = false
    let listType = ''

    const closeList = () => {
        if (inList) {
            output += `</${listType}>`
            inList = false
            listType = ''
        }
    }

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()
        if (line === '') {
            closeList()
            continue
        }

        const prevLine = i > 0 ? lines[i - 1].trim() : ''
        const nextLine = i < lines.length - 1 ? lines[i + 1].trim() : ''

        const isTitle =
            line.startsWith('**') &&
            line.endsWith('**') &&
            !/^[-•]\s+/.test(line) &&
            !/^\d+\.\s+/.test(line) &&
            (prevLine === '' || nextLine === '')

        const textWithBold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

        if (isTitle) {
            closeList()
            const cleanTitle = line.replace(/^\*\*/, '').replace(/\*\*$/, '').trim()
            output += `<h2><strong>${cleanTitle}</strong></h2>`
            continue
        }

        const matchOrdered = line.match(/^\d+\.\s+(.*)/)
        if (matchOrdered) {
            if (!inList || listType !== 'ol') {
                closeList()
                output += '<ol>'
                inList = true
                listType = 'ol'
            }
            output += `<li>${matchOrdered[1].replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`
            continue
        }

        const matchUnordered = line.match(/^-\s+(.*)/)
        if (matchUnordered) {
            if (!inList || listType !== 'ul') {
                closeList()
                output += '<ul>'
                inList = true
                listType = 'ul'
            }
            output += `<li>${matchUnordered[1].replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`
            continue
        }

        closeList()
        output += `<p>${textWithBold}</p>`
    }

    closeList()
    return output
}

/**
 * Limpia el HTML generado para evitar problemas comunes
 * @param html HTML posiblemente mal formado
 * @returns HTML limpio y bien formado
 */
export function sanitizeHtml(html: string): string {
    let cleanHtml = html.replace(/<(p|h[1-6]|li)>\s*<\/(p|h[1-6]|li)>/g, '')
    cleanHtml = ensureProperNesting(cleanHtml)
    return cleanHtml
}

/**
 * Asegura que las etiquetas estén correctamente anidadas
 */
function ensureProperNesting(html: string): string {
    return html
        .replace(/<p>(<ol>|<ul>)/g, '$1')
        .replace(/(<\/ol>|<\/ul>)<\/p>/g, '$1')
}

/**
 * Convierte HTML enriquecido a texto plano legible para debug
 */
export function htmlToPlainTextForDebugging(html: string): string {
    return html
        .replace(/<h[1-6]>(.*?)<\/h[1-6]>/g, '\n\n$1\n\n')
        .replace(/<p>(.*?)<\/p>/g, '\n$1\n')
        .replace(/<ol>/g, '\n')
        .replace(/<\/ol>/g, '\n')
        .replace(/<ul>/g, '\n')
        .replace(/<\/ul>/g, '\n')
        .replace(/<li>(.*?)<\/li>/g, '  • $1\n')
        .replace(/<strong>(.*?)<\/strong>/g, '*$1*')
        .replace(/<br\s*\/?>/g, '\n')
        .replace(/&nbsp;/g, ' ')
        .replace(/\n\s*\n/g, '\n\n')
        .trim()
}
