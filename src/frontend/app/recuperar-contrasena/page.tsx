/**
 * Página pública de recuperación de contraseña.
 * Muestra el formulario ForgotPasswordForm dentro de un layout visual coherente con la vista de login.
 * Ruta: /recuperar-contraseña
 * Acceso público para usuarios que han olvidado su contraseña.
 */

import type { Metadata } from "next";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
    title: "Recuperar Contraseña | Boost a Project",
    description: "Solicita un enlace para restablecer tu contraseña en Boost a Project",
};

export default function ForgotPasswordPage() {
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
                        ¿No puedes acceder a tu cuenta?
                    </h2>
                    <p className="text-md text-white text-center">
                        Introduce tu correo y te enviaremos un enlace para restablecer tu contraseña de forma segura.
                    </p>
                </div>

                {/* Columna derecha */}
                <div className="flex flex-col justify-center items-center p-8">
                    <ForgotPasswordForm />
                </div>
            </div>
        </section>
    );
}
