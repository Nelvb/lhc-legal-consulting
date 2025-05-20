/**
 * PerfilPage (perfil del usuario)
 *
 * Página protegida accesible desde /perfil en área privada.
 * Utiliza diseño compartido con fondo dividido 30/70 y formulario seguro.
 * Reutiliza el componente ProfileView para consistencia entre usuario y admin.
 * Metadata incluida para SEO y mejor indexación.
 */

import type { Metadata } from "next";
import ProfileView from "@/components/shared/ProfileView";

export const metadata: Metadata = {
    title: "Editar Perfil | Boost a Project",
    description: "Actualiza tu nombre y correo electrónico en tu cuenta de usuario.",
};

export default function PerfilPage() {
    return (
        <ProfileView
            badge="Boost A Project"
            title="Editar Perfil"
            subtitle="Aquí puedes actualizar tu nombre y correo electrónico."
        />
    );
}
