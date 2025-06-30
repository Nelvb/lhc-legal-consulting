/**
 * ContactHomeCTA.tsx
 * 
 * Sección final de contacto para el home de LHC Legal & Consulting.
 * Diseño fresco y joven con gradientes corporativos y animaciones uniformes.
 * Estructura: Imagen + Formulario pegados (70/30) + Características centradas debajo.
 * Cada sección se anima independientemente al entrar en viewport.
 */

'use client';

import React from 'react';
import { useInView } from '@/hooks/useInView';
import ContactFormHome from './ContactFormHome';
import Icon from '@/components/ui/Icon';
import { Clock, CheckCircle, Users, FileText } from 'lucide-react';

const ContactHomeCTA: React.FC = () => {
    // Animación para el bloque principal (imagen + formulario)
    const { ref: mainRef, inView: mainInView } = useInView({ threshold: 0.3 });
    
    // Animación para las características
    const { ref: featuresRef, inView: featuresInView } = useInView({ threshold: 0.5 });

    return (
        <section className="w-full relative overflow-hidden">
            {/* Fondo con gradientes corporativos */}
            <div className="absolute inset-0 bg-lhc-gradient" />

            {/* Contenido principal */}
            <div className="relative z-10 py-20 lg:py-32">
                <div className="max-w-none mx-auto px-6 lg:px-8">

                    {/* Bloque imagen + formulario pegados (70/30) */}
                    <div 
                        ref={mainRef}
                        className={`
                            flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl
                            transition-all duration-700 transform
                            ${mainInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                        `}
                    >
                        {/* Imagen con texto superpuesto (70%) */}
                        <div className="relative lg:w-[70%]">
                            <div className="relative w-full h-[400px] lg:h-[600px]">
                                <img
                                    src="https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749640954/chica-sonriendo-cta-contact_obvqqc.webp"
                                    alt="Asesora legal profesional - LHC Legal & Consulting"
                                    className="w-full h-full object-cover"
                                />

                                {/* Overlay para legibilidad */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

                                {/* Texto superpuesto */}
                                <div className="absolute inset-0 flex items-center">
                                    <div className="p-8 lg:p-12 max-w-2xl">
                                        <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
                                            Resolvemos tu <span className="font-black">problema legal</span>
                                        </h2>

                                        <p className="text-lg lg:text-xl xl:text-2xl text-white/95 leading-relaxed mb-6">
                                            Te contactamos en menos de 24h y resolvemos tus dudas sin compromiso.
                                        </p>

                                        <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium">
                                            Primera consulta gratuita
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Formulario de contacto (componente separado) */}
                        <ContactFormHome />
                    </div>

                    {/* Características centradas debajo */}
                    <div 
                        ref={featuresRef}
                        className={`
                            mt-16 lg:mt-20 flex justify-center
                            transition-all duration-700 transform
                            ${featuresInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                        `}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-4xl">
                            <div className="text-center">
                                <Icon size="large" transparent className="mb-4">
                                    <Clock />
                                </Icon>
                                <h3 className="font-bold text-white mb-2">Respuesta garantizada</h3>
                                <p className="text-white/80 text-sm">En menos de 24 horas</p>
                            </div>

                            <div className="text-center">
                                <Icon size="large" transparent className="mb-4">
                                    <CheckCircle />
                                </Icon>
                                <h3 className="font-bold text-white mb-2">Sin compromisos</h3>
                                <p className="text-white/80 text-sm">Consulta completamente gratuita</p>
                            </div>

                            <div className="text-center">
                                <Icon size="large" transparent className="mb-4">
                                    <Users />
                                </Icon>
                                <h3 className="font-bold text-white mb-2">Equipo especializado</h3>
                                <p className="text-white/80 text-sm">Profesionales expertos</p>
                            </div>

                            <div className="text-center">
                                <Icon size="large" transparent className="mb-4">
                                    <FileText />
                                </Icon>
                                <h3 className="font-bold text-white mb-2">Transparencia total</h3>
                                <p className="text-white/80 text-sm">Sin letra pequeña</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactHomeCTA;