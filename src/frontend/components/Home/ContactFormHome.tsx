/**
 * ContactFormHome.tsx
 *
 * Formulario de contacto compacto para el home de LHC Legal & Consulting.
 * Unificado con el manejo de estados y errores del ContactForm principal.
 * Usa el mismo contactService, los componentes Input y Textarea reutilizables.
 * Variante "light" aplicada para mantener diseño con fondo translúcido.
 */

'use client';

import React, { useState } from 'react';
import { contactService } from '@/lib/api/contactService';
import { useAuthStore } from '@/stores/useAuthStore';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { CheckCircle } from 'lucide-react';

const ContactFormHome: React.FC = () => {
    const { user } = useAuthStore();
    const isAuthenticated = !!user;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setError(null);

        try {
            const payload = {
                name: isAuthenticated ? user.username : formData.name,
                email: isAuthenticated ? user.email : formData.email,
                subject: `Consulta rápida - ${formData.phone ? 'Tel: ' + formData.phone : 'Sin teléfono'}`,
                message: formData.message,
            };

            await contactService.sendMessage(payload, isAuthenticated);
            setStatus('sent');

            if (!isAuthenticated) {
                setFormData({ name: '', email: '', phone: '', message: '' });
            } else {
                setFormData(prev => ({ ...prev, phone: '', message: '' }));
            }
        } catch (err: any) {
            setError(err.message || 'Error inesperado al enviar el mensaje');
            setStatus('error');
        }
    };

    return (
        <div className="lg:w-[30%] bg-white/10 backdrop-blur-lg border-l lg:border-l border-t lg:border-t-0 border-white/20 p-6 sm:p-8 lg:p-10 flex flex-col justify-center min-h-[400px] lg:h-[600px]">
            <div className="text-center mb-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                    {isAuthenticated ? `Hola ${user.username}` : 'Consulta Gratuita'}
                </h3>
                <p className="text-white/80">
                    {isAuthenticated ? 'Cuéntanos tu consulta' : 'Te contactamos en 24h'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {!isAuthenticated && (
                    <>
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
                    </>
                )}

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

                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-start space-x-2">
                        <div className="bg-red-200 rounded-full p-1 mt-0.5">
                            <div className="w-2 h-2 bg-red-600 rounded-full" />
                        </div>
                        <span>{error}</span>
                    </div>
                )}

                {status === 'sent' && (
                    <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl text-sm flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-medium">¡Mensaje enviado correctamente!</p>
                            <p className="text-green-700 mt-1">Te contactaremos en las próximas 24 horas.</p>
                        </div>
                    </div>
                )}

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

            <p className="text-white/60 text-xs text-center mt-4">
                Al enviar aceptas nuestra política de privacidad
            </p>
        </div>
    );
};

export default ContactFormHome;
