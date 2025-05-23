/**
 * EditorContentArticle.test.tsx
 *
 * Test unitario del componente EditorContentArticle.
 * Verifica renderizado del textarea, instrucciones, prompt para IA,
 * conversión a HTML y propagación correcta mediante onChange.
 */

import React from "react";
import { render, screen, fireEvent } from "@/__tests__/utils/test-utils";
import EditorContentArticle from "@/components/admin/ui/blog/EditorContentArticle";

// Mock del formatter HTML para control total en test
jest.mock("@/components/admin/blog/helpers/htmlFormatter", () => ({
    formatToHtml: (input: string) => `<p>${input}</p>`,
}));

describe("EditorContentArticle", () => {
    it("renderiza correctamente el textarea y bloques <details>", () => {
        render(<EditorContentArticle content="" onChange={() => { }} />);

        expect(screen.getByPlaceholderText(/pega tu artículo aquí/i)).toBeInTheDocument();
        expect(screen.getByText(/ver instrucciones de formato/i)).toBeInTheDocument();
        expect(screen.getByText(/ver prompt sugerido para ia/i)).toBeInTheDocument();
    });

    it("actualiza el texto y llama a onChange con HTML", () => {
        const handleChange = jest.fn();
        render(<EditorContentArticle content="" onChange={handleChange} />);

        const textarea = screen.getByPlaceholderText(/pega tu artículo aquí/i);
        fireEvent.change(textarea, { target: { value: "Hola mundo" } });

        expect(handleChange).toHaveBeenCalledWith("<p>Hola mundo</p>");
        expect(textarea).toHaveValue("Hola mundo");
    });

    it("muestra el contenido inicial si se pasa por props", () => {
        const handleChange = jest.fn();
        render(<EditorContentArticle content="Texto inicial" onChange={handleChange} />);

        const textarea = screen.getByPlaceholderText(/pega tu artículo aquí/i);
        expect(textarea).toHaveValue("Texto inicial");
    });

    it("formatea automáticamente el texto pegado", () => {
        const handleChange = jest.fn();
        render(<EditorContentArticle content="" onChange={handleChange} />);

        const textarea = screen.getByPlaceholderText(/pega tu artículo aquí/i);
        fireEvent.change(textarea, { target: { value: "**Título**" } });

        expect(handleChange).toHaveBeenCalledWith("<p>**Título**</p>");
    });

    it("renderiza el contador de palabras correctamente", () => {
        render(<EditorContentArticle content="Prueba contador" onChange={() => { }} />);

        const contador = screen.getByText(/palabras mínimas/i);
        expect(contador).toBeInTheDocument();
    });
});
