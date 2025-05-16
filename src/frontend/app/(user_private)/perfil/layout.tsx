/**
 * layout.tsx para /perfil
 * 
 * Define metadata SEO específica para la ruta /perfil.
 * Evita mezclar "use client" con metadata en el archivo page.tsx.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Editar Perfil | Boost a Project",
    description: "Edita tu información personal en la plataforma de inversión Boost a Project",
};

export default function PerfilLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
