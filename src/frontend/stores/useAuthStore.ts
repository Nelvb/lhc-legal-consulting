/**
 * stores/useAuthStore.ts
 *
 * Store principal de autenticación usando Zustand con persistencia.
 * 
 * Características:
 * - Persistencia automática en localStorage
 * - Compatibilidad con SSR (Next.js)
 * - Manejo de errores robusto
 * - Sincronización entre pestañas
 * - Compatible con fetchWithAuth y cookies HttpOnly
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "@/lib/api/authService";
import { fetchWithAuth } from "@/lib/utils/fetchWithAuth";
import type {
    User,
    LoginCredentials,
    SignupData,
    AuthState
} from "@/types/auth";

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            // Estado inicial
            user: null,
            loading: false,
            error: null,
            isAuthenticated: false,

            // Acción: Login
            login: async (credentials: LoginCredentials): Promise<User> => {
                set({ loading: true, error: null });

                try {
                    const response = await authService.login(credentials);
                    const user = response.user;

                    // Actualizar localStorage y estado
                    localStorage.setItem("user", JSON.stringify(user));
                    set({
                        user,
                        isAuthenticated: true,
                        loading: false,
                        error: null
                    });

                    return user;
                } catch (error) {
                    const errorMessage = error instanceof Error
                        ? error.message
                        : "Error desconocido al iniciar sesión";

                    set({
                        error: errorMessage,
                        loading: false,
                        user: null,
                        isAuthenticated: false
                    });

                    throw error;
                }
            },

            // Acción: Registro
            signup: async (data: SignupData): Promise<User> => {
                set({ loading: true, error: null });

                try {
                    // Registro en el backend
                    await authService.signup(data);

                    // Login automático tras registro exitoso
                    const user = await get().login({
                        email: data.email,
                        password: data.password
                    });

                    return user;
                } catch (error) {
                    const errorMessage = error instanceof Error
                        ? error.message
                        : "Error desconocido al registrarse";

                    set({
                        error: errorMessage,
                        loading: false,
                        user: null,
                        isAuthenticated: false
                    });

                    throw error;
                }
            },

            // Acción: Logout
            logout: async (): Promise<void> => {
                try {
                    // Intentar logout en el backend
                    await authService.logout();
                } catch (error) {
                    // Log del error pero no fallar el logout local
                    console.error("Error en logout del backend:", error);
                }

                // Limpiar estado local siempre
                localStorage.removeItem("user");
                localStorage.removeItem("token");

                set({
                    user: null,
                    isAuthenticated: false,
                    error: null,
                    loading: false
                });
            },

            // Acción: Refrescar usuario desde API
            refreshUser: async (): Promise<void> => {
                try {
                    const response = await fetchWithAuth(
                        `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
                        { method: "GET" }
                    );

                    if (!response.ok) {
                        throw new Error("No se pudo obtener el perfil del usuario");
                    }

                    const user: User = await response.json();

                    // Actualizar localStorage y estado
                    localStorage.setItem("user", JSON.stringify(user));
                    set({
                        user,
                        isAuthenticated: true,
                        error: null
                    });
                } catch (error) {
                    console.error("Error al refrescar usuario:", error);

                    // Si falla el refresh, limpiar estado
                    set({
                        user: null,
                        isAuthenticated: false,
                        error: "Sesión expirada"
                    });
                }
            },

            // Acción: Establecer usuario manualmente
            setUser: (user: User | null): void => {
                if (user) {
                    localStorage.setItem("user", JSON.stringify(user));
                } else {
                    localStorage.removeItem("user");
                }

                set({
                    user,
                    isAuthenticated: !!user,
                    error: null
                });
            },

            // Acción: Limpiar errores
            clearError: (): void => {
                set({ error: null });
            },
        }),
        {
            name: "auth-storage",
            // Solo persistir datos esenciales
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

// Exportar tipos para tests y otros archivos
export type { AuthState, User, LoginCredentials, SignupData };