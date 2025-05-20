/**
 * Layout exclusivo de /perfil
 * Sustituye el layout global del área privada para evitar padding, márgenes o anchuras que rompan el diseño tipo login.
 * Usa la Navbar global sin envoltorios adicionales.
 */

import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
    title: "Editar Perfil | Boost a Project",
    description: "Edita tu información personal en la plataforma de inversión Boost a Project",
};

export default function PerfilLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white text-gray-800">
            <Navbar />
            {children}
        </div>
    );
}
