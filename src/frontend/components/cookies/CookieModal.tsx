/**
 * CookieModal.tsx
 *
 * Modal de configuración avanzada de cookies para LHC Legal & Consulting.
 * Permite configuración granular por categorías con toggles personalizados.
 * Diseño consistente con ModalMessage y otros modales del sistema.
 * Incluye información detallada sobre cada tipo de cookie.
 */

'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import Button from '@/components/ui/Button';
import CookieToggle from '@/components/cookies/CookieToggle';
import { X, Cookie, Shield, BarChart3, Settings2, ExternalLink } from 'lucide-react';

/**
 * Modal de configuración de cookies con diseño corporativo LHC
 */
const CookieModal: React.FC = () => {
    const {
        showModal,
        preferences,
        updatePreference,
        saveModalPreferences,
        closeModal,
        acceptAll,
    } = useCookieConsent();

    // Cerrar modal con ESC
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && showModal) {
                closeModal();
            }
        };

        if (showModal) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [showModal, closeModal]);

    if (!showModal) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

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
            aria-labelledby="cookie-modal-title"
        >
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100%',
                    maxWidth: '42rem',
                    padding: '1rem',
                    boxSizing: 'border-box',
                    transform: showModal ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.95)',
                    opacity: showModal ? 1 : 0,
                    transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
                    pointerEvents: showModal ? 'auto' : 'none'
                }}
            >
                <div
                    className="bg-white rounded-2xl shadow-2xl w-full overflow-hidden"
                    style={{
                        maxHeight: 'calc(100vh - 2rem)',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                {/* Header del modal */}
                <div className="bg-lhc-gradient p-6 relative">
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Cerrar configuración de cookies"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-xl">
                            <Cookie className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 id="cookie-modal-title" className="text-xl font-bold text-white">
                                Configuración de Cookies
                            </h2>
                            <p className="text-blue-100 text-sm">
                                Personaliza tu experiencia de navegación
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contenido scrolleable */}
                <div className="overflow-y-auto flex-1" style={{ minHeight: 0 }}>
                    <div className="p-6 space-y-6">

                        {/* Información general */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <p className="text-sm text-gray-700 leading-relaxed">
                                Las cookies nos ayudan a ofrecerte la mejor experiencia en nuestro sitio web.
                                Puedes elegir qué tipos de cookies permitir. Ten en cuenta que deshabilitar
                                algunas cookies puede afectar a la funcionalidad del sitio.
                            </p>
                        </div>

                        {/* Configuración por categorías */}
                        <div className="space-y-1">

                            {/* Cookies Necesarias */}
                            <div className="border border-gray-200 rounded-xl overflow-hidden">
                                <div className="bg-gray-50 p-4 border-b border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <Shield className="w-5 h-5 text-green-600" />
                                        <div>
                                            <h3 className="font-semibold text-[#1b2f4b]">Cookies Necesarias</h3>
                                            <p className="text-xs text-gray-600">
                                                Esenciales para el funcionamiento del sitio web
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <CookieToggle
                                        id="necessary-cookies"
                                        label="Cookies Técnicas"
                                        description="Permiten la navegación y el uso de funciones básicas como la seguridad, gestión de red y accesibilidad."
                                        checked={preferences.necessary}
                                        onChange={() => { }} // No se puede cambiar
                                        disabled={true}
                                        disabledReason="Estas cookies son necesarias para el funcionamiento del sitio web y no se pueden desactivar."
                                    />
                                </div>
                            </div>

                            {/* Cookies Analíticas */}
                            <div className="border border-gray-200 rounded-xl overflow-hidden">
                                <div className="bg-gray-50 p-4 border-b border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <BarChart3 className="w-5 h-5 text-blue-600" />
                                        <div>
                                            <h3 className="font-semibold text-[#1b2f4b]">Cookies Analíticas</h3>
                                            <p className="text-xs text-gray-600">
                                                Nos ayudan a entender cómo interactúas con el sitio web
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <CookieToggle
                                        id="analytics-cookies"
                                        label="Google Analytics"
                                        description="Recopila información anónima sobre cómo los visitantes usan el sitio web, incluyendo páginas visitadas y tiempo de permanencia."
                                        checked={preferences.analytics}
                                        onChange={(checked) => updatePreference('analytics', checked)}
                                    />
                                </div>
                            </div>

                            {/* Cookies Funcionales */}
                            <div className="border border-gray-200 rounded-xl overflow-hidden">
                                <div className="bg-gray-50 p-4 border-b border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <Settings2 className="w-5 h-5 text-purple-600" />
                                        <div>
                                            <h3 className="font-semibold text-[#1b2f4b]">Cookies Funcionales</h3>
                                            <p className="text-xs text-gray-600">
                                                Mejoran la funcionalidad y personalización
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <CookieToggle
                                        id="functional-cookies"
                                        label="Preferencias de Usuario"
                                        description="Recuerdan tus preferencias como idioma, región, o configuraciones de la interfaz para ofrecerte una experiencia personalizada."
                                        checked={preferences.functional}
                                        onChange={(checked) => updatePreference('functional', checked)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Enlaces adicionales */}
                        <div className="bg-gray-50 rounded-xl p-4">
                            <h4 className="font-semibold text-[#1b2f4b] mb-3 text-sm">
                                Más información
                            </h4>
                            <div className="space-y-2">
                                <Link
                                    href="/legal/cookies"
                                    className="flex items-center gap-2 text-sm text-[#1DA1F2] hover:text-[#1b2f4b] transition-colors"
                                    target="_blank"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Política de Cookies completa
                                </Link>
                                <Link
                                    href="/legal/politica-privacidad"
                                    className="flex items-center gap-2 text-sm text-[#1DA1F2] hover:text-[#1b2f4b] transition-colors"
                                    target="_blank"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Política de Privacidad
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer con botones */}
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                    <div className="flex flex-col sm:flex-row gap-3 justify-end">
                        <Button
                            variant="ghost"
                            size="md"
                            onClick={closeModal}
                            className="text-gray-600 hover:text-gray-800"
                        >
                            Cancelar
                        </Button>

                        <Button
                            variant="outline"
                            size="md"
                            onClick={acceptAll}
                            className="border-[#1DA1F2] text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white"
                        >
                            Aceptar todo
                        </Button>

                        <Button
                            variant="lhc"
                            size="md"
                            onClick={saveModalPreferences}
                            className="bg-[#1b2f4b] text-white hover:bg-[#1DA1F2]"
                        >
                            Guardar configuración
                        </Button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default CookieModal;