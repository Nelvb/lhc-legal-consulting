/**
 * AdminSideMenu.test.tsx
 *
 * Test unitario del componente AdminSideMenu.
 * Valida:
 * - No renderizar cuando isOpen es false
 * - Renderizado completo con isOpen true
 * - Renderizado de enlaces de gestión y botón de logout
 *
 * Usa mocks de Zustand para simular el store de autenticación.
 */

import React from "react";
import { render, screen } from "@/__tests__/utils/test-utils";
import AdminSideMenu from "@/components/sideMenus/AdminSideMenu";

// Mocks
jest.mock("@/stores/useAuthStore", () => ({
    useAuthStore: jest.fn(),
}));

jest.mock("next/navigation", () => ({
    usePathname: () => "/admin",
}));

jest.mock("@/components/common/SideMenuHeader", () => ({ onClose }: any) => (
    <div data-testid="admin-header" onClick={onClose}>AdminHeader</div>
));

jest.mock("@/components/common/MainMenuLinks", () => ({ onClickLink }: any) => (
    <div data-testid="main-menu-links" onClick={onClickLink}>Main Links</div>
));

const { useAuthStore } = require("@/stores/useAuthStore");

describe("AdminSideMenu", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        useAuthStore.mockReturnValue({
            user: {
                id: "admin1",
                name: "Admin",
                email: "admin@example.com",
                is_admin: true,
            },
            logout: jest.fn(),
        });
    });

    it("no renderiza nada si isOpen es false", () => {
        const { container } = render(<AdminSideMenu isOpen={false} onClose={jest.fn()} />);
        expect(container.firstChild).toBeNull();
    });

    it("renderiza enlaces de admin y botón logout si isOpen es true", () => {
        render(<AdminSideMenu isOpen={true} onClose={jest.fn()} />);
        expect(screen.getByText(/área privada/i)).toBeInTheDocument();
        expect(screen.getByText(/editar proyectos/i)).toBeInTheDocument();
        expect(screen.getByText(/editar blog/i)).toBeInTheDocument();
        expect(screen.getByText(/mi cuenta/i)).toBeInTheDocument();
        expect(screen.getByText(/cerrar sesión/i)).toBeInTheDocument();
    });
});
