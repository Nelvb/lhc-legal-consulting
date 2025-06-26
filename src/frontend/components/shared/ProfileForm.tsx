/**
 * ProfileForm.tsx
 *
 * Formulario reutilizable para editar el perfil (usuario y admin) de LHC Legal & Consulting.
 * El campo email puede mostrarse o no, y puede ser editable o solo de lectura.
 * Siempre requiere contraseña actual para confirmar los cambios.
 * Diseño glassmorphism consistente con el resto de formularios LHC.
 *
 * - Migrado a Zustand (`useAuthStore`) para sincronización global de usuario.
 * - Profesional, validado, seguro y con diseño consistente LHC.
 */

"use client";

import React, { useEffect, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/stores/useAuthStore";
import { userService } from "@/lib/api/userService";
import { Eye, EyeOff, CheckCircle } from "lucide-react";

interface ProfileFormProps {
    showEmail?: boolean;
    editableEmail?: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
    showEmail = true,
    editableEmail = true,
}) => {
    const { user, refreshUser } = useAuthStore();

    const [username, setUsername] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            setUsername(user.username || "");
            setLastName(user.last_name || "");
            setEmail(user.email || "");
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage("");
        const newErrors: { [key: string]: string } = {};

        if (!username.trim()) {
            newErrors.username = "El nombre de usuario es obligatorio.";
        }

        if (!lastName.trim()) {
            newErrors.lastName = "Los apellidos son obligatorios.";
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
                username,
                last_name: lastName,
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
        <div 
            className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 lg:p-10 rounded-2xl w-full max-w-md"
            style={{
                background: `
                    linear-gradient(135deg, 
                        #1b2f4b 0%, 
                        #1DA1F2 35%, 
                        #1b2f4b 70%, 
                        #0f172a 100%
                    )
                `
            }}
        >
            <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                    Editar Información
                </h2>
                <p className="text-white/80">
                    {user?.is_admin ? 'Actualiza tu nombre y apellidos' : 'Actualiza tu información personal'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Mensajes de estado */}
                {errors.global && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-start space-x-2">
                        <div className="bg-red-200 rounded-full p-1 mt-0.5">
                            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <span>{errors.global}</span>
                    </div>
                )}

                {successMessage && (
                    <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-medium">{successMessage}</p>
                        </div>
                    </div>
                )}

                {/* Nombre de usuario */}
                <div>
                    <label className="block text-sm font-medium text-white mb-2">
                        Nombre de usuario
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Tu nombre de usuario"
                        required
                        className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:bg-white/30 focus:border-white/50 focus:outline-none transition-all duration-200"
                    />
                    {errors.username && (
                        <p className="text-sm text-red-300 mt-1">{errors.username}</p>
                    )}
                </div>

                {/* Apellidos */}
                <div>
                    <label className="block text-sm font-medium text-white mb-2">
                        Apellidos
                    </label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Tus apellidos"
                        required
                        className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:bg-white/30 focus:border-white/50 focus:outline-none transition-all duration-200"
                    />
                    {errors.lastName && (
                        <p className="text-sm text-red-300 mt-1">{errors.lastName}</p>
                    )}
                </div>

                {/* Email (si aplica) */}
                {showEmail && (
                    <div>
                        <label className="block text-sm font-medium text-white mb-2">
                            Correo electrónico {!editableEmail && '(solo lectura)'}
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            required
                            disabled={!editableEmail}
                            className={`w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:bg-white/30 focus:border-white/50 focus:outline-none transition-all duration-200 ${
                                !editableEmail ? 'opacity-60 cursor-not-allowed' : ''
                            }`}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-300 mt-1">{errors.email}</p>
                        )}
                    </div>
                )}

                {/* Contraseña actual */}
                <div className="relative">
                    <label className="block text-sm font-medium text-white mb-2">
                        Contraseña actual
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Introduce tu contraseña"
                        required
                        className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:bg-white/30 focus:border-white/50 focus:outline-none transition-all duration-200 pr-12"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-[2.4rem] right-3 text-white/70 hover:text-white"
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    {errors.currentPassword && (
                        <p className="text-sm text-red-300 mt-1">{errors.currentPassword}</p>
                    )}
                </div>

                {/* Botón de envío */}
                <Button
                    type="submit"
                    variant="outline"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    fullWidth
                    className="mt-6 bg-white/10 text-white border-white/30 hover:bg-white hover:text-[#1b2f4b] hover:border-white"
                >
                    {isSubmitting ? "Guardando..." : "Guardar cambios"}
                </Button>
            </form>

            {/* Nota de seguridad */}
            <p className="text-xs text-white/60 text-center mt-6 leading-relaxed">
                Por seguridad, necesitas tu contraseña actual para confirmar los cambios.
            </p>
        </div>
    );
};

export default ProfileForm;