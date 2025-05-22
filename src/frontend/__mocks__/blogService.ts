/**
 * __mocks__/blogService.ts
 *
 * Mock del servicio de blog para tests.
 * Simula los métodos utilizados en la vista /blog/[slug].
 */

import { Article } from "@/types";

// Artículo principal simulado
export const mockArticle: Article = {
    id: 1,
    slug: "mi-articulo-prueba",
    title: "Título de prueba",
    excerpt: "Extracto del artículo de prueba",
    content: "<p>Este es el contenido en HTML del artículo de prueba</p>",
    image: "https://via.placeholder.com/800x400",
    image_alt: "Imagen de prueba",
    author: "Nelson Valero",
    date: "2025-05-20",
    created_at: "2025-05-20",
    updated_at: "2025-05-20",
};

// Artículos relacionados simulados
export const mockRelatedArticles: Article[] = [
    {
        id: 2,
        slug: "articulo-relacionado",
        title: "Artículo relacionado",
        excerpt: "Extracto de artículo relacionado",
        content: "<p>Contenido de artículo relacionado</p>",
        image: "https://via.placeholder.com/800x400",
        image_alt: "Relacionado",
        author: "Admin",
        date: "2025-05-18",
        created_at: "2025-05-18",
        updated_at: "2025-05-18",
    },
];

// Mocks con jest.fn() para interceptar llamadas reales
export const mockGetArticleBySlug = jest.fn().mockResolvedValue(mockArticle);
export const mockGetArticles = jest.fn().mockResolvedValue({
    articles: mockRelatedArticles,
    total: 1,
    current_page: 1,
    total_pages: 1,
});

// Exportación como si fueran las funciones reales del servicio
export const getArticleBySlug = mockGetArticleBySlug;
export const getArticles = mockGetArticles;
