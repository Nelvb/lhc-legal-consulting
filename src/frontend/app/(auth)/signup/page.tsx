// src/frontend/app/(auth)/signup/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import SignupForm from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Crear Cuenta | Boost a Project",
  description: "Regístrate en la plataforma de inversión Boost a Project",
};

export default function SignupPage() {
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
            Crea tu cuenta
          </h2>
          <p className="text-md text-white text-center">
            Empieza a invertir en proyectos inmobiliarios seleccionados con transparencia, datos reales y acompañamiento profesional.
          </p>
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col justify-center items-center p-8">
          <SignupForm />
          <div className="text-center mt-6">
            <p className="text-sm text-gray-700">
              ¿Ya tienes cuenta?{" "}
              <Link
                href="/login"
                className="font-medium text-[#1DA1F2] hover:underline"
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
