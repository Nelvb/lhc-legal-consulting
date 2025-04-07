// /src/frontend/utils/string-utils.ts

/**
 * Utilidades para manipulación de cadenas de texto
 * 
 * @module StringUtils
 * @description Proporciona funciones de utilidad para transformación de texto
 * 
 * Funciones:
 * - createSlug: Convierte un texto en un slug válido para URLs
 * 
 * Características:
 * - Convierte a minúsculas
 * - Elimina caracteres especiales
 * - Reemplaza espacios por guiones
 * - Útil para generar URLs amigables y SEO
 */

export const createSlug = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };