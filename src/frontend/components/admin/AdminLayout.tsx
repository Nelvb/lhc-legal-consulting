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

interface AdminLayoutProps {
  title?: string;
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  title = "Panel de Administración",
  children,
}) => {
  return (
    <div className="min-h-screen bg-[#F7FAFF] text-gray-800">
      {/* Encabezado */}
      <header className="bg-[#1A1341] text-white py-6 px-8 shadow-md">
        <h1 className="text-2xl font-bold">{title}</h1>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto py-10 px-6">{children}</main>
    </div>
  );
};

export default AdminLayout;
