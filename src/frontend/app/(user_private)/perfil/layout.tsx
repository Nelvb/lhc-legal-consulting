/**
 * Layout de /perfil
 * Solo añade metadata. Deja que el layout principal lo envuelva con Navbar y estructura.
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
