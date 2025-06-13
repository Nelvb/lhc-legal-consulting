/**
 * Página pública para restablecer la contraseña mediante enlace con token - LHC Legal & Consulting.
 * Se accede desde el enlace enviado por email. Contiene el formulario ResetPasswordForm.
 * Diseño adaptado con gradiente LHC y estilo glassmorphism coherente.
 */

import type { Metadata } from "next";
import Link from "next/link";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
    title: "Restablecer Contraseña | LHC Legal & Consulting",
    description: "Define una nueva contraseña y recupera el acceso al panel de administración",
};

export default function ResetPasswordPage() {
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
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                        Restablecer Contraseña
                    </h1>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto">
                        Crea una contraseña segura para tu cuenta de administrador
                    </p>
                </div>

                <div className="flex justify-center">
                    <ResetPasswordForm />
                </div>

                {/* Enlaces adicionales */}
                <div className="text-center mt-8 space-y-4">
                    <Link
                        href="/login"
                        className="block text-sm text-white/80 hover:text-white transition-colors"
                    >
                        ← Volver al login
                    </Link>
                    
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
}