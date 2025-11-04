/**
 * DeleteAccountModal.tsx
 *
 * Modal de confirmación para eliminar permanentemente la cuenta del usuario.
 * Usa colores corporativos y diseño coherente con la plataforma.
 * 
 * - Migrado a Zustand (`useAuthStore` y `useUiStore`) para control global.
 * - Mantiene diseño accesible, modular y desacoplado del SideMenu.
 * - Usa componentes Button reutilizables para consistencia visual.
 */

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUiStore } from "@/stores/useUiStore";
import { userService } from "@/lib/api/userService";
import { getUserFriendlyError } from "@/lib/utils/errorMessages";
import Button from "@/components/ui/Button";

const DeleteAccountModal: React.FC = () => {
    const { logout } = useAuthStore();
    const { showDeleteModal, closeDeleteModal } = useUiStore();
    const router = useRouter();

    if (!showDeleteModal) return null;

    const handleDelete = async () => {
        try {
            await userService.deleteAccount();
            logout();
            alert("Tu cuenta ha sido eliminada. Gracias por formar parte de Boost A Project.");
            closeDeleteModal();
            router.push("/");
        } catch (error: any) {
            alert(getUserFriendlyError(error));
        }
    };

    return (
        <div 
            className="fixed inset-0 z-50 bg-black/40"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflowY: 'auto'
            }}
        >
            <div 
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    maxWidth: '28rem',
                    padding: '1rem',
                    boxSizing: 'border-box'
                }}
            >
                <div 
                    className="bg-white rounded-xl shadow-lg w-full overflow-hidden"
                    style={{
                        maxHeight: 'calc(100vh - 2rem)',
                        overflowY: 'auto'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
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
                        <Button
                            variant="secondary"
                            onClick={closeDeleteModal}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="danger"
                            onClick={handleDelete}
                        >
                            Eliminar cuenta
                        </Button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;