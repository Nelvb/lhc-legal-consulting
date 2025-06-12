/**
 * ContactHomeCTA.tsx
 * 
 * Sección final de contacto para el home de LHC Legal & Consulting.
 * Diseño fresco y joven con gradientes corporativos. Usa ContactFormHome
 * para el formulario y se enfoca en el layout, imagen y características.
 * Estructura: Imagen + Formulario pegados (70/30) + Características centradas debajo.
 */

'use client';

import React from 'react';
import ContactFormHome from './ContactFormHome';

const ContactHomeCTA: React.FC = () => {
    return (
        <section className="w-full relative overflow-hidden">
            {/* Fondo con gradientes corporativos */}
            <div
                className="absolute inset-0"
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
            />

            {/* Contenido principal */}
            <div className="relative z-10 py-20 lg:py-32">
                <div className="max-w-none mx-auto px-6 lg:px-8">

                    {/* Bloque imagen + formulario pegados (70/30) */}
                    <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl">

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
                    <div className="mt-16 lg:mt-20 flex justify-center">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-4xl">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-white mb-2">Respuesta garantizada</h3>
                                <p className="text-white/80 text-sm">En menos de 24 horas</p>
                            </div>

                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-white mb-2">Sin compromisos</h3>
                                <p className="text-white/80 text-sm">Consulta completamente gratuita</p>
                            </div>

                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-white mb-2">Equipo especializado</h3>
                                <p className="text-white/80 text-sm">Profesionales expertos</p>
                            </div>

                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
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