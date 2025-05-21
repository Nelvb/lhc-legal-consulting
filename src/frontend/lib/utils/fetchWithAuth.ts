/**
 * fetchWithAuth.ts
 *
 * Wrapper centralizado para fetch autenticado.
 * - Añade automáticamente CSRF Token para métodos sensibles (POST, PUT, PATCH, DELETE).
 * - Reintenta una vez si el token ha expirado (401), intentando renovar con /auth/refresh.
 * - Si la renovación falla, redirige a login y limpia localStorage.
 */

import router from "next/router";

/**
 * Extrae el CSRF token desde las cookies del navegador.
 * Usa el token adecuado según la ruta.
 */
const getCSRFToken = (url: string): string => {
    const isRefresh = url.includes("/auth/refresh");
    const cookieName = isRefresh ? "csrf_refresh_token=" : "csrf_access_token=";
    const cookies = document.cookie.split(";");

    for (const c of cookies) {
        const cookie = c.trim();
        if (cookie.startsWith(cookieName)) {
            return cookie.substring(cookieName.length);
        }
    }

    return "";
};

interface FetchWithAuthOptions extends RequestInit {
    retry?: boolean;
}

/**
 * fetchWithAuth
 * Intercepta errores 401 y reintenta con /auth/refresh una vez.
 */
export const fetchWithAuth = async (
    input: RequestInfo | URL,
    init: FetchWithAuthOptions = {}
): Promise<Response> => {
    const method = init.method?.toUpperCase() || "GET";
    const needsCSRF = ["POST", "PUT", "PATCH", "DELETE"].includes(method);
    const url = input.toString();

    const csrfToken = getCSRFToken(url);

    const headers = {
        ...(init.headers || {}),
        ...(needsCSRF && { "X-CSRF-TOKEN": csrfToken }),
        "Content-Type": "application/json",
    };

    const config: RequestInit = {
        ...init,
        credentials: "include",
        headers,
    };

    try {
        const response = await fetch(input, config);

        if (response.status !== 401 || init.retry) {
            return response;
        }

        console.warn("Token expirado. Intentando renovar...");

        // Obtener CSRF del refresh token explícitamente
        const refreshCSRF = getCSRFToken("/auth/refresh");

        const refreshResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "X-CSRF-TOKEN": refreshCSRF,
                    "Content-Type": "application/json",
                },
            }
        );

        if (!refreshResponse.ok) {
            console.error("Fallo al renovar token. Redirigiendo a login...");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            router.push("/login");
            return response;
        }

        // Reintento una sola vez con retry=true
        return await fetchWithAuth(input, { ...init, retry: true });
    } catch (err) {
        console.error("Error en fetchWithAuth:", err);
        throw err;
    }
};
