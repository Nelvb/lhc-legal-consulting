/**
 * Tipado global del usuario autenticado.
 * Reutilizado en Zustand, formularios, API, SSR, etc.
 */

export interface User {
    id: string;
    username: string;
    last_name: string;
    email: string;
    is_admin?: boolean;
    [key: string]: any;
}
