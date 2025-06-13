/**
 * Página pública de recuperación de contraseña - LHC Legal & Consulting.
 * Muestra el formulario ForgotPasswordForm con diseño visual corporativo LHC.
 * Mantiene toda la lógica original intacta.
 * Fondo con gradiente LHC y formulario con estilo glassmorphism.
 */

import type { Metadata } from "next";
import Link from "next/link";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
    title: "Recuperar Contraseña | LHC Legal & Consulting",
    description: "Solicita un enlace para restablecer tu contraseña de administrador",
};

export default function ForgotPasswordPage() {
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
                        Recuperar Acceso
                    </h1>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto">
                        Restablece tu contraseña de administrador
                    </p>
                </div>

                <div className="flex justify-center">
                    <ForgotPasswordForm />
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