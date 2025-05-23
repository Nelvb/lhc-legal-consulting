/**
 * Test unitario de ArticlesSelector.tsx
 *
 * Verifica:
 * - Renderizado de lista de artículos simulados
 * - Selección y deselección
 * - Límite de selección (máximo 3)
 * - Llamada a setSelected con los valores correctos
 * - Aplicación de clases visuales al seleccionar artículos
 */

import React from 'react'
import { render, screen, fireEvent } from '@/__tests__/utils/test-utils'
import ArticlesSelector from '@/components/admin/ui/blog/ArticlesSelector'

const mockArticles = [
    { slug: 'articulo-de-prueba-1', title: 'Artículo de prueba 1' },
    { slug: 'articulo-de-prueba-2', title: 'Artículo de prueba 2' },
    { slug: 'articulo-de-prueba-3', title: 'Artículo de prueba 3' },
    { slug: 'articulo-de-prueba-4', title: 'Artículo de prueba 4' },
]

jest.mock('@/lib/blogService', () => ({
    __esModule: true,
    getArticleTitles: jest.fn(() => Promise.resolve(mockArticles)),
}))

describe('ArticlesSelector', () => {
    it('renderiza todos los artículos disponibles', async () => {
        render(<ArticlesSelector selected={[]} setSelected={() => { }} />)

        for (const article of mockArticles) {
            expect(await screen.findByText(article.title)).toBeInTheDocument()
        }
    })

    it('permite seleccionar y deseleccionar artículos', async () => {
        const setSelectedMock = jest.fn()
        const { rerender } = render(
            <ArticlesSelector selected={[]} setSelected={setSelectedMock} />
        )

        const firstArticle = await screen.findByText('Artículo de prueba 1')
        fireEvent.click(firstArticle)
        expect(setSelectedMock).toHaveBeenCalledWith(['articulo-de-prueba-1'])

        rerender(
            <ArticlesSelector selected={['articulo-de-prueba-1']} setSelected={setSelectedMock} />
        )
        const selectedArticle = await screen.findByText('Artículo de prueba 1')
        fireEvent.click(selectedArticle)
        expect(setSelectedMock).toHaveBeenCalledWith([])
    })

    it('no permite seleccionar más de 3 artículos', async () => {
        const setSelectedMock = jest.fn()
        render(
            <ArticlesSelector
                selected={[
                    'articulo-de-prueba-1',
                    'articulo-de-prueba-2',
                    'articulo-de-prueba-3',
                ]}
                setSelected={setSelectedMock}
            />
        )

        const fourthArticle = await screen.findByText('Artículo de prueba 4')
        fireEvent.click(fourthArticle)
        expect(setSelectedMock).not.toHaveBeenCalledWith(
            expect.arrayContaining(['articulo-de-prueba-4'])
        )
    })

    it('resalta los artículos seleccionados', async () => {
        render(<ArticlesSelector selected={['articulo-de-prueba-2']} setSelected={() => { }} />)

        const selectedArticle = await screen.findByText('Artículo de prueba 2')
        expect(selectedArticle.className).toMatch(/bg-slate-800/)
    })
})
