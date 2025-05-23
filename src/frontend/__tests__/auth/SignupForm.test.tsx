/**
 * SignupForm.test.tsx
 *
 * Test unitario para SignupForm.tsx.
 * Valida:
 * - Renderizado de inputs
 * - Validación de coincidencia de contraseñas
 * - Envío correcto con datos válidos
 * - Renderizado de errores
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@/__tests__/utils/test-utils";
import SignupForm from "@/components/auth/SignupForm";
import { mockSignup, useAuthStore } from "@/__mocks__/useAuthStore";

// Mocks
jest.mock("@/stores/useAuthStore", () => require("@/__mocks__/useAuthStore"));

describe("SignupForm", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renderiza todos los campos del formulario", () => {
        render(<SignupForm />);

        expect(screen.getByLabelText(/nombre de usuario/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^contraseña$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/repetir contraseña/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /registrarse/i })).toBeInTheDocument();
    });

    it("muestra error si las contraseñas no coinciden", async () => {
        render(<SignupForm />);

        fireEvent.change(screen.getByLabelText(/nombre de usuario/i), {
            target: { value: "nelson" },
        });
        fireEvent.change(screen.getByLabelText(/^email$/i), {
            target: { value: "nelson@example.com" },
        });
        fireEvent.change(screen.getByLabelText(/^contraseña$/i), {
            target: { value: "12345678" },
        });
        fireEvent.change(screen.getByLabelText(/repetir contraseña/i), {
            target: { value: "otrovalor" },
        });

        fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));

        expect(await screen.findByText(/no coinciden/i)).toBeInTheDocument();
        expect(mockSignup).not.toHaveBeenCalled();
    });

    it("envía correctamente si los datos son válidos", async () => {
        render(<SignupForm />);

        fireEvent.change(screen.getByLabelText(/nombre de usuario/i), {
            target: { value: "nelson" },
        });
        fireEvent.change(screen.getByLabelText(/^email$/i), {
            target: { value: "nelson@example.com" },
        });
        fireEvent.change(screen.getByLabelText(/^contraseña$/i), {
            target: { value: "12345678" },
        });
        fireEvent.change(screen.getByLabelText(/repetir contraseña/i), {
            target: { value: "12345678" },
        });

        fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));

        await waitFor(() => {
            expect(mockSignup).toHaveBeenCalledWith({
                username: "nelson",
                email: "nelson@example.com",
                password: "12345678",
            });
        });
    });

    it("muestra error del store si existe", () => {
        const error = "Email ya registrado";

        (useAuthStore as jest.Mock).mockReturnValue({
            ...useAuthStore(),
            error,
        });

        render(<SignupForm />);
        expect(screen.getByText(error)).toBeInTheDocument();
    });
});
