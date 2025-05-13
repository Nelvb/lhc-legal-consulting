/**
 * Vista inicial del área privada del usuario (dashboard).
 * Muestra un resumen visual de la actividad del usuario: inversiones, favoritos, etc.
 * Esta vista puede escalar con integración a API para mostrar datos reales.
 * Estilo profesional, responsive, coherente con la línea de diseño de la plataforma.
 */

"use client";

import React from "react";
import Card from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const resumenData = [
    {
      title: "Inversiones activas",
      count: 2, // futuro: conexión con API
      description: "Proyectos en los que estás participando actualmente.",
    },
    {
      title: "Finalizadas",
      count: 0,
      description: "Inversiones completadas o cerradas.",
    },
    {
      title: "Favoritos",
      count: 3,
      description: "Proyectos que guardaste para seguir más tarde.",
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resumenData.map(({ title, count, description }) => (
        <Card key={title} className="p-6">
          <h3 className="text-2xl font-bold text-[#1A1341] mb-2">{title}</h3>
          <p className="text-4xl font-extrabold text-[#6290C3] mb-4">{count}</p>
          <p className="text-gray-600">{description}</p>
        </Card>
      ))}
    </section>
  );
};

export default DashboardPage;
