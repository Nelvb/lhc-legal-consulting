/**
 * Test unitario de SideMenuHeader.tsx
 *
 * Verifica:
 * - Renderizado del logo siempre.
 * - Renderizado del saludo solo si está autenticado.
 * - Comportamiento del botón de cierre.
 */

import React from "react";
import { render, screen, fireEvent } from "@/__tests__/utils/test-utils";
import SideMenuHeader from "@/components/common/SideMenuHeader";

// Mock de useAuth
jest.mock("@/hooks/useAuth", () => ({
    useAuth: () => ({
        isAuthenticated: true,
        user: { username: "Nelson" },
    }),
}));

describe("SideMenuHeader", () => {
    it("muestra el logo y el saludo si el usuario está autenticado", () => {
        render(<SideMenuHeader onClose={jest.fn()} />);

        expect(
            screen.getByAltText(/boost a project logo/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/hola nelson/i)).toBeInTheDocument();
    });

    it("llama a onClose al hacer clic en el botón de cerrar", () => {
        const handleClose = jest.fn();

        render(<SideMenuHeader onClose={handleClose} />);
        const closeButton = screen.getByRole("button", { name: /cerrar menú/i });
        fireEvent.click(closeButton);

        expect(handleClose).toHaveBeenCalledTimes(1);
    });
});
