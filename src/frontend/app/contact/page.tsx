/**
 * ContactPage.tsx
 *
 * Página pública de contacto para Boost A Project.
 * Incluye fondo híbrido: dividido clásico arriba (30%) + decorativo abajo.
 * Layout responsive que aloja el ContactForm con diseño de dos columnas.
 * Optimizada para SEO con metadata apropiada y textos claros sobre fondo oscuro.
 * Utiliza iconos de Lucide React para consistencia profesional.
 */

import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import { Handshake, Shield, Phone } from "lucide-react";

export const metadata: Metadata = {
    title: "Contacto | Boost A Project",
    description:
        "Contacta con nuestro equipo de expertos en inversiones inmobiliarias. Respuesta garantizada en 24h. Asesoramiento gratuito y sin compromisos.",
    keywords: "contacto, inversiones inmobiliarias, asesoramiento, consulta gratuita, Boost A Project",
    openGraph: {
        title: "Contacto | Boost A Project",
        description: "¿Tienes dudas sobre inversiones inmobiliarias? Nuestro equipo te ayuda. Respuesta en 24h.",
        type: "website",
    },
};

export default function ContactPage() {
    return (
        <main className="w-full relative min-h-screen overflow-hidden">
            {/* Fondo híbrido: dividido arriba + decorativo abajo */}
            <div className="absolute inset-0">
                {/* Fondo dividido clásico desde arriba hasta 30% */}
                <div className="absolute top-0 left-0 w-full h-[30%] flex">
                    <div className="w-[30%] bg-[#C2E7DA]" />
                    <div className="w-[70%] bg-[#1A1341]" />
                </div>
                
                {/* Gradiente base para la parte inferior */}
                <div className="absolute top-[30%] left-0 right-0 bottom-0 bg-gradient-to-br from-[#F1FFEF] via-[#C2E7DA] to-[#6290C3] opacity-40"></div>
                
                {/* Formas decorativas (solo en la parte inferior) */}
                <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#6290C3] opacity-10 rounded-full blur-3xl translate-x-1/2"></div>
                <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#C2E7DA] opacity-15 rounded-full blur-2xl translate-y-1/2"></div>
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#1A1341] opacity-5 rounded-full blur-2xl"></div>
                
                {/* Línea decorativa de separación */}
                <div className="absolute top-[30%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6290C3] to-transparent opacity-20"></div>
                {/* Línea decorativa inferior */}
                <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1A1341] to-transparent opacity-10"></div>
            </div>

            {/* Contenido principal con margen superior apropiado para navbar h-36 */}
            <div className="relative z-10 px-4 py-20 lg:py-32 pt-44 lg:pt-48">
                <div className="container mx-auto">
                    {/* Header de la página */}
                    <div className="text-center mb-16 lg:mb-20">
                        <div className="inline-block bg-[#C2E7DA] text-[#1A1341] px-6 py-2 rounded-full text-sm font-medium mb-6">
                            Estamos aquí para ayudarte
                        </div>
                        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight">
                            Hablemos sobre tu próxima{" "}
                            <span className="text-[#6290C3]">inversión</span>
                        </h1>
                        <p className="text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                            Nuestro equipo de especialistas está listo para resolver tus dudas 
                            y guiarte en el mundo de las inversiones inmobiliarias.
                        </p>
                    </div>

                    {/* Formulario de contacto */}
                    <ContactForm />

                    {/* Sección de confianza adicional */}
                    <div className="mt-20 lg:mt-32 text-center">
                        <div className="bg-white/80 backdrop-blur-sm border border-white/40 rounded-2xl p-8 lg:p-12 shadow-xl max-w-4xl mx-auto">
                            <h2 className="text-2xl lg:text-3xl font-bold text-[#1A1341] mb-6">
                                ¿Por qué confiar en nosotros?
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                                <div className="text-center space-y-3">
                                    <div className="bg-[#C2E7DA] w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                                        <Handshake className="w-8 h-8 text-[#1A1341]" />
                                    </div>
                                    <h3 className="font-semibold text-[#1A1341]">Compromiso personal</h3>
                                    <p className="text-gray-600 text-sm">Tratamos tu inversión como si fuera nuestra</p>
                                </div>
                                <div className="text-center space-y-3">
                                    <div className="bg-[#C2E7DA] w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                                        <Shield className="w-8 h-8 text-[#1A1341]" />
                                    </div>
                                    <h3 className="font-semibold text-[#1A1341]">Transparencia total</h3>
                                    <p className="text-gray-600 text-sm">Información clara y honesta en cada paso del proceso</p>
                                </div>
                                <div className="text-center space-y-3">
                                    <div className="bg-[#C2E7DA] w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                                        <Phone className="w-8 h-8 text-[#1A1341]" />
                                    </div>
                                    <h3 className="font-semibold text-[#1A1341]">Acompañamiento continuo</h3>
                                    <p className="text-gray-600 text-sm">Te informamos en cada fase del proyecto</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}