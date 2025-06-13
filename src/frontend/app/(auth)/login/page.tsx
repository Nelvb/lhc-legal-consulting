/**
 * Página de inicio de sesión de LHC Legal & Consulting.
 * Renderiza el formulario de login con diseño visual corporativo LHC.
 * Mantiene toda la lógica original de autenticación intacta.
 * Fondo con gradiente LHC y formulario con estilo glassmorphism.
 */

import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Iniciar Sesión | LHC Legal & Consulting",
  description: "Accede al panel de administración de LHC Legal & Consulting",
};

export default function LoginPage() {
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
            Acceso Administrativo
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Panel de gestión de LHC Legal & Consulting
          </p>
        </div>

        <div className="flex justify-center">
          <LoginForm />
        </div>

        {/* Enlaces adicionales */}
        <div className="text-center mt-8 space-y-4">
          <Link
            href="/recuperar-contrasena"
            className="block text-sm text-white/80 hover:text-white transition-colors"
          >
            ¿Has olvidado tu contraseña?
          </Link>
          
          <Link
            href="/"
            className="block text-sm text-[#1DA1F2] hover:text-white transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}