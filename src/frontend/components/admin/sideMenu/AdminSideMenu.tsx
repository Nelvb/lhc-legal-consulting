// src/frontend/components/admin/sideMenu/AdminSideMenu.tsx

"use client";

/**
 * Menú lateral del panel de administración.
 * Replica el estilo visual del SideMenu global, adaptado al entorno del admin.
 * Incluye cabecera, navegación interna y botón de cierre de sesión.
 */

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import AdminSideMenuHeader from "@/components/admin/sideMenu/AdminSideMenuHeader";
import AdminSideMenuLinks from "@/components/admin/sideMenu/AdminSideMenuLinks";

interface AdminSideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSideMenu: React.FC<AdminSideMenuProps> = ({ isOpen, onClose }) => {
  const { logout } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose}>
      <aside
        className="fixed top-0 right-0 w-72 h-screen bg-[#F7FAFF] shadow-xl z-50 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <AdminSideMenuHeader onClose={onClose} />
        <AdminSideMenuLinks onClickLink={onClose} />

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="w-full text-center py-2 text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>
    </div>
  );
};

export default AdminSideMenu;
