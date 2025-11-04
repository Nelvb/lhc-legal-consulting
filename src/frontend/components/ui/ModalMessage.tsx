/**
 * ModalMessage.tsx
 *
 * Modal universal para mostrar mensajes de éxito y error en formularios.
 * Diseño profesional centrado en pantalla que no rompe el layout.
 * Compatible con ambos formularios (home y contacto) y responsive.
 * 
 * Características:
 * - Overlay semi-transparente de fondo
 * - Animaciones suaves de entrada y salida
 * - Iconos diferenciados por tipo de mensaje
 * - Botones de acción apropiados
 * - Cierre con ESC o clic fuera del modal
 */

'use client';

import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ModalMessageProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'success' | 'error';
    title: string;
    message: string;
    actionText?: string;
    onAction?: () => void;
}

const ModalMessage: React.FC<ModalMessageProps> = ({
    isOpen,
    onClose,
    type,
    title,
    message,
    actionText = 'Cerrar',
    onAction
}) => {
    // Cerrar con ESC
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Bloquear scroll del body
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleAction = () => {
        if (onAction) {
            onAction();
        } else {
            onClose();
        }
    };

    const isSuccess = type === 'success';

    return (
        <div
            className="fixed inset-0 z-[10000] bg-black/50 backdrop-blur-sm"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflowY: 'auto'
            }}
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-message"
        >
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100%',
                    maxWidth: '28rem',
                    padding: '1rem',
                    boxSizing: 'border-box',
                    transform: isOpen ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.95)',
                    opacity: isOpen ? 1 : 0,
                    transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
                    pointerEvents: isOpen ? 'auto' : 'none'
                }}
            >
                <div
                    className="bg-white rounded-2xl shadow-2xl w-full p-6 relative"
                    style={{
                        maxHeight: 'calc(100vh - 2rem)',
                        overflowY: 'auto'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                {/* Botón cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Cerrar modal"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Contenido del modal */}
                <div className="text-center">
                    {/* Icono */}
                    <div className={`
            mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center
            ${isSuccess
                            ? 'bg-green-100 text-green-600'
                            : 'bg-red-100 text-red-600'
                        }
          `}>
                        {isSuccess ? (
                            <CheckCircle className="w-8 h-8" />
                        ) : (
                            <AlertCircle className="w-8 h-8" />
                        )}
                    </div>

                    {/* Título */}
                    <h3
                        id="modal-title"
                        className={`
              text-xl font-bold mb-3
              ${isSuccess ? 'text-green-800' : 'text-red-800'}
            `}
                    >
                        {title}
                    </h3>

                    {/* Mensaje */}
                    <p
                        id="modal-message"
                        className="text-gray-600 mb-6 leading-relaxed"
                    >
                        {message}
                    </p>

                    {/* Botones */}
                    <div className="flex gap-3 justify-center">
                        {type === 'error' && onAction && (
                            <Button
                                onClick={handleAction}
                                className={`
                  px-6 py-2 rounded-lg font-medium transition-colors
                  ${isSuccess
                                        ? 'bg-green-600 hover:bg-green-700 text-white'
                                        : 'bg-red-600 hover:bg-red-700 text-white'
                                    }
                `}
                            >
                                Reintentar
                            </Button>
                        )}

                        <Button
                            onClick={onClose}
                            variant="outline"
                            className="px-6 py-2"
                        >
                            {type === 'error' && onAction ? 'Cancelar' : actionText}
                        </Button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default ModalMessage;