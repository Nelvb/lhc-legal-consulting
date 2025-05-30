/**
 * SignupForm.tsx
 *
 * Formulario de registro de usuario para la aplicación Boost A Project.
 * Permite crear una cuenta nueva con validación visual profesional de todos los campos.
 * Aplica validación estricta en frontend coherente con los requisitos del backend.
 */

"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Spinner from "@/components/ui/Spinner";
import { useAuthStore } from "@/stores/useAuthStore";
import { Eye, EyeOff } from "lucide-react";
import { validateUserField, USER_VALIDATION } from "@/constants/validation";


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

  const validateField = (
    field: "username" | "lastName" | "email" | "password" | "confirmPassword",
    value: string) => {
    const newErrors = { ...errors };

    if (field === "confirmPassword") {
      if (value !== password) {
        newErrors.confirmPassword = "Las contraseñas no coinciden";
      } else {
        delete newErrors.confirmPassword;
      }
    } else {
      const validationError = validateUserField(field as keyof typeof USER_VALIDATION, value);
      if (validationError) {
        newErrors[field] = validationError;
      } else {
        delete newErrors[field];
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: { [key: string]: string } = {};

    const usernameError = validateUserField("username", username);
    const lastNameError = validateUserField("lastName", lastName);
    const emailError =
      email.length > 100 ? "El email no puede superar los 100 caracteres." : null;
    const passwordError = validateUserField("password", password);
    const confirmError =
      password !== confirmPassword ? "Las contraseñas no coinciden" : null;

    if (usernameError) newErrors.username = usernameError;
    if (lastNameError) newErrors.lastName = lastNameError;
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;
    if (confirmError) newErrors.confirmPassword = confirmError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const user = await signup({ username, last_name: lastName, email, password });
      router.push(user?.is_admin ? "/admin" : "/dashboard");
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
          onChange={(e) => {
            setUsername(e.target.value);
            validateField("username", e.target.value);
          }}
          placeholder="Tu nombre"
          required
        />
        {errors.username && (
          <p className="text-xs text-red-600 mt-1">{errors.username}</p>
        )}

        <Input
          label="Apellidos"
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            validateField("lastName", e.target.value);
          }}
          placeholder="Tus apellidos"
          required
        />
        {errors.lastName && (
          <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>
        )}

        <Input
          label="Email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateField("email", e.target.value);
          }}
          placeholder="tu@email.com"
          required
        />
        {errors.email && (
          <p className="text-xs text-red-600 mt-1">{errors.email}</p>
        )}

        <div className="mb-4">
          <div className="relative">
            <Input
              label="Contraseña"
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validateField("password", e.target.value);
              }}
              placeholder="Crea tu contraseña segura"
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
                validateField("confirmPassword", e.target.value);
              }}
              placeholder="Confirma tu contraseña"
              required
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
