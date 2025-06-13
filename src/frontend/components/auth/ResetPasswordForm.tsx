/**
 * ResetPasswordForm.tsx
 *
 * Formulario para restablecer la contraseña mediante token - LHC Legal & Consulting.
 * Mantiene toda la lógica original: validaciones, userService, estados, etc.
 * Optimizado con espacios compactos para caber en pantalla sin scroll.
 * Se accede desde el enlace enviado por email (/reset-password?token=...).
 */

"use client";

import { useState, FormEvent, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { userService } from "@/lib/api/userService";
import { Eye, EyeOff, Lock, CheckCircle } from "lucide-react";
import { validateUserField } from "@/constants/validation";

const ResetPasswordForm = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [serverError, setServerError] = useState("");

    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
        setServerError("");
    }, [password, confirmPassword]);

    const validateField = (field: "password" | "confirmPassword", value: string) => {
        const newErrors = { ...errors };

        if (field === "confirmPassword") {
            if (value !== password) {
                newErrors.confirmPassword = "Las contraseñas no coinciden";
            } else {
                delete newErrors.confirmPassword;
            }
        } else {
            const validationError = validateUserField("password", value);
            if (validationError) {
                newErrors.password = validationError;
            } else {
                delete newErrors.password;
            }
        }

        setErrors(newErrors);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setServerError("");

        if (!token) {
            setServerError("Token no válido o ausente.");
            return;
        }

        const passwordError = validateUserField("password", password);
        const confirmError = password !== confirmPassword ? "Las contraseñas no coinciden" : null;

        const newErrors: { [key: string]: string } = {};
        if (passwordError) newErrors.password = passwordError;
        if (confirmError) newErrors.confirmPassword = confirmError;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setStatus("sending");

        try {
            await userService.resetPassword({ token, new_password: password });
            setStatus("success");
        } catch (err: any) {
            setServerError(err.message || "Error al restablecer la contraseña.");
            setStatus("error");
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
                        <Lock />
                    </Icon>
                    
                    <h2 className="text-xl font-bold text-white mb-1">
                        Nueva contraseña
                    </h2>
                    <p className="text-sm text-white/70">
                        Introduce tu nueva contraseña para completar el proceso
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {serverError && (
                        <div className="p-3 bg-red-500/20 border border-red-400/50 text-red-200 rounded-lg text-sm flex items-start space-x-2">
                            <div className="bg-red-400 rounded-full p-0.5 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-red-200 rounded-full"></div>
                            </div>
                            <span>{serverError}</span>
                        </div>
                    )}

                    {status === "success" && (
                        <div className="p-3 bg-green-500/20 border border-green-400/50 text-green-200 rounded-lg text-sm flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="font-medium">¡Contraseña restablecida!</p>
                                <p className="text-green-300 text-xs mt-1">Ya puedes acceder al panel con tu nueva contraseña.</p>
                            </div>
                        </div>
                    )}

                    <div>
                        <div className="relative">
                            <Input
                                label="Contraseña nueva"
                                id="new-password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    validateField("password", e.target.value);
                                }}
                                placeholder="Crea tu nueva contraseña segura"
                                compact={true}
                                required
                                minLength={8}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-[34px] cursor-pointer text-white/60 hover:text-white transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        <p className="text-xs text-white/50 mt-1">
                            Mínimo 8 caracteres con mayúscula, minúscula, número y carácter especial
                        </p>
                        {errors.password && (
                            <p className="text-xs text-red-200 mt-1">{errors.password}</p>
                        )}
                    </div>

                    <div>
                        <div className="relative">
                            <Input
                                label="Confirmar contraseña"
                                id="confirm-password"
                                type={showConfirm ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    validateField("confirmPassword", e.target.value);
                                }}
                                placeholder="Confirma tu nueva contraseña"
                                compact={true}
                                required
                                minLength={8}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-[34px] cursor-pointer text-white/60 hover:text-white transition-colors"
                                onClick={() => setShowConfirm(!showConfirm)}
                            >
                                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-xs text-red-200 mt-1">{errors.confirmPassword}</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        variant="outline"
                        size="sm"
                        disabled={status === "sending"}
                        fullWidth
                        className="mt-4"
                    >
                        {status === "sending" ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Restableciendo...</span>
                            </div>
                        ) : (
                            "Restablecer contraseña"
                        )}
                    </Button>

                    {status === "success" && (
                        <Button
                            variant="lhc"
                            size="sm"
                            fullWidth
                            className="mt-3"
                            onClick={() => router.push("/login")}
                        >
                            Iniciar sesión
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordForm;