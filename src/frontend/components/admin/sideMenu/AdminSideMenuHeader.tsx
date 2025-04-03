// src/frontend/components/admin/sideMenu/AdminSideMenuHeader.tsx

"use client";

/**
 * Cabecera del menú lateral del panel admin.
 * Muestra logo, saludo al usuario y botón para cerrar el menú.
 * Estética consistente con el menú global.
 */

import React from "react";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

interface AdminSideMenuHeaderProps {
  onClose: () => void;
}

const AdminSideMenuHeader: React.FC<AdminSideMenuHeaderProps> = ({ onClose }) => {
  const { user } = useAuth();

  return (
    <div className="flex justify-between items-center p-4 bg-[#1A1341]">
      <div className="flex items-center space-x-3">
        <Image
          src="https://res.cloudinary.com/dy1pkrd52/image/upload/v1742894677/Logo-sin-fondo-3_d4ch0a.webp"
          alt="Boost A Project Logo"
          width={64}
          height={64}
          className="w-16 h-16 object-contain"
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
  );
};

export default AdminSideMenuHeader;
