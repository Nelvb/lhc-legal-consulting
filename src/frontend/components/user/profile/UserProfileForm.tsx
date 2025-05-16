/**
 * UserProfileForm.tsx
 *
 * Formulario de perfil del usuario.
 * Permite editar nombre y email con validaciones.
 * Conecta directamente al backend usando userService.ts.
 * Estilo coherente con el resto de la app. Preparado para producción.
 */

"use client";

import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { userService } from "@/lib/api/userService";

const UserProfileForm: React.FC = () => {
    const { user } = useAuth();
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [successMessage, setSuccessMessage] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage("");
        const newErrors: { [key: string]: string } = {};

        if (!name.trim()) {
            newErrors.name = "El nombre no puede estar vacío.";
        }

        if (!email.includes("@") || !email.includes(".")) {
            newErrors.email = "Introduce un email válido.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        try {
            await userService.updateNameAndEmail({ name, email });
            setSuccessMessage("Perfil actualizado correctamente.");
        } catch (err: any) {
            console.error("Error al guardar perfil:", err);
            setErrors({ global: err.message || "Error inesperado" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-[#F1FFEF] border border-[#C2E7DA] p-8 rounded-xl shadow-md w-full max-w-md"
        >
            {errors.global && (
                <p className="text-red-600">{errors.global}</p>
            )}
            {successMessage && (
                <p className="text-green-600 font-medium">{successMessage}</p>
            )}

            {/* Nombre */}
            <div>
                <Input
                    label="Nombre"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    required
                />
                {errors.name && (
                    <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                )}
            </div>

            {/* Email */}
            <div>
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    required
                />
                {errors.email && (
                    <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                )}
            </div>

            {/* Botón guardar */}
            <div className="pt-4">
                <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="w-full"
                >
                    {isSubmitting ? "Guardando..." : "Guardar cambios"}
                </Button>
            </div>
        </form>
    );
};

export default UserProfileForm;
