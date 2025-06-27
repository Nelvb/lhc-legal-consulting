/**
 * CookieToggle.tsx
 *
 * Componente toggle personalizado para configuración de cookies en LHC Legal & Consulting.
 * Diseño minimalista con colores corporativos y animaciones suaves.
 * Compatible con estado deshabilitado para cookies necesarias.
 */

'use client';

import React from 'react';
import clsx from 'clsx';

interface CookieToggleProps {
    /** Estado actual del toggle */
    checked: boolean;
    /** Función llamada cuando cambia el estado */
    onChange: (checked: boolean) => void;
    /** Etiqueta principal del toggle */
    label: string;
    /** Descripción adicional */
    description?: string;
    /** Si está deshabilitado (cookies necesarias) */
    disabled?: boolean;
    /** Texto explicativo cuando está deshabilitado */
    disabledReason?: string;
    /** ID único para accesibilidad */
    id: string;
}

/**
 * Toggle switch personalizado con diseño corporativo LHC
 */
const CookieToggle: React.FC<CookieToggleProps> = ({
    checked,
    onChange,
    label,
    description,
    disabled = false,
    disabledReason,
    id,
}) => {
    const handleToggle = () => {
        if (!disabled) {
            onChange(!checked);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            handleToggle();
        }
    };

    return (
        <div className="flex items-start justify-between py-4 border-b border-gray-200 last:border-b-0">
            {/* Información del toggle */}
            <div className="flex-1 mr-4">
                <div className="flex items-center gap-2 mb-1">
                    <label
                        htmlFor={id}
                        className={clsx(
                            'text-sm font-semibold cursor-pointer transition-colors',
                            disabled
                                ? 'text-gray-500 cursor-not-allowed'
                                : 'text-[#1b2f4b] hover:text-[#1DA1F2]'
                        )}
                    >
                        {label}
                    </label>

                    {disabled && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                            Necesarias
                        </span>
                    )}
                </div>

                {description && (
                    <p className="text-xs text-gray-600 leading-relaxed">
                        {description}
                    </p>
                )}

                {disabled && disabledReason && (
                    <p className="text-xs text-gray-500 mt-1 italic">
                        {disabledReason}
                    </p>
                )}
            </div>

            {/* Switch toggle */}
            <div className="flex-shrink-0">
                <button
                    id={id}
                    type="button"
                    role="switch"
                    aria-checked={checked}
                    aria-describedby={description ? `${id}-description` : undefined}
                    disabled={disabled}
                    onClick={handleToggle}
                    onKeyDown={handleKeyDown}
                    className={clsx(
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-smooth focus:outline-none focus:ring-2 focus:ring-offset-2',
                        disabled
                            ? 'bg-gray-200 cursor-not-allowed focus:ring-gray-300'
                            : checked
                                ? 'bg-[#1DA1F2] focus:ring-[#1DA1F2] hover:bg-[#1a91da]'
                                : 'bg-gray-300 focus:ring-gray-400 hover:bg-gray-400'
                    )}
                >
                    {/* Círculo del switch */}
                    <span
                        className={clsx(
                            'inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-smooth',
                            checked ? 'translate-x-6' : 'translate-x-1',
                            disabled && 'opacity-70'
                        )}
                    />

                    {/* Indicador visual cuando está activo */}
                    {checked && !disabled && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-white/30" />
                        </div>
                    )}
                </button>
            </div>

            {/* Descripción oculta para screen readers */}
            {description && (
                <div id={`${id}-description`} className="sr-only">
                    {description}
                </div>
            )}
        </div>
    );
};

export default CookieToggle;