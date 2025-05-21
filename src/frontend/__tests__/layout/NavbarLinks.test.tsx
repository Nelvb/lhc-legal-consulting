/**
 * NavbarLinks.test.tsx
 *
 * Test unitario del componente NavbarLinks.
 * Valida el renderizado condicional de enlaces según:
 * - Ruta actual (pathname)
 * - Estado de autenticación (usuario autenticado o no)
 *
 * Se mockean:
 * - useAuth: para simular el estado global de autenticación
 * - usePathname: para simular la ruta actual
 *
 * Cobertura:
 * - Renderizado de enlaces públicos cuando no está autenticado
 * - Renderizado del saludo y logout cuando está autenticado
 * - Comportamiento del botón "Cerrar Sesión"
 */

import React from "react";
import { render, screen, fireEvent } from "@/__tests__/utils/test-utils";
import NavbarLinks from "@/components/layout/NavbarLinks";
import { mockLogout } from "@/__mocks__/useAuth";

jest.mock("@/hooks/useAuth", () => require("@/__mocks__/useAuth"));
jest.mock("next/navigation", () => ({
    usePathname: jest.fn(),
}));

describe("NavbarLinks (usuario autenticado)", () => {
    const { usePathname } = require("next/navigation");

    afterEach(() => {
        mockLogout.mockClear();
    });

    it("renderiza saludo y botón de logout en '/'", () => {
        usePathname.mockReturnValue("/");

        render(<NavbarLinks />);

        expect(screen.getByText(/hola/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /cerrar sesión/i })).toBeInTheDocument();
    });

    it("renderiza saludo y botón de logout en '/dashboard'", () => {
        usePathname.mockReturnValue("/dashboard");

        render(<NavbarLinks />);

        expect(screen.getByText(/hola/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /cerrar sesión/i })).toBeInTheDocument();
    });

    it("ejecuta logout al hacer clic en 'Cerrar Sesión'", () => {
        usePathname.mockReturnValue("/dashboard");

        render(<NavbarLinks />);
        const logoutButton = screen.getByRole("button", { name: /cerrar sesión/i });
        fireEvent.click(logoutButton);

        expect(mockLogout).toHaveBeenCalledTimes(1);
    });
});

describe("NavbarLinks (usuario no autenticado)", () => {
    const { useAuth } = require("@/__mocks__/useAuth");
    const { usePathname } = require("next/navigation");

    beforeAll(() => {
        // Sobrescribimos el mock de useAuth para esta sección
        useAuth.mockReturnValue({
            isAuthenticated: false,
            user: null,
            logout: jest.fn(),
        });
    });

    it("renderiza enlaces públicos en '/'", () => {
        usePathname.mockReturnValue("/");

        render(<NavbarLinks />);

        expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument();
        expect(screen.getByText(/registrarse/i)).toBeInTheDocument();
    });

    it("renderiza enlace a Inicio en '/login'", () => {
        usePathname.mockReturnValue("/login");

        render(<NavbarLinks />);

        expect(screen.getByText(/inicio/i)).toBeInTheDocument();
        expect(screen.getByText(/registrarse/i)).toBeInTheDocument();
    });

    it("renderiza enlace a Inicio e Iniciar Sesión en '/signup'", () => {
        usePathname.mockReturnValue("/signup");

        render(<NavbarLinks />);

        expect(screen.getByText(/inicio/i)).toBeInTheDocument();
        expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument();
    });
});
