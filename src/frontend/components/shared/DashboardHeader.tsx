/**
 * DashboardHeader.tsx
 *
 * Cabecera visual reutilizable para áreas privadas (usuario o admin).
 * Muestra un fondo con gradiente, badge identificador, título y subtítulo opcionales.
 * Si se usan props dinámicas, sobrescriben los valores por defecto.
 * Para el título, permite mostrar el nombre del usuario si no se proporciona manualmente.
 *
 * - Migrado a Zustand (`useAuthStore`).
 * - Estilo profesional y escalable.
 * - Compatible con SSR y diseño compartido entre vistas protegidas.
 */

"use client";

import React from "react";
import { useAuthStore } from "@/stores/useAuthStore";

interface DashboardHeaderProps {
    badge?: string;
    title?: string;
    subtitle?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
    badge = "Boost A Project",
    title,
    subtitle = "Resumen de tu actividad como inversor",
}) => {
    const { user } = useAuthStore();

    return (
        <div className="relative overflow-hidden rounded-2xl mb-12">
            {/* Fondo con gradiente horizontal */}
            <div className="bg-gradient-to-r from-[#1A1341] to-[#6290C3] py-16 px-6 md:px-12 relative">
                {/* Elementos decorativos */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C2E7DA] opacity-10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#F1FFEF] opacity-10 rounded-tr-full"></div>

                {/* Contenido principal */}
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    {/* Badge visual */}
                    <span className="inline-block bg-[#C2E7DA] text-[#1A1341] text-sm font-medium px-4 py-1 rounded-full mb-4">
                        {badge}
                    </span>

                    {/* Título dinámico */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        {title || `Área Privada de ${user?.username || "Usuario"}`}
                    </h1>

                    {/* Subtítulo descriptivo */}
                    <p className="text-lg md:text-xl text-[#F1FFEF] opacity-90 max-w-3xl mx-auto">
                        {subtitle}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;
