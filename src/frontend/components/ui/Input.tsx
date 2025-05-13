/**
 * Componente Input.tsx
 *
 * Campo de formulario reutilizable.
 * Acepta props estándar de input (name, type, value, onChange, etc.), además de `label` y `error`.
 * Incluye etiqueta accesible con `htmlFor`, mensaje de error visible y estilos personalizados con Tailwind.
 * Se recomienda su uso en formularios de toda la aplicación para mantener coherencia y accesibilidad.
 */

'use client';
import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  className,
  error,
  ...props
}) => {
  const inputId = id || props.name;

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-[#1A1341] text-sm font-semibold mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full px-3 py-2 border border-[#C2E7DA] bg-white text-[#1A1341] rounded-md 
          focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] 
          ${className || ''}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
