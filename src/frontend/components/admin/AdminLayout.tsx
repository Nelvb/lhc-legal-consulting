/**
 * Componente de layout general para las vistas del panel de administración.
 * Proporciona un encabezado superior y una estructura base con padding,
 * diseño responsivo y estilos coherentes con el resto del sistema.
 *
 * Uso:
 * Este layout debe envolver todas las páginas dentro de /app/admin/,
 * permitiendo mantener una apariencia consistente en el área privada del administrador.
 */

"use client";

import React from "react";
import AdminHeader from "@/components/admin/AdminHeader";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F7FAFF] text-gray-800">
      {/* Encabezado personalizado del admin */}
      <AdminHeader />

      {/* Contenido principal con padding superior para evitar solapamiento */}
      <main className="max-w-7xl mx-auto pt-40 px-6 pb-20">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
