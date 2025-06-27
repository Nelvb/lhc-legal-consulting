/**
 * ContactForm.tsx
 *
 * Formulario público de contacto para LHC Legal & Consulting con diseño visual avanzado.
 * Layout de dos columnas: información/valor a la izquierda, formulario a la derecha.
 * Usa ModalMessage para mostrar éxito/error sin romper el layout principal.
 * Incluye validación visual, estados de carga, elementos de confianza y PrivacyCheckbox.
 */

"use client";

import { useState, FormEvent } from "react";
import { contactService } from "@/lib/api/contactService";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import PrivacyCheckbox from "@/components/legal/PrivacyCheckbox";
import ModalMessage from "@/components/ui/ModalMessage";
import { Shield, Clock, MessageSquare, Phone, CheckCircle } from "lucide-react";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
    });

    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [privacyError, setPrivacyError] = useState('');
    const [status, setStatus] = useState<"idle" | "sending">("idle");

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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setPrivacyError('');

        // Validar checkbox de privacidad
        if (!privacyAccepted) {
            setPrivacyError('Debe aceptar la política de privacidad para continuar');
            return;
        }

        setStatus("sending");

        try {
            const payload = {
                name: `${formData.name} ${formData.lastName}`,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
            };

            await contactService.sendMessage(payload);
            
            // Limpiar formulario
            setFormData({ name: "", lastName: "", email: "", subject: "", message: "" });
            setPrivacyAccepted(false);
            setStatus("idle");

            // Mostrar modal de éxito
            setModalState({
                isOpen: true,
                type: 'success',
                title: '¡Consulta enviada correctamente!',
                message: 'Hemos recibido tu consulta legal. Nuestro equipo de abogados especialistas te contactará en las próximas 24 horas para ofrecerte el mejor asesoramiento.',
                error: null
            });

        } catch (err: any) {
            setStatus("idle");
            
            // Mostrar modal de error
            setModalState({
                isOpen: true,
                type: 'error',
                title: 'Error al enviar la consulta',
                message: err.message || 'Ha ocurrido un error inesperado al procesar tu consulta. Por favor, inténtalo de nuevo o contáctanos directamente por WhatsApp o teléfono.',
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

    const whatsappUrl =
        "https://wa.me/34691818071?text=Hola%2C%20necesito%20asesoramiento%20legal%20gratuito";

    return (
        <>
            <div className="w-full max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Columna izquierda - Información y valor */}
                    <div className="space-y-8">
                        <div className="space-y-6 pt-20 sm:pt-18 md:pt-16 lg:pt-24 xl:pt-0">
                            <h1 className="text-4xl lg:text-5xl font-bold text-[#1b2f4b] leading-tight">
                                ¿Necesitas{" "}
                                <span className="text-[#1DA1F2]">asesoramiento legal</span>?
                            </h1>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                Nuestro equipo de abogados especialistas está aquí para resolver todas tus dudas
                                sobre tu situación legal. Sin compromiso, sin presión.
                            </p>
                        </div>

                        {/* Características de valor */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                                <Icon size="small" blur="md">
                                    <Clock />
                                </Icon>
                                <div>
                                    <h3 className="font-semibold text-[#1b2f4b]">Respuesta en 24h</h3>
                                    <p className="text-gray-600 text-sm">Te contactamos en menos de un día laborable</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <Icon size="small" blur="md">
                                    <Shield />
                                </Icon>
                                <div>
                                    <h3 className="font-semibold text-[#1b2f4b]">Asesoramiento cercano</h3>
                                    <p className="text-gray-600 text-sm">Un equipo que realmente te escucha</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <Icon size="small" blur="md">
                                    <CheckCircle />
                                </Icon>
                                <div>
                                    <h3 className="font-semibold text-[#1b2f4b]">Sin compromisos</h3>
                                    <p className="text-gray-600 text-sm">Consulta legal completamente gratuita</p>
                                </div>
                            </div>
                        </div>

                        {/* Contacto alternativo */}
                        <div className="bg-gradient-to-r from-[#e6f3ff] to-[#f0f8ff] p-6 rounded-xl border border-[#1DA1F2]/20">
                            <h3 className="font-semibold text-[#1b2f4b] mb-4 flex items-center">
                                <MessageSquare className="w-5 h-5 mr-2" />
                                ¿Prefieres hablar directamente?
                            </h3>
                            <div className="space-y-3">
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-3 bg-[#25D366] text-white px-4 py-3 rounded-lg hover:bg-[#1DA851] transition-colors duration-200"
                                >
                                    <img
                                        src="/whatsapp.svg"
                                        alt="WhatsApp"
                                        className="w-5 h-5 brightness-0 invert"
                                    />
                                    <span className="font-medium">Escríbenos por WhatsApp</span>
                                </a>
                                <a href="tel:+34691818071" className="flex items-center space-x-3 text-[#1b2f4b]">
                                    <Phone className="w-5 h-5" />
                                    <span>Llámanos: +34 691 81 80 71</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Columna derecha - Formulario */}
                    <div className="relative">
                        {/* Elementos decorativos de fondo */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#1DA1F2] opacity-10 rounded-full blur-xl"></div>
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#C2E7DA] opacity-20 rounded-full blur-xl"></div>

                        <div
                            className="relative bg-white/10 backdrop-blur-lg border border-white/20 p-8 lg:p-10 rounded-2xl"
                            style={{
                                background: `
                linear-gradient(135deg, 
                    #1b2f4b 0%, 
                    #1DA1F2 35%, 
                    #1b2f4b 70%, 
                    #0f172a 100%
                )
            `
                            }}
                        >
                            {/* Header del formulario */}
                            <div className="text-center mb-8">
                                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                                    Envíanos tu consulta legal
                                </h2>
                                <p className="text-white">
                                    Completa el formulario y te contactaremos pronto
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <Input
                                        label="Nombre"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        minLength={2}
                                        placeholder="Tu nombre"
                                    />
                                    <Input
                                        label="Apellidos"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        minLength={2}
                                        placeholder="Tus apellidos"
                                    />
                                </div>

                                <Input
                                    label="Email"
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="tu@email.com"
                                />

                                <Input
                                    label="Asunto"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    minLength={4}
                                    placeholder="Tipo de consulta: despido, herencia, multa, divorcio..."
                                />

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                                        Mensaje
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        required
                                        minLength={10}
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Describe tu situación legal con el máximo detalle posible..."
                                        className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:bg-white/30 focus:border-white/50 focus:outline-none transition-all duration-200 resize-none"
                                    ></textarea>
                                </div>

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
                                    {status === "sending" ? (
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Enviando mensaje...</span>
                                        </div>
                                    ) : (
                                        "Enviar consulta"
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
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

export default ContactForm;