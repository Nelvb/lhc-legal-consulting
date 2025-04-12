/**
 * EditorContentArticle.tsx
 *
 * Componente de edición de artículos para el panel de administración.
 * Convierte texto plano en HTML usando un textarea con instrucciones.
 * Incluye contador de palabras, instrucciones de formato y prompt para IA.
 */

'use client'

import React, { useState, useEffect, useRef } from 'react'
import WordCounter from '@/components/admin/ui/blog/WordCounter'
import { formatToHtml } from '@/components/admin/blog/helpers/htmlFormatter'

interface EditorContentArticleProps {
  content: string
  onChange: (value: string) => void
}

const EditorContentArticle: React.FC<EditorContentArticleProps> = ({ content, onChange }) => {
  const [rawText, setRawText] = useState('')
  const [html, setHtml] = useState('')
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setRawText(value)
    const formatted = formatToHtml(value)
    setHtml(formatted)
    onChange(formatted)
  }

  useEffect(() => {
    if (content && rawText === '') {
      setRawText(content)
      const formatted = formatToHtml(content)
      setHtml(formatted)
      onChange(formatted)
    }
  }, [])

  return (
    <div>
      <div className="border border-gray-300 rounded-md overflow-hidden bg-white">
        <textarea
          ref={textAreaRef}
          value={rawText}
          onChange={handleChange}
          placeholder="Pega tu artículo aquí..."
          className="w-full h-[600px] p-4 resize-none focus:outline-none"
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

      <div className="mt-4 bg-gray-50 p-4 rounded-md border border-gray-200">
        <details>
          <summary className="font-medium text-green-700 cursor-pointer">Ver prompt sugerido para IA</summary>
          <pre className="mt-2 whitespace-pre-wrap text-sm text-gray-700 bg-white p-3 rounded border border-gray-200 overflow-auto max-h-60">
{`Necesito un artículo para mi plataforma web de inversión inmobiliaria "Boost A Project" en TEXTO PLANO, siguiendo exactamente estas normas de formato:

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

4. NO incluyas estas instrucciones en el resultado final.

5. El contenido debe ser profesional, informativo y orientado a inversores inmobiliarios, con datos concretos y ejemplos prácticos.

6. Si necesitas presentar datos comparativos, utiliza listas con guiones o listas numeradas en lugar de tablas. Las tablas no son compatibles con nuestro sistema y causarán errores.

7. Tema del artículo: [INSERTAR TEMA AQUÍ]

Dame el resultado como texto plano dentro de un bloque de código (\\\`\\\`\\\`), para que pueda copiarlo exactamente como está, con todos los caracteres de formato visibles.`}
          </pre>
        </details>
      </div>

      <div className="mt-3">
        <WordCounter htmlContent={html} />
      </div>
    </div>
  )
}

export default EditorContentArticle
