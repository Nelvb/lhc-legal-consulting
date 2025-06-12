/**
 * Textarea.tsx
 *
 * Componente reutilizable para campos de texto largo con validación profesional.
 * Estilo unificado con Input.tsx: fondo translúcido, bordes suaves y feedback claro.
 * Adaptado para formularios con diseño blur, accesible y coherente con el sistema.
 */

'use client';

import React, { TextareaHTMLAttributes, useState, useEffect } from 'react';

interface ValidationRules {
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  pattern?: RegExp;
  customValidator?: (value: string) => string | null;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  validationRules?: ValidationRules;
  validateOnChange?: boolean;
  onErrorChange?: (hasError: boolean) => void;
}

const normalizeLabel = (label: string) =>
  label.toLowerCase().replace(/[^a-z0-9]/gi, '-');

const Textarea: React.FC<TextareaProps> = ({
  id,
  label,
  className,
  error,
  validationRules,
  validateOnChange = false,
  onErrorChange,
  value,
  onChange,
  ...props
}) => {
  const [internalError, setInternalError] = useState<string | null>(null);
  const generatedId = label ? `textarea-${normalizeLabel(label)}` : undefined;
  const textareaId = id || generatedId || props.name;

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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-white text-sm font-semibold mb-2"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 
          text-white placeholder-white/60 focus:bg-white/30 focus:border-white/50 
          focus:outline-none transition-all duration-200 resize-none ${className || ''} 
          ${hasError ? 'border-red-400 bg-red-50 text-red-800 placeholder-red-400' : ''}
        `}
        value={value}
        onChange={handleChange}
        {...props}
      />
      {displayError && (
        <p className="text-sm text-red-200 mt-1">
          {displayError}
        </p>
      )}
    </div>
  );
};

export default Textarea;
