/**
 * Metadata y layout para /admin/perfil
 * Define el título y la descripción SEO de la vista de perfil del administrador.
 * El diseño principal viene heredado desde el layout general del admin.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mi Perfil | LHC Legal & Consulting",
    description: "Edita tu nombre de usuario y apellidos como administrador de LHC Legal & Consulting. Se requiere contraseña para confirmar los cambios.",
};

export default function AdminPerfilLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}