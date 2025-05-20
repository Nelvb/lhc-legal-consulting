/**
 * Layout base para el área de administración (/admin/*)
 * Muestra Navbar y Footer solo en rutas concretas (/admin y /admin/perfil).
 * En el resto de vistas de administración (blog, proyectos...) se ocultan automáticamente.
 * Esto permite una experiencia de edición o gestión más limpia y sin distracciones.
 */

"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
            <main className="flex-grow">{children}</main>
            {shouldShowLayout && <Footer />}
        </div>
    );
}
