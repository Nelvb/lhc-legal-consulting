/**
 * Componente Input: preparado para centralizar componentes de entrada de formulario reutilizables
 * Sirve como punto de partida para crear inputs personalizados con estilos consistentes
 * Puede expandirse para soportar:
 * - Diferentes variantes de inputs (texto, email, password)
 * - Manejo de estados (error, disabled)
 * - Integración con sistemas de validación de formularios
 * - Estilos personalizados con Tailwind CSS
 */

"use client";
import React, { InputHTMLAttributes } from "react";

interface PropiedadesInput extends InputHTMLAttributes<HTMLInputElement> {
  etiqueta?: string;
}

export const Input: React.FC<PropiedadesInput> = ({
  id,
  etiqueta,
  className,
  ...props
}) => {
  return (
    <div className="mb-4">
      {etiqueta && (
        <label
          htmlFor={id}
          className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
        >
          {etiqueta}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
          dark:bg-gray-700 dark:text-white rounded-md 
          focus:outline-none focus:ring-2 focus:ring-blue-500 
          ${className || ""}`}
        {...props}
      />
    </div>
  );
};

export default Input;
