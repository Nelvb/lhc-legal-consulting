/**
 * UserPageContent.tsx
 * 
 * Componente de protección para áreas privadas de usuario (/dashboard, /usuario/*).
 * Verifica que el usuario esté autenticado (cualquier rol válido).
 * Si no está autenticado, redirige automáticamente a la página de inicio.
 * 
 * Características:
 * - Compatible con Next.js 15 App Router y SSR
 * - Usa Zustand store para verificación de estado
 * - Maneja estados de carga profesionalmente
 * - Redirección automática y limpia
 * - TypeScript estricto para máxima escalabilidad
 * 
 * Uso: Envolver children en layouts de usuario para protección automática
 */

"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';

interface UserPageContentProps {
    children: React.ReactNode;
}

/**
 * Componente que protege el acceso a áreas privadas de usuario
 * Permite acceso a cualquier usuario autenticado (admin o user)
 */
const UserPageContent: React.FC<UserPageContentProps> = ({ children }) => {
    const { user, loading } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        // Esperar a que termine la carga inicial del estado
        if (loading) return;

        // Si no hay usuario autenticado, redirigir a home
        if (!user) {
            router.push('/');
            return;
        }
    }, [user, loading, router]);

    // Mostrar loading mientras se verifica el estado de autenticación
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F7FAFF]">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A1341]"></div>
                    <p className="text-gray-600 text-sm">Verificando autenticación...</p>
                </div>
            </div>
        );
    }

    // Si no hay usuario, no renderizar nada (se está redirigiendo)
    if (!user) {
        return null;
    }

    // Usuario autenticado verificado - renderizar contenido protegido
    return <>{children}</>;
};

export default UserPageContent;