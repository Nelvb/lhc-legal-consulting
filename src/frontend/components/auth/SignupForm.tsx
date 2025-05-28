/**
 * SignupForm.tsx
 *
 * Formulario de registro de usuario para la aplicación Boost A Project.
 * Permite crear una cuenta nueva con validación visual profesional de todos los campos.
 * Aplica validación estricta en frontend coherente con los requisitos del backend:
 * 
 * Características profesionales:
 * - Validación básica en frontend, backend maneja validaciones complejas
 * - Mensajes de error del backend
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

// Regex actualizada para coincidir exactamente con el backend
const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/;

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { signup, loading, error, clearError } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    clearError();
  }, [clearError]);

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'password':
        if (value.length < 8) {
          newErrors.password = "La contraseña debe tener al menos 8 caracteres";
        } else if (!strongPasswordRegex.test(value)) {
          newErrors.password = "Debe incluir mayúscula, minúscula, número y carácter especial";
        } else {
          delete newErrors.password;
        }
        break;

      case 'confirmPassword':
        if (value !== password) {
          newErrors.confirmPassword = "Las contraseñas no coinciden";
        } else {
          delete newErrors.confirmPassword;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validación básica de contraseñas
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Las contraseñas no coinciden" });
      return;
    }

    try {
      const user = await signup({ username, last_name: lastName, email, password });

      if (user?.is_admin) {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch {
      // error gestionado en el store
    }
  };

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        className="bg-[#F1FFEF] border border-[#C2E7DA] p-8 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#1A1341]">
          Crear cuenta
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <Input
          label="Nombre"
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Tu nombre"
          required
          minLength={2}
          maxLength={30}
        />

        <Input
          label="Apellidos"
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Tus apellidos"
          required
          minLength={2}
          maxLength={50}
        />

        <Input
          label="Email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          maxLength={100}
        />

        <div className="mb-4">
          <div className="relative">
            <Input
              label="Contraseña"
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validateField('password', e.target.value);
              }}
              placeholder="Crea tu contraseña segura"
              required
              minLength={8}
            />
            <button
              type="button"
              className="absolute right-3 top-[38px] cursor-pointer text-[#1A1341]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Mínimo 8 caracteres con mayúscula, minúscula, número y carácter especial
          </p>
          {errors.password && (
            <p className="text-xs text-red-600 mt-1">{errors.password}</p>
          )}
        </div>

        <div className="mb-4">
          <div className="relative">
            <Input
              label="Confirmar Contraseña"
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                validateField('confirmPassword', e.target.value);
              }}
              placeholder="Confirma tu contraseña"
              required
              minLength={8}
            />
            <button
              type="button"
              className="absolute right-3 top-[38px] cursor-pointer text-[#1A1341]"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-600 mt-1">{errors.confirmPassword}</p>
          )}
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
                <span>Creando cuenta...</span>
              </div>
            ) : (
              "Crear cuenta"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;