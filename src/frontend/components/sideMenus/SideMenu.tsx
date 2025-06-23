/**
 * SideMenu.tsx
 *
 * Menú lateral público para navegación general (usuarios no autenticados o navegación fuera del área privada).
 * Muestra los enlaces públicos definidos en MainMenuLinks y los botones de autenticación.
 * Utiliza el mismo header visual que el resto de SideMenus para coherencia visual.
 */

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SideMenuHeader from "@/components/common/SideMenuHeader";
import SideMenuAuthSection from "@/components/sideMenus/SideMenuAuthSection";
import MainMenuLinks from "@/components/common/MainMenuLinks";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose}>
      <aside
        className="fixed top-0 right-0 w-72 h-screen bg-[#F4F2ED] shadow-xl z-50 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera con logo y saludo (si aplica) */}
        <SideMenuHeader onClose={onClose} />

        {/* Enlaces principales del sitio */}
        <nav className="py-4 px-2">
          <MainMenuLinks onClickLink={onClose} />
        </nav>

        {/* Botones de login / registro o logout */}
        <SideMenuAuthSection onClose={onClose} />
      </aside>
    </div>
  );
};

export default SideMenu;
