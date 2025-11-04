/**
 * Definiciones de tipos globales para la aplicación
 * Centraliza interfaces y tipos reutilizables en múltiples componentes
 * Facilita la consistencia de tipos y reduce la duplicación de código
 */

// Declaración global para window.pageLoaderActive
declare global {
  interface Window {
    pageLoaderActive?: boolean;
  }
}

// Ejemplo: export interface User { ... }

export * from "./blog";
export * from "./user";
export * from './contact';