/**
 * DeleteAccountModal.tsx
 *
 * Modal de confirmación para eliminar permanentemente la cuenta del usuario.
 * Usa colores corporativos y diseño coherente con la plataforma.
 * Llama a userService.deleteAccount(), ejecuta logout y redirige tras éxito.
 */

"use client";

import React from "react";
import { userService } from "@/lib/api/userService";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ isOpen, onClose }) => {
    const { logout } = useAuth();
    const router = useRouter();

    if (!isOpen) return null;

    const handleDelete = async () => {
        try {
            await userService.deleteAccount();
            logout();
            alert("Tu cuenta ha sido eliminada. Gracias por formar parte de Boost A Project.");
            router.push("/");
        } catch (error: any) {
            alert(error.message || "Error al eliminar la cuenta.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full overflow-hidden">
                {/* Header */}
                <div className="bg-[#1DA1F2] px-6 py-4">
                    <h2 className="text-white text-xl font-semibold">
                        ¿Estás seguro de que quieres eliminar tu cuenta?
                    </h2>
                </div>

                {/* Contenido */}
                <div className="bg-[#F1FFEF] px-6 py-5 space-y-4 text-[#1A1341]">
                    <p className="text-base">
                        Esta acción es irreversible. Toda tu información será eliminada.
                    </p>

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                        >
                            Eliminar cuenta
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
