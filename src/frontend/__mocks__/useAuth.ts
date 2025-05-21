/**
 * Mock reutilizable para useAuth.
 * Simula estado de autenticación, usuario y logout.
 * Permite sobrescribir el comportamiento en los tests usando jest.mock().
 */

export const mockLogin = jest.fn();
export const mockSignup = jest.fn();
export const mockLogout = jest.fn();

export const useAuth = jest.fn(() => ({
    isAuthenticated: true,
    loading: false,
    error: null,
    user: {
        id: "123",
        name: "Nelson",
        email: "nelson@example.com",
        is_admin: true,
    },
    login: mockLogin,
    signup: mockSignup,
    logout: mockLogout,
}));
