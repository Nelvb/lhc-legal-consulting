/**
 * Formulario para restablecer la contraseña mediante token.
 * Se accede desde el enlace enviado por email (/reset-password?token=...).
 * Permite definir una nueva contraseña de forma segura.
 * Tras éxito, muestra botón de "Iniciar sesión" que redirige a /login (no hace login automático por seguridad).
 */

"use client";

import { useState, FormEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { userService } from "@/lib/api/userService";
import { Eye, EyeOff } from "lucide-react";

const ResetPasswordForm = () => {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [error, setError] = useState("");

    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!token) {
            setError("Token no válido o ausente.");
            return;
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        if (password !== confirm) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setStatus("sending");

        try {
            await userService.resetPassword({ token, new_password: password });
            setStatus("success");
        } catch (err: any) {
            setError(err.message || "Error al restablecer la contraseña.");
            setStatus("error");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-[#F1FFEF] border border-[#C2E7DA] p-8 rounded-xl shadow-md"
        >
            <h2 className="text-2xl font-bold mb-6 text-center text-[#1A1341]">
                Nueva contraseña
            </h2>

            <p className="text-sm text-gray-700 mb-4 text-center">
                Introduce tu nueva contraseña para completar el proceso de recuperación.
            </p>

            <div className="relative">
                <Input
                    label="Contraseña nueva"
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <div
                    className="absolute right-3 top-[38px] cursor-pointer text-[#1A1341]"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
            </div>

            <div className="relative mt-4">
                <Input
                    label="Confirmar contraseña"
                    id="confirm-password"
                    type={showConfirm ? "text" : "password"}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                />
                <div
                    className="absolute right-3 top-[38px] cursor-pointer text-[#1A1341]"
                    onClick={() => setShowConfirm(!showConfirm)}
                >
                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
            </div>

            <div className="mt-6">
                <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={status === "sending"}
                >
                    {status === "sending" ? "Enviando..." : "Restablecer contraseña"}
                </Button>
            </div>

            {error && (
                <p className="text-red-600 text-sm text-center mt-4">{error}</p>
            )}

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
    );
};

export default ResetPasswordForm;
