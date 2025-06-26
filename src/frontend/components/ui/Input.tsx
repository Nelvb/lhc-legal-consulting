'use client'

/**
 * Input.tsx
 *
 * Componente reutilizable para inputs con validación y diseño adaptable.
 * Usa estilo blanco limpio cuando 'compact' está activo (modo formularios internos),
 * y estilo translúcido con texto blanco cuando no (contacto, login).
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
  compact?: boolean;
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
  compact = false,
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

  const baseClasses = compact
    ? "w-full bg-white border border-gray-300 text-gray-900 placeholder-gray-400"
    : "w-full bg-white/20 border border-white/30 text-white placeholder-white/60";

  const inputClasses = `
    ${baseClasses}
    ${compact ? "rounded-lg px-3 py-2 text-sm" : "rounded-xl px-4 py-3"}
    ${hasError ? "border-red-500 bg-red-50 text-red-800 placeholder-red-400" : ""}
    focus:outline-none focus:ring-1 focus:ring-blue-500
    transition-all duration-200
    ${className || ""}
  `;

  const labelClasses = compact
    ? "block text-gray-700 text-sm font-medium mb-1"
    : "block text-white text-sm font-medium mb-2";

  const errorClasses = compact ? "text-xs text-red-500 mt-1" : "text-sm text-red-200 mt-1";

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={inputId} className={labelClasses}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={inputClasses}
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
