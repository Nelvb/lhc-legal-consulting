/**
 * ResetPasswordForm.test.tsx
 *
 * Test unitario para ResetPasswordForm.tsx.
 * Valida:
 * - Renderizado correcto de inputs
 * - Validaciones de contraseña mínima y coincidencia
 * - Llamada a userService.resetPassword() con token válido
 * - Renderizado de estados de éxito y error
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@/__tests__/utils/test-utils";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { mockResetPassword } from "@/__mocks__/userService";

// Mock de useRouter y useSearchParams
jest.mock("next/navigation", () => ({
    useSearchParams: () => ({
        get: () => "token123",
    }),
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

// Mock del servicio de usuario
jest.mock("@/lib/api/userService", () => require("@/__mocks__/userService"));

describe("ResetPasswordForm", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renderiza correctamente los campos", () => {
        render(<ResetPasswordForm />);
        expect(screen.getByLabelText(/contraseña nueva/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();
    });

    it("muestra error si no coinciden las contraseñas", async () => {
        render(<ResetPasswordForm />);

        fireEvent.change(screen.getByLabelText(/contraseña nueva/i), {
            target: { value: "123456" },
        });
        fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), {
            target: { value: "diferente" },
        });

        fireEvent.click(screen.getByRole("button", { name: /restablecer contraseña/i }));

        expect(await screen.findByText(/no coinciden/i)).toBeInTheDocument();
        expect(mockResetPassword).not.toHaveBeenCalled();
    });

    it("muestra error si la contraseña es demasiado corta", async () => {
        render(<ResetPasswordForm />);

        fireEvent.change(screen.getByLabelText(/contraseña nueva/i), {
            target: { value: "123" },
        });
        fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), {
            target: { value: "123" },
        });

        fireEvent.click(screen.getByRole("button", { name: /restablecer contraseña/i }));

        expect(await screen.findByText(/al menos 6 caracteres/i)).toBeInTheDocument();
        expect(mockResetPassword).not.toHaveBeenCalled();
    });

    it("llama a userService.resetPassword con datos correctos", async () => {
        mockResetPassword.mockResolvedValueOnce({});

        render(<ResetPasswordForm />);

        fireEvent.change(screen.getByLabelText(/contraseña nueva/i), {
            target: { value: "123456" },
        });
        fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), {
            target: { value: "123456" },
        });

        fireEvent.click(screen.getByRole("button", { name: /restablecer contraseña/i }));

        await waitFor(() => {
            expect(mockResetPassword).toHaveBeenCalledWith({
                token: "token123",
                new_password: "123456",
            });
        });

        // CORREGIDO: El texto real que muestra el componente
        expect(screen.getByText(/contraseña restablecida con éxito/i)).toBeInTheDocument();
    });

    it("muestra mensaje de error si el servicio falla", async () => {
        mockResetPassword.mockRejectedValueOnce(
            new Error("Error al restablecer la contraseña.")
        );

        render(<ResetPasswordForm />);

        fireEvent.change(screen.getByLabelText(/contraseña nueva/i), {
            target: { value: "123456" },
        });
        fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), {
            target: { value: "123456" },
        });

        fireEvent.click(screen.getByRole("button", { name: /restablecer contraseña/i }));

        expect(
            await screen.findByText(/error al restablecer la contraseña/i)
        ).toBeInTheDocument();
    });

    it("muestra botón de iniciar sesión tras éxito", async () => {
        mockResetPassword.mockResolvedValueOnce({});

        render(<ResetPasswordForm />);

        fireEvent.change(screen.getByLabelText(/contraseña nueva/i), {
            target: { value: "123456" },
        });
        fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), {
            target: { value: "123456" },
        });

        fireEvent.click(screen.getByRole("button", { name: /restablecer contraseña/i }));

        await waitFor(() => {
            expect(screen.getByText(/contraseña restablecida con éxito/i)).toBeInTheDocument();
        });

        expect(screen.getByRole("button", { name: /iniciar sesión/i })).toBeInTheDocument();
    });
});