/**
 * LoginForm.test.tsx
 *
 * Test unitario para LoginForm.tsx.
 * Valida:
 * - Renderizado inicial
 * - Cambio de inputs y toggle de contraseña
 * - Llamada a login con credenciales
 * - Renderizado de error si existe
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@/__tests__/utils/test-utils";
import LoginForm from "@/components/auth/LoginForm";
import { mockLogin } from "@/__mocks__/useAuth";

// Mocks
jest.mock("@/hooks/useAuth", () => require("@/__mocks__/useAuth"));
jest.mock("next/navigation", () => ({
    useRouter: () => ({ push: jest.fn() }),
}));

describe("LoginForm", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renderiza los campos de email y contraseña", () => {
        render(<LoginForm />);
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /iniciar sesión/i })).toBeInTheDocument();
    });

    it("permite escribir en los campos y mostrar/ocultar contraseña", () => {
        render(<LoginForm />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/contraseña/i);

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "12345678" } });

        expect(emailInput).toHaveValue("test@example.com");
        expect(passwordInput).toHaveValue("12345678");

        const toggleIcon = screen.getByRole("button", { hidden: true });
        fireEvent.click(toggleIcon);
    });

    it("llama a login al enviar el formulario", async () => {
        render(<LoginForm />);

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByLabelText(/contraseña/i), {
            target: { value: "password123" },
        });

        fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({
                email: "test@example.com",
                password: "password123",
            });
        });
    });

    it("muestra mensaje de error si existe", () => {
        const { rerender } = render(<LoginForm />);
        const error = "Credenciales inválidas";

        // Forzamos error
        const useAuth = require("@/__mocks__/useAuth");
        useAuth.useAuth.mockReturnValue({
            login: mockLogin,
            signup: jest.fn(),
            logout: jest.fn(),
            isAuthenticated: false,
            loading: false,
            error,
            user: null,
        });

        rerender(<LoginForm />);
        expect(screen.getByText(error)).toBeInTheDocument();
    });
});
