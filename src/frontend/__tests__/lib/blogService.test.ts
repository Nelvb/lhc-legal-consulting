/**
 * blogService.test.ts
 *
 * Tests unitarios del servicio de artículos del blog.
 * Cubre funciones que interactúan con la API: obtención, creación, eliminación y actualización.
 *
 * Mockea `fetch` y `fetchWithAuth` para evitar llamadas reales en los tests.
 */

import {
    getArticles,
    getArticleBySlug,
    getRelatedArticles,
    getFeaturedArticles,
    getArticleTitles,
    getStaticArticles,
    deleteArticleBySlug,
    updateArticleBySlug,
    createArticle,
} from '@/lib/blogService';
import { fetchWithAuth } from '@/lib/utils/fetchWithAuth';

// Mock global de fetch
global.fetch = jest.fn();

// Mock del módulo fetchWithAuth
jest.mock('@/lib/utils/fetchWithAuth', () => ({
    fetchWithAuth: jest.fn(),
}));

describe('blogService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('getArticles retorna artículos correctamente', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                articles: [{ title: 'Test', slug: 'test' }],
                total: 1,
                current_page: 1,
                total_pages: 1,
            }),
        });

        const result = await getArticles();
        expect(result.articles.length).toBe(1);
        expect(result.total).toBe(1);
    });

    it('getArticleBySlug devuelve null si no existe', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 404 });
        const result = await getArticleBySlug('no-existe');
        expect(result).toBeNull();
    });

    it('getRelatedArticles devuelve artículos relacionados', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ articles: [{ slug: 'relacionado' }] }),
        });
        const result = await getRelatedArticles('slug-de-prueba');
        expect(result[0].slug).toBe('relacionado');
    });

    it('getFeaturedArticles devuelve artículos destacados', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ articles: [{ slug: 'destacado' }] }),
        });
        const result = await getFeaturedArticles();
        expect(result[0].slug).toBe('destacado');
    });

    it('getArticleTitles devuelve títulos y slugs', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                articles: [{ title: 'Título', slug: 'slug' }],
            }),
        });
        const result = await getArticleTitles();
        expect(result[0]).toEqual({ title: 'Título', slug: 'slug' });
    });

    it('getStaticArticles devuelve artículos estáticos', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => [{ title: 'Static', slug: 'static' }],
        });
        const result = await getStaticArticles();
        expect(result[0].slug).toBe('static');
    });

    it('deleteArticleBySlug llama fetchWithAuth con DELETE', async () => {
        (fetchWithAuth as jest.Mock).mockResolvedValueOnce({ ok: true });
        await deleteArticleBySlug('slug-de-prueba');
        expect(fetchWithAuth).toHaveBeenCalledWith(
            expect.stringContaining('/slug/slug-de-prueba'),
            expect.objectContaining({ method: 'DELETE' })
        );
    });

    it('updateArticleBySlug lanza error si falla', async () => {
        (fetchWithAuth as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => ({ message: 'Error' }),
        });

        await expect(updateArticleBySlug('slug', {})).rejects.toThrow('Error');
    });

    it('createArticle lanza error si falla', async () => {
        (fetchWithAuth as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => ({ message: 'Error' }),
        });

        await expect(createArticle({})).rejects.toThrow('Error');
    });
});
