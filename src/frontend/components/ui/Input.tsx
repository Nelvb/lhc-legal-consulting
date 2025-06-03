'use client'

/**
 * Componente Input.tsx
 *
 * Campo de formulario reutilizable con validación inteligente opcional.
 * Acepta props estándar de input (name, type, value, onChange, etc.), además de `label` y `error`.
 * Incluye etiqueta accesible con `htmlFor`, mensaje de error visible y estilos personalizados con Tailwind.
 * La validación inteligente se activa solo cuando se proporcionan `validationRules` y `validateOnChange`.
 * Se recomienda su uso en formularios de toda la aplicación para mantener coherencia y accesibilidad.
 */

import React, { InputHTMLAttributes, useState, useEffect } from 'react'

interface ValidationRules {
  minLength?: number
  maxLength?: number
  required?: boolean
  pattern?: RegExp
  customValidator?: (value: string) => string | null
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  validationRules?: ValidationRules
  validateOnChange?: boolean
  onErrorChange?: (hasError: boolean) => void
}

const normalizeLabel = (label: string) =>
  label.toLowerCase().replace(/[^a-z0-9]/gi, '-')

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
  ...props
}) => {
  const [internalError, setInternalError] = useState<string | null>(null)
  const generatedId = label ? `input-${normalizeLabel(label)}` : undefined
  const inputId = id || generatedId || props.name

  const validateValue = (inputValue: string) => {
    if (!validationRules || !validateOnChange) return null

    const { minLength, maxLength, required, pattern, customValidator } = validationRules

    if (required && !inputValue.trim()) {
      return 'Este campo es obligatorio'
    }

    if (minLength && inputValue.length < minLength) {
      return `Debe tener al menos ${minLength} caracteres`
    }

    if (maxLength && inputValue.length > maxLength) {
      return `No puede tener más de ${maxLength} caracteres`
    }

    if (pattern && !pattern.test(inputValue)) {
      return 'El formato no es válido'
    }

    if (customValidator) {
      return customValidator(inputValue)
    }

    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    
    if (validateOnChange && validationRules) {
      const validationError = validateValue(newValue)
      setInternalError(validationError)
      onErrorChange?.(!!validationError)
    }

    onChange?.(e)
  }

  useEffect(() => {
    if (validateOnChange && validationRules && value !== undefined) {
      const validationError = validateValue(String(value))
      setInternalError(validationError)
      onErrorChange?.(!!validationError)
    }
  }, [value, validationRules, validateOnChange])

  // Determinar si hay error (externo o interno)
  const hasError = error || internalError
  const displayError = error || internalError

  // Aplicar border rojo solo si hay validación activa
  const borderClass = validateOnChange && validationRules && hasError
    ? 'border-red-500 bg-red-50'
    : 'border-[#C2E7DA] bg-white'

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
        className={`w-full px-3 py-2 border text-[#1A1341] rounded-md 
          focus:outline-none focus:ring-2 focus:ring-[#1DA1F2] 
          ${borderClass}
          ${className || ''}`}
        value={value}
        onChange={handleChange}
        {...props}
      />
      {displayError && (
        <p className="text-sm text-red-600 mt-1">
          {displayError}
        </p>
      )}
    </div>
  )
}

export default Input