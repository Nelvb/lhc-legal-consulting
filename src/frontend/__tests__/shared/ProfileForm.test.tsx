/**
 * ProfileForm.test.tsx
 *
 * Test unitario del componente compartido ProfileForm.
 * Valida renderizado, gestión de errores de validación y flujo de envío del formulario.
 *
 * Características principales:
 * - Renderiza todos los campos visibles correctamente
 * - Verifica los mensajes de error con el mismo texto exacto del componente:
 *   * "Introduce un email válido."
 *   * "El nombre es obligatorio."
 *   * "La contraseña es obligatoria."
 * - Usa mocks locales de useAuth y userService
 */

import React from "react";
import { render, screen, fireEvent } from "@/__tests__/utils/test-utils";
import ProfileForm from "@/components/shared/ProfileForm";

// Mock dinámico para cambiar datos por test
jest.mock("@/hooks/useAuth", () => ({
    useAuth: jest.fn(),
}));

// Mock del servicio de usuario
jest.mock("@/lib/api/userService", () => ({
    updateProfile: jest.fn().mockResolvedValue({ success: true }),
}));

const mockUseAuth = require("@/hooks/useAuth").useAuth;

describe("ProfileForm", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renderiza todos los campos correctamente", () => {
        mockUseAuth.mockReturnValue({
            user: { name: "Nelson", email: "nelson@example.com" },
            refreshUser: jest.fn(),
        });

        render(<ProfileForm />);

        expect(screen.getByLabelText(/^nuevo nombre$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^correo electrónico$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^contraseña actual$/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /guardar cambios/i })).toBeInTheDocument();
    });

    it("muestra error si el email no es válido", async () => {
        mockUseAuth.mockReturnValue({
            user: { name: "Nelson", email: "" },
            refreshUser: jest.fn(),
        });

        render(<ProfileForm />);

        const emailInput = screen.getByLabelText(/^correo electrónico$/i);
        const form = emailInput.closest("form")!;

        fireEvent.change(emailInput, { target: { value: "invalido" } });
        fireEvent.submit(form);

        expect(await screen.findByText("Introduce un email válido.")).toBeInTheDocument();
    });

    it("muestra error si el nombre está vacío", async () => {
        mockUseAuth.mockReturnValue({
            user: { name: "", email: "nelson@example.com" },
            refreshUser: jest.fn(),
        });

        render(<ProfileForm />);

        const nameInput = screen.getByLabelText(/^nuevo nombre$/i);
        const form = nameInput.closest("form")!;

        fireEvent.change(nameInput, { target: { value: "" } });
        fireEvent.submit(form);

        expect(await screen.findByText("El nombre es obligatorio.")).toBeInTheDocument();
    });

    it("muestra error si la contraseña actual está vacía", async () => {
        mockUseAuth.mockReturnValue({
            user: { name: "Nelson", email: "nelson@example.com" },
            refreshUser: jest.fn(),
        });

        render(<ProfileForm />);

        const passwordInput = screen.getByLabelText(/^contraseña actual$/i);
        const form = passwordInput.closest("form")!;

        fireEvent.change(passwordInput, { target: { value: "" } });
        fireEvent.submit(form);

        expect(await screen.findByText("La contraseña es obligatoria.")).toBeInTheDocument();
    });
});
