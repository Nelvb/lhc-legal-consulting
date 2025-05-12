/**
 * Componente Input.tsx
 *
 * Este input reutilizable admite etiqueta (`label`), estilos con Tailwind
 * y mensajes de error visibles. Está diseñado para formularios accesibles
 * y profesionales en toda la aplicación. Compatible con validaciones, test
 * automatizados y escalado futuro. Tipado con TypeScript y preparado para SSR.
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
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block text-[#1A1341] text-sm font-semibold mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={id}
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
