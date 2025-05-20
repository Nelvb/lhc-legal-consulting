/**
 * userService.ts
 *
 * Servicio de usuario para frontend.
 * Todas las llamadas se autentican usando cookies HttpOnly con CSRF Token incluido en headers.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error("Falta la variable de entorno NEXT_PUBLIC_API_URL");
}

// Leer CSRF desde cookie si existe
const getCSRFToken = () => {
    const name = "csrf_access_token=";
    const cookies = document.cookie.split(";");
    for (let c of cookies) {
        const cookie = c.trim();
        if (cookie.startsWith(name)) {
            return cookie.substring(name.length);
        }
    }
    return "";
};

export const userService = {
    updateNameAndEmail: async (data: { name: string; email?: string; current_password: string }) => {
        const response = await fetch(`${API_URL}/account/update-profile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": getCSRFToken(),
            },
            credentials: "include",
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result?.msg || "Error al actualizar perfil");
        return result;
    },

    changePassword: async (data: { current_password: string; new_password: string }) => {
        const response = await fetch(`${API_URL}/account/change-password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": getCSRFToken(),
            },
            credentials: "include",
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result?.msg || "Error al cambiar contraseña");
        return result;
    },

    requestPasswordReset: async (email: string) => {
        try {
            const response = await fetch(`${API_URL}/account/request-password-reset`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const text = await response.text();
            let result;

            try {
                result = text ? JSON.parse(text) : {};
            } catch (e) {
                console.error("Error parsing response:", text);
                result = { msg: "Error de formato en la respuesta" };
            }

            if (!response.ok) {
                throw new Error(result?.msg || `Error ${response.status}: ${response.statusText}`);
            }

            return result;
        } catch (err) {
            console.error("Password reset error:", err);
            throw err;
        }
    },

    resetPassword: async (data: { token: string; new_password: string }) => {
        const response = await fetch(`${API_URL}/account/reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result?.msg || "Error al restablecer la contraseña");
        return result;
    },

    deleteAccount: async (): Promise<void> => {
        const response = await fetch(`${API_URL}/users/delete`, {
            method: "DELETE",
            headers: {
                "X-CSRF-TOKEN": getCSRFToken(),
            },
            credentials: "include",
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.msg || "No se pudo eliminar la cuenta.");
        }
    },
};