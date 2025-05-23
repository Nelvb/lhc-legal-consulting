/**
 * ContactForm.test.tsx
 *
 * Test unitario del formulario de contacto con mocks profesionales.
 * Cubre validación, renderizado condicional por autenticación,
 * éxito y error al enviar mensaje.
 */

import React from "react";
import { render, screen, fireEvent, waitFor } from "@/__tests__/utils/test-utils";
import ContactForm from "@/components/contact/ContactForm";
import { contactService } from "@/lib/api/contactService";
import { useAuth } from "@/hooks/useAuth";

// Mock del servicio de contacto
jest.mock("@/lib/api/contactService", () => ({
    contactService: {
        sendMessage: jest.fn(),
    },
}));

// Mock del hook de autenticación
jest.mock("@/hooks/useAuth", () => ({
    useAuth: jest.fn(),
}));

describe("ContactForm", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("cuando el usuario NO está autenticado", () => {
        beforeEach(() => {
            (useAuth as jest.Mock).mockReturnValue({ user: null });
        });

        it("valida campos obligatorios y no envía si están vacíos", async () => {
            render(<ContactForm />);
            fireEvent.click(screen.getByRole("button", { name: /enviar mensaje/i }));

            await waitFor(() => {
                expect(contactService.sendMessage).not.toHaveBeenCalled();
            });
        });

        it("envía mensaje correctamente con datos válidos", async () => {
            render(<ContactForm />);
            fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Lucía" } });
            fireEvent.change(screen.getByLabelText(/apellidos/i), { target: { value: "Martínez" } });
            fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "lucia@example.com" } });
            fireEvent.change(screen.getByLabelText(/asunto/i), { target: { value: "Consulta" } });
            fireEvent.change(screen.getByLabelText(/mensaje/i), {
                target: { value: "Me interesa el proyecto de Barcelona" },
            });

            fireEvent.click(screen.getByRole("button", { name: /enviar mensaje/i }));

            await waitFor(() => {
                expect(contactService.sendMessage).toHaveBeenCalledWith(
                    {
                        name: "Lucía Martínez",
                        email: "lucia@example.com",
                        subject: "Consulta",
                        message: "Me interesa el proyecto de Barcelona",
                    },
                    false
                );
            });

            expect(await screen.findByText(/mensaje enviado correctamente/i)).toBeInTheDocument();
        });

        it("muestra mensaje de error si el envío falla", async () => {
            (contactService.sendMessage as jest.Mock).mockRejectedValueOnce(new Error("Error servidor"));

            render(<ContactForm />);
            fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Pedro" } });
            fireEvent.change(screen.getByLabelText(/apellidos/i), { target: { value: "López" } });
            fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "pedro@example.com" } });
            fireEvent.change(screen.getByLabelText(/asunto/i), { target: { value: "Ayuda" } });
            fireEvent.change(screen.getByLabelText(/mensaje/i), {
                target: { value: "Tengo dudas sobre el proceso" },
            });

            fireEvent.click(screen.getByRole("button", { name: /enviar mensaje/i }));

            expect(await screen.findByText(/error servidor/i)).toBeInTheDocument();
        });
    });

    describe("cuando el usuario está autenticado", () => {
        beforeEach(() => {
            (useAuth as jest.Mock).mockReturnValue({
                user: { username: "Nelson", email: "nelson@example.com" },
            });
        });

        it("oculta campos de nombre y email", () => {
            render(<ContactForm />);
            expect(screen.queryByLabelText(/nombre/i)).not.toBeInTheDocument();
            expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
        });

        it("envía mensaje correctamente con usuario autenticado", async () => {
            render(<ContactForm />);
            fireEvent.change(screen.getByLabelText(/asunto/i), {
                target: { value: "Interesado en inversión" },
            });
            fireEvent.change(screen.getByLabelText(/mensaje/i), {
                target: { value: "Quiero detalles sobre el proyecto premium" },
            });

            fireEvent.click(screen.getByRole("button", { name: /enviar mensaje/i }));

            await waitFor(() => {
                expect(contactService.sendMessage).toHaveBeenCalledWith(
                    {
                        name: "Nelson",
                        email: "nelson@example.com",
                        subject: "Interesado en inversión",
                        message: "Quiero detalles sobre el proyecto premium",
                    },
                    true
                );
            });

            expect(await screen.findByText(/mensaje enviado correctamente/i)).toBeInTheDocument();
        });
    });
});
