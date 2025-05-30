/**
 * ResetPasswordForm.tsx
 *
 * Formulario para restablecer la contraseña mediante token.
 * Se accede desde el enlace enviado por email (/reset-password?token=...).
 * Permite definir una nueva contraseña de forma segura.
 *
 * Estilo unificado con SignupForm.
 * Validaciones centralizadas en USER_VALIDATION.
 * Spinner, errores por campo, y botón "Iniciar sesión" tras éxito.
 */

"use client";

import { useState, FormEvent, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { userService } from "@/lib/api/userService";
import { Eye, EyeOff } from "lucide-react";
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
            <form
                onSubmit={handleSubmit}
                className="bg-[#F1FFEF] border border-[#C2E7DA] p-8 rounded-xl shadow-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-[#1A1341]">
                    Nueva contraseña
                </h2>

                <p className="text-sm text-gray-700 mb-4 text-center">
                    Introduce tu nueva contraseña para completar el proceso de recuperación.
                </p>

                {serverError && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {serverError}
                    </div>
                )}

                <div className="mb-4">
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
                            label="Confirmar contraseña"
                            id="confirm-password"
                            type={showConfirm ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                validateField("confirmPassword", e.target.value);
                            }}
                            placeholder="Confirma tu nueva contraseña"
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
                        disabled={status === "sending"}
                    >
                        {status === "sending" ? (
                            <div className="flex items-center justify-center space-x-2">
                                <Spinner />
                                <span>Restableciendo...</span>
                            </div>
                        ) : (
                            "Restablecer contraseña"
                        )}
                    </Button>
                </div>

                {status === "success" && (
                    <>
                        <p className="text-green-600 text-sm text-center mt-4">
                            Contraseña restablecida con éxito.
                        </p>
                        <Button
                            variant="outline"
                            className="w-full mt-4"
                            onClick={() => router.push("/login")}
                        >
                            Iniciar sesión
                        </Button>
                    </>
                )}
            </form>
        </div>
    );
};

export default ResetPasswordForm;
