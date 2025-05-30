/**
 * __tests__/auth/ForgotPasswordForm.test.tsx
 *
 * Test unitario profesional del formulario de recuperación de contraseña.
 * 
 * Arquitectura del test:
 * - Usa mocks centralizados y reutilizables (patrón del proyecto)
 * - Configuración limpia sin duplicación de código
 * - Cobertura completa de casos edge
 * - Assertions específicas y claras
 * - Cleanup automático entre tests
 * 
 * Casos cubiertos:
 * - Render inicial con elementos correctos
 * - Validación de email requerido
 * - Flujo exitoso completo
 * - Manejo de errores del servidor
 * - Estados de loading y disabled
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

// ===== MOCKS REUTILIZABLES (siguiendo patrón del proyecto) =====
jest.mock("@/lib/api/userService", () => require("../../__mocks__/userService"));
import { mockRequestPasswordReset } from "@/__mocks__/userService";

describe("ForgotPasswordForm", () => {
    // ===== CONSTANTS =====
    const VALID_EMAIL = "test@example.com";
    const INVALID_EMAIL = "invalid-email";

    // ===== SETUP & CLEANUP =====
    beforeEach(() => {
        // Limpiar todos los mocks
        jest.clearAllMocks();

        // Configuración por defecto: requestPasswordReset exitoso
        mockRequestPasswordReset.mockResolvedValue({ success: true });
    });

    // ===== HELPER FUNCTIONS =====
    const fillEmailField = (email: string) => {
        fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
            target: { value: email }
        });
    };

    const submitForm = () => {
        fireEvent.click(screen.getByRole("button", { name: /enviar enlace/i }));
    };

    const expectSuccessMessage = async () => {
        await waitFor(() => {
            expect(screen.getByText(/si existe una cuenta con ese correo/i)).toBeInTheDocument();
        });
    };

    const expectErrorMessage = async () => {
        await waitFor(() => {
            expect(screen.getByText(/hubo un error/i)).toBeInTheDocument();
        });
    };

    // ===== RENDER TESTS =====
    describe("Render inicial", () => {
        it("debe renderizar todos los elementos del formulario correctamente", () => {
            render(<ForgotPasswordForm />);

            // Verificar elementos principales
            expect(screen.getByRole("heading", { name: /recuperar contraseña/i })).toBeInTheDocument();
            expect(screen.getByText(/introduce el correo asociado/i)).toBeInTheDocument();

            // Verificar campo de entrada
            expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
            expect(screen.getByPlaceholderText(/tu@email.com/i)).toBeInTheDocument();

            // Verificar botón principal
            expect(screen.getByRole("button", { name: /enviar enlace de recuperación/i })).toBeInTheDocument();
        });

        it("debe renderizar el formulario en estado inicial sin mensajes", () => {
            render(<ForgotPasswordForm />);

            // No debe mostrar mensajes de éxito o error inicialmente
            expect(screen.queryByText(/si existe una cuenta/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/hubo un error/i)).not.toBeInTheDocument();
        });
    });

    // ===== VALIDATION TESTS =====
    describe("Validaciones", () => {
        it("debe requerir que se complete el campo email", () => {
            render(<ForgotPasswordForm />);

            const emailInput = screen.getByLabelText(/correo electrónico/i);
            expect(emailInput).toBeRequired();
        });

        it("debe tener el tipo email correcto para validación del navegador", () => {
            render(<ForgotPasswordForm />);

            const emailInput = screen.getByLabelText(/correo electrónico/i);
            expect(emailInput).toHaveAttribute("type", "email");
        });
    });

    // ===== SUCCESS FLOW TESTS =====
    describe("Flujo exitoso", () => {
        it("debe completar el proceso de recuperación exitosamente con email válido", async () => {
            render(<ForgotPasswordForm />);
            fillEmailField(VALID_EMAIL);
            submitForm();

            // Verificar llamada al servicio
            await waitFor(() => {
                expect(mockRequestPasswordReset).toHaveBeenCalledWith(VALID_EMAIL);
            });

            // Verificar mensaje de éxito
            await expectSuccessMessage();
        });

        it("debe mostrar mensaje de éxito sin revelar si el email existe (seguridad)", async () => {
            render(<ForgotPasswordForm />);
            fillEmailField("nonexistent@example.com");
            submitForm();

            await expectSuccessMessage();

            // Verificar que el mensaje no revela información sensible
            const successMessage = screen.getByText(/si existe una cuenta con ese correo/i);
            expect(successMessage).toBeInTheDocument();

            // No debe decir "email no encontrado" o similar
            expect(screen.queryByText(/no encontrado/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/no existe/i)).not.toBeInTheDocument();
        });
    });

    // ===== ERROR HANDLING TESTS =====
    describe("Manejo de errores del servidor", () => {
        it("debe mostrar error cuando el servidor devuelve un error", async () => {
            // Configurar mock para fallar
            const errorMessage = "Error del servidor";
            mockRequestPasswordReset.mockRejectedValue(new Error(errorMessage));

            render(<ForgotPasswordForm />);
            fillEmailField(VALID_EMAIL);
            submitForm();

            // Verificar que se llamó al servicio
            await waitFor(() => {
                expect(mockRequestPasswordReset).toHaveBeenCalled();
            });

            // Verificar mensaje de error genérico (no expone detalles técnicos)
            await expectErrorMessage();

            // Verificar que NO aparece mensaje de éxito
            expect(screen.queryByText(/si existe una cuenta/i)).not.toBeInTheDocument();
        });

        it("debe mostrar error genérico sin revelar detalles técnicos", async () => {
            mockRequestPasswordReset.mockRejectedValue(new Error("Database connection failed"));

            render(<ForgotPasswordForm />);
            fillEmailField(VALID_EMAIL);
            submitForm();

            await expectErrorMessage();

            // Verificar que el error técnico no se expone al usuario
            expect(screen.queryByText(/database/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/connection/i)).not.toBeInTheDocument();
        });
    });

    // ===== UI INTERACTION TESTS =====
    describe("Interacciones de UI", () => {
        it("debe mostrar estado de carga durante el envío", async () => {
            // Configurar delay en la respuesta
            mockRequestPasswordReset.mockImplementation(
                () => new Promise(resolve => setTimeout(() => resolve({ success: true }), 100))
            );

            render(<ForgotPasswordForm />);
            fillEmailField(VALID_EMAIL);
            submitForm();

            // Verificar estado de carga
            expect(screen.getByText(/enviando/i)).toBeInTheDocument();
            expect(screen.getByRole("button", { name: /enviando/i })).toBeDisabled();

            // Esperar resolución
            await expectSuccessMessage();
        });

        it("debe deshabilitar el botón durante el envío", async () => {
            mockRequestPasswordReset.mockImplementation(
                () => new Promise(resolve => setTimeout(() => resolve({ success: true }), 50))
            );

            render(<ForgotPasswordForm />);
            fillEmailField(VALID_EMAIL);

            const submitButton = screen.getByRole("button", { name: /enviar enlace/i });
            fireEvent.click(submitButton);

            // Verificar que el botón se deshabilita inmediatamente
            expect(submitButton).toBeDisabled();

            // Esperar que se reactive tras completar
            await expectSuccessMessage();
            expect(submitButton).not.toBeDisabled();
        });

        it("debe mantener el email ingresado después de enviar", async () => {
            render(<ForgotPasswordForm />);
            fillEmailField(VALID_EMAIL);
            submitForm();

            await expectSuccessMessage();

            // Verificar que el campo mantiene el valor
            const emailInput = screen.getByLabelText(/correo electrónico/i) as HTMLInputElement;
            expect(emailInput.value).toBe(VALID_EMAIL);
        });
    });

    // ===== ACCESSIBILITY TESTS =====
    describe("Accesibilidad", () => {
        it("debe tener etiquetas asociadas correctamente", () => {
            render(<ForgotPasswordForm />);

            const emailInput = screen.getByLabelText(/correo electrónico/i);
            expect(emailInput).toHaveAttribute("id", "email");
        });

        it("debe tener estructura de heading correcta", () => {
            render(<ForgotPasswordForm />);

            const heading = screen.getByRole("heading", { name: /recuperar contraseña/i });
            expect(heading).toHaveClass("text-2xl", "font-bold");
        });
    });
});