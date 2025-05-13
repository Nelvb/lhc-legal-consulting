/**
 * Mock reutilizable para useAuth.
 * Simula estado autenticado, usuario y logout.
 * Reemplaza el contexto real para pruebas unitarias.
 */

export const mockLogout = jest.fn();

export const useAuth = () => ({
    isAuthenticated: true,
    loading: false,
    error: null,
    user: {
        id: '123',
        name: 'Nelson',
        email: 'nelson@example.com',
        is_admin: true,
    },
    login: jest.fn(),
    signup: jest.fn(),
    logout: mockLogout,
});
