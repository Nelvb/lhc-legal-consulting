/**
 * Navbar.test.tsx
 *
 * Test unitario del componente Navbar.
 * Valida el renderizado del logo, botón hamburguesa y los menús laterales.
 * Simula los distintos tipos de usuario: no autenticado, autenticado, admin.
 * Mockea useAuthStore, NavbarLinks y menús laterales.
 */

import React from "react";
import { render, screen, fireEvent } from "@/__tests__/utils/test-utils";
import Navbar from "@/components/layout/Navbar";
import { mockLogout, useAuthStore } from "@/__mocks__/useAuthStore";

// Mocks de Zustand
jest.mock("@/stores/useAuthStore", () => require("@/__mocks__/useAuthStore"));

// Mocks de componentes relacionados
jest.mock("@/components/layout/NavbarLinks", () => () => (
    <div data-testid="mock-navbar-links">NavbarLinks</div>
));

jest.mock("@/components/sideMenus/SideMenu", () => ({
    __esModule: true,
    default: ({ isOpen }: { isOpen: boolean }) =>
        isOpen ? <div data-testid="side-menu-publico">Menú público abierto</div> : null,
}));

jest.mock("@/components/sideMenus/UserSideMenu", () => ({
    __esModule: true,
    default: ({ isOpen }: { isOpen: boolean }) =>
        isOpen ? <div data-testid="side-menu-usuario">Menú usuario abierto</div> : null,
}));

jest.mock("@/components/sideMenus/AdminSideMenu", () => ({
    __esModule: true,
    default: ({ isOpen }: { isOpen: boolean }) =>
        isOpen ? <div data-testid="side-menu-admin">Menú admin abierto</div> : null,
}));

describe("Navbar", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renderiza logo y menú público cuando no hay usuario", () => {
        (useAuthStore as jest.Mock).mockReturnValue({
            isAuthenticated: false,
            loading: false,
            error: null,
            user: null,
            login: jest.fn(),
            signup: jest.fn(),
            logout: mockLogout,
        });

        render(<Navbar />);
        expect(screen.getByAltText(/boost a project logo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/abrir menú/i)).toBeInTheDocument();
        expect(screen.getByTestId("mock-navbar-links")).toBeInTheDocument();

        fireEvent.click(screen.getByLabelText(/abrir menú/i));
        expect(screen.getByTestId("side-menu-publico")).toBeInTheDocument();
    });

    it("renderiza menú lateral de usuario autenticado", () => {
        (useAuthStore as jest.Mock).mockReturnValue({
            isAuthenticated: true,
            loading: false,
            error: null,
            user: {
                id: "123",
                name: "Usuario",
                email: "user@test.com",
                is_admin: false,
            },
            login: jest.fn(),
            signup: jest.fn(),
            logout: mockLogout,
        });

        render(<Navbar />);
        fireEvent.click(screen.getByLabelText(/abrir menú/i));
        expect(screen.getByTestId("side-menu-usuario")).toBeInTheDocument();
    });

    it("renderiza menú lateral de administrador", () => {
        (useAuthStore as jest.Mock).mockReturnValue({
            isAuthenticated: true,
            loading: false,
            error: null,
            user: {
                id: "admin",
                name: "Admin",
                email: "admin@test.com",
                is_admin: true,
            },
            login: jest.fn(),
            signup: jest.fn(),
            logout: mockLogout,
        });

        render(<Navbar />);
        fireEvent.click(screen.getByLabelText(/abrir menú/i));
        expect(screen.getByTestId("side-menu-admin")).toBeInTheDocument();
    });
});
