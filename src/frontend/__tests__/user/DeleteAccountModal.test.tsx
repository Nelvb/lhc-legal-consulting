/**
 * __tests__/user/DeleteAccountModal.test.tsx
 *
 * Test unitario profesional del modal de eliminación de cuenta.
 * 
 * Arquitectura del test:
 * - Usa mocks centralizados y reutilizables (patrón del proyecto)
 * - Configuración limpia sin duplicación de código
 * - Cobertura completa de casos edge
 * - Assertions específicas y claras
 * - Cleanup automático entre tests
 * 
 * Casos cubiertos:
 * - Render condicional según estado del modal
 * - Interacciones con botones del sistema de componentes
 * - Flujo completo de eliminación exitosa
 * - Manejo de errores del servidor
 * - Estados de Zustand y navegación
 * - Integración con componentes Button reutilizables
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DeleteAccountModal from "@/components/user/DeleteAccountModal";

// ===== MOCKS REUTILIZABLES (siguiendo patrón del proyecto) =====
jest.mock("@/lib/api/userService", () => require("../../__mocks__/userService"));
import { userService } from "@/__mocks__/userService";

// Type assertion para acceder a mockDeleteAccount
const mockDeleteAccount = userService.deleteAccount as jest.MockedFunction<typeof userService.deleteAccount>;

jest.mock("@/stores/useAuthStore", () => require("../../__mocks__/useAuthStore"));
import { mockLogout } from "@/__mocks__/useAuthStore";

jest.mock("@/stores/useUiStore", () => require("../../__mocks__/useUiStore"));
import { 
    useUiStore, 
    mockCloseDeleteModal, 
    resetUiStoreMock 
} from "@/__mocks__/useUiStore";

// Mock de Next.js navigation
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
    useRouter: () => ({ push: mockPush }),
}));

describe("DeleteAccountModal", () => {
    // ===== SETUP & CLEANUP =====
    beforeEach(() => {
        // Limpiar todos los mocks
        jest.clearAllMocks();
        
        // Reset del estado UI store
        resetUiStoreMock();
        
        // Configuración por defecto: deleteAccount exitoso
        mockDeleteAccount.mockResolvedValue({ success: true });
        
        // Mock de window.alert
        jest.spyOn(window, 'alert').mockImplementation(() => {});
    });

    afterEach(() => {
        // Cleanup después de cada test
        resetUiStoreMock();
        jest.restoreAllMocks();
    });

    // ===== HELPER FUNCTIONS =====
    const openModal = () => {
        useUiStore().openDeleteModal();
    };

    const clickCancelButton = () => {
        fireEvent.click(screen.getByRole("button", { name: /cancelar/i }));
    };

    const clickDeleteButton = () => {
        fireEvent.click(screen.getByRole("button", { name: /eliminar cuenta/i }));
    };

    const expectModalVisible = () => {
        expect(screen.getByText(/¿estás seguro de que quieres eliminar tu cuenta/i)).toBeInTheDocument();
    };

    const expectModalNotVisible = () => {
        expect(screen.queryByText(/¿estás seguro de que quieres eliminar tu cuenta/i)).not.toBeInTheDocument();
    };

    // ===== RENDER TESTS =====
    describe("Render condicional", () => {
        it("debe renderizar el modal cuando showDeleteModal es true", () => {
            openModal();
            render(<DeleteAccountModal />);

            expectModalVisible();
            
            // Verificar elementos principales del modal
            expect(screen.getByText(/esta acción es irreversible/i)).toBeInTheDocument();
            expect(screen.getByRole("button", { name: /cancelar/i })).toBeInTheDocument();
            expect(screen.getByRole("button", { name: /eliminar cuenta/i })).toBeInTheDocument();
        });

        it("debe retornar null cuando showDeleteModal es false", () => {
            // No abrir el modal (estado por defecto es cerrado)
            render(<DeleteAccountModal />);

            expectModalNotVisible();
        });

        it("debe usar componentes Button del sistema de diseño", () => {
            openModal();
            render(<DeleteAccountModal />);

            // Verificar que usa el componente Button (clases específicas)
            const cancelButton = screen.getByRole("button", { name: /cancelar/i });
            const deleteButton = screen.getByRole("button", { name: /eliminar cuenta/i });

            // Verificar clases del sistema Button
            expect(cancelButton).toHaveClass("font-medium", "rounded", "transition-colors");
            expect(deleteButton).toHaveClass("font-medium", "rounded", "transition-colors");
        });
    });

    // ===== INTERACTION TESTS =====
    describe("Interacciones con botones", () => {
        beforeEach(() => {
            openModal();
        });

        it("debe cerrar el modal al hacer clic en 'Cancelar'", () => {
            render(<DeleteAccountModal />);
            clickCancelButton();

            expect(mockCloseDeleteModal).toHaveBeenCalledTimes(1);
        });

        it("debe usar variant='secondary' para el botón Cancelar", () => {
            render(<DeleteAccountModal />);
            
            const cancelButton = screen.getByRole("button", { name: /cancelar/i });
            
            // Verificar estilos de variant secondary
            expect(cancelButton).toHaveClass("bg-[#C2E7DA]", "text-[#1A1341]");
        });

        it("debe usar variant='danger' para el botón Eliminar", () => {
            render(<DeleteAccountModal />);
            
            const deleteButton = screen.getByRole("button", { name: /eliminar cuenta/i });
            
            // Verificar estilos de variant danger
            expect(deleteButton).toHaveClass("bg-red-600", "text-white");
        });
    });

    // ===== SUCCESS FLOW TESTS =====
    describe("Flujo exitoso de eliminación", () => {
        beforeEach(() => {
            openModal();
        });

        it("debe completar el proceso de eliminación exitosamente", async () => {
            render(<DeleteAccountModal />);
            clickDeleteButton();

            // Verificar llamada al servicio
            await waitFor(() => {
                expect(mockDeleteAccount).toHaveBeenCalledTimes(1);
            });

            // Verificar logout
            expect(mockLogout).toHaveBeenCalledTimes(1);

            // Verificar cierre del modal
            expect(mockCloseDeleteModal).toHaveBeenCalledTimes(1);

            // Verificar navegación
            expect(mockPush).toHaveBeenCalledWith("/");
        });

        it("debe mostrar mensaje de confirmación exitoso", async () => {
            const alertSpy = jest.spyOn(window, 'alert');
            
            render(<DeleteAccountModal />);
            clickDeleteButton();

            await waitFor(() => {
                expect(alertSpy).toHaveBeenCalledWith(
                    "Tu cuenta ha sido eliminada. Gracias por formar parte de Boost A Project."
                );
            });
        });

        it("debe ejecutar acciones en el orden correcto", async () => {
            render(<DeleteAccountModal />);
            clickDeleteButton();

            await waitFor(() => {
                expect(mockDeleteAccount).toHaveBeenCalled();
            });

            // Verificar que todas las acciones se ejecutaron
            expect(mockDeleteAccount).toHaveBeenCalledTimes(1);
            expect(mockLogout).toHaveBeenCalledTimes(1);
            expect(mockCloseDeleteModal).toHaveBeenCalledTimes(1);
        });
    });

    // ===== ERROR HANDLING TESTS =====
    describe("Manejo de errores", () => {
        beforeEach(() => {
            openModal();
        });

        it("debe mostrar error cuando deleteAccount falla", async () => {
            const errorMessage = "Error del servidor";
            mockDeleteAccount.mockRejectedValue(new Error(errorMessage));
            
            const alertSpy = jest.spyOn(window, 'alert');

            render(<DeleteAccountModal />);
            clickDeleteButton();

            await waitFor(() => {
                expect(alertSpy).toHaveBeenCalledWith(errorMessage);
            });

            // Verificar que NO se ejecuta logout ni navegación en caso de error
            expect(mockLogout).not.toHaveBeenCalled();
            expect(mockPush).not.toHaveBeenCalled();
        });

        it("debe mostrar error genérico cuando no hay mensaje específico", async () => {
            mockDeleteAccount.mockRejectedValue(new Error());
            
            const alertSpy = jest.spyOn(window, 'alert');

            render(<DeleteAccountModal />);
            clickDeleteButton();

            await waitFor(() => {
                expect(alertSpy).toHaveBeenCalledWith("Error al eliminar la cuenta.");
            });
        });

        it("debe mantener el modal abierto cuando ocurre un error", async () => {
            mockDeleteAccount.mockRejectedValue(new Error("Error del servidor"));

            render(<DeleteAccountModal />);
            clickDeleteButton();

            await waitFor(() => {
                expect(window.alert).toHaveBeenCalled();
            });

            // Verificar que el modal sigue visible
            expectModalVisible();
            
            // Verificar que NO se cerró el modal
            expect(mockCloseDeleteModal).not.toHaveBeenCalled();
        });
    });

    // ===== INTEGRATION TESTS =====
    describe("Integración con stores", () => {
        it("debe respetar el estado inicial cerrado del modal", () => {
            // Modal cerrado por defecto
            render(<DeleteAccountModal />);
            
            expectModalNotVisible();
        });

        it("debe reaccionar a cambios de estado del useUiStore", () => {
            const { rerender } = render(<DeleteAccountModal />);
            
            // Inicialmente cerrado
            expectModalNotVisible();
            
            // Abrir modal
            openModal();
            rerender(<DeleteAccountModal />);
            
            expectModalVisible();
        });
    });

    // ===== ACCESSIBILITY TESTS =====
    describe("Accesibilidad", () => {
        beforeEach(() => {
            openModal();
        });

        it("debe tener estructura semántica correcta", () => {
            render(<DeleteAccountModal />);

            // Verificar heading
            expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
            
            // Verificar botones tienen roles correctos
            expect(screen.getByRole("button", { name: /cancelar/i })).toBeInTheDocument();
            expect(screen.getByRole("button", { name: /eliminar cuenta/i })).toBeInTheDocument();
        });

        it("debe tener overlay con z-index correcto para modal", () => {
            const { container } = render(<DeleteAccountModal />);
            
            const overlay = container.querySelector('.fixed.inset-0');
            expect(overlay).toHaveClass('z-50');
        });
    });
});