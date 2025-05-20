/**
 * ProfileForm.tsx
 *
 * Formulario reutilizable para editar el perfil (usuario y admin).
 * El campo email puede mostrarse o no, y puede ser editable o solo de lectura.
 * Siempre requiere contraseña actual para confirmar los cambios.
 * Valida localmente los campos visibles y envía solo los datos permitidos al backend.
 */

"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { userService } from "@/lib/api/userService";
import { Eye, EyeOff } from "lucide-react";

interface ProfileFormProps {
    showEmail?: boolean;
    editableEmail?: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
    showEmail = true,
    editableEmail = true,
}) => {
    const { user, refreshUser } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Sincroniza los datos cuando el usuario se carga (tras login o refresh)
    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage("");
        const newErrors: { [key: string]: string } = {};

        if (!name.trim()) {
            newErrors.name = "El nombre es obligatorio.";
        }

        if (showEmail && editableEmail) {
            if (!email.trim()) {
                newErrors.email = "El email es obligatorio.";
            } else if (!email.includes("@") || !email.includes(".")) {
                newErrors.email = "Introduce un email válido.";
            }
        }

        if (!currentPassword.trim()) {
            newErrors.currentPassword = "La contraseña es obligatoria.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        setErrors({});

        try {
            const payload = {
                name,
                email,
                current_password: currentPassword,
            };

            await userService.updateNameAndEmail(payload);
            await refreshUser();
            setSuccessMessage("Perfil actualizado correctamente.");
            setCurrentPassword("");
        } catch (err: any) {
            setErrors({ global: err.message || "Error al guardar los cambios" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-[#F1FFEF] border border-[#C2E7DA] p-8 rounded-xl shadow-md w-full max-w-md"
        >
            {errors.global && <p className="text-red-600">{errors.global}</p>}
            {successMessage && (
                <p className="text-green-600 font-medium">{successMessage}</p>
            )}

            {/* Nombre */}
            <div>
                <Input
                    label="Nuevo nombre"
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

            {/* Email (siempre visible, editable solo para usuarios) */}
            {showEmail && (
                <div>
                    <Input
                        label="Correo electrónico"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                        required
                        disabled={!editableEmail}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                    )}
                </div>
            )}

            {/* Contraseña actual */}
            <div className="relative">
                <Input
                    label="Contraseña actual"
                    name="current_password"
                    type={showPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Introduce tu contraseña"
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-[2.4rem] right-3 text-gray-600"
                    tabIndex={-1}
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.currentPassword && (
                    <p className="text-sm text-red-600 mt-1">
                        {errors.currentPassword}
                    </p>
                )}
            </div>

            {/* Botón de envío */}
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

export default ProfileForm;
