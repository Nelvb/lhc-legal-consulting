/**
 * Layout principal del área privada del usuario (no administrador).
 * Proporciona una estructura base con cabecera y menú lateral.
 * Envuelve todas las páginas dentro de /app/(user_private)/dashboard/.
 * 
 * Hereda estructura del layout de administración pero adaptado a usuario:
 * - Incluye UserHeader fijo arriba
 * - Añade paddings para evitar solapamientos
 * - Estilos consistentes y escalables
 */

"use client";

import React from "react";
import UserHeader from "./UserHeader";

interface UserLayoutProps {
    children: React.ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#F7FAFF] text-gray-800">
            <UserHeader />
            <main className="max-w-7xl mx-auto pt-40 px-6 pb-20">
                {children}
            </main>
        </div>
    );
};

export default UserLayout;
