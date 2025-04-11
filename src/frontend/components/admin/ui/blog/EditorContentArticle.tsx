/**
 * EditorContentArticle.tsx
 * 
 * Componente de edición de artículos para el panel de administración.
 * Utiliza un enfoque simplificado con textarea y transformación de texto a HTML.
 * 
 * Este componente:
 * - Permite al admin pegar texto desde Word/Google Docs
 * - Transforma el texto plano en HTML estructurado mediante htmlFormatter
 * - Muestra instrucciones claras para el formato
 * - Incluye contador de palabras para validación
 * 
 * @author Boost A Project Team
 * @version 2.0.0
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

  // Si recibimos contenido inicial, procesarlo
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

      <div className="mt-3">
        <WordCounter htmlContent={html} />
      </div>
    </div>
  )
}

export default EditorContentArticle