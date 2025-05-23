/**
 * ContactForm.tsx
 *
 * Formulario público de contacto para Boost A Project con diseño visual avanzado.
 * Layout de dos columnas: información/valor a la izquierda, formulario a la derecha.
 * Si el usuario está logueado, omite campos de nombre, apellidos y email pero añade
 * más contexto visual para equilibrar la altura del formulario.
 * Envía todos los emails desde el servidor corporativo (bapboostaproject@gmail.com).
 * Incluye validación visual, estados de carga y elementos de confianza.
 */

"use client";

import { useState, FormEvent } from "react";
import { contactService } from "@/lib/api/contactService";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/stores/useAuthStore";
import { Shield, Clock, MessageSquare, Phone, CheckCircle } from "lucide-react";

const ContactForm = () => {
    const { user } = useAuthStore();

    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
    });

    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const [error, setError] = useState<string | null>(null);

    const isAuthenticated = !!user;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        setError(null);

        try {
            const payload = {
                name: isAuthenticated ? user.username : `${formData.name} ${formData.lastName}`,
                email: isAuthenticated ? user.email : formData.email,
                subject: formData.subject,
                message: formData.message,
            };

            await contactService.sendMessage(payload, isAuthenticated);
            setStatus("sent");
            if (!isAuthenticated) {
                setFormData({ name: "", lastName: "", email: "", subject: "", message: "" });
            } else {
                setFormData(prev => ({ ...prev, subject: "", message: "" }));
            }
        } catch (err: any) {
            setError(err.message || "Error inesperado al enviar el mensaje");
            setStatus("error");
        }
    };

    const whatsappUrl =
        "https://wa.me/34685565977?text=Hola%2C%20quiero%20más%20información%20sobre%20Boost%20A%20Project";

    return (
        <div className="w-full max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Columna izquierda - Información y valor */}
                <div className="space-y-8">
                    <div className="space-y-6">
                        <h1 className="text-4xl lg:text-5xl font-bold text-[#1A1341] leading-tight">
                            ¿Tienes dudas sobre tu{" "}
                            <span className="text-[#6290C3]">inversión</span>?
                        </h1>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Nuestro equipo de expertos está aquí para resolver todas tus preguntas 
                            sobre inversiones inmobiliarias. Sin compromiso, sin presión.
                        </p>
                    </div>

                    {/* Características de valor */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="bg-[#C2E7DA] p-3 rounded-full">
                                <Clock className="w-6 h-6 text-[#1A1341]" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[#1A1341]">Respuesta en 24h</h3>
                                <p className="text-gray-600 text-sm">Te contactamos en menos de un día laborable</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="bg-[#C2E7DA] p-3 rounded-full">
                                <Shield className="w-6 h-6 text-[#1A1341]" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[#1A1341]">Asesoramiento cercano</h3>
                                <p className="text-gray-600 text-sm">Un equipo que realmente te escucha</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="bg-[#C2E7DA] p-3 rounded-full">
                                <CheckCircle className="w-6 h-6 text-[#1A1341]" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[#1A1341]">Sin compromisos</h3>
                                <p className="text-gray-600 text-sm">Información transparente sin presión comercial</p>
                            </div>
                        </div>
                    </div>

                    {/* Contacto alternativo */}
                    <div className="bg-gradient-to-r from-[#F1FFEF] to-[#C2E7DA] p-6 rounded-xl border border-[#C2E7DA]">
                        <h3 className="font-semibold text-[#1A1341] mb-4 flex items-center">
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
                                <MessageSquare className="w-5 h-5" />
                                <span className="font-medium">WhatsApp: +34 685 565 977</span>
                            </a>
                            <div className="flex items-center space-x-3 text-[#1A1341]">
                                <Phone className="w-5 h-5" />
                                <span>Llámanos: +34 685 565 977</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Columna derecha - Formulario */}
                <div className="relative">
                    {/* Elementos decorativos de fondo */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#6290C3] opacity-10 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#C2E7DA] opacity-20 rounded-full blur-xl"></div>
                    
                    <div className="relative bg-white border border-gray-200 p-8 lg:p-10 rounded-2xl shadow-2xl">
                        {/* Header del formulario - Diferente para usuarios registrados y no registrados */}
                        {isAuthenticated ? (
                            <div className="text-center mb-8 space-y-4">
                                <h2 className="text-3xl lg:text-4xl font-bold text-[#1A1341]">
                                    Hola {user.username}
                                </h2>
                                <p className="text-xl text-[#6290C3] font-medium">
                                    ¿En qué podemos ayudarte?
                                </p>
                                <div className="bg-[#F1FFEF] border border-[#C2E7DA] rounded-xl p-4">
                                    <h3 className="text-lg font-semibold text-[#1A1341] mb-2">
                                        Envíanos tu consulta
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        Cuéntanos en qué proyecto estás interesado o cualquier duda que tengas
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center mb-8">
                                <h2 className="text-2xl lg:text-3xl font-bold text-[#1A1341] mb-2">
                                    Envíanos tu consulta
                                </h2>
                                <p className="text-gray-600">
                                    Completa el formulario y te contactaremos pronto
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {!isAuthenticated && (
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
                            )}

                            {!isAuthenticated && (
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
                            )}

                            <Input
                                label="Asunto"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                minLength={4}
                                placeholder="¿De qué quieres hablarnos?"
                            />

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-[#1A1341] mb-2">
                                    Mensaje
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={isAuthenticated ? 8 : 6}
                                    required
                                    minLength={10}
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Cuéntanos tu consulta con el máximo detalle posible..."
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-[#6290C3] focus:ring-2 focus:ring-[#6290C3] focus:ring-opacity-50 resize-none transition-all duration-200"
                                ></textarea>
                            </div>

                            {/* Información adicional para usuarios registrados */}
                            {isAuthenticated && (
                                <div className="bg-[#F1FFEF] border border-[#C2E7DA] rounded-xl p-4">
                                    <div className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-[#6290C3] mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm text-gray-700">
                                                <span className="font-medium">Ventaja de usuario registrado:</span> Tu consulta 
                                                tendrá prioridad y podremos ofrecerte información personalizada basada en tu perfil.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex items-start space-x-2">
                                    <div className="bg-red-200 rounded-full p-1 mt-0.5">
                                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                                    </div>
                                    <span>{error}</span>
                                </div>
                            )}

                            {status === "sent" && (
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
                                variant="primary"
                                className="w-full py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                                disabled={status === "sending"}
                            >
                                {status === "sending" ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Enviando mensaje...</span>
                                    </div>
                                ) : (
                                    "Enviar mensaje"
                                )}
                            </Button>
                        </form>

                        {/* Nota de privacidad */}
                        <p className="text-xs text-gray-500 text-center mt-6 leading-relaxed">
                            Al enviar este formulario, aceptas que procesemos tus datos para contactarte. 
                            Consulta nuestra <span className="text-[#6290C3] hover:underline cursor-pointer">política de privacidad</span>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;