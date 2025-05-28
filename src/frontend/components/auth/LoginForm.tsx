/**
 * LoginForm.tsx
 *
 * Formulario de inicio de sesión para la aplicación Boost A Project.
 * Permite al usuario autenticarse con email y contraseña usando cookies seguras + CSRF.
 * Incluye redirección automática según el rol (admin → /admin, usuario → /dashboard).
 * 
 * Características profesionales:
 * - Placeholders profesionales, manejo de errores del backend
 * - Compatible con Zustand (useAuthStore)
 * - Diseño responsive y accesible
 * - Componente Spinner reutilizable
 */

"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Spinner from "@/components/ui/Spinner";
import { useAuthStore } from "@/stores/useAuthStore";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, loading, error, clearError } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await login({ email, password });

      if (user?.is_admin) {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch {
      // El error ya se gestiona en el store
    }
  };

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        className="bg-[#F1FFEF] border border-[#C2E7DA] p-8 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#1A1341]">
          Iniciar Sesión
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <Input
          label="Email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
        />

        <div className="relative">
          <Input
            label="Contraseña"
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Tu contraseña"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-[38px] cursor-pointer text-[#1A1341]"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="mt-4">
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <Spinner />
                <span>Iniciando sesión...</span>
              </div>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;