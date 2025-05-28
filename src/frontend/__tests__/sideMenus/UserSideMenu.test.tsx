/**
 * UserSideMenu.test.tsx
 *
 * Test unitario para UserSideMenu usando mocks reales Zustand.
 * Valida:
 * - Renderizado condicional (prop isOpen)
 * - Enlaces visibles
 * - Llamadas a logout() y openDeleteModal()
 */

import React from "react";
import { render, screen, fireEvent } from "@/__tests__/utils/test-utils";
import UserSideMenu from "@/components/sideMenus/UserSideMenu";

// Mocks reales
import {
    mockOpenDeleteModal,
    resetUiStoreMock,
} from "@/__mocks__/useUiStore";
import {
    mockLogout,
    mockAuthStoreState,
} from "@/__mocks__/useAuthStore";

jest.mock("@/stores/useAuthStore", () => require("@/__mocks__/useAuthStore"));
jest.mock("@/stores/useUiStore", () => require("@/__mocks__/useUiStore"));

jest.mock("next/navigation", () => ({
    usePathname: () => "/dashboard",
}));

jest.mock("@/components/common/SideMenuHeader", () => ({ onClose }: any) => (
    <div data-testid="user-header" onClick={onClose}>UserHeader</div>
));

jest.mock("@/components/common/MainMenuLinks", () => ({ onClickLink }: any) => (
    <div data-testid="main-links" onClick={onClickLink}>Enlaces</div>
));

describe("UserSideMenu (Zustand + mocks)", () => {
    beforeEach(() => {
        mockAuthStoreState.authenticated(); // usuario autenticado mock
        resetUiStoreMock();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("no renderiza nada si isOpen es false", () => {
        const { container } = render(<UserSideMenu isOpen={false} onClose={jest.fn()} />);
        expect(container.firstChild).toBeNull();
    });

    it("renderiza correctamente si isOpen es true", () => {
        render(<UserSideMenu isOpen={true} onClose={jest.fn()} />);
        expect(screen.getByText(/editar perfil/i)).toBeInTheDocument();
        expect(screen.getByText(/área privada/i)).toBeInTheDocument();
        expect(screen.getByText(/eliminar cuenta/i)).toBeInTheDocument();
        expect(screen.getByText(/cerrar sesión/i)).toBeInTheDocument();
    });

    it("llama a openDeleteModal y onClose al hacer clic en 'Eliminar cuenta'", () => {
        const onCloseMock = jest.fn();
        render(<UserSideMenu isOpen={true} onClose={onCloseMock} />);
        fireEvent.click(screen.getByText(/eliminar cuenta/i));
        expect(mockOpenDeleteModal).toHaveBeenCalledTimes(1);
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it("llama a logout y onClose al hacer clic en 'Cerrar sesión'", () => {
        const onCloseMock = jest.fn();
        render(<UserSideMenu isOpen={true} onClose={onCloseMock} />);
        fireEvent.click(screen.getByText(/cerrar sesión/i));
        expect(mockLogout).toHaveBeenCalledTimes(1);
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
});
