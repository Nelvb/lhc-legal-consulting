import React from 'react';
import { render, screen, fireEvent } from '@/__tests__/utils/test-utils';
import BlogArticleForm from '@/components/admin/blog/BlogArticleForm';

describe('BlogArticleForm', () => {
    it('muestra error si se envía sin completar los campos obligatorios', async () => {
        const mockSubmit = jest.fn();
        render(<BlogArticleForm onSubmit={mockSubmit} />);

        const publishButton = screen.getByRole('button', { name: /publicar artículo/i });
        fireEvent.click(publishButton);

        expect(await screen.findByText(/entre 10 y 100 caracteres/i)).toBeInTheDocument();
        expect(await screen.findByText(/entre 50 y 200 caracteres/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/pega tu artículo aquí/i)).toBeInTheDocument();
        expect(await screen.findByText(/ver instrucciones de formato/i)).toBeInTheDocument();
    });

    it('debería simular fetch automáticamente', async () => {
        const response = await fetch('/api/articles');
        const data = await response.json();

        expect(Array.isArray(data.articles)).toBe(true);
        expect(data.articles.length).toBeGreaterThan(0);
        expect(data.articles[0]).toHaveProperty('title');
        expect(data.articles[0]).toHaveProperty('slug');
    });
});
