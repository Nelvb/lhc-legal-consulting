/**
 * AdminPerfilPage.tsx
 *
 * Perfil del administrador (/admin/perfil)
 * Visual coherente con /perfil de usuario, pero con restricciones específicas:
 * - El email no se puede editar (solo se muestra en el panel izquierdo).
 * - Se mantiene el fondo dividido 30/70.
 * - Se utiliza ProfileView reutilizable con props condicionales.
 */

import type { Metadata } from "next";
import ProfileView from "@/components/shared/ProfileView";

export const metadata: Metadata = {
    title: "Perfil del Administrador | Boost a Project",
    description:
        "Actualiza tu nombre de administrador en Boost a Project. Se requiere contraseña para confirmar los cambios.",
};

export default function AdminPerfilPage() {
    return (
        <ProfileView
            badge="Panel Admin"
            title="Perfil del Administrador"
            subtitle="Puedes actualizar tu nombre como administrador"
            showEmail={true} // Se muestra a la izquierda, pero no editable
        />
    );
}
