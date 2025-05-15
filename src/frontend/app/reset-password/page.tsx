/**
 * Página pública para restablecer la contraseña mediante enlace con token.
 * Se accede desde el enlace enviado por email. Contiene el formulario ResetPasswordForm.
 * Diseño consistente con las páginas de login y recuperación de contraseña.
 */

import type { Metadata } from "next";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
    title: "Restablecer Contraseña | Boost a Project",
    description: "Define una nueva contraseña y recupera el acceso a tu cuenta",
};

export default function ResetPasswordPage() {
    return (
        <section className="w-full relative min-h-screen overflow-hidden px-4 py-20 flex items-center justify-center pt-40">
            {/* Fondo dividido */}
            <div className="absolute inset-0 flex">
                <div className="w-[30%] bg-[#C2E7DA]" />
                <div className="w-[70%] bg-[#1A1341]" />
            </div>

            {/* Contenido principal */}
            <div className="relative w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 z-10">
                {/* Columna izquierda */}
                <div className="hidden md:flex flex-col justify-center items-center bg-[#6290C3] p-10">
                    <h2 className="text-3xl font-bold text-white text-center mb-4">
                        Restablece tu contraseña
                    </h2>
                    <p className="text-md text-white text-center">
                        Crea una nueva contraseña segura y vuelve a acceder a tu cuenta
                    </p>
                </div>

                {/* Columna derecha */}
                <div className="flex flex-col justify-center items-center p-8">
                    <ResetPasswordForm />
                </div>
            </div>
        </section>
    );
}
