/**
 * DeleteAccountModal.test.tsx
 *
 * Test unitario para DeleteAccountModal.
 * Verifica:
 * - Render condicional según `isOpen`
 * - Cierre del modal al hacer clic en "Cancelar"
 * - Llamada a userService.deleteAccount() y logout al confirmar
 * - Manejo de errores con alert si falla la eliminación
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@/__tests__/utils/test-utils";
import DeleteAccountModal from "@/components/user/DeleteAccountModal";
import { mockLogout } from "@/__mocks__/useAuth";

// Mocks
jest.mock("@/hooks/useAuth", () => require("@/__mocks__/useAuth"));
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

describe("DeleteAccountModal", () => {
    const onCloseMock = jest.fn();

    beforeAll(() => {
        jest.spyOn(window, "alert").mockImplementation(() => { });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("no renderiza nada si isOpen es false", () => {
        const { container } = render(
            <DeleteAccountModal isOpen={false} onClose={onCloseMock} />
        );
        expect(container.firstChild).toBeNull();
    });

    it("muestra el modal correctamente si isOpen es true", () => {
        render(<DeleteAccountModal isOpen={true} onClose={onCloseMock} />);
        expect(
            screen.getByText(/¿estás seguro de que quieres eliminar tu cuenta/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/cancelar/i)).toBeInTheDocument();
        expect(screen.getByText(/eliminar cuenta/i)).toBeInTheDocument();
    });

    it("ejecuta onClose al hacer clic en 'Cancelar'", () => {
        render(<DeleteAccountModal isOpen={true} onClose={onCloseMock} />);
        fireEvent.click(screen.getByText(/cancelar/i));
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it("llama a deleteAccount y logout al confirmar eliminación", async () => {
        deleteAccount.mockResolvedValueOnce({});
        render(<DeleteAccountModal isOpen={true} onClose={onCloseMock} />);
        fireEvent.click(screen.getByText(/eliminar cuenta/i));

        await waitFor(() => {
            expect(deleteAccount).toHaveBeenCalledTimes(1);
            expect(mockLogout).toHaveBeenCalledTimes(1);
        });
    });

    it("muestra alerta si deleteAccount falla", async () => {
        const alertMock = jest.spyOn(window, "alert").mockImplementation(() => { });
        deleteAccount.mockRejectedValueOnce(new Error("Error del servidor"));

        render(<DeleteAccountModal isOpen={true} onClose={onCloseMock} />);
        fireEvent.click(screen.getByText(/eliminar cuenta/i));

        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith("Error del servidor");
        });

        alertMock.mockRestore();
    });
});
