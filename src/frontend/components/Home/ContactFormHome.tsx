/**
 * ContactFormHome.tsx
 *
 * Formulario de contacto compacto para el home de LHC Legal & Consulting.
 * Unificado con el manejo de estados y errores del ContactForm principal.
 * Usa ModalMessage para mostrar éxito/error sin romper el layout.
 * Variante "light" aplicada para mantener diseño con fondo translúcido.
 */

'use client';

import React, { useState } from 'react';
import { contactService } from '@/lib/api/contactService';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import PrivacyCheckbox from '@/components/legal/PrivacyCheckbox';
import ModalMessage from '@/components/ui/ModalMessage';

const ContactFormHome: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [privacyError, setPrivacyError] = useState('');
    const [status, setStatus] = useState<'idle' | 'sending'>('idle');
    
    // Estados del modal
    const [modalState, setModalState] = useState({
        isOpen: false,
        type: 'success' as 'success' | 'error',
        title: '',
        message: '',
        error: null as string | null
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPrivacyError('');

        // Validar checkbox de privacidad
        if (!privacyAccepted) {
            setPrivacyError('Debe aceptar la política de privacidad para continuar');
            return;
        }

        setStatus('sending');

        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                subject: `Consulta rápida`,
                message: formData.message,
            };

            await contactService.sendMessage(payload);

            // Limpiar formulario
            setFormData({ name: '', email: '', phone: '', message: '' });
            setPrivacyAccepted(false);
            setStatus('idle');

            // Mostrar modal de éxito
            setModalState({
                isOpen: true,
                type: 'success',
                title: '¡Mensaje enviado correctamente!',
                message: 'Te contactaremos en las próximas 24 horas para ofrecerte la mejor asesoría legal.',
                error: null
            });

        } catch (err: any) {
            setStatus('idle');
            
            // Mostrar modal de error
            setModalState({
                isOpen: true,
                type: 'error',
                title: 'Error al enviar el mensaje',
                message: err.message || 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo o contáctanos directamente.',
                error: err.message
            });
        }
    };

    const closeModal = () => {
        setModalState(prev => ({ ...prev, isOpen: false }));
    };

    const retrySubmit = () => {
        closeModal();
        // El usuario puede volver a enviar el formulario manualmente
    };

    return (
        <>
            <div className="lg:w-[30%] bg-white/10 backdrop-blur-lg border-l lg:border-l border-t lg:border-t-0 border-white/20 p-6 sm:p-8 lg:p-10 flex flex-col justify-center min-h-[400px] lg:h-[600px]">
                <div className="text-center mb-4">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                        Consulta Gratuita
                    </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tu nombre completo"
                        required
                    />
                    
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        required
                    />

                    <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Teléfono (opcional)"
                    />

                    <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Cuéntanos brevemente tu consulta legal..."
                        required
                        rows={3}
                    />

                    {/* Checkbox de privacidad */}
                    <PrivacyCheckbox
                        checked={privacyAccepted}
                        onChange={setPrivacyAccepted}
                        error={privacyError}
                        variant="contact"
                        theme="dark"
                    />

                    <Button
                        type="submit"
                        variant="outline"
                        size="md"
                        disabled={status === 'sending'}
                        loading={status === 'sending'}
                        fullWidth
                        className="mt-6"
                    >
                        Solicitar Consulta Gratuita
                    </Button>
                </form>
            </div>

            {/* Modal para mensajes de éxito y error */}
            <ModalMessage
                isOpen={modalState.isOpen}
                onClose={closeModal}
                type={modalState.type}
                title={modalState.title}
                message={modalState.message}
                actionText={modalState.type === 'error' ? 'Reintentar' : 'Cerrar'}
                onAction={modalState.type === 'error' ? retrySubmit : undefined}
            />
        </>
    );
};

export default ContactFormHome;