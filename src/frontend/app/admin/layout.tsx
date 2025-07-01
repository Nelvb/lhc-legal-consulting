/**
 * AdminLayout.tsx
 *
 * Layout base optimizado para el área de administración (/admin/*).
 * 
 * Características principales:
 * - Protección automática: Solo usuarios con is_admin = true pueden acceder
 * - Navbar y Footer condicionales en rutas específicas (/admin y /admin/perfil)
 * - Loading inteligente sin parpadeos
 * - Sistema simplificado sin transiciones complejas
 * - Resto de vistas administrativas sin distracciones visuales
 * - Redirección automática a home si no cumple requisitos de administrador
 */

"use client";

import React, { memo, useMemo } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useRouteLoaderStore } from "@/stores/useRouteLoaderStore";
import AdminPageContent from "@/components/admin/layout/AdminPageContent";

// Imports dinámicos para componentes no críticos en admin
const Navbar = dynamic(() => import("@/components/layout/Navbar"), {
    ssr: true,
});

const Footer = dynamic(() => import("@/components/layout/Footer"), {
    ssr: true,
});

interface AdminLayoutProps {
    children: React.ReactNode;
}

// Loading overlay simplificado para admin
const AdminLoader = memo(() => {
    const { isNavigating } = useRouteLoaderStore();

    if (!isNavigating) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] bg-white/90 backdrop-blur-sm flex items-center justify-center"
            role="status"
            aria-label="Cargando página de administración"
        >
            <div className="flex flex-col items-center space-y-3">
                <div className="w-8 h-8 border-2 border-gray-200 rounded-full animate-spin border-t-[#1b2f4b]"></div>
                <span className="text-sm text-gray-600 animate-pulse">Cargando...</span>
            </div>
        </div>
    );
});

AdminLoader.displayName = 'AdminLoader';

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const pathname = usePathname();

    // Memoizar cálculo de rutas que necesitan layout completo
    const shouldShowLayout = useMemo(() => {
        const showLayoutFor = ["/admin", "/admin/perfil"];
        return showLayoutFor.includes(pathname);
    }, [pathname]);

    return (
        <div className="min-h-screen bg-white text-gray-800 flex flex-col">
            {/* Navbar condicional */}
            {shouldShowLayout && <Navbar />}

            {/* Loading overlay simplificado */}
            <AdminLoader />

            {/* Contenido protegido del admin */}
            <AdminPageContent>
                <main className="flex-grow" id="main-top">
                    {children}
                </main>
            </AdminPageContent>

            {/* Footer condicional */}
            {shouldShowLayout && <Footer />}
        </div>
    );
};

export default memo(AdminLayout);