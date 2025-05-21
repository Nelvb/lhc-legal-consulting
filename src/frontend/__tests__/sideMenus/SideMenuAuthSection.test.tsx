/**
 * Test unitario de SideMenuAuthSection.tsx
 *
 * Verifica:
 * - Render de botones de login/registro si no autenticado.
 * - Render de botón de logout si autenticado.
 * - Llamada a logout y onClose al hacer clic.
 */

import React from "react";
import { render, screen, fireEvent } from "@/__tests__/utils/test-utils";
import SideMenuAuthSection from "@/components/sideMenus/SideMenuAuthSection";
import { mockLogout } from "@/__mocks__/useAuth";

// Mock global de useAuth
jest.mock("@/hooks/useAuth", () => require("@/__mocks__/useAuth"));
jest.mock("next/navigation", () => ({
    usePathname: jest.fn(() => "/"),
}));

describe("SideMenuAuthSection", () => {
    const onCloseMock = jest.fn();

    afterEach(() => {
        mockLogout.mockClear();
        onCloseMock.mockClear();
    });

    it("renderiza botón de logout si usuario autenticado", () => {
        render(<SideMenuAuthSection onClose={onCloseMock} />);

        expect(screen.getByText(/cerrar sesión/i)).toBeInTheDocument();
    });

    it("llama a logout y onClose al hacer clic en 'Cerrar Sesión'", () => {
        render(<SideMenuAuthSection onClose={onCloseMock} />);

        fireEvent.click(screen.getByText(/cerrar sesión/i));
        expect(mockLogout).toHaveBeenCalledTimes(1);
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it("renderiza botones de login y registro si no autenticado", () => {
        // Overwrite el mock con no autenticado
        const { useAuth } = require("@/__mocks__/useAuth");
        useAuth.mockReturnValue({
            isAuthenticated: false,
            user: null,
            logout: jest.fn(),
            login: jest.fn(),
            signup: jest.fn(),
            loading: false,
            error: null,
        });

        render(<SideMenuAuthSection onClose={onCloseMock} />);

        expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument();
        expect(screen.getByText(/registrarse/i)).toBeInTheDocument();
    });
});
