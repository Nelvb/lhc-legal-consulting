/**
 * ForgotPasswordForm.test.tsx
 *
 * Test unitario para ForgotPasswordForm.tsx.
 * Verifica:
 * - Render correcto del formulario
 * - Llamada a userService.requestPasswordReset con email válido
 * - Mensajes de éxito y error
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@/__tests__/utils/test-utils";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { mockRequestPasswordReset } from "@/__mocks__/userService";

// Mock del servicio
jest.mock("@/lib/api/userService", () => require("@/__mocks__/userService"));

describe("ForgotPasswordForm", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renderiza input y botón correctamente", () => {
        render(<ForgotPasswordForm />);
        expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /enviar enlace/i })).toBeInTheDocument();
    });

    it("envía correctamente el email", async () => {
        mockRequestPasswordReset.mockResolvedValueOnce({});
        render(<ForgotPasswordForm />);

        fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
            target: { value: "test@example.com" },
        });

        fireEvent.click(screen.getByRole("button", { name: /enviar enlace/i }));

        await waitFor(() => {
            expect(mockRequestPasswordReset).toHaveBeenCalledWith("test@example.com");
        });

        expect(
            screen.getByText(/si existe una cuenta con ese correo/i)
        ).toBeInTheDocument();
    });

    it("muestra mensaje de error si la petición falla", async () => {
        mockRequestPasswordReset.mockRejectedValueOnce(new Error("Error inesperado"));

        render(<ForgotPasswordForm />);

        fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
            target: { value: "test@example.com" },
        });

        fireEvent.click(screen.getByRole("button", { name: /enviar enlace/i }));

        expect(await screen.findByText(/hubo un error/i)).toBeInTheDocument();
    });
});
