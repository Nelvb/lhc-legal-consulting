/**
 * __tests__/stores/useAuthStore.test.ts
 *
 * Tests unitarios completos para el store de autenticación con Zustand.
 * 
 * Cubre:
 * - Login exitoso y con errores
 * - Signup exitoso y con errores  
 * - Logout con y sin errores del backend
 * - RefreshUser exitoso y con fallos
 * - SetUser y clearError
 * - Persistencia en localStorage
 * - Manejo de estados de loading
 */

import { act, renderHook } from "@testing-library/react";
import { useAuthStore } from "@/stores/useAuthStore";
import { authService } from "@/lib/api/authService";
import { fetchWithAuth } from "@/lib/utils/fetchWithAuth";
import type { User, LoginCredentials, SignupData } from "@/types/auth";

// Mocks
jest.mock("@/lib/api/authService", () => ({
    authService: {
        login: jest.fn(),
        signup: jest.fn(),
        logout: jest.fn(),
    },
}));

jest.mock("@/lib/utils/fetchWithAuth", () => ({
    fetchWithAuth: jest.fn(),
}));

// Datos de prueba
const mockUser: User = {
    id: "user-123",
    username: "Nelson Test",
    last_name: "Valero Test",
    email: "nelson@test.com",
    is_admin: false,
};

const mockAdminUser: User = {
    id: "admin-456",
    username: "Admin User",
    last_name: "AdminLastName",
    email: "admin@test.com",
    is_admin: true,
};

const mockCredentials: LoginCredentials = {
    email: "nelson@test.com",
    password: "password123",
};

const mockSignupData: SignupData = {
    username: "Nelson",
    last_name: "Valero",
    email: "nelson@test.com",
    password: "password123",
};

