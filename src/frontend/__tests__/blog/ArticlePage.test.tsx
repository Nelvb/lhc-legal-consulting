/**
 * ArticlePage.test.tsx
 *
 * Test de integración de la vista pública de un artículo del blog (/blog/[slug]).
 * Cubre:
 * - Renderizado correcto del título, contenido y sección de artículos relacionados.
 * - Estados de carga y error.
 * - Validación de que se llama a getArticleBySlug y getArticles correctamente.
 */

import React from "react";
import { render, screen, waitFor } from "@/__tests__/utils/test-utils";
import ArticlePage from "@/app/blog/[slug]/page";
import { mockGetArticleBySlug, mockGetArticles } from "@/__mocks__/blogService";

// Mock de next/navigation (slug desde la URL)
jest.mock("next/navigation", () => ({
    useParams: () => ({ slug: "mi-articulo-prueba" }),
}));

// Mock del servicio de blog
jest.mock("@/lib/blogService", () => require("@/__mocks__/blogService"));

describe("Vista pública del artículo /blog/[slug]", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renderiza el artículo y artículos relacionados correctamente", async () => {
        render(<ArticlePage />);

        // Verifica el estado de carga
        expect(screen.getByText(/cargando artículo/i)).toBeInTheDocument();

        // Espera a que se renderice el artículo tras carga
        await waitFor(() => {
            expect(
                screen.getByRole("heading", { name: /título de prueba/i })
            ).toBeInTheDocument();
        });

        // Verifica que se renderiza el contenido
        expect(
            screen.getByText(/este es el contenido en html del artículo de prueba/i)
        ).toBeInTheDocument();

        // Verifica artículos relacionados
        expect(
            screen.getByRole("heading", { name: /artículos que podrían interesarte/i })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("heading", { name: /artículo relacionado/i })
        ).toBeInTheDocument();
    });

    it("muestra mensaje de error si getArticleBySlug devuelve null", async () => {
        mockGetArticleBySlug.mockResolvedValueOnce(null);

        render(<ArticlePage />);

        await waitFor(() => {
            expect(
                screen.getByRole("heading", { name: /artículo no encontrado/i })
            ).toBeInTheDocument();
        });
    });

    it("muestra mensaje de error si getArticleBySlug lanza error", async () => {
        mockGetArticleBySlug.mockRejectedValueOnce(new Error("Error inesperado"));

        render(<ArticlePage />);

        await waitFor(() => {
            expect(screen.getByText(/error inesperado/i)).toBeInTheDocument();
        });
    });
});
