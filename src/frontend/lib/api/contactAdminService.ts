// src/frontend/lib/api/contactAdminService.ts
// Servicio para la gestión de mensajes de contacto desde el panel de administración.
// Incluye funciones para obtener todos los mensajes y revocar consentimiento de privacidad.
// Protegido con JWT vía cookies y preparado para escalabilidad futura.
// Soporta filtrado por email, estado y ordenación profesional.

import { fetchWithAuth } from "@/lib/utils/fetchWithAuth";
import { ContactMessage } from "@/types/contact";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error("Falta la variable de entorno NEXT_PUBLIC_API_URL");
}

// Interfaces para filtros
export interface ContactFilters {
    email?: string;
    status?: 'all' | 'active' | 'revoked';
    sort?: 'created_at' | 'email' | 'full_name';
    order?: 'asc' | 'desc';
}

export interface ContactMessagesResponse {
    messages: ContactMessage[];
    total: number;
    filters: ContactFilters;
}

export const contactAdminService = {
    /**
     * Obtiene todos los mensajes de contacto registrados.
     * Requiere autenticación admin vía cookies.
     * Mantiene compatibilidad con versión anterior.
     */
    async getAllMessages(): Promise<ContactMessage[]> {
        const response = await contactAdminService.getFilteredMessages();
        return response.messages;
    },

    /**
     * Obtiene mensajes de contacto con filtros opcionales.
     * Permite búsqueda por email, filtrado por estado y ordenación.
     */
    async getFilteredMessages(filters?: ContactFilters): Promise<ContactMessagesResponse> {
        const params = new URLSearchParams();
        
        if (filters?.email) {
            params.append('email', filters.email);
        }
        if (filters?.status && filters.status !== 'all') {
            params.append('status', filters.status);
        }
        if (filters?.sort) {
            params.append('sort', filters.sort);
        }
        if (filters?.order) {
            params.append('order', filters.order);
        }

        const url = `${API_URL}/admin/contact${params.toString() ? `?${params}` : ''}`;
        
        const res = await fetchWithAuth(url, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error("Error al obtener los mensajes de contacto.");
        }

        const data = await res.json();
        return data;
    },

    /**
     * Revoca el consentimiento de privacidad de un mensaje (por ID).
     * Útil cuando un usuario pide eliminar sus datos.
     */
    async revokeMessage(id: number): Promise<void> {
        const res = await fetchWithAuth(`${API_URL}/admin/contact/${id}/revoke`, {
            method: "PATCH",
            credentials: "include",
        });

        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData?.error || "No se pudo revocar el mensaje.");
        }
    },
};

// Exportaciones para compatibilidad (mantienen la funcionalidad anterior)
export const getAllMessages = contactAdminService.getAllMessages;
export const getFilteredMessages = contactAdminService.getFilteredMessages;
export const revokePrivacy = contactAdminService.revokeMessage;