/**
 * NavbarLinks.test.tsx
 *
 * Test unitario del componente NavbarLinks.
 * Valida el renderizado condicional de enlaces según:
 * - Ruta actual (pathname)
 * - Estado de autenticación (usuario autenticado o no)
 *
 * Mockea:
 * - useAuthStore: para simular el estado global
 * - usePathname: para simular rutas
 */

import React from "react";
import { render, screen, fireEvent } from "@/__tests__/utils/test-utils";
import NavbarLinks from "@/components/layout/NavbarLinks";
import { mockLogout, useAuthStore } from "@/__mocks__/useAuthStore";

jest.mock("@/stores/useAuthStore", () => require("@/__mocks__/useAuthStore"));
jest.mock("next/navigation", () => ({
    usePathname: jest.fn(),
}));

describe("NavbarLinks (usuario autenticado)", () => {
    const { usePathname } = require("next/navigation");

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renderiza saludo y botón de logout en '/'", () => {
        usePathname.mockReturnValue("/");

        (useAuthStore as jest.Mock).mockReturnValue({
            isAuthenticated: true,
            user: { username: "Nelson" },
            logout: mockLogout,
        });

        render(<NavbarLinks />);
        expect(screen.getByText(/hola nelson/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /cerrar sesión/i })).toBeInTheDocument();
    });

    it("renderiza saludo y botón de logout en '/dashboard'", () => {
        usePathname.mockReturnValue("/dashboard");

        (useAuthStore as jest.Mock).mockReturnValue({
            isAuthenticated: true,
            user: { username: "Nelson" },
            logout: mockLogout,
        });

        render(<NavbarLinks />);
        expect(screen.getByText(/hola nelson/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /cerrar sesión/i })).toBeInTheDocument();
    });

    it("ejecuta logout al hacer clic en 'Cerrar Sesión'", () => {
        usePathname.mockReturnValue("/dashboard");

        (useAuthStore as jest.Mock).mockReturnValue({
            isAuthenticated: true,
            user: { username: "Nelson" },
            logout: mockLogout,
        });

        render(<NavbarLinks />);
        fireEvent.click(screen.getByRole("button", { name: /cerrar sesión/i }));

        expect(mockLogout).toHaveBeenCalledTimes(1);
    });
});

describe("NavbarLinks (usuario no autenticado)", () => {
    const { usePathname } = require("next/navigation");

    beforeEach(() => {
        jest.clearAllMocks();
        (useAuthStore as jest.Mock).mockReturnValue({
            isAuthenticated: false,
            user: null,
            logout: mockLogout,
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
