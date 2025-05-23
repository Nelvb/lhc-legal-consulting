/**
 * AdminPageContent.tsx
 * 
 * Componente de protección para el área de administración (/admin/*).
 * Verifica que el usuario esté autenticado y tenga rol de administrador.
 * Si no cumple los requisitos, redirige automáticamente a la página de inicio.
 * 
 * Características:
 * - Compatible con Next.js 15 App Router y SSR
 * - Usa Zustand store para verificación de estado
 * - Maneja estados de carga profesionalmente
 * - Redirección automática y limpia
 * - TypeScript estricto para máxima escalabilidad
 * 
 * Uso: Envolver children en layouts de admin para protección automática
 */

"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';

interface AdminPageContentProps {
    children: React.ReactNode;
}

/**
 * Componente que protege el acceso al área de administración
 * Solo permite acceso a usuarios autenticados con rol 'admin'
 */
const AdminPageContent: React.FC<AdminPageContentProps> = ({ children }) => {
    const { user, loading } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        // Esperar a que termine la carga inicial del estado
        if (loading) return;

        // Si no hay usuario o no es admin, redirigir a home
        if (!user || !user.is_admin) {
            router.push('/');
            return;
        }
    }, [user, loading, router]);

    // Mostrar loading mientras se verifica el estado de autenticación
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A1341]"></div>
                    <p className="text-gray-600 text-sm">Verificando acceso de administrador...</p>
                </div>
            </div>
        );
    }

    // Si no hay usuario o no es admin, no renderizar nada (se está redirigiendo)
    if (!user || !user.is_admin) {
        return null;
    }

    // Usuario verificado como admin - renderizar contenido protegido
    return <>{children}</>;
};

export default AdminPageContent;