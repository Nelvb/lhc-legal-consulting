/**
 * AdminLayout.tsx
 *
 * Layout base para el área de administración (/admin/*)
 * 
 * Características principales:
 * - Protección automática: Solo usuarios con is_admin = true pueden acceder
 * - Navbar y Footer condicionales en rutas específicas (/admin y /admin/perfil)
 * - Resto de vistas administrativas sin distracciones visuales
 * - Redirección automática a home si no cumple requisitos de administrador
 */

"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AdminPageContent from "@/components/admin/layout/AdminPageContent";
import RouteChangeLoader from "@/components/ui/RouteChangeLoader";
import ScrollToTop from "@/components/utils/ScrollToTop";


export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Definir las rutas donde SÍ se muestra Navbar y Footer en el admin
    const showLayoutFor = ["/admin", "/admin/perfil"];
    const shouldShowLayout = showLayoutFor.includes(pathname);

    return (
        <div className="min-h-screen bg-white text-gray-800 flex flex-col">
            {shouldShowLayout && <Navbar />}

            {/* Loader para transiciones entre rutas del admin */}
            <RouteChangeLoader />

            <AdminPageContent>
                <ScrollToTop />
                <main className="flex-grow">{children}</main>
            </AdminPageContent>

            {shouldShowLayout && <Footer />}
        </div>
    );
}
