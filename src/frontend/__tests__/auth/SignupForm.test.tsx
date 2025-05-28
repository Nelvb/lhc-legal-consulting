/**
 * SignupForm.test.tsx
 *
 * Test unitario completo para SignupForm.tsx con Zustand y navegación mockeada.
 * Valida:
 * - Render de campos y placeholders
 * - Validaciones y errores visuales
 * - Llamadas al store
 * - Comportamiento de botones y spinner
 * - Integración con useRouter (mock de navegación)
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@/__tests__/utils/test-utils";
import SignupForm from "@/components/auth/SignupForm";
import {
    mockSignup,
    useAuthStore,
    mockAuthStoreState,
} from "@/__mocks__/useAuthStore";

// Mock useRouter de next/navigation
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

// Mock del store
jest.mock("@/stores/useAuthStore", () => require("@/__mocks__/useAuthStore"));

// Mock del Spinner
jest.mock("@/components/ui/Spinner", () => () => <div data-testid="spinner">Loading...</div>);

describe("SignupForm", () => {
    beforeEach(() => {
        mockAuthStoreState.reset();
        mockPush.mockReset();
    });

    it("renderiza campos y labels correctamente", () => {
        render(<SignupForm />);

        expect(screen.getByLabelText(/^nombre$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/apellidos/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^contraseña$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();
    });

    it("renderiza los placeholders profesionales", () => {
        render(<SignupForm />);

        expect(screen.getByPlaceholderText("Tu nombre")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Tus apellidos")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("tu@email.com")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Crea tu contraseña segura")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Confirma tu contraseña")).toBeInTheDocument();
    });

    it("muestra instrucciones de contraseña", () => {
        render(<SignupForm />);
        expect(screen.getByText(/mínimo 8 caracteres con/i)).toBeInTheDocument();
    });

    it("muestra error si las contraseñas no coinciden", async () => {
        render(<SignupForm />);

        fireEvent.change(screen.getByLabelText(/^nombre$/i), { target: { value: "Mario" } });
        fireEvent.change(screen.getByLabelText(/apellidos/i), { target: { value: "García López" } });
        fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: "mario@example.com" } });
        fireEvent.change(screen.getByLabelText(/^contraseña$/i), { target: { value: "Password123!" } });
        fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), {
            target: { value: "OtraPassword!" },
        });

        fireEvent.click(screen.getByRole("button", { name: /crear cuenta/i }));

        expect(await screen.findByText(/las contraseñas no coinciden/i)).toBeInTheDocument();
        expect(mockSignup).not.toHaveBeenCalled();
    });

    it("envía correctamente si los datos son válidos y redirige", async () => {
        render(<SignupForm />);

        fireEvent.change(screen.getByLabelText(/^nombre$/i), { target: { value: "Ana María" } });
        fireEvent.change(screen.getByLabelText(/apellidos/i), { target: { value: "Rodríguez Silva" } });
        fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: "ana@example.com" } });
        fireEvent.change(screen.getByLabelText(/^contraseña$/i), { target: { value: "SecurePass123!" } });
        fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), {
            target: { value: "SecurePass123!" },
        });

        fireEvent.click(screen.getByRole("button", { name: /crear cuenta/i }));

        await waitFor(() => {
            expect(mockSignup).toHaveBeenCalledWith({
                username: "Ana María",
                last_name: "Rodríguez Silva",
                email: "ana@example.com",
                password: "SecurePass123!",
            });
        });

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith("/dashboard");
        });
    });

    it("muestra error del store si existe", () => {
        const error = "El email ya existe";
        (useAuthStore as jest.Mock).mockReturnValue({
            ...useAuthStore(),
            error,
            clearError: jest.fn(),
        });

        render(<SignupForm />);
        expect(screen.getByText(error)).toBeInTheDocument();
    });

    it("muestra Spinner y desactiva botón si loading", () => {
        (useAuthStore as jest.Mock).mockReturnValue({
            ...useAuthStore(),
            loading: true,
            clearError: jest.fn(),
        });

        render(<SignupForm />);
        expect(screen.getByTestId("spinner")).toBeInTheDocument();
        const submitButton = screen.getByRole("button", { name: /creando cuenta/i });
        expect(submitButton).toBeDisabled();
    });

    it("permite alternar visibilidad de contraseñas", () => {
        render(<SignupForm />);
        const passwordInput = screen.getByLabelText(/^contraseña$/i);
        const confirmInput = screen.getByLabelText(/confirmar contraseña/i);

        const toggles = screen.getAllByRole("button").filter((btn) =>
            btn.className.includes("absolute")
        );

        fireEvent.click(toggles[0]);
        expect(passwordInput).toHaveAttribute("type", "text");

        fireEvent.click(toggles[1]);
        expect(confirmInput).toHaveAttribute("type", "text");
    });

    it("valida confirmación en tiempo real", async () => {
        render(<SignupForm />);
        fireEvent.change(screen.getByLabelText(/^contraseña$/i), {
            target: { value: "Valida123!" },
        });
        fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), {
            target: { value: "Diferente!" },
        });
        fireEvent.blur(screen.getByLabelText(/confirmar contraseña/i));

        expect(await screen.findByText(/las contraseñas no coinciden/i)).toBeInTheDocument();
    });
});