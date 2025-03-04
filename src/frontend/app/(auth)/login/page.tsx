// app/login/page.tsx
import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "../../../components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Iniciar Sesión | Starter Template",
  description: "Inicia sesión en tu cuenta",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Bienvenido de nuevo
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Inicia sesión para acceder a tu cuenta
          </p>
        </div>

        <LoginForm />

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ¿No tienes cuenta?{" "}
            <Link
              href="/signup"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
