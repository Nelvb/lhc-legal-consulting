/**
 * WordCounter.tsx
 * 
 * Este componente muestra un contador de palabras simple para el editor de artículos del blog.
 * Recibe contenido HTML, extrae el texto, cuenta las palabras y muestra si alcanza el mínimo
 * requerido (1000 palabras por defecto).
 * 
 * Uso:
 * <WordCounter 
 *   htmlContent={html} 
 *   minWordCount={1000} 
 * />
 */

import React, { useEffect, useState, useRef } from 'react';

interface WordCounterProps {
  htmlContent: string;
  minWordCount?: number;
  className?: string;
}

const WordCounter: React.FC<WordCounterProps> = ({
  htmlContent,
  minWordCount = 1000,
  className = '',
}) => {
  const [wordCount, setWordCount] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Función para extraer y contar palabras del HTML
  const countWordsFromHTML = (html: string): number => {
    if (!html) return 0;
    
    // Eliminar etiquetas HTML
    const text = html.replace(/<[^>]*>/g, ' ');
    // Normalizar espacios y dividir por espacios
    const words = text.replace(/\s+/g, ' ').trim().split(' ');
    // Filtrar palabras vacías
    return words.filter(word => word.length > 0).length;
  };
  
  // Implementación manual de debounce para evitar la dependencia de lodash
  useEffect(() => {
    // Limpiar el timeout anterior si existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Crear un nuevo timeout
    timeoutRef.current = setTimeout(() => {
      setWordCount(countWordsFromHTML(htmlContent));
    }, 300);
    
    // Limpieza al desmontar
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [htmlContent]);
  
  // Determinar el estado según el conteo de palabras
  const isMinimumMet = wordCount >= minWordCount;
  
  // Determinar colores según si alcanza el mínimo
  const textColor = isMinimumMet ? 'text-green-500' : 'text-orange-500';
  
  return (
    <div className={`w-full mt-3 text-sm p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <span className={`font-medium ${textColor}`}>
            {wordCount}
          </span>
          <span className="text-gray-700 ml-1">
            / {minWordCount} palabras mínimas
          </span>
        </div>
        
        {/* Mensaje de estado */}
        {!isMinimumMet && (
          <div className={textColor}>
            Faltan {minWordCount - wordCount} palabras para el mínimo
          </div>
        )}
      </div>
    </div>
  );
};

export default WordCounter;