/**
 * Test de éxito completo del formulario BlogArticleForm
 *
 * Verifica que:
 * - Se introducen datos válidos en todos los campos
 * - Se simula correctamente la subida de imagen
 * - Se seleccionan artículos relacionados
 * - Se ejecuta onSubmit con los datos esperados
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@/__tests__/utils/test-utils";
import BlogArticleForm from "@/components/admin/blog/BlogArticleForm";

// Mock del componente ImageUpload
jest.mock("@/components/ui/ImageUpload", () => ({
    __esModule: true,
    default: ({ onImageUpload }: any) => (
        <button onClick={() => onImageUpload("https://fakeurl.com/image.jpg")}>
            Subir Imagen Mock
        </button>
    ),
}));

// Mock del selector de artículos relacionados
jest.mock("@/components/admin/ui/blog/ArticlesSelector", () => ({
    __esModule: true,
    default: ({ setSelected }: any) => (
        <button onClick={() => setSelected(["rel-1", "rel-2"])}>
            Seleccionar Relacionados Mock
        </button>
    ),
}));

describe("BlogArticleForm - Éxito", () => {
    it("envía correctamente el artículo con datos válidos", async () => {
        const mockSubmit = jest.fn();

        render(<BlogArticleForm onSubmit={mockSubmit} />);

        fireEvent.change(screen.getByLabelText(/título/i), {
            target: { value: "Artículo sobre inversión inmobiliaria con IA" },
        });

        fireEvent.change(screen.getByLabelText(/resumen/i), {
            target: { value: "Este artículo explica cómo la IA transforma el sector inmobiliario." },
        });

        fireEvent.change(screen.getByLabelText(/contenido del artículo/i), {
            target: {
                value: "<p>" + "palabra ".repeat(1000) + "</p>", // Mínimo 1000 palabras
            },
        });

        fireEvent.click(screen.getByText("Subir Imagen Mock"));
        fireEvent.click(screen.getByText("Seleccionar Relacionados Mock"));

        fireEvent.click(screen.getByRole("button", { name: /publicar artículo/i }));

        await waitFor(() => {
            expect(mockSubmit).toHaveBeenCalledWith(
                expect.objectContaining({
                    title: "Artículo sobre inversión inmobiliaria con IA",
                    excerpt: "Este artículo explica cómo la IA transforma el sector inmobiliario.",
                    content: expect.any(String),
                    image: "https://fakeurl.com/image.jpg",
                    related: ["rel-1", "rel-2"],
                })
            );
        });
    });
});
