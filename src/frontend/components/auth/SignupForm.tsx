/**
 * SignupForm.tsx
 *
 * Formulario de registro de usuario para LHC Legal & Consulting.
 * Mantiene TODA la lógica original: validaciones, useAuthStore, redirecciones, etc.
 * Versión más ancha con iconos de ojo correctamente alineados.
 * Usa Input con prop compact={true} para reducir espaciado vertical.
 */

"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Icon from "@/components/ui/Icon";
import { useAuthStore } from "@/stores/useAuthStore";
import { Eye, EyeOff, UserPlus } from "lucide-react";
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
    <div className="w-full max-w-xl">
      <div 
        className="relative bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl"
      >
        {/* Header del formulario compacto */}
        <div className="text-center mb-5">
          <Icon size="small" blur="md" centered className="mb-3">
            <UserPlus />
          </Icon>
          
          <h2 className="text-xl font-bold text-white mb-1">
            Formulario de Registro
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-400/50 text-red-200 rounded-lg text-sm flex items-start space-x-2">
              <div className="bg-red-400 rounded-full p-0.5 mt-0.5">
                <div className="w-1.5 h-1.5 bg-red-200 rounded-full"></div>
              </div>
              <span>{error}</span>
            </div>
          )}

          {/* Fila de nombre y apellidos con más espacio */}
          <div className="grid grid-cols-2 gap-5">
            <div>
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
                compact={true}
                required
              />
              {errors.username && (
                <p className="text-xs text-red-200 mt-1">{errors.username}</p>
              )}
            </div>

            <div>
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
                compact={true}
                required
              />
              {errors.lastName && (
                <p className="text-xs text-red-200 mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
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
              compact={true}
              required
            />
            {errors.email && (
              <p className="text-xs text-red-200 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Contraseñas en fila con más espacio */}
          <div className="grid grid-cols-2 gap-5">
            <div>
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
                  placeholder="Contraseña segura"
                  compact={true}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-[34px] cursor-pointer text-white/60 hover:text-white transition-colors flex items-center justify-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-200 mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <Input
                  label="Confirmar"
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    validateField("confirmPassword", e.target.value);
                  }}
                  placeholder="Confirma contraseña"
                  compact={true}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-[36px] cursor-pointer text-white/60 hover:text-white transition-colors flex items-center justify-center"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-200 mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Nota de seguridad compacta */}
          <p className="text-xs text-white/50 text-center">
            Mínimo 8 caracteres con mayúscula, número y carácter especial
          </p>

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
                <span>Creando cuenta...</span>
              </div>
            ) : (
              "Registrarse"
            )}
          </Button>
        </form>

        {/* Nota final compacta */}
        <p className="text-xs text-white/50 text-center mt-4">
          Al registrarte aceptas nuestros términos y condiciones
        </p>
      </div>
    </div>
  );
};

export default SignupForm;