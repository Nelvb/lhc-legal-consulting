/**
 * LoginForm.test.tsx
 *
 * Test unitario para LoginForm.tsx actualizado.
 * Valida:
 * - Renderizado inicial con placeholders profesionales
 * - Cambio de inputs y toggle de contraseña
 * - Llamada a login con credenciales
 * - Renderizado de error si existe
 * - Funcionamiento del componente Spinner
 * - Estados de loading y botón deshabilitado
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@/__tests__/utils/test-utils";
import LoginForm from "@/components/auth/LoginForm";
import { mockLogin, useAuthStore } from "@/__mocks__/useAuthStore";

// Mocks
jest.mock("@/stores/useAuthStore", () => require("@/__mocks__/useAuthStore"));
jest.mock("next/navigation", () => ({
    useRouter: () => ({ push: jest.fn() }),
}));

// Mock del componente Spinner
jest.mock("@/components/ui/Spinner", () => {
    return function MockSpinner() {
        return <div data-testid="spinner">Loading...</div>;
    };
});

describe("LoginForm", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renderiza los campos de email y contraseña con placeholders", () => {
        render(<LoginForm />);

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /iniciar sesión/i })).toBeInTheDocument();

        // Verificar placeholders profesionales
        expect(screen.getByPlaceholderText("tu@email.com")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Tu contraseña")).toBeInTheDocument();
    });

    it("permite escribir en los campos y mostrar/ocultar contraseña", () => {
        render(<LoginForm />);

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/contraseña/i);

        fireEvent.change(emailInput, { target: { value: "mario@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "SecurePass123!" } });

        expect(emailInput).toHaveValue("mario@example.com");
        expect(passwordInput).toHaveValue("SecurePass123!");

        // Verificar toggle de visibilidad
        expect(passwordInput).toHaveAttribute("type", "password");

        // Buscar el elemento de toggle por clase CSS
        const container = screen.getByRole("heading", { name: /iniciar sesión/i }).closest("form");
        const toggleElement = container!.querySelector('.absolute.right-3.cursor-pointer');
        fireEvent.click(toggleElement!);

        expect(passwordInput).toHaveAttribute("type", "text");
    });

    it("llama a login al enviar el formulario", async () => {
        render(<LoginForm />);

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: "ana@example.com" },
        });
        fireEvent.change(screen.getByLabelText(/contraseña/i), {
            target: { value: "MyPassword123!" },
        });

        fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({
                email: "ana@example.com",
                password: "MyPassword123!",
            });
        });
    });

    it("muestra mensaje de error si existe", () => {
        const error = "Credenciales inválidas";

        (useAuthStore as jest.Mock).mockReturnValue({
            ...useAuthStore(),
            error,
            clearError: jest.fn(),
        });

        render(<LoginForm />);
        expect(screen.getByText(error)).toBeInTheDocument();
    });

    it("muestra spinner y deshabilita botón durante la carga", () => {
        (useAuthStore as jest.Mock).mockReturnValue({
            ...useAuthStore(),
            loading: true,
            clearError: jest.fn(),
        });

        render(<LoginForm />);

        expect(screen.getByTestId("spinner")).toBeInTheDocument();
        expect(screen.getByText("Iniciando sesión...")).toBeInTheDocument();

        const button = screen.getByRole("button", { name: /iniciando sesión/i });
        expect(button).toBeDisabled();
    });

    it("muestra el texto del botón normal cuando no está cargando", () => {
        // Asegurar que loading es false
        (useAuthStore as jest.Mock).mockReturnValue({
            ...useAuthStore(),
            loading: false,
            clearError: jest.fn(),
        });

        render(<LoginForm />);

        const button = screen.getByRole("button", { name: /iniciar sesión/i });
        expect(button).not.toBeDisabled();
        expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });

    it("tiene el título correcto", () => {
        render(<LoginForm />);

        expect(screen.getByRole("heading", { name: /iniciar sesión/i })).toBeInTheDocument();
    });
});