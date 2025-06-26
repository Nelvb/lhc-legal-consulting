/**
 * AdminPerfilPage.tsx
 *
 * Perfil del administrador (/admin/perfil) para LHC Legal & Consulting.
 * Visual coherente con el resto de páginas de autenticación LHC.
 * El email no se puede editar para administradores (solo lectura).
 * Usa ProfileView reutilizable con diseño glassmorphism.
 */

import type { Metadata } from "next";
import ProfileView from "@/components/shared/ProfileView";

export const metadata: Metadata = {
    title: "Mi Perfil | LHC Legal & Consulting",
    description:
        "Actualiza tu nombre de usuario y apellidos como administrador de LHC Legal & Consulting. Se requiere contraseña para confirmar los cambios.",
};

export default function AdminPerfilPage() {
    return (
        <ProfileView
            badge="Panel Admin"
            title="Mi Perfil"
            subtitle="Actualiza tu nombre de usuario y apellidos"
            showEmail={true} // Se muestra pero no editable para admin
        />
    );
}