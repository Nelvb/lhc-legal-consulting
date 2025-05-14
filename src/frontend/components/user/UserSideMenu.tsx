/**
 * Menú lateral del usuario (UserSideMenu).
 * Visible en móvil y también accesible desde escritorio.
 * Muestra saludo, información del usuario, acciones de cuenta.
 * Incluye integración con el modal de eliminación de cuenta.
 */

"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import DeleteAccountModal from "./DeleteAccountModal";

interface UserSideMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const UserSideMenu: React.FC<UserSideMenuProps> = ({ isOpen, onClose }) => {
    const { user, logout } = useAuth();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose}>
                <aside
                    className="fixed top-0 right-0 w-72 h-screen bg-[#F7FAFF] shadow-xl z-50 overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Cabecera */}
                    <div className="flex justify-between items-center p-4 bg-[#1A1341]">
                        <div className="flex items-center space-x-3">
                            <img
                                src="https://res.cloudinary.com/dy1pkrd52/image/upload/v1742894677/Logo-sin-fondo-3_d4ch0a.webp"
                                alt="Logo"
                                className="w-12 h-12 object-contain"
                            />
                            {user?.username && (
                                <span className="text-lg font-semibold text-white">
                                    Hola {user.username}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            aria-label="Cerrar menú"
                            className="text-white hover:text-[#C2E7DA]"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Información del usuario */}
                    <div className="px-4 py-3 text-[#1A1341] space-y-1">
                        {user?.name && (
                            <p className="text-sm font-medium">
                                Usuario: {user.name}
                            </p>
                        )}
                        {user?.email && (
                            <p className="text-sm text-gray-600">
                                Email: {user.email}
                            </p>
                        )}
                    </div>

                    {/* Acciones de navegación */}
                    <nav className="py-4 px-2">
                        <ul className="flex flex-col space-y-1">
                            <li>
                                <Link
                                    href="/dashboard/perfil"
                                    onClick={onClose}
                                    className="block px-4 py-2 rounded text-[#1A1341] hover:bg-[#F1FFEF] transition-colors"
                                >
                                    Editar perfil
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard"
                                    onClick={onClose}
                                    className="block px-4 py-2 rounded text-[#1A1341] hover:bg-[#F1FFEF] transition-colors"
                                >
                                    Área privada
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Acciones de cuenta */}
                    <div className="px-4 space-y-2 border-t border-gray-200 pt-4">
                        <button
                            onClick={() => {
                                setShowDeleteModal(true);
                                onClose();
                            }}
                            className="w-full text-left py-2 px-4 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                            Eliminar cuenta
                        </button>
                        <button
                            onClick={() => {
                                logout();
                                onClose();
                            }}
                            className="w-full text-left py-2 px-4 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </aside>
            </div>

            {/* Modal de eliminación */}
            <DeleteAccountModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
            />
        </>
    );
};

export default UserSideMenu;
