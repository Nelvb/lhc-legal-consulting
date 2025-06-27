/**
 * PrivacyCheckbox.tsx
 *
 * Checkbox obligatorio COMPACTO para formularios de LHC Legal & Consulting.
 * Versión minimalista que cumple con RGPD sin romper el diseño.
 * Solo lo esencial para no saturar visualmente.
 */

'use client';

import React from 'react';
import SmartLink from '@/components/ui/SmartLink';

interface PrivacyCheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    error?: string;
    className?: string;
    variant?: 'contact' | 'newsletter' | 'registration';
    theme?: 'light' | 'dark';
}

const PrivacyCheckbox: React.FC<PrivacyCheckboxProps> = ({
    checked,
    onChange,
    error,
    className = '',
    variant = 'contact',
    theme = 'light'
}) => {
    const getPrivacyText = () => {
        switch (variant) {
            case 'contact':
                return (
                    <>
                        Acepto la{" "}
                        <SmartLink
                            href="/legal/politica-privacidad"
                            className={`${theme === 'dark' ? 'text-blue-300 hover:text-blue-100' : 'text-[#1DA1F2] hover:text-[#1b2f4b]'} hover:underline font-medium transition-colors`}
                            target="_blank"
                        >
                            Política de Privacidad
                        </SmartLink>
                        {" "}para responder a mi consulta.
                    </>
                );

            case 'newsletter':
                return (
                    <>
                        Acepto recibir comunicaciones y la{" "}
                        <SmartLink
                            href="/legal/politica-privacidad"
                            className={`${theme === 'dark' ? 'text-blue-300 hover:text-blue-100' : 'text-[#1DA1F2] hover:text-[#1b2f4b]'} hover:underline font-medium transition-colors`}
                            target="_blank"
                        >
                            Política de Privacidad
                        </SmartLink>.
                    </>
                );

            case 'registration':
                return (
                    <>
                        Acepto el{" "}
                        <SmartLink
                            href="/legal/aviso-legal"
                            className={`${theme === 'dark' ? 'text-blue-300 hover:text-blue-100' : 'text-[#1DA1F2] hover:text-[#1b2f4b]'} hover:underline font-medium transition-colors`}
                            target="_blank"
                        >
                            Aviso Legal
                        </SmartLink>
                        {" "}y{" "}
                        <SmartLink
                            href="/legal/politica-privacidad"
                            className={`${theme === 'dark' ? 'text-blue-300 hover:text-blue-100' : 'text-[#1DA1F2] hover:text-[#1b2f4b]'} hover:underline font-medium transition-colors`}
                            target="_blank"
                        >
                            Política de Privacidad
                        </SmartLink>.
                    </>
                );

            default:
                return getPrivacyText();
        }
    };

    const textColor = theme === 'dark' ? 'text-white/90' : 'text-gray-700';
    const errorTextColor = theme === 'dark' ? 'text-red-300' : 'text-red-600';
    const checkboxBorderColor = error
        ? (theme === 'dark' ? 'border-red-400' : 'border-red-500')
        : (theme === 'dark' ? 'border-white/40' : 'border-gray-300');

    return (
        <div className={`${className}`}>
            <div className="flex items-start space-x-3">
                <div className="flex items-center h-5 pt-0.5">
                    <input
                        id="privacy-checkbox"
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => onChange(e.target.checked)}
                        className={`
              w-4 h-4 rounded transition-all duration-200 cursor-pointer
              ${error
                                ? 'border-2 border-red-500 text-red-600 focus:ring-red-500 focus:ring-2'
                                : `border-2 ${checkboxBorderColor} text-[#1DA1F2] focus:ring-[#1DA1F2] focus:ring-2 focus:ring-opacity-50`
                            }
              ${theme === 'dark' ? 'bg-white/10 focus:bg-white/20' : 'bg-white'}
            `}
                        aria-describedby={error ? "privacy-error" : undefined}
                        required
                    />
                </div>

                <div className="flex-1">
                    <label
                        htmlFor="privacy-checkbox"
                        className={`text-xs leading-relaxed cursor-pointer ${textColor}`}
                    >
                        {getPrivacyText()}
                    </label>

                    {error && (
                        <p id="privacy-error" className={`mt-1 text-xs ${errorTextColor} flex items-center`}>
                            <span className="inline-block w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center mr-2 flex-shrink-0">!</span>
                            {error}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PrivacyCheckbox;