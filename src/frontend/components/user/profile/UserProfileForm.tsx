/**
 * UserProfileForm.tsx
 *
 * Formulario de perfil del usuario dentro del área privada.
 * Permite editar nombre, email y contraseña con validaciones.
 * Conecta directamente al backend usando userService.ts.
 * Utiliza los componentes UI reutilizables (Input y Button) y el hook de autenticación.
 * Estructura profesional, preparada para escalar o adaptarse a otros proyectos (como la asesoría legal).
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
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

        if (newPassword && newPassword.length < 6) {
            newErrors.newPassword = "La nueva contraseña debe tener al menos 6 caracteres.";
        }

        if (newPassword && newPassword !== confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden.";
        }

        if (newPassword && !currentPassword) {
            newErrors.currentPassword = "Debes introducir tu contraseña actual para cambiarla.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        try {
            await userService.updateNameAndEmail({ name, email });

            if (newPassword) {
                await userService.changePassword({
                    current_password: currentPassword,
                    new_password: newPassword,
                });
            }

            setSuccessMessage("Perfil actualizado correctamente.");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err: any) {
            console.error("Error al guardar perfil:", err);
            setErrors({ global: err.message || "Error inesperado" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
            {errors.global && <p className="text-red-600">{errors.global}</p>}
            {successMessage && <p className="text-green-600 font-medium">{successMessage}</p>}

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
                {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
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
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
            </div>

            {/* Contraseña actual */}
            <div>
                <Input
                    label="Contraseña actual"
                    name="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Solo si vas a cambiarla"
                />
                {errors.currentPassword && (
                    <p className="text-sm text-red-600 mt-1">{errors.currentPassword}</p>
                )}
            </div>

            {/* Nueva contraseña */}
            <div>
                <Input
                    label="Nueva contraseña"
                    name="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Dejar en blanco para no cambiarla"
                />
                {errors.newPassword && (
                    <p className="text-sm text-red-600 mt-1">{errors.newPassword}</p>
                )}
            </div>

            {/* Confirmar nueva contraseña */}
            <div>
                <Input
                    label="Repetir nueva contraseña"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Debe coincidir"
                />
                {errors.confirmPassword && (
                    <p className="text-sm text-red-600 mt-1">{errors.confirmPassword}</p>
                )}
            </div>

            {/* Botón guardar */}
            <div className="pt-4">
                <Button type="submit" variant="primary" disabled={isSubmitting}>
                    Guardar cambios
                </Button>
            </div>
        </form>
    );
};

export default UserProfileForm;
