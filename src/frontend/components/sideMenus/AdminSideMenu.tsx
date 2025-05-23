/**
 * AdminSideMenu.tsx
 *
 * Menú lateral para el entorno del administrador.
 * Incluye navegación pública general, rutas internas de gestión y botón de cierre de sesión.
 * Sigue la misma estructura visual que el SideMenu del usuario para coherencia global.
 *
 * - Migrado a Zustand (`useAuthStore`) para logout global.
 * - Mantiene diseño responsivo y experiencia accesible.
 */

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import Button from "@/components/ui/Button";
import SideMenuHeader from "@/components/common/SideMenuHeader";
import MainMenuLinks from "@/components/common/MainMenuLinks";

interface AdminSideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSideMenu: React.FC<AdminSideMenuProps> = ({ isOpen, onClose }) => {
  const { logout } = useAuthStore();
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose}>
      <aside
        className="fixed top-0 right-0 w-72 h-screen bg-[#F7FAFF] shadow-xl z-50 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera con logo y saludo */}
        <SideMenuHeader onClose={onClose} />

        {/* Enlaces públicos */}
        <nav className="py-4 px-2">
          <MainMenuLinks onClickLink={onClose} />

          {/* Separador: sección administrador */}
          <div className="bg-[#C2E7DA] text-[#1A1341] text-base font-semibold text-center py-2 mt-6 border-t border-gray-200">
            Administrador
          </div>

          {/* Enlaces de gestión del panel admin */}
          <ul className="flex flex-col space-y-1 pt-2">
            <li>
              <Link
                href="/admin"
                onClick={onClose}
                className={`block px-4 py-2 rounded transition-colors text-[#1A1341] hover:bg-[#1A1341] hover:text-white ${pathname === "/admin" ? "font-semibold underline" : ""}`}
              >
                Área Privada
              </Link>
            </li>
            <li>
              <Link
                href="/admin/projects"
                onClick={onClose}
                className={`block px-4 py-2 rounded transition-colors text-[#1A1341] hover:bg-[#1A1341] hover:text-white ${pathname === "/admin/projects" ? "font-semibold underline" : ""}`}
              >
                Editar Proyectos
              </Link>
            </li>
            <li>
              <Link
                href="/admin/blog"
                onClick={onClose}
                className={`block px-4 py-2 rounded transition-colors text-[#1A1341] hover:bg-[#1A1341] hover:text-white ${pathname === "/admin/blog" ? "font-semibold underline" : ""}`}
              >
                Editar Blog
              </Link>
            </li>
            <li>
              <Link
                href="/admin/perfil"
                onClick={onClose}
                className={`block px-4 py-2 rounded transition-colors text-[#1A1341] hover:bg-[#1A1341] hover:text-white ${pathname === "/admin/perfil" ? "font-semibold underline" : ""}`}
              >
                Mi Cuenta
              </Link>
            </li>
          </ul>
        </nav>

        {/* Acción final: logout */}
        <div className="p-4 border-t border-gray-200">
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
  );
};

export default AdminSideMenu;
