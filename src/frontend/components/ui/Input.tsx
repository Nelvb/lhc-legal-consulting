'use client';

/**
 * Input.tsx
 *
 * Componente reutilizable para inputs con validación y estilo visual idéntico
 * al formulario de contacto de la home (fondo translúcido, texto blanco).
 * Conserva validaciones, accesibilidad y feedback visual profesional.
 * Añadida prop 'compact' para formularios de autenticación.
 */

import React, { InputHTMLAttributes, useState, useEffect } from 'react';

interface ValidationRules {
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  pattern?: RegExp;
  customValidator?: (value: string) => string | null;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  validationRules?: ValidationRules;
  validateOnChange?: boolean;
  onErrorChange?: (hasError: boolean) => void;
  compact?: boolean; // Nueva prop para versión compacta
}

const normalizeLabel = (label: string) =>
  label.toLowerCase().replace(/[^a-z0-9]/gi, '-');

const Input: React.FC<InputProps> = ({
  id,
  label,
  className,
  error,
  validationRules,
  validateOnChange = false,
  onErrorChange,
  value,
  onChange,
  compact = false, // Por defecto false para no afectar componentes existentes
  ...props
}) => {
  const [internalError, setInternalError] = useState<string | null>(null);
  const generatedId = label ? `input-${normalizeLabel(label)}` : undefined;
  const inputId = id || generatedId || props.name;

  const validateValue = (inputValue: string) => {
    if (!validationRules || !validateOnChange) return null;

    const { minLength, maxLength, required, pattern, customValidator } = validationRules;

    if (required && !inputValue.trim()) return 'Este campo es obligatorio';
    if (minLength && inputValue.length < minLength) return `Debe tener al menos ${minLength} caracteres`;
    if (maxLength && inputValue.length > maxLength) return `No puede tener más de ${maxLength} caracteres`;
    if (pattern && !pattern.test(inputValue)) return 'El formato no es válido';
    if (customValidator) return customValidator(inputValue);
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (validateOnChange && validationRules) {
      const validationError = validateValue(newValue);
      setInternalError(validationError);
      onErrorChange?.(!!validationError);
    }

    onChange?.(e);
  };

  useEffect(() => {
    if (validateOnChange && validationRules && value !== undefined) {
      const validationError = validateValue(String(value));
      setInternalError(validationError);
      onErrorChange?.(!!validationError);
    }
  }, [value, validationRules, validateOnChange]);

  const hasError = error || internalError;
  const displayError = error || internalError;

  // Estilos condicionales basados en la prop compact
  const containerClasses = compact ? "mb-2" : "mb-4";
  const labelClasses = compact 
    ? "block text-white text-sm font-medium mb-1"
    : "block text-white text-sm font-semibold mb-2";
  const inputClasses = compact
    ? "w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/60 focus:bg-white/30 focus:border-white/50 focus:outline-none transition-all duration-200 text-sm"
    : "w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:bg-white/30 focus:border-white/50 focus:outline-none transition-all duration-200";
  const errorClasses = compact ? "text-xs text-red-200 mt-1" : "text-sm text-red-200 mt-1";

  return (
    <div className={containerClasses}>
      {label && (
        <label
          htmlFor={inputId}
          className={labelClasses}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`${inputClasses} ${className || ''}
          ${hasError ? 'border-red-400 bg-red-50 text-red-800 placeholder-red-400' : ''}
        `}
        value={value}
        onChange={handleChange}
        {...props}
      />
      {displayError && (
        <p className={errorClasses}>
          {displayError}
        </p>
      )}
    </div>
  );
};

export default Input;