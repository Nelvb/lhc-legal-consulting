/**
 * __mocks__/useAuthStore.ts
 *
 * Mock profesional del store de autenticación para tests de componentes.
 * Proporciona funciones mockeadas y estado predecible.
 * 
 * Uso:
 * - Para tests de componentes que usan useAuthStore
 * - Se puede sobrescribir en tests específicos con jest.mocked()
 * - Compatible con TypeScript y React Testing Library
 */

import type { User } from "@/types/auth";

// Funciones mock exportadas para sobrescribir en tests
export const mockLogin = jest.fn();
export const mockSignup = jest.fn();
export const mockLogout = jest.fn();
export const mockRefreshUser = jest.fn();
export const mockSetUser = jest.fn();
export const mockClearError = jest.fn();

// Usuario mock por defecto
export const mockDefaultUser: User = {
    id: "mock-user-123",
    username: "UsuarioMock",
    last_name: "ApellidoMock",
    email: "mock@example.com",
    is_admin: false,
};

// Usuario admin mock
export const mockAdminUser: User = {
    id: "mock-admin-456",
    username: "AdminMock",
    last_name: "AdminApellido",
    email: "admin@example.com",
    is_admin: true,
};

// Estado mock por defecto (usuario autenticado)
const defaultMockState = {
    user: mockDefaultUser,
    loading: false,
    error: null,
    isAuthenticated: true,
    login: mockLogin,
    signup: mockSignup,
    logout: mockLogout,
    refreshUser: mockRefreshUser,
    setUser: mockSetUser,
    clearError: mockClearError,
};

// Hook mock principal
export const useAuthStore = jest.fn(() => defaultMockState);

// Utilidades para cambiar el estado en tests
export const mockAuthStoreState = {
    // Usuario autenticado (por defecto)
    authenticated: () => {
        useAuthStore.mockReturnValue({
            ...defaultMockState,
            user: mockDefaultUser,
            isAuthenticated: true,
        });
    },

    // Usuario admin autenticado
    authenticatedAdmin: () => {
        useAuthStore.mockReturnValue({
            ...defaultMockState,
            user: mockAdminUser,
            isAuthenticated: true,
        });
    },

    // Usuario no autenticado
    unauthenticated: () => {
        useAuthStore.mockReturnValue({
            ...defaultMockState,
            user: null,
            isAuthenticated: false,
        });
    },

    // Estado de loading
    loading: () => {
        useAuthStore.mockReturnValue({
            ...defaultMockState,
            loading: true,
        });
    },

    // Estado de error
    error: (errorMessage: string) => {
        useAuthStore.mockReturnValue({
            ...defaultMockState,
            error: errorMessage,
            user: null,
            isAuthenticated: false,
        });
    },

    // Reset a estado por defecto
    reset: () => {
        useAuthStore.mockReturnValue(defaultMockState);
        jest.clearAllMocks();
    },
};
