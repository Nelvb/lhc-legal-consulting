/**
 * Servicio de autenticación para el frontend.
 * Gestiona el registro, login y obtención del perfil desde el backend.
 * Usa JWT con cookies seguras e incluye control de errores.
 */

import { fetchWithAuth } from "@/lib/utils/fetchWithAuth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
    throw new Error("Falta la variable de entorno NEXT_PUBLIC_API_URL");
}

export const authService = {
    /**
     * Registro de un nuevo usuario.
     * @param userData - username, email y password
     */
    signup: async (userData: {
        username: string;
        email: string;
        password: string;
    }) => {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.msg || "Error en el registro");
        }

        return data;
    },

    /**
     * Login de usuario con email y password.
     * Envía cookie segura con JWT.
     */
    login: async (credentials: { email: string; password: string }) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(credentials),
        });

        const text = await response.text();
        let data = null;

        try {
            data = text ? JSON.parse(text) : null;
        } catch (error) {
            console.error("authService.login - Error al parsear JSON:", error);
            throw new Error("Respuesta del servidor no válida");
        }

        if (!response.ok) {
            throw new Error(data?.msg || "Error en el inicio de sesión");
        }

        return data;
    },

    /**
     * Cierra la sesión del usuario.
     * Elimina la cookie JWT del navegador.
     */
    logout: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.msg || "Error al cerrar sesión");
            }
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            throw error;
        }
    },

    /**
     * Obtiene el perfil del usuario autenticado (requiere cookie JWT).
     */
    profile: async () => {
        const response = await fetchWithAuth(`${API_BASE_URL}/auth/profile`, {
            method: "GET",
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.msg || "Error al obtener perfil");
        }

        return data;
    },
};