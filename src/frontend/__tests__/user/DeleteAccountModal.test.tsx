/**
 * DeleteAccountModal.test.tsx
 *
 * Test unitario para DeleteAccountModal global.
 * Verifica:
 * - Render condicional según store Zustand (`showDeleteModal`)
 * - Cierre del modal con `closeDeleteModal()`
 * - Llamada a `userService.deleteAccount()` y `logout()`
 * - Manejo de errores
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@/__tests__/utils/test-utils";
import DeleteAccountModal from "@/components/user/DeleteAccountModal";

// Mocks reales
import {
    useUiStore,
    mockCloseDeleteModal,
    resetUiStoreMock,
} from "@/__mocks__/useUiStore";
import { mockLogout } from "@/__mocks__/useAuthStore";

jest.mock("@/stores/useAuthStore", () => require("@/__mocks__/useAuthStore"));
jest.mock("@/stores/useUiStore", () => require("@/__mocks__/useUiStore"));

jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

jest.mock("@/lib/api/userService", () => ({
    userService: {
        deleteAccount: jest.fn(),
    },
}));

const { deleteAccount } = require("@/lib/api/userService").userService;

describe("DeleteAccountModal (Zustand + Mocks)", () => {
    beforeEach(() => {
        resetUiStoreMock(); // estado limpio
        useUiStore().openDeleteModal(); // activamos el modal
    });

    afterEach(() => {
        jest.clearAllMocks();
        resetUiStoreMock();
    });

    it("renderiza el modal si showDeleteModal es true", () => {
        render(<DeleteAccountModal />);
        expect(
            screen.getByText(/¿estás seguro de que quieres eliminar tu cuenta/i)
        ).toBeInTheDocument();
    });

    it("cierra el modal al hacer clic en 'Cancelar'", () => {
        render(<DeleteAccountModal />);
        fireEvent.click(screen.getByText(/cancelar/i));
        expect(mockCloseDeleteModal).toHaveBeenCalled();
    });

    it("llama a deleteAccount y logout al confirmar", async () => {
        deleteAccount.mockResolvedValueOnce({});
        render(<DeleteAccountModal />);
        fireEvent.click(screen.getByText(/eliminar cuenta/i));

        await waitFor(() => {
            expect(deleteAccount).toHaveBeenCalled();
            expect(mockLogout).toHaveBeenCalled();
        });
    });

    it("muestra una alerta si deleteAccount lanza error", async () => {
        const alertMock = jest.spyOn(window, "alert").mockImplementation(() => { });
        deleteAccount.mockRejectedValueOnce(new Error("Error del servidor"));

        render(<DeleteAccountModal />);
        fireEvent.click(screen.getByText(/eliminar cuenta/i));

        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith("Error del servidor");
        });

        alertMock.mockRestore();
    });
});
