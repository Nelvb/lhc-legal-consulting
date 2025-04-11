/**
 * Servicio centralizado para operaciones relacionadas con artículos del blog
 * 
 * Este módulo proporciona funciones para interactuar con la API de artículos
 * del backend, facilitando la reutilización en componentes tanto públicos
 * como administrativos.
 * 
 * @module blogService
 */

import { Article } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Interfaz para parámetros de paginación y filtrado
 */
interface ArticleParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}

/**
 * Interfaz para la respuesta paginada de artículos
 */
interface ArticleResponse {
  articles: Article[];
  total: number;
  current_page: number;
  total_pages: number;
}

/**
 * Tipo simplificado para listados básicos de artículos
 * Usado en selectores y componentes de UI simples
 */
export interface ArticleListItem {
  title: string;
  slug: string;
}

/**
 * Obtiene un listado de artículos con opciones de paginación y filtrado
 */
export async function getArticles({
  page = 1,
  limit = 10,
  category,
  search
}: ArticleParams = {}): Promise<ArticleResponse> {
  console.log('API_URL:', process.env.NEXT_PUBLIC_API_URL);
  try {
    let url = `${API_URL}/articles?page=${page}&limit=${limit}`;
    console.log('URL de la petición:', url);
    
    if (category) url += `&category=${encodeURIComponent(category)}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error obteniendo artículos: ${response.status}`);
    }
    
    const data = await response.json();
    return {
      articles: data.articles || [],
      total: data.total || 0,
      current_page: data.current_page || 1,
      total_pages: data.total_pages || 1
    };
  } catch (error) {
    console.error("Error en getArticles:", error);
    return {
      articles: [],
      total: 0,
      current_page: 1,
      total_pages: 1
    };
  }
}

/**
 * Obtiene un artículo específico por su slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const response = await fetch(`${API_URL}/articles/slug/${slug}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Error obteniendo artículo: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error en getArticleBySlug (${slug}):`, error);
    return null;
  }
}

/**
 * Obtiene artículos relacionados a un artículo específico
 */
export async function getRelatedArticles(slug: string, limit: number = 3): Promise<Article[]> {
  try {
    const response = await fetch(`${API_URL}/articles/related/${slug}?limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`Error obteniendo artículos relacionados: ${response.status}`);
    }
    
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error(`Error en getRelatedArticles (${slug}):`, error);
    return [];
  }
}

/**
 * Obtiene artículos destacados o populares
 */
export async function getFeaturedArticles(limit: number = 4): Promise<Article[]> {
  try {
    const response = await fetch(`${API_URL}/articles/featured?limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`Error obteniendo artículos destacados: ${response.status}`);
    }
    
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error("Error en getFeaturedArticles:", error);
    return [];
  }
}

/**
 * Obtiene solo los títulos y slugs de todos los artículos
 * Útil para selectores, menús y componentes de navegación
 */
export async function getArticleTitles(): Promise<ArticleListItem[]> {
  try {
    const response = await fetch(`${API_URL}/articles?limit=999`);
    const data = await response.json();
    console.log("Respuesta de la API:", data); // Agregar log para verificar los datos

    // Verificar que data.articles sea un array
    if (Array.isArray(data.articles)) {
      return data.articles.map((a: any) => ({
        title: a.title,
        slug: a.slug
      }));
    } else {
      console.error("Error: 'articles' no es un array", data);
      return [];
    }
  } catch (error) {
    console.error("Error en getArticleTitles:", error);
    return [];
  }
}


/**
 * Obtiene artículos estáticos desde el JSON local
 * Utilizado para el selector de artículos relacionados en el panel de administración
 */
export async function getStaticArticles(): Promise<ArticleListItem[]> {
  try {
    const response = await fetch(`${API_URL}/articles/static-articles`);
    
    if (!response.ok) {
      throw new Error(`Error obteniendo artículos estáticos: ${response.status}`);
    }
    
    const data = await response.json();
    return data.map((a: any) => ({ 
      title: a.title, 
      slug: a.slug 
    }));
  } catch (error) {
    console.error("Error en getStaticArticles:", error);
    return [];
  }
}

/**
 * Elimina un artículo por su slug
 */
export async function deleteArticleBySlug(slug: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/articles/slug/${slug}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Error eliminando artículo: ${response.status}`);
    }
  } catch (error) {
    console.error(`Error en deleteArticleBySlug (${slug}):`, error);
    throw error;
  }
}

/**
 * Actualiza un artículo existente utilizando su slug como identificador.
 * 
 * Este método se utiliza en la vista de edición del panel de administración.
 * Envía una solicitud PUT al backend con los nuevos datos del artículo.
 * 
 * @param slug - Identificador único legible en URL (slug) del artículo
 * @param articleData - Objeto con los campos a actualizar (título, contenido, imagen, etc.)
 * @throws Error si la petición falla o el backend devuelve un mensaje de error
 */
export async function updateArticleBySlug(slug: string, articleData: any): Promise<void> {
  const response = await fetch(`${API_URL}/articles/slug/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(articleData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al actualizar el artículo');
  }
}
