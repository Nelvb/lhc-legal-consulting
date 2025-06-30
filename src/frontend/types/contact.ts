// src/frontend/types/contact.ts
// Definiciones de tipos TypeScript para el sistema de mensajes de contacto.
// Incluye interfaces para formularios públicos, mensajes almacenados y respuestas de API.
// Sincronizado con el modelo ContactMessage del backend y esquemas de validación.

export interface ContactFormData {
    name: string;
    last_name?: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    privacy_accepted: boolean;
}

export interface ContactMessage {
    id: number;
    full_name: string;
    email: string;
    phone?: string | null;
    subject: string;
    message: string;
    privacy_accepted: boolean;
    revoked: boolean;
    created_at: string;
    revoked_at?: string | null;
}

export interface ContactApiResponse {
    status: 'success' | 'error';
    message: string;
    data?: {
        id: number;
        created_at: string;
    };
    errors?: Record<string, string[]>;
}

export interface ContactMessagesResponse {
    messages: ContactMessage[];
    total: number;
}

export interface RevokePrivacyResponse {
    message: string;
    success: boolean;
}