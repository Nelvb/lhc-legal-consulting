/**
 * Componente de cabecera del área de administración
 * Replica el estilo visual exacto de la Navbar principal,
 * adaptado a los elementos propios del admin: logo, título, saludo y logout.
 */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";
import AdminSideMenu from "@/components/admin/sideMenu/AdminSideMenu";

const AdminHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header
        className={`fixed w-full top-0 left-0 z-20 h-28 md:h-36 flex items-center
        transition-colors duration-300
        bg-[#1DA1F2] shadow-md`}
      >
        <div className="w-full px-4 flex justify-between items-center h-full">
          {/* Logo izquierda */}
          <div className="flex items-center space-x-2">
            <Image
              src="https://res.cloudinary.com/dy1pkrd52/image/upload/v1742894677/Logo-sin-fondo-3_d4ch0a.webp"
              alt="Boost A Project Logo"
              width={50}
              height={50}
              className="w-32 h-32 object-contain hidden md:block" // El logo solo se muestra en pantallas grandes
            />
            <span className="sr-only">Boost A Project</span>
          </div>

          {/* Centro: Título */}
          <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center flex-1">
            Panel de Administración
          </h1>

          {/* Derecha: saludo y botones */}
          <div className="flex items-center space-x-4">
            {user?.username && (
              <span className="text-white font-medium hidden md:inline">
                Hola {user.username}
              </span>
            )}

            {/* Botón cerrar sesión solo visible en md+ */}
            <div className="hidden md:block">
              <Button variant="outline" size="sm" onClick={logout}>
                Cerrar Sesión
              </Button>
            </div>

            {/* Hamburguesa visible solo en pantallas pequeñas */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="p-2 text-white text-lg font-medium transition-all duration-300 hover:scale-110 transform-gpu md:hidden"
              aria-label="Abrir menú admin"
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

      {/* Menú lateral para móviles */}
      <AdminSideMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default AdminHeader;

