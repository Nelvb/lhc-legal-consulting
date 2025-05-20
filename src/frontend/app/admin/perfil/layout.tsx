/**
 * Metadata y layout para /admin/perfil
 * Define el título y la descripción SEO de la vista de perfil del administrador.
 * El diseño principal viene heredado desde el layout general del admin.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Perfil del Administrador | Boost a Project",
    description: "Edita tu nombre como administrador en Boost a Project. Se requiere contraseña para confirmar los cambios.",
};

export default function AdminPerfilLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
