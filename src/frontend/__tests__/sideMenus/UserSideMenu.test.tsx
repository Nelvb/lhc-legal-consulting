/**
 * Test unitario de UserSideMenu.tsx
 *
 * Verifica que el menú lateral del usuario autenticado se renderiza
 * correctamente con los enlaces privados y los botones de eliminar cuenta
 * y cerrar sesión. Se mockea DeleteAccountModal, useAuth y usePathname.
 */

import React from "react";
import { render, screen, fireEvent } from "@/__tests__/utils/test-utils";
import UserSideMenu from "@/components/sideMenus/UserSideMenu";

jest.mock("@/components/user/DeleteAccountModal", () => ({ isOpen }: any) =>
    isOpen ? <div data-testid="modal-eliminar-cuenta">Eliminar cuenta</div> : null
);

jest.mock("@/hooks/useAuth", () => ({
    useAuth: () => ({
        logout: jest.fn(),
        user: {
            id: "u1",
            name: "Nelson",
            email: "nelson@example.com",
            is_admin: false,
        },
    }),
}));

jest.mock("next/navigation", () => ({
    usePathname: () => "/dashboard",
}));

jest.mock("@/components/common/SideMenuHeader", () => ({ onClose }: any) => (
    <div data-testid="user-header" onClick={onClose}>UserHeader</div>
));

jest.mock("@/components/common/MainMenuLinks", () => ({ onClickLink }: any) => (
    <div data-testid="main-links" onClick={onClickLink}>Enlaces</div>
));

describe("UserSideMenu", () => {
    it("no renderiza nada si isOpen es false", () => {
        const { container } = render(<UserSideMenu isOpen={false} onClose={jest.fn()} />);
        expect(container.firstChild).toBeNull();
    });

    it("renderiza enlaces privados y botones si isOpen es true", () => {
        render(<UserSideMenu isOpen={true} onClose={jest.fn()} />);
        expect(screen.getByText(/editar perfil/i)).toBeInTheDocument();
        expect(screen.getByText(/área privada/i)).toBeInTheDocument();
        expect(screen.getByText(/eliminar cuenta/i)).toBeInTheDocument();
        expect(screen.getByText(/cerrar sesión/i)).toBeInTheDocument();
    });
});
