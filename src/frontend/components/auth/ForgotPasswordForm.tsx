/**
 * Formulario de recuperación de contraseña.
 * Permite al usuario solicitar un email con enlace para restablecer su contraseña.
 * Utiliza el método centralizado en userService y mantiene coherencia con el sistema de diseño.
 * Esta vista se muestra públicamente en /recuperar-contrasena.
 */

"use client";

import { useState, FormEvent } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { userService } from "@/lib/api/userService";

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
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-[#F1FFEF] border border-[#C2E7DA] p-8 rounded-xl shadow-md"
        >
            <h2 className="text-2xl font-bold mb-6 text-center text-[#1A1341]">
                Recuperar contraseña
            </h2>

            <p className="text-sm text-gray-700 mb-4 text-center">
                Introduce el correo asociado a tu cuenta. Si existe, te enviaremos un enlace para restablecer tu contraseña.
            </p>

            <Input
                label="Correo electrónico"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <div className="mt-6">
                <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={status === "sending"}
                >
                    {status === "sending" ? "Enviando..." : "Enviar enlace de recuperación"}
                </Button>
            </div>

            {status === "sent" && (
                <p className="text-green-600 text-sm text-center mt-4">
                    Si existe una cuenta con ese correo, recibirás un enlace.
                </p>
            )}

            {status === "error" && (
                <p className="text-red-600 text-sm text-center mt-4">
                    Hubo un error. Inténtalo de nuevo más tarde.
                </p>
            )}
        </form>
    );
};

export default ForgotPasswordForm;
