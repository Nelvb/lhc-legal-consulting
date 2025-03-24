"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import Link from "next/link";

import SideMenuHeader from "@/components/layout/SideMenuHeader";
import SideMenuAuthSection from "@/components/layout/SideMenuAuthSection";
import MainMenuLinks from "@/components/common/MainMenuLinks";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  const isHomePage = pathname === "/" || pathname === "";
  const isDashboardPage = pathname === "/dashboard";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose}>
      <aside
        className="fixed top-0 right-0 w-72 h-screen bg-white dark:bg-gray-800 shadow-xl z-50 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Logo + saludo + botón cerrar */}
        <SideMenuHeader onClose={onClose} />

        {/* Enlaces de navegación pública */}
        <nav className="py-4 px-2">
          <MainMenuLinks onClickLink={onClose} />

          {/* Link a Dashboard para usuarios autenticados (excepto si ya están ahí) */}
          {isAuthenticated && !isDashboardPage && (
            <Link
              href="/dashboard"
              onClick={onClose}
              className="block px-4 py-2 mt-4 rounded text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Área Privada
            </Link>
          )}

          {/* Link a Inicio si NO estamos en la home */}
          {!isHomePage && (
            <Link
              href="/"
              onClick={onClose}
              className="block px-4 py-2 mt-1 rounded text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Inicio
            </Link>
          )}
        </nav>

        {/* Botones de autenticación */}
        <SideMenuAuthSection onClose={onClose} />
      </aside>
    </div>
  );
};

export default SideMenu;
