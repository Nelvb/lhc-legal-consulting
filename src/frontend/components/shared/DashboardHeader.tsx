/**
 * DashboardHeader.tsx
 *
 * Cabecera visual reutilizable para áreas privadas (usuario o admin) de LHC Legal & Consulting.
 * Diseño con gradiente azul corporativo, elementos decorativos y tipografía profesional.
 * Compatible con SSR y optimizado para la identidad visual del proyecto.
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
    badge = "LHC Legal & Consulting",
    title,
    subtitle = "Tu área privada para gestión legal profesional",
}) => {
    const { user } = useAuthStore();

    return (
        <div className="relative overflow-hidden rounded-2xl mb-12">
            {/* Fondo con gradiente LHC */}
            <div
                className="py-16 px-6 md:px-12 relative"
                style={{
                    background: `
            linear-gradient(135deg, 
              #1b2f4b 0%, 
              #1DA1F2 35%, 
              #1b2f4b 70%, 
              #0f172a 100%
            )
          `
                }}
            >
                {/* Elementos decorativos */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#60A5FA] opacity-15 rounded-full blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full blur-lg"></div>
                <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-[#1DA1F2] opacity-5 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>

                {/* Contenido principal */}
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    {/* Badge visual */}
                    <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-6">
                        {badge}
                    </div>

                    {/* Título dinámico */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                        {title || `Área Privada de ${user?.username || "Usuario"}`}
                    </h1>

                    {/* Subtítulo descriptivo */}
                    <p className="text-lg md:text-xl text-white/90 opacity-90 max-w-3xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;