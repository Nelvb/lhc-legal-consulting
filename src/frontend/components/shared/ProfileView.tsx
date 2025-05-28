/**
 * ProfileView.tsx
 *
 * Vista compartida de perfil para usuario y administrador.
 * Muestra un diseño dividido 30/70 con mensaje a la izquierda (solo en escritorio)
 * y formulario de edición a la derecha.
 * Reutiliza el formulario ProfileForm con configuración condicional.
 * El título y subtítulo se personalizan con props.
 *
 * - Migrado a Zustand (`useAuthStore`).
 * - Visual consistente y adaptable por rol.
 * - Componentizado y reutilizable en /perfil y /admin/perfil.
 */

"use client";

import React from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import ProfileForm from "@/components/shared/ProfileForm";

interface ProfileViewProps {
    badge?: string;
    title?: string;
    subtitle?: string;
    showEmail?: boolean;
}

const ProfileView: React.FC<ProfileViewProps> = ({
    badge = "Boost A Project",
    title = "Editar Perfil",
    subtitle = "Aquí puedes actualizar tu nombre y correo electrónico.",
    showEmail = true,
}) => {
    const { user } = useAuthStore();

    const isAdmin = user?.is_admin ?? false;

    return (
        <section className="w-full relative min-h-screen overflow-hidden px-4 py-20 flex items-center justify-center pt-40">
            {/* Fondo dividido visualmente */}
            <div className="absolute inset-0 flex">
                <div className="w-[30%] bg-[#C2E7DA]" />
                <div className="w-[70%] bg-[#1A1341]" />
            </div>

            {/* Card blanco con contenido dividido */}
            <div className="relative z-10 w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
                {/* Columna izquierda (mensaje) */}
                <div className="hidden md:flex flex-col justify-center items-center bg-[#6290C3] p-10">
                    {badge && (
                        <span className="inline-block bg-[#C2E7DA] text-[#1A1341] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-4">
                            {badge}
                        </span>
                    )}
                    <h2 className="text-3xl font-bold text-white text-center mb-4">
                        {title}
                    </h2>
                    <p className="text-md text-white text-center">{subtitle}</p>
                    {(user?.username || user?.last_name) && (
                        <p className="mt-6 text-white font-semibold">
                            Nombre actual: {user.username} {user.last_name}
                        </p>
                    )}

                    {showEmail && user?.email && (
                        <p className="text-white text-sm">{user.email}</p>
                    )}
                </div>

                {/* Columna derecha (formulario) */}
                <div className="flex flex-col justify-center items-center p-8">
                    <ProfileForm showEmail={showEmail} editableEmail={!isAdmin} />
                </div>
            </div>
        </section>
    );
};

export default ProfileView;
