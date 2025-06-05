'use client'

/**
 * EditorContentArticle.tsx
 *
 * Componente de edición de artículos para el panel de administración.
 * Convierte texto plano en HTML usando un textarea con instrucciones.
 * Incluye validación inteligente de palabras mínimas, contador de palabras,
 * instrucciones de formato y prompt para IA. Maneja errores visuales integrados.
 */

import React, { useState, useEffect, useRef } from 'react'
import { Copy, Check } from 'lucide-react'
import WordCounter from '@/components/admin/ui/blog/WordCounter'
import { formatToHtml } from '@/components/admin/blog/helpers/htmlFormatter'

interface EditorContentArticleProps {
  content: string
  onChange: (value: string) => void
  error?: string
  onErrorChange?: (hasError: boolean) => void
}

const EditorContentArticle: React.FC<EditorContentArticleProps> = ({
  content,
  onChange,
  error,
  onErrorChange
}) => {
  const [rawText, setRawText] = useState('')
  const [html, setHtml] = useState('')
  const [internalError, setInternalError] = useState<string | null>(null)
  const [isPromptOpen, setIsPromptOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const promptText = `Necesito un artículo para mi plataforma web de inversión inmobiliaria "Boost A Project" en TEXTO PLANO, siguiendo exactamente estas normas de formato:

Actúa como redactor experto en contenido inmobiliario para inversores profesionales.

1. Extensión: Mínimo 1000 palabras, ideal 1500 palabras. El sistema rechazará automáticamente contenido más corto.

2. Formato específico:
   - TÍTULOS: Deben estar rodeados por dobles asteriscos. Ejemplo: **Título del artículo**
   - NEGRITAS: Usa dobles asteriscos para destacar palabras clave. Ejemplo: Este es un texto con **palabras importantes** destacadas.
   - LISTAS CON GUIONES: Usa guión medio seguido de espacio. No añadas saltos de línea entre elementos. Ejemplo:
     - Primer elemento
     - Segundo elemento
   - LISTAS NUMERADAS: Usa números seguidos de punto y espacio. No añadas saltos de línea entre elementos. Ejemplo:
     1. Primer paso
     2. Segundo paso
   - PÁRRAFOS: Separa cada párrafo con UNA línea en blanco.
   - NO USES TABLAS: Presenta datos comparativos usando listas o párrafos. Las tablas no son compatibles con nuestro sistema.

3. IMPORTANTE: No proceses el formato. Quiero ver los asteriscos (**) en el texto, NO quiero que conviertas las marcas en formato visual. Necesito el texto con los símbolos para que mi sistema los interprete.

4. NO repitas el título dentro del artículo. Comienza directamente con el contenido.

5. NO incluyas estas instrucciones en el resultado final.

6. El contenido debe ser profesional, informativo y orientado a emprendedores y empresas, con datos concretos y ejemplos prácticos del ámbito legal y fiscal.

7. Si necesitas presentar datos comparativos, utiliza listas con guiones o listas numeradas en lugar de tablas. Las tablas no son compatibles con nuestro sistema y causarán errores.

8. ESTRUCTURA: Combina párrafos con listas para hacer el contenido más legible y escaneable. Usa listas cuando presentes múltiples puntos, pasos o características. No mezcles tipos de listas (numeradas y guiones) en la misma sección.

9. Tema del artículo: [INSERTAR TEMA AQUÍ]

Dame el resultado como texto plano dentro de un bloque de código (\\\`\\\`\\\`), para que pueda copiarlo exactamente como está, con todos los caracteres de formato visibles.`

  const validateContent = (htmlContent: string) => {
    const plainText = htmlContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    const wordCount = plainText.split(' ').length

    if (wordCount < 1000) {
      const newError = `El contenido debe tener al menos 1000 palabras (actualmente: ${wordCount})`
      setInternalError(newError)
      onErrorChange?.(true)
      return false
    } else {
      setInternalError(null)
      onErrorChange?.(false)
      return true
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setRawText(value)
    const formatted = formatToHtml(value)
    setHtml(formatted)
    onChange(formatted)

    // Validar contenido automáticamente
    validateContent(formatted)
  }

  const handleCopyPrompt = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(promptText)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Error al copiar:', err)
    }
  }

  useEffect(() => {
    if (content && rawText === '') {
      setRawText(content)
      const formatted = formatToHtml(content)
      setHtml(formatted)
      onChange(formatted)
      validateContent(formatted)
    }
  }, [content, rawText, onChange])

  // Determinar si hay error (externo o interno)
  const hasError = error || internalError
  const displayError = error || internalError

  return (
    <div>
      <label htmlFor="editor-content" className="block text-sm font-medium text-gray-700 mb-2">
        Contenido del artículo
      </label>

      <div className={`border rounded-md overflow-hidden bg-white ${hasError ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}>
        <textarea
          id="editor-content"
          ref={textAreaRef}
          value={rawText}
          onChange={handleChange}
          placeholder="Pega tu artículo aquí..."
          className="w-full h-[600px] p-4 resize-none focus:outline-none bg-transparent"
        />
      </div>

      <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-200">
        <details>
          <summary className="font-medium text-blue-600 cursor-pointer">Ver instrucciones de formato</summary>
          <pre className="mt-2 whitespace-pre-wrap text-sm text-gray-700 bg-white p-3 rounded border border-gray-200 overflow-auto max-h-60">
            {`Guía para redactar correctamente:

- Títulos → Escríbelos en negrita (rodea el texto con dobles asteriscos). Empieza con mayúscula, el resto en minúscula. No pongas punto al final.
  Ejemplo: **Tendencias inmobiliarias en 2025**

- Listas numeradas → Usa números seguidos de punto y espacio. No uses saltos de líneas entre ellas.
  Ejemplo:
  1. Primera tendencia
  2. Segunda tendencia
  3. Tercera tendencia

- Listas con guiones → Usa guión medio y espacio. No uses saltos de líneas entre ellas.
  Ejemplo:
  - Beneficio principal
  - Ventaja secundaria

- Párrafos → Deja una línea en blanco entre cada párrafo.

- Negritas → Rodea el texto con dobles asteriscos.
  Ejemplo: Texto normal **texto en negrita** texto normal

- Importante: Si pegas desde Word, las negritas de Word no se transferirán automáticamente. Debes aplicarlas manualmente usando **asteriscos**.`}
          </pre>
        </details>
      </div>

      <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-200 relative">
        <details 
          onToggle={(e) => setIsPromptOpen((e.target as HTMLDetailsElement).open)}
        >
          <summary className="font-medium text-green-700 cursor-pointer">Ver prompt sugerido para IA</summary>
          <pre className="mt-2 whitespace-pre-wrap text-sm text-gray-700 bg-white p-3 rounded border border-gray-200 overflow-auto max-h-60">
            {promptText}
          </pre>
        </details>
        {isPromptOpen && (
          <button
            onClick={handleCopyPrompt}
            className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            {isCopied ? (
              <>
                <Check size={16} />
                Copiado
              </>
            ) : (
              <>
                <Copy size={16} />
                Copiar
              </>
            )}
          </button>
        )}
      </div>

      <div className="mt-3">
        <WordCounter htmlContent={html} />
      </div>

      {/* Mensaje de error visible y consistente con resto del formulario */}
      {displayError && (
        <p className="text-sm text-red-600 mt-1">{displayError}</p>
      )}
    </div>
  )
}

export default EditorContentArticle