// src/frontend/app/(auth)/signup/page.tsx
import Link from "next/link";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Bienvenido
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Registrate para crear tu cuenta
          </p>
        </div>

        <SignupForm />

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
            >
              Inicio de sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
