/**
 * UserSideMenu.tsx
 *
 * Menú lateral del usuario autenticado.
 * Incluye navegación pública general, rutas privadas relevantes (perfil, dashboard),
 * y acciones de cuenta como eliminación y logout.
 * Usa diseño coherente con el SideMenu público para mantener consistencia visual.
 *
 * - Migrado a Zustand (`useAuthStore`).
 * - Reutiliza SideMenuHeader, MainMenuLinks y DeleteAccountModal.
 * - Componente accesible y visualmente consistente.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import Button from "@/components/ui/Button";
import DeleteAccountModal from "../user/DeleteAccountModal";
import SideMenuHeader from "@/components/common/SideMenuHeader";
import MainMenuLinks from "@/components/common/MainMenuLinks";

interface UserSideMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const UserSideMenu: React.FC<UserSideMenuProps> = ({ isOpen, onClose }) => {
    const { logout } = useAuthStore();
    const pathname = usePathname();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose}>
                <aside
                    className="fixed top-0 right-0 w-72 h-screen bg-[#F7FAFF] shadow-xl z-50 overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Cabecera común con logo y saludo */}
                    <SideMenuHeader onClose={onClose} />

                    {/* Enlaces públicos (Inicio, Proyectos, etc.) */}
                    <nav className="py-4 px-2">
                        <MainMenuLinks onClickLink={onClose} />

                        {/* Enlaces privados del usuario */}
                        <ul className="flex flex-col space-y-1 mt-6 border-t border-gray-200 pt-4">
                            <li>
                                <Link
                                    href="/perfil"
                                    onClick={onClose}
                                    className={`block px-4 py-2 rounded transition-colors text-[#1A1341] hover:bg-[#1A1341] hover:text-white ${pathname === "/perfil" ? "font-semibold underline" : ""
                                        }`}
                                >
                                    Editar perfil
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard"
                                    onClick={onClose}
                                    className={`block px-4 py-2 rounded transition-colors text-[#1A1341] hover:bg-[#1A1341] hover:text-white ${pathname === "/dashboard" ? "font-semibold underline" : ""
                                        }`}
                                >
                                    Área privada
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Acciones de cuenta */}
                    <div className="p-4 border-t border-gray-200 space-y-2">
                        <Button
                            variant="danger"
                            size="md"
                            className="w-full"
                            onClick={() => {
                                setShowDeleteModal(true);
                                onClose();
                            }}
                        >
                            Eliminar cuenta
                        </Button>

                        <Button
                            variant="outline"
                            size="md"
                            className="w-full"
                            onClick={() => {
                                logout();
                                onClose();
                            }}
                        >
                            Cerrar sesión
                        </Button>
                    </div>
                </aside>
            </div>

            {/* Modal de confirmación de eliminación */}
            <DeleteAccountModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
            />
        </>
    );
};

export default UserSideMenu;
