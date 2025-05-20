/**
 * Dashboard del usuario (/dashboard)
 * Visual con fondo dividido como /blog y /perfil.
 * Cabecera integrada con nombre del usuario e información mockeada.
 */

"use client";

import React from "react";
import DashboardHeader from "@/components/shared/DashboardHeader";

const DashboardPage: React.FC = () => {
  const mockCards = [
    {
      title: "Última inversión",
      description: "Has invertido 3.000€ en el proyecto 'Valle Encantado'.",
      date: "10 de mayo de 2025",
    },
    {
      title: "Estado actual",
      description: "Tienes 2 proyectos activos y 3 en favoritos.",
      date: "Actualizado hoy",
    },
    {
      title: "Próximo paso",
      description: "El proyecto 'Terrazas del Sur' abrirá ronda en 3 días.",
      date: "Notificación futura",
    },
  ];

  return (
    <div className="relative min-h-screen pt-52">
      {/* Fondo dividido 30/70 */}
      <div className="absolute inset-0 flex">
        <div className="w-[30%] bg-[#C2E7DA]" />
        <div className="w-[70%] bg-[#1A1341]" />
      </div>

      {/* Contenido principal con cabecera y cards */}
      <div className="relative z-10 container mx-auto px-4">
        <DashboardHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockCards.map((card, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl border border-gray-100 hover:border-[#6290C3]/30 bg-white p-6"
            >
              <h3 className="text-xl font-bold text-[#1A1341] mb-2 group-hover:text-[#6290C3] transition-colors">
                {card.title}
              </h3>
              <p className="text-gray-600 mb-4">{card.description}</p>
              <p className="text-sm text-gray-400 italic">{card.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
