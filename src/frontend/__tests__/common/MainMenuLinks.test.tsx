/**
 * Test unitario de MainMenuLinks.tsx
 *
 * Verifica:
 * - Renderizado de todos los enlaces principales.
 * - Estilo del enlace activo.
 * - Llamada a onClickLink al hacer clic.
 */

import React from "react";
import { render, screen, fireEvent } from "@/__tests__/utils/test-utils";
import MainMenuLinks from "@/components/common/MainMenuLinks";

jest.mock("next/navigation", () => ({
    usePathname: () => "/blog",
}));

describe("MainMenuLinks", () => {
    it("renderiza todos los enlaces del menú", () => {
        render(<MainMenuLinks />);

        expect(screen.getByText("Inicio")).toBeInTheDocument();
        expect(screen.getByText("Proyectos")).toBeInTheDocument();
        expect(screen.getByText("Nosotros")).toBeInTheDocument();
        expect(screen.getByText("Blog")).toBeInTheDocument();
        expect(screen.getByText("Preguntas Frecuentes")).toBeInTheDocument();
        expect(screen.getByText("Contacto")).toBeInTheDocument();
    });

    it("aplica estilo de enlace activo en la ruta actual", () => {
        render(<MainMenuLinks />);

        const blogLink = screen.getByText("Blog");
        expect(blogLink).toHaveClass("font-semibold");
        expect(blogLink).toHaveClass("underline");
    });

    it("ejecuta onClickLink al hacer clic en un enlace", () => {
        const handleClick = jest.fn();
        render(<MainMenuLinks onClickLink={handleClick} />);

        const contactoLink = screen.getByText("Contacto");
        fireEvent.click(contactoLink);

        expect(handleClick).toHaveBeenCalled();
    });
});
