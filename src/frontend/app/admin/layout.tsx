/**
 * Layout base para el área de administración (/admin/*)
 * Añade la Navbar y el Footer globales, como en el área de usuario.
 * El fondo y el diseño visual lo define cada página.
 */

import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
    title: "Área de Administración | Boost a Project",
    description: "Gestión de contenidos y usuarios desde el panel de administración.",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white text-gray-800 flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}
