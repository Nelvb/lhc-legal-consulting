/**
 * SideMenuAuthSection.test.tsx
 *
 * Test unitario del componente SideMenuAuthSection.
 * Valida:
 * - Renderizado de botones de login/registro si el usuario no está autenticado
 * - Renderizado del botón de logout si el usuario está autenticado
 * - Llamada a logout y onClose al hacer clic en cerrar sesión
 *
 * Usa mocks de Zustand con el nuevo sistema de autenticación.
 */

import React from "react";
import { render, screen, fireEvent } from "@/__tests__/utils/test-utils";
import SideMenuAuthSection from "@/components/sideMenus/SideMenuAuthSection";

// Mock de Zustand store
jest.mock("@/stores/useAuthStore", () => ({
    useAuthStore: jest.fn(),
}));

jest.mock("next/navigation", () => ({
    usePathname: jest.fn(() => "/"),
}));

const { useAuthStore } = require("@/stores/useAuthStore");

describe("SideMenuAuthSection", () => {
    const onCloseMock = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renderiza botón de logout si usuario autenticado", () => {
        useAuthStore.mockReturnValue({
            isAuthenticated: true,
            logout: jest.fn(),
        });

        render(<SideMenuAuthSection onClose={onCloseMock} />);

        expect(screen.getByText(/cerrar sesión/i)).toBeInTheDocument();
    });

    it("llama a logout y onClose al hacer clic en 'Cerrar Sesión'", () => {
        const logoutMock = jest.fn();

        useAuthStore.mockReturnValue({
            isAuthenticated: true,
            logout: logoutMock,
        });

        render(<SideMenuAuthSection onClose={onCloseMock} />);

        fireEvent.click(screen.getByText(/cerrar sesión/i));
        expect(logoutMock).toHaveBeenCalledTimes(1);
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it("renderiza botones de login y registro si no autenticado", () => {
        useAuthStore.mockReturnValue({
            isAuthenticated: false,
        });

        render(<SideMenuAuthSection onClose={onCloseMock} />);

        expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument();
        expect(screen.getByText(/registrarse/i)).toBeInTheDocument();
    });
});
