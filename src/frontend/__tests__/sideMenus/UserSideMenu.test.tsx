/**
 * UserSideMenu.test.tsx
 *
 * Test unitario del componente UserSideMenu.
 * Valida:
 * - Renderizado condicional según isOpen
 * - Visualización de enlaces privados
 * - Llamada a logout y apertura de modal de eliminación
 *
 * Usa mocks de Zustand y subcomponentes dependientes.
 */

import React from "react";
import { render, screen, fireEvent } from "@/__tests__/utils/test-utils";
import UserSideMenu from "@/components/sideMenus/UserSideMenu";

// Mocks
jest.mock("@/components/user/DeleteAccountModal", () => ({ isOpen }: any) =>
    isOpen ? <div data-testid="modal-eliminar-cuenta">Eliminar cuenta</div> : null
);

jest.mock("@/stores/useAuthStore", () => ({
    useAuthStore: jest.fn(),
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

const { useAuthStore } = require("@/stores/useAuthStore");

describe("UserSideMenu", () => {
    const logoutMock = jest.fn();

    beforeEach(() => {
        useAuthStore.mockReturnValue({
            logout: logoutMock,
            user: {
                id: "u1",
                name: "Nelson",
                email: "nelson@example.com",
                is_admin: false,
            },
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("no renderiza nada si isOpen es false", () => {
        const { container } = render(<UserSideMenu isOpen={false} onClose={jest.fn()} />);
        expect(container.firstChild).toBeNull();
    });

    it("renderiza correctamente enlaces y botones si isOpen es true", () => {
        render(<UserSideMenu isOpen={true} onClose={jest.fn()} />);

        expect(screen.getByText(/editar perfil/i)).toBeInTheDocument();
        expect(screen.getByText(/área privada/i)).toBeInTheDocument();
        expect(screen.getByText(/eliminar cuenta/i)).toBeInTheDocument();
        expect(screen.getByText(/cerrar sesión/i)).toBeInTheDocument();
    });

    it("abre modal de eliminación al hacer clic en 'Eliminar cuenta'", () => {
        render(<UserSideMenu isOpen={true} onClose={jest.fn()} />);
        fireEvent.click(screen.getByText(/eliminar cuenta/i));
        expect(screen.getByTestId("modal-eliminar-cuenta")).toBeInTheDocument();
    });

    it("llama a logout al hacer clic en 'Cerrar sesión'", () => {
        const onCloseMock = jest.fn();
        render(<UserSideMenu isOpen={true} onClose={onCloseMock} />);
        fireEvent.click(screen.getByText(/cerrar sesión/i));
        expect(logoutMock).toHaveBeenCalledTimes(1);
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
});
