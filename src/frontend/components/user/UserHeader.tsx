/**
 * Cabecera del área privada del usuario.
 * Replica la estructura visual del admin adaptada al usuario.
 * Contiene logo, saludo, acceso directo a perfil, logout y botón hamburguesa que activa el UserSideMenu.
 */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";
import UserSideMenu from "./UserSideMenu";

const UserHeader: React.FC = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <header className="fixed w-full top-0 left-0 z-20 h-28 md:h-36 flex items-center bg-[#1DA1F2] shadow-md transition-colors duration-300">
                <div className="w-full px-4 flex justify-between items-center h-full">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="https://res.cloudinary.com/dy1pkrd52/image/upload/v1742894677/Logo-sin-fondo-3_d4ch0a.webp"
                            alt="Boost A Project Logo"
                            width={50}
                            height={50}
                            priority
                            className="w-32 h-32 object-contain hidden md:block"
                        />
                        <span className="sr-only">Boost A Project</span>
                    </Link>

                    {/* Título opcional */}
                    <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center flex-1">
                        Área Privada
                    </h1>

                    {/* Saludo, perfil y logout */}
                    <div className="flex items-center space-x-4">
                        {user?.username && (
                            <span className="text-white font-medium hidden md:inline">
                                Hola {user.username}
                            </span>
                        )}

                        {/* Acceso directo a perfil */}
                        <button
                            type="button"
                            onClick={() => setIsOpen(true)}
                            className="hidden md:inline text-white font-medium hover:underline transition-colors"
                        >
                            Mi Perfil
                        </button>


                        <div className="hidden md:block">
                            <Button variant="outline" size="sm" onClick={logout}>
                                Cerrar Sesión
                            </Button>
                        </div>

                        {/* Hamburguesa móvil */}
                        <button
                            type="button"
                            onClick={() => setIsOpen(true)}
                            className="p-2 text-white text-lg font-medium transition-all duration-300 hover:scale-110 transform-gpu md:hidden"
                            aria-label="Abrir menú usuario"
                        >
                            <svg
                                className="h-8 w-8"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* SideMenu móvil */}
            <UserSideMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
};

export default UserHeader;
