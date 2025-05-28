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
 *   * "El nombre de usuario es obligatorio."
 *   * "Los apellidos son obligatorios."
 *   * "La contraseña es obligatoria."
 * - Usa mocks locales de useAuthStore y userService
 */

import React from "react";
import { render, screen, fireEvent } from "@/__tests__/utils/test-utils";
import ProfileForm from "@/components/shared/ProfileForm";

// Mock de Zustand store
jest.mock("@/stores/useAuthStore", () => ({
    useAuthStore: jest.fn(),
}));

// Mock del servicio de usuario
jest.mock("@/lib/api/userService", () => ({
    userService: {
        updateNameAndEmail: jest.fn().mockResolvedValue({ success: true }),
    },
}));

const { useAuthStore } = require("@/stores/useAuthStore");

describe("ProfileForm", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renderiza todos los campos correctamente", () => {
        useAuthStore.mockReturnValue({
            user: { username: "Nelson", last_name: "Valero", email: "nelson@example.com" },
            refreshUser: jest.fn(),
        });

        render(<ProfileForm />);

        expect(screen.getByLabelText(/^nombre de usuario$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^apellidos$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^correo electrónico$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^contraseña actual$/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /guardar cambios/i })).toBeInTheDocument();
    });

    it("muestra error si el email no es válido", async () => {
        useAuthStore.mockReturnValue({
            user: { username: "Nelson", last_name: "Valero", email: "" },
            refreshUser: jest.fn(),
        });

        render(<ProfileForm />);

        const emailInput = screen.getByLabelText(/^correo electrónico$/i);
        const form = emailInput.closest("form")!;

        fireEvent.change(emailInput, { target: { value: "invalido" } });
        fireEvent.submit(form);

        expect(await screen.findByText("Introduce un email válido.")).toBeInTheDocument();
    });

    it("muestra error si el nombre de usuario está vacío", async () => {
        useAuthStore.mockReturnValue({
            user: { username: "", last_name: "Valero", email: "nelson@example.com" },
            refreshUser: jest.fn(),
        });

        render(<ProfileForm />);

        const nameInput = screen.getByLabelText(/^nombre de usuario$/i);
        const form = nameInput.closest("form")!;

        fireEvent.change(nameInput, { target: { value: "" } });
        fireEvent.submit(form);

        expect(await screen.findByText("El nombre de usuario es obligatorio.")).toBeInTheDocument();
    });

    it("muestra error si los apellidos están vacíos", async () => {
        useAuthStore.mockReturnValue({
            user: { username: "Nelson", last_name: "", email: "nelson@example.com" },
            refreshUser: jest.fn(),
        });

        render(<ProfileForm />);

        const lastNameInput = screen.getByLabelText(/^apellidos$/i);
        const form = lastNameInput.closest("form")!;

        fireEvent.change(lastNameInput, { target: { value: "" } });
        fireEvent.submit(form);

        expect(await screen.findByText("Los apellidos son obligatorios.")).toBeInTheDocument();
    });

    it("muestra error si la contraseña actual está vacía", async () => {
        useAuthStore.mockReturnValue({
            user: { username: "Nelson", last_name: "Valero", email: "nelson@example.com" },
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
