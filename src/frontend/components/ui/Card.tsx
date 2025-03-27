/**
* Componente Card: contenedor con estilo para mostrar contenido agrupado
* Proporciona un diseño consistente para tarjetas en toda la aplicación
* Incluye variantes para diferentes contextos de UI (elevación, bordes, etc.)
*/

// src/frontend/components/ui/Card.tsx
"use client";

import React from "react";
import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={clsx(
        "bg-white rounded-xl shadow-md border border-gray-100",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
