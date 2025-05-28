/**
 * types/auth.ts
 *
 * Tipos centralizados para el sistema de autenticación.
 * Importados por stores, tests y componentes para máxima consistencia.
 *
 * ACTUALIZADO: Añadido 'last_name' para coincidir con backend real
 */

// Usuario base del sistema
export interface User {
    id: string;
    username: string;          
    last_name: string;         
    email: string;
    is_admin: boolean;
    created_at?: string;       
}

// Datos para login
export interface LoginCredentials {
    email: string;
    password: string;
}

// Datos para registro
export interface SignupData {
    username: string;
    last_name: string;
    email: string;
    password: string;
}

// Respuesta del login desde el backend
export interface LoginResponse {
    user: User;
    token?: string;
    message?: string;
}

// Estado base del store de autenticación
export interface AuthState {
    // Estado
    user: User | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;

    // Acciones
    login: (credentials: LoginCredentials) => Promise<User>;
    signup: (data: SignupData) => Promise<User>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
    setUser: (user: User | null) => void;
    clearError: () => void;
}
