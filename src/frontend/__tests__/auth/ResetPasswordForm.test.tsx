/**
 * __tests__/auth/ResetPasswordForm.test.tsx
 *
 * Test unitario profesional del formulario de restablecimiento de contraseña.
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
 * - Validación de token ausente/inválido
 * - Validaciones de campos (longitud, coincidencia)
 * - Flujo exitoso completo
 * - Manejo de errores del servidor
 * - Interacciones de UI (mostrar/ocultar contraseña)
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

// ===== MOCKS REUTILIZABLES (siguiendo patrón del proyecto) =====
jest.mock("@/lib/api/userService", () => require("../../__mocks__/userService"));
import { mockResetPassword } from "@/__mocks__/userService";

// Mock de Next.js navigation hooks
const mockPush = jest.fn();
const mockSearchParamsGet = jest.fn();

jest.mock("next/navigation", () => ({
    useRouter: () => ({ push: mockPush }),
    useSearchParams: () => ({ get: mockSearchParamsGet }),
}));

describe("ResetPasswordForm", () => {
    // ===== CONSTANTS =====
    const VALID_TOKEN = "valid-test-token-12345";
    const VALID_PASSWORD = "SecurePass123!";
    const WEAK_PASSWORD = "123";
    const DIFFERENT_PASSWORD = "DifferentPass456!";

    // ===== SETUP & CLEANUP =====
    beforeEach(() => {
        // Limpiar todos los mocks
        jest.clearAllMocks();
        
        // Configuración por defecto: token válido presente
        mockSearchParamsGet.mockReturnValue(VALID_TOKEN);
        
        // Configuración por defecto: resetPassword exitoso
        mockResetPassword.mockResolvedValue({ success: true });
    });

    // ===== HELPER FUNCTIONS =====
    const fillPasswordFields = (password: string, confirmPassword: string) => {
        fireEvent.change(screen.getByLabelText(/contraseña nueva/i), {
            target: { value: password }
        });
        fireEvent.change(screen.getByLabelText(/confirmar contraseña/i), {
            target: { value: confirmPassword }
        });
    };

    const submitForm = () => {
        fireEvent.click(screen.getByRole("button", { name: /restablecer contraseña/i }));
    };

    const expectErrorMessage = async (errorText: string | RegExp) => {
        await waitFor(() => {
            expect(screen.getByText(errorText)).toBeInTheDocument();
        });
    };

    const expectSuccessMessage = async () => {
        await waitFor(() => {
            expect(screen.getByText(/contraseña restablecida con éxito/i)).toBeInTheDocument();
        });
    };

    // ===== RENDER TESTS =====
    describe("Render inicial", () => {
        it("debe renderizar todos los elementos del formulario correctamente", () => {
            render(<ResetPasswordForm />);

            // Verificar elementos principales
            expect(screen.getByRole("heading", { name: /nueva contraseña/i })).toBeInTheDocument();
            expect(screen.getByText(/introduce tu nueva contraseña/i)).toBeInTheDocument();
            
            // Verificar campos de entrada
            expect(screen.getByLabelText(/contraseña nueva/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/confirmar contraseña/i)).toBeInTheDocument();
            
            // Verificar botón principal
            expect(screen.getByRole("button", { name: /restablecer contraseña/i })).toBeInTheDocument();
            
            // Verificar instrucciones de contraseña
            expect(screen.getByText(/mínimo 8 caracteres/i)).toBeInTheDocument();
        });

        it("debe renderizar botones de mostrar/ocultar contraseña", () => {
            render(<ResetPasswordForm />);
            
            // Verificar botones de toggle de visibilidad (sin nombre/texto)
            const passwordToggleButtons = screen.getAllByRole("button", { name: "" });
            expect(passwordToggleButtons).toHaveLength(2); // Password + Confirm password toggles
            
            // Verificar que cada botón tiene el ícono de ojo
            passwordToggleButtons.forEach(button => {
                expect(button).toHaveClass("absolute", "right-3", "top-[38px]");
                expect(button.querySelector('svg')).toBeInTheDocument();
            });
        });
    });

    // ===== VALIDATION TESTS =====
    describe("Validaciones", () => {
        it("debe mostrar error cuando el token no está presente", async () => {
            // Configurar: sin token
            mockSearchParamsGet.mockReturnValue(null);
            
            render(<ResetPasswordForm />);
            fillPasswordFields(VALID_PASSWORD, VALID_PASSWORD);
            submitForm();

            await expectErrorMessage(/token no válido o ausente/i);
            
            // Verificar que no se llamó al servicio
            expect(mockResetPassword).not.toHaveBeenCalled();
        });

        it("debe mostrar error cuando las contraseñas no coinciden", async () => {
            render(<ResetPasswordForm />);
            fillPasswordFields(VALID_PASSWORD, DIFFERENT_PASSWORD);
            submitForm();

            await expectErrorMessage(/las contraseñas no coinciden/i);
            
            // Verificar que no se llamó al servicio
            expect(mockResetPassword).not.toHaveBeenCalled();
        });

        it("debe mostrar error cuando la contraseña no cumple requisitos mínimos", async () => {
            render(<ResetPasswordForm />);
            fillPasswordFields(WEAK_PASSWORD, WEAK_PASSWORD);
            submitForm();

            await expectErrorMessage(/la contraseña debe tener al menos 8 caracteres/i);
            
            // Verificar que no se llamó al servicio
            expect(mockResetPassword).not.toHaveBeenCalled();
        });
    });

    // ===== SUCCESS FLOW TESTS =====
    describe("Flujo exitoso", () => {
        it("debe completar el proceso de reset exitosamente con datos válidos", async () => {
            render(<ResetPasswordForm />);
            fillPasswordFields(VALID_PASSWORD, VALID_PASSWORD);
            submitForm();

            // Verificar llamada al servicio
            await waitFor(() => {
                expect(mockResetPassword).toHaveBeenCalledWith({
                    token: VALID_TOKEN,
                    new_password: VALID_PASSWORD
                });
            });

            // Verificar mensaje de éxito
            await expectSuccessMessage();
            
            // Verificar botón de navegación
            expect(screen.getByRole("button", { name: /iniciar sesión/i })).toBeInTheDocument();
        });

        it("debe navegar a login cuando se hace click en 'Iniciar sesión'", async () => {
            render(<ResetPasswordForm />);
            fillPasswordFields(VALID_PASSWORD, VALID_PASSWORD);
            submitForm();

            await expectSuccessMessage();

            // Click en botón de navegación
            fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));
            
            expect(mockPush).toHaveBeenCalledWith("/login");
        });
    });

    // ===== ERROR HANDLING TESTS =====
    describe("Manejo de errores del servidor", () => {
        it("debe mostrar error cuando el servidor devuelve un error", async () => {
            // Configurar mock para fallar
            const errorMessage = "Token expirado";
            mockResetPassword.mockRejectedValue(new Error(errorMessage));

            render(<ResetPasswordForm />);
            fillPasswordFields(VALID_PASSWORD, VALID_PASSWORD);
            submitForm();

            // Verificar que se llamó al servicio
            await waitFor(() => {
                expect(mockResetPassword).toHaveBeenCalled();
            });

            // Verificar mensaje de error
            await expectErrorMessage(errorMessage);
            
            // Verificar que NO aparece mensaje de éxito
            expect(screen.queryByText(/contraseña restablecida con éxito/i)).not.toBeInTheDocument();
        });

        it("debe mostrar error genérico cuando no hay mensaje específico", async () => {
            // Error sin mensaje específico
            mockResetPassword.mockRejectedValue(new Error());

            render(<ResetPasswordForm />);
            fillPasswordFields(VALID_PASSWORD, VALID_PASSWORD);
            submitForm();

            await waitFor(() => {
                expect(mockResetPassword).toHaveBeenCalled();
            });

            await expectErrorMessage(/error al restablecer la contraseña/i);
        });
    });

    // ===== UI INTERACTION TESTS =====
    describe("Interacciones de UI", () => {
        it("debe limpiar errores del servidor cuando se modifica la contraseña", async () => {
            // Configurar error inicial
            mockResetPassword.mockRejectedValue(new Error("Error inicial"));

            render(<ResetPasswordForm />);
            fillPasswordFields(VALID_PASSWORD, VALID_PASSWORD);
            submitForm();

            // Esperar error
            await expectErrorMessage(/error inicial/i);

            // Cambiar contraseña
            fireEvent.change(screen.getByLabelText(/contraseña nueva/i), {
                target: { value: "NuevaPass123!" }
            });

            // Verificar que el error se limpió (el componente tiene useEffect para esto)
            await waitFor(() => {
                expect(screen.queryByText(/error inicial/i)).not.toBeInTheDocument();
            });
        });

        it("debe mostrar estado de carga durante el envío", async () => {
            // Configurar delay en la respuesta
            mockResetPassword.mockImplementation(
                () => new Promise(resolve => setTimeout(() => resolve({ success: true }), 100))
            );

            render(<ResetPasswordForm />);
            fillPasswordFields(VALID_PASSWORD, VALID_PASSWORD);
            submitForm();

            // Verificar estado de carga
            expect(screen.getByText(/restableciendo/i)).toBeInTheDocument();
            expect(screen.getByRole("button", { name: /restableciendo/i })).toBeDisabled();

            // Esperar resolución
            await expectSuccessMessage();
        });
    });
});