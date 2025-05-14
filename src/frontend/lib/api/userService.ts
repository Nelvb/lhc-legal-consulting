/**
 * userService.ts
 *
 * Servicio de usuario para el frontend.
 * Centraliza todas las llamadas al backend relacionadas con el perfil del usuario:
 * - Actualización de nombre y email
 * - Cambio de contraseña
 * - Recuperación de contraseña
 * - Eliminación permanente de la cuenta
 *
 * Todas las peticiones usan cookies HttpOnly para mantener la sesión autenticada.
 * No se requiere Authorization manual con Bearer.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error("Falta la variable de entorno NEXT_PUBLIC_API_URL");
}

export const userService = {
    /**
     * Actualiza nombre y/o email del usuario.
     * Requiere autenticación mediante cookie (JWT).
     * @param data - { name, email }
     */
    updateNameAndEmail: async (data: { name: string; email: string }) => {
        const response = await fetch(`${API_URL}/account/update-profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
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
     * Cambia la contraseña del usuario autenticado.
     * @param data - { current_password, new_password }
     */
    changePassword: async (data: {
        current_password: string;
        new_password: string;
    }) => {
        const response = await fetch(`${API_URL}/account/change-password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
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
     * Solicita la recuperación de contraseña (no requiere autenticación).
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

    /**
     * Elimina la cuenta del usuario autenticado.
     * Requiere autenticación mediante cookie (JWT).
     */
    deleteAccount: async (): Promise<void> => {
        const response = await fetch(`${API_URL}/users/delete`, {
            method: "DELETE",
            credentials: "include",
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.msg || "No se pudo eliminar la cuenta.");
        }
    },
};
