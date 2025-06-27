/**
 * contactService.ts
 *
 * Servicio para enviar mensajes desde el formulario de contacto.
 * - Si el usuario está autenticado, usa fetchWithAuth con protección CSRF y renovación automática.
 * - Si no está autenticado, usa fetch normal sin cabeceras CSRF.
 * - El parámetro isAuthenticated es opcional (por defecto false) para formularios públicos.
 */

import { fetchWithAuth } from "@/lib/utils/fetchWithAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error("Falta la variable de entorno NEXT_PUBLIC_API_URL");
}

interface ContactData {
    name: string;
    last_name?: string;
    subject: string;
    message: string;
    email?: string;
}

export const contactService = {
    sendMessage: async (data: ContactData, isAuthenticated: boolean = false): Promise<void> => {
        const url = `${API_URL}/account/contact`;

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include" as RequestCredentials,
            body: JSON.stringify(data),
        };

        const response = isAuthenticated
            ? await fetchWithAuth(url, config)
            : await fetch(url, config);

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result?.msg || "Error al enviar el mensaje.");
        }
    },
};