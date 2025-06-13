/**
 * LoginForm.tsx
 *
 * Formulario de inicio de sesión para LHC Legal & Consulting.
 * Mantiene toda la lógica original de autenticación intacta.
 * Optimizado con espacios compactos para caber en pantalla sin scroll.
 * Compatible con Zustand y redirección automática por roles.
 */

"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Icon from "@/components/ui/Icon";
import { useAuthStore } from "@/stores/useAuthStore";
import { Eye, EyeOff, Shield } from "lucide-react";

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
      <div 
        className="relative bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl"
      >
        {/* Header del formulario compacto */}
        <div className="text-center mb-5">
          <Icon size="small" blur="md" centered className="mb-3">
            <Shield />
          </Icon>
          
          <h2 className="text-xl font-bold text-white mb-1">
            Iniciar Sesión
          </h2>
          <p className="text-sm text-white/70">
            Accede al panel de administración
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-400/50 text-red-200 rounded-lg text-sm flex items-start space-x-2">
              <div className="bg-red-400 rounded-full p-0.5 mt-0.5">
                <div className="w-1.5 h-1.5 bg-red-200 rounded-full"></div>
              </div>
              <span>{error}</span>
            </div>
          )}

          <Input
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@lhclegal.es"
            compact={true}
            required
          />

          <div className="relative">
            <Input
              label="Contraseña"
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña de administrador"
              compact={true}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-[34px] cursor-pointer text-white/60 hover:text-white transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button
            type="submit"
            variant="outline"
            size="sm"
            disabled={loading}
            fullWidth
            className="mt-4"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Iniciando sesión...</span>
              </div>
            ) : (
              "Acceder al Panel"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;