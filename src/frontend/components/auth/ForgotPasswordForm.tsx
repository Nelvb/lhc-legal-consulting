/**
 * ForgotPasswordForm.tsx
 *
 * Formulario de recuperación de contraseña para LHC Legal & Consulting.
 * Mantiene toda la lógica original de userService intacta.
 * Optimizado con espacios compactos para caber en pantalla sin scroll.
 * Utiliza el método centralizado en userService y componente Icon unificado.
 */

"use client";

import { useState, FormEvent } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { userService } from "@/lib/api/userService";
import { Mail, CheckCircle } from "lucide-react";

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("sending");

        try {
            await userService.requestPasswordReset(email);
            setStatus("sent");
        } catch {
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
                        <Mail />
                    </Icon>

                    <h2 className="text-xl font-bold text-white mb-1">
                        Recuperar contraseña
                    </h2>
                    <p className="text-sm text-white/70">
                        Introduce tu correo y te enviaremos un enlace de recuperación
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {status === "error" && (
                        <div className="p-3 bg-red-500/20 border border-red-400/50 text-red-200 rounded-lg text-sm flex items-start space-x-2">
                            <div className="bg-red-400 rounded-full p-0.5 mt-0.5">
                                <div className="w-1.5 h-1.5 bg-red-200 rounded-full"></div>
                            </div>
                            <span>Hubo un error. Inténtalo de nuevo más tarde.</span>
                        </div>
                    )}

                    {status === "sent" && (
                        <div className="p-3 bg-green-500/20 border border-green-400/50 text-green-200 rounded-lg text-sm flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="font-medium">¡Enlace enviado!</p>
                                <p className="text-green-300 text-xs mt-1">Si existe una cuenta con ese correo, recibirás un enlace de recuperación.</p>
                            </div>
                        </div>
                    )}

                    <Input
                        label="Correo electrónico"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@lhclegal.es"
                        compact={true}
                        required
                    />

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
                                <span>Enviando...</span>
                            </div>
                        ) : (
                            "Enviar enlace de recuperación"
                        )}
                    </Button>
                </form>

                {/* Nota de seguridad compacta */}
                <p className="text-xs text-white/50 text-center mt-4">
                    Por seguridad, siempre mostramos este mensaje aunque el email no exista
                </p>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;