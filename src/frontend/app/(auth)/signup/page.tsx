/**
 * Página de registro de usuarios - LHC Legal & Consulting.
 * Renderiza el formulario SignupForm con diseño visual corporativo LHC.
 * Preparada para el futuro si deciden abrir registro público de usuarios.
 */

import type { Metadata } from "next";
import Link from "next/link";
import SignupForm from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Crear Cuenta | LHC Legal & Consulting",
  description: "Regístrate para acceder a servicios personalizados de asesoría legal",
};

export default function SignupPage() {
  return (
    <section
      className="w-full relative min-h-screen overflow-hidden px-4 py-20 flex items-center justify-center"
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
            Unete a LHC Legal & Consulting
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Accede a servicios de asesoría legal personalizada y gestiona tus consultas
          </p>
        </div>

        <div className="flex justify-center">
          <SignupForm />
        </div>

        {/* Enlace para login - PARTE DE LA LÓGICA */}
        <div className="text-center mt-8">
          <p className="text-white/80">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/login"
              className="font-medium text-[#1DA1F2] hover:text-white transition-colors"
            >
              Inicia sesión
            </Link>
          </p>
        </div>

        {/* Enlace adicional */}
        <div className="text-center mt-4">
          <Link
            href="/"
            className="block text-sm text-white/60 hover:text-white transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}