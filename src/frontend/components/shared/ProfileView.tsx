/**
 * ProfileView.tsx
 *
 * Vista compartida de perfil para usuario y administrador de LHC Legal & Consulting.
 * Diseño consistente con recuperar-contraseña: fondo gradiente LHC + formulario glassmorphism.
 * Reutiliza el formulario ProfileForm con configuración condicional.
 * El título y subtítulo se personalizan con props.
 *
 * - Migrado a Zustand (`useAuthStore`).
 * - Visual consistente con el resto de páginas de autenticación LHC.
 * - Componentizado y reutilizable en /perfil y /admin/perfil.
 */

"use client";

import React from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import ProfileForm from "@/components/shared/ProfileForm";

interface ProfileViewProps {
    badge?: string;
    title?: string;
    subtitle?: string;
    showEmail?: boolean;
}

const ProfileView: React.FC<ProfileViewProps> = ({
    badge = "LHC Legal & Consulting",
    title = "Mi Perfil",
    subtitle = "Actualiza tu información personal",
    showEmail = true,
}) => {
    const { user } = useAuthStore();

    return (
        <section 
            className="w-full relative min-h-screen overflow-hidden px-4 py-20 flex items-center justify-center pt-20"
            style={{
                background: `
                    linear-gradient(135deg, 
                        #1b2f4b 0%, 
                        #1DA1F2 35%, 
                        #1b2f4b 70%, 
                        #0f172a 100%
                    )
                `
            }}
        >
            {/* Contenido principal */}
            <div className="relative w-full max-w-4xl z-10">
                <div className="text-center mb-8">
                    <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-6">
                        {badge}
                    </div>
                    
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        {title}
                    </h1>
                    
                    <p className="text-lg text-white/80 max-w-2xl mx-auto">
                        {subtitle}
                    </p>

                    {/* Información del usuario actual */}
                    {user && (
                        <div className="mt-6 text-center">
                            <p className="text-white/90 font-medium">
                                Usuario actual: <span className="text-[#60A5FA]">{user.username}</span>
                            </p>
                            {showEmail && (
                                <p className="text-white/70 text-sm mt-1">
                                    {user.email}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex justify-center">
                    <ProfileForm showEmail={showEmail} editableEmail={!user?.is_admin} />
                </div>

                {/* Enlaces adicionales */}
                <div className="text-center mt-8 space-y-4">
                    {user?.is_admin ? (
                        <Link
                            href="/admin"
                            className="block text-sm text-white/80 hover:text-white transition-colors"
                        >
                            ← Volver al panel admin
                        </Link>
                    ) : (
                        <Link
                            href="/dashboard"
                            className="block text-sm text-white/80 hover:text-white transition-colors"
                        >
                            ← Volver al dashboard
                        </Link>
                    )}
                    
                    <Link
                        href="/"
                        className="block text-sm text-[#1DA1F2] hover:text-white transition-colors"
                    >
                        Ir al inicio
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProfileView;