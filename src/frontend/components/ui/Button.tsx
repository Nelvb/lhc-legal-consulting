/**
 * Button.tsx
 * 
 * Componente de botón reutilizable y extensible para LHC Legal & Consulting.
 * Mantiene las variantes existentes y añade funcionalidades avanzadas como
 * iconos, estados de carga y nuevas variantes corporativas.
 */

'use client';

import React, { forwardRef, MouseEvent } from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Contenido del botón */
  children: React.ReactNode;
  /** Variante visual del botón */
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'lhc' | 'cta' | 'ghost';
  /** Tamaño del botón */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Evento de clic personalizado */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Clases CSS adicionales */
  className?: string;
  /** Tipo de botón HTML */
  type?: 'button' | 'submit' | 'reset';
  /** Estado deshabilitado */
  disabled?: boolean;
  /** Estado de carga con spinner */
  loading?: boolean;
  /** Icono a mostrar (React element) */
  icon?: React.ReactNode;
  /** Posición del icono */
  iconPosition?: 'left' | 'right';
  /** Ancho completo del contenedor */
  fullWidth?: boolean;
}

/**
 * Componente Button mejorado con TypeScript estricto
 * Mantiene compatibilidad con variantes existentes
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  ...props
}, ref) => {
  const baseStyles = `
    inline-flex items-center justify-center font-medium rounded-xl 
    transition-all duration-300 ease-out focus:outline-none focus:ring-2 
    focus:ring-offset-2 disabled:cursor-not-allowed relative
    transform hover:scale-105 active:scale-95
  `;

  const variantStyles = {
    // Variantes existentes (conservadas exactamente)
    primary: `
      bg-[#1DA1F2] text-white border border-transparent 
      hover:bg-white hover:text-[#1DA1F2] hover:border-[#1DA1F2] 
      focus:ring-[#1DA1F2] disabled:bg-[#A8DCFA]
    `,

    secondary: `
      bg-[#C2E7DA] text-[#1A1341] border border-transparent 
      hover:bg-white hover:border-[#C2E7DA] hover:text-[#1A1341] 
      focus:ring-[#C2E7DA] disabled:bg-[#F1FFEF] disabled:text-gray-500
    `,

    outline: `
      border border-[#1A1341] text-[#1A1341] bg-white 
      hover:bg-[#1A1341] hover:text-white 
      focus:ring-[#1A1341] disabled:text-gray-300
    `,

    danger: `
      bg-red-600 text-white border border-transparent 
      hover:bg-white hover:text-red-600 hover:border-red-600 
      focus:ring-red-600 disabled:bg-red-300
    `,

    lhc: `
      bg-[#1A1341] text-[#F4F2ED] border border-transparent 
      hover:bg-[#F4F2ED] hover:text-[#1A1341] hover:border-[#1A1341]
      focus:ring-[#1A1341] disabled:bg-gray-300 disabled:text-gray-500
    `,

    // Nuevas variantes añadidas
    cta: `
      bg-gradient-to-r from-[#1DA1F2] to-[#60A5FA] text-white font-bold
      border border-white/20 hover:border-white/30
      hover:from-[#1a91da] hover:to-[#4f9ded] hover:shadow-2xl
      focus:ring-[#1DA1F2] focus:ring-opacity-50
      disabled:from-gray-400 disabled:to-gray-500
      shadow-lg hover:shadow-2xl
    `,

    ghost: `
      text-[#1A1341] bg-transparent border border-transparent
      hover:bg-[#FDF6E3] hover:text-[#1DA1F2]
      focus:ring-[#1DA1F2] focus:ring-opacity-30
      disabled:text-gray-400
    `
  };

  const sizeStyles = {
    xs: 'py-[6px] px-4 text-sm min-h-[28px]',
    sm: 'py-1 px-3 text-sm min-h-[32px]',
    md: 'py-2 px-4 text-base min-h-[40px]',
    lg: 'py-3 px-6 text-lg min-h-[48px]'
  };

  const widthStyles = fullWidth ? 'w-full' : '';
  const iconSpacing = size === 'xs' || size === 'sm' ? 'gap-1' : 'gap-2';

  return (
    <button
      ref={ref}
      type={type}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        widthStyles,
        iconSpacing,
        className
      )}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {/* Spinner de carga */}
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      {/* Icono izquierdo */}
      {icon && iconPosition === 'left' && !loading && (
        <span className="flex-shrink-0">
          {icon}
        </span>
      )}

      {/* Contenido del botón */}
      <span className={loading ? 'opacity-70' : ''}>
        {children}
      </span>

      {/* Icono derecho */}
      {icon && iconPosition === 'right' && !loading && (
        <span className="flex-shrink-0">
          {icon}
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;