/**
 * Servicio de usuario para el frontend.
 * Gestiona la actualización de nombre, email, contraseña
 * y solicitud de recuperación de contraseña.
 * Centraliza todas las llamadas relacionadas al perfil del usuario.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error("Falta la variable de entorno NEXT_PUBLIC_API_URL");
}

export const userService = {
    /**
     * Actualiza nombre y/o email del usuario.
     * Requiere autenticación con cookies.
     * @param data - { name, email }
     */
    updateNameAndEmail: async (data: { name: string; email: string }) => {
        const response = await fetch(`${API_URL}/account/update-profile`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result?.msg || "Error al actualizar perfil");
        }

        return result;
    },

    /**
     * Cambia la contraseña del usuario.
     * Requiere contraseña actual + nueva.
     * @param data - { current_password, new_password }
     */
    changePassword: async (data: {
        current_password: string;
        new_password: string;
    }) => {
        const response = await fetch(`${API_URL}/account/change-password`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result?.msg || "Error al cambiar contraseña");
        }

        return result;
    },

    /**
     * Solicita la recuperación de contraseña (vista pública).
     * Envía un email con enlace de recuperación si el correo existe.
     * @param email - correo electrónico del usuario
     */
    requestPasswordReset: async (email: string) => {
        const response = await fetch(`${API_URL}/account/request-password-reset`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result?.msg || "Error al solicitar recuperación");
        }

        return result;
    },
};
