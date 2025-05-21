/**
 * Test unitario de AdminSideMenu.tsx
 *
 * Verifica que el menú lateral del administrador se renderiza correctamente
 * con enlaces de gestión y logout. Mockea dependencias internas.
 */

import React from "react";
import { render, screen } from "@/__tests__/utils/test-utils";
import AdminSideMenu from "@/components/sideMenus/AdminSideMenu";

jest.mock("@/hooks/useAuth", () => ({
    useAuth: () => ({
        logout: jest.fn(),
        user: {
            id: "admin1",
            name: "Admin",
            email: "admin@example.com",
            is_admin: true,
        },
    }),
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

describe("AdminSideMenu", () => {
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