describe("useAuthStore", () => {
    // Limpiar antes de cada test
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();

        // Resetear el store a estado inicial
        useAuthStore.setState({
            user: null,
            loading: false,
            error: null,
            isAuthenticated: false,
        });
    });

    afterEach(() => {
        localStorage.clear();
    });

    describe("Estado inicial", () => {
        it("debe tener estado inicial correcto", () => {
            const { result } = renderHook(() => useAuthStore());

            expect(result.current.user).toBeNull();
            expect(result.current.loading).toBe(false);
            expect(result.current.error).toBeNull();
            expect(result.current.isAuthenticated).toBe(false);
        });
    });

    describe("Login", () => {
        it("debe hacer login exitosamente", async () => {
            // Mock del servicio
            (authService.login as jest.Mock).mockResolvedValue({
                user: mockUser,
            });

            const { result } = renderHook(() => useAuthStore());

            await act(async () => {
                const user = await result.current.login(mockCredentials);
                expect(user).toEqual(mockUser);
            });

            // Verificar estado actualizado
            expect(result.current.user).toEqual(mockUser);
            expect(result.current.isAuthenticated).toBe(true);
            expect(result.current.loading).toBe(false);
            expect(result.current.error).toBeNull();

            // Verificar localStorage
            expect(localStorage.getItem("user")).toBe(JSON.stringify(mockUser));
        });

        it("debe manejar errores de login", async () => {
            const errorMessage = "Credenciales inválidas";
            (authService.login as jest.Mock).mockRejectedValue(new Error(errorMessage));

            const { result } = renderHook(() => useAuthStore());

            await act(async () => {
                try {
                    await result.current.login(mockCredentials);
                } catch (error) {
                    expect(error).toBeInstanceOf(Error);
                }
            });

            // Verificar estado de error
            expect(result.current.user).toBeNull();
            expect(result.current.isAuthenticated).toBe(false);
            expect(result.current.loading).toBe(false);
            expect(result.current.error).toBe(errorMessage);
        });

        it("debe mostrar loading durante el login", async () => {
            let resolveLogin: (value: any) => void;
            const loginPromise = new Promise((resolve) => {
                resolveLogin = resolve;
            });

            (authService.login as jest.Mock).mockReturnValue(loginPromise);

            const { result } = renderHook(() => useAuthStore());

            // Iniciar login sin esperar
            act(() => {
                result.current.login(mockCredentials);
            });

            // Verificar que loading está activo
            expect(result.current.loading).toBe(true);

            // Resolver el login
            await act(async () => {
                resolveLogin({ user: mockUser });
                await loginPromise;
            });

            expect(result.current.loading).toBe(false);
        });
    });

    describe("Signup", () => {
        it("debe hacer signup exitosamente", async () => {
            (authService.signup as jest.Mock).mockResolvedValue({});
            (authService.login as jest.Mock).mockResolvedValue({
                user: mockUser,
            });

            const { result } = renderHook(() => useAuthStore());

            await act(async () => {
                const user = await result.current.signup(mockSignupData);
                expect(user).toEqual(mockUser);
            });

            // Verificar que se llamó signup y luego login
            expect(authService.signup).toHaveBeenCalledWith(mockSignupData);
            expect(authService.login).toHaveBeenCalledWith({
                email: mockSignupData.email,
                password: mockSignupData.password,
            });

            // Verificar estado final
            expect(result.current.user).toEqual(mockUser);
            expect(result.current.isAuthenticated).toBe(true);
        });

        it("debe manejar errores de signup", async () => {
            const errorMessage = "Email ya existe";
            (authService.signup as jest.Mock).mockRejectedValue(new Error(errorMessage));

            const { result } = renderHook(() => useAuthStore());

            await act(async () => {
                try {
                    await result.current.signup(mockSignupData);
                } catch (error) {
                    expect(error).toBeInstanceOf(Error);
                }
            });

            expect(result.current.error).toBe(errorMessage);
            expect(result.current.isAuthenticated).toBe(false);
        });
    });

    describe("Logout", () => {
        beforeEach(() => {
            // Establecer usuario antes de logout
            localStorage.setItem("user", JSON.stringify(mockUser));
            localStorage.setItem("token", "mock-token");
            useAuthStore.setState({
                user: mockUser,
                isAuthenticated: true,
            });
        });

        it("debe hacer logout exitosamente", async () => {
            (authService.logout as jest.Mock).mockResolvedValue({});

            const { result } = renderHook(() => useAuthStore());

            await act(async () => {
                await result.current.logout();
            });

            // Verificar estado limpiado
            expect(result.current.user).toBeNull();
            expect(result.current.isAuthenticated).toBe(false);
            expect(result.current.error).toBeNull();

            // Verificar localStorage limpiado
            expect(localStorage.getItem("user")).toBeNull();
            expect(localStorage.getItem("token")).toBeNull();
        });

        it("debe hacer logout local aunque falle el backend", async () => {
            (authService.logout as jest.Mock).mockRejectedValue(new Error("Error backend"));

            const { result } = renderHook(() => useAuthStore());

            await act(async () => {
                await result.current.logout();
            });

            // Debe limpiar estado local a pesar del error del backend
            expect(result.current.user).toBeNull();
            expect(result.current.isAuthenticated).toBe(false);
            expect(localStorage.getItem("user")).toBeNull();
        });
    });

    describe("RefreshUser", () => {
        it("debe refrescar usuario exitosamente", async () => {
            const updatedUser = { ...mockUser, name: "Nombre Actualizado" };

            (fetchWithAuth as jest.Mock).mockResolvedValue({
                ok: true,
                json: async () => updatedUser,
            });

            const { result } = renderHook(() => useAuthStore());

            await act(async () => {
                await result.current.refreshUser();
            });

            expect(result.current.user).toEqual(updatedUser);
            expect(result.current.isAuthenticated).toBe(true);
            expect(localStorage.getItem("user")).toBe(JSON.stringify(updatedUser));
        });

        it("debe limpiar estado cuando falla el refresh", async () => {
            // Establecer usuario inicial
            useAuthStore.setState({
                user: mockUser,
                isAuthenticated: true,
            });

            (fetchWithAuth as jest.Mock).mockResolvedValue({
                ok: false,
            });

            const { result } = renderHook(() => useAuthStore());

            await act(async () => {
                await result.current.refreshUser();
            });

            expect(result.current.user).toBeNull();
            expect(result.current.isAuthenticated).toBe(false);
            expect(result.current.error).toBe("Sesión expirada");
        });
    });

    describe("SetUser", () => {
        it("debe establecer usuario correctamente", () => {
            const { result } = renderHook(() => useAuthStore());

            act(() => {
                result.current.setUser(mockUser);
            });

            expect(result.current.user).toEqual(mockUser);
            expect(result.current.isAuthenticated).toBe(true);
            expect(localStorage.getItem("user")).toBe(JSON.stringify(mockUser));
        });

        it("debe limpiar usuario cuando se pasa null", () => {
            // Establecer usuario primero
            useAuthStore.setState({
                user: mockUser,
                isAuthenticated: true,
            });

            const { result } = renderHook(() => useAuthStore());

            act(() => {
                result.current.setUser(null);
            });

            expect(result.current.user).toBeNull();
            expect(result.current.isAuthenticated).toBe(false);
            expect(localStorage.getItem("user")).toBeNull();
        });
    });

    describe("ClearError", () => {
        it("debe limpiar errores", () => {
            // Establecer error inicial
            useAuthStore.setState({
                error: "Error de prueba",
            });

            const { result } = renderHook(() => useAuthStore());

            act(() => {
                result.current.clearError();
            });

            expect(result.current.error).toBeNull();
        });
    });

    describe("Roles de usuario", () => {
        it("debe manejar usuarios admin correctamente", async () => {
            (authService.login as jest.Mock).mockResolvedValue({
                user: mockAdminUser,
            });

            const { result } = renderHook(() => useAuthStore());

            await act(async () => {
                await result.current.login(mockCredentials);
            });

            expect(result.current.user?.is_admin).toBe(true);
        });

        it("debe manejar usuarios normales correctamente", async () => {
            (authService.login as jest.Mock).mockResolvedValue({
                user: mockUser,
            });

            const { result } = renderHook(() => useAuthStore());

            await act(async () => {
                await result.current.login(mockCredentials);
            });

            expect(result.current.user?.is_admin).toBe(false);
        });
    });
});