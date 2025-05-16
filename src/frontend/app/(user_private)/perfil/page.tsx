/**
 * Página de perfil del usuario (/perfil)
 *
 * Replica visualmente la estructura de /login.
 * Fondo dividido 30/70, contenido centrado, formulario dentro de card blanco.
 */

"use client";

import { useAuth } from "@/hooks/useAuth";
import UserProfileForm from "@/components/user/profile/UserProfileForm";

export default function PerfilPage() {
    const { user } = useAuth();

    return (
        <section className="w-full relative min-h-screen overflow-hidden px-4 py-20 flex items-center justify-center pt-40">
            {/* Fondo dividido visualmente */}
            <div className="absolute inset-0 flex">
                <div className="w-[30%] bg-[#C2E7DA]" />
                <div className="w-[70%] bg-[#1A1341]" />
            </div>

            {/* Card blanco con contenido dividido */}
            <div className="relative w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 z-10">
                {/* Columna izquierda (mensaje) */}
                <div className="hidden md:flex flex-col justify-center items-center bg-[#6290C3] p-10">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">
                        Editar Perfil
                    </h2>
                    <p className="text-md text-white text-center">
                        Aquí puedes actualizar tu nombre y correo electrónico.
                    </p>
                    {user?.name && (
                        <p className="mt-6 text-white font-semibold">
                            Nombre actual: {user.name}
                        </p>
                    )}
                    {user?.email && (
                        <p className="text-white text-sm">
                            {user.email}
                        </p>
                    )}
                </div>

                {/* Columna derecha (formulario) */}
                <div className="flex flex-col justify-center items-center p-8">
                    <UserProfileForm />
                </div>
            </div>
        </section>
    );
}
