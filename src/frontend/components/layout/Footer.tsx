/**
 * Footer.tsx
 *
 * Footer principal para LHC Legal & Consulting con diseño corporativo profesional.
 * Incluye navegación por áreas legales, información de contacto y enlaces legales obligatorios.
 * Gradiente corporativo LHC con tipografía Inter y estructura responsive completa.
 * Optimizado para SEO y cumplimiento legal con enlaces a políticas de privacidad.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { Phone, Mail, Clock, MapPin, ExternalLink } from 'lucide-react';

/**
 * Footer corporativo con información completa de LHC Legal & Consulting
 * Diseño responsive con 4 columnas en desktop y stack en móvil
 */
const Footer: React.FC = () => {
    // Áreas legales para navegación
    const legalAreas = [
        { name: 'Derecho Civil', href: '/areas/derecho-civil' },
        { name: 'Derecho Laboral', href: '/areas/derecho-laboral' },
        { name: 'Derecho Penal', href: '/areas/derecho-penal' },
        { name: 'Derecho Administrativo', href: '/areas/derecho-administrativo' },
        { name: 'Derecho Bancario', href: '/areas/derecho-bancario' },
        { name: 'Derecho de Extranjería', href: '/areas/derecho-extranjeria' },
        { name: 'Derecho Fiscal', href: '/areas/derecho-fiscal' },
        { name: 'Derecho Mercantil', href: '/areas/derecho-mercantil' }
    ];

    // Enlaces de recursos
    const resources = [
        { name: 'Blog Legal', href: '/blog' },
        { name: 'Preguntas Frecuentes', href: '/faq' },
        { name: 'Sobre Nosotros', href: '/about-us' },
        { name: 'Nuestras Áreas', href: '/areas' }
    ];

    // Enlaces legales obligatorios
    const legalLinks = [
        { name: 'Aviso Legal', href: '/legal/aviso-legal' },
        { name: 'Política de Privacidad', href: '/legal/politica-privacidad' },
        { name: 'Política de Cookies', href: '/legal/cookies' }
    ];

    return (
        <footer
            className="relative overflow-hidden"
            style={{
                background: `
                linear-gradient(135deg, 
                    #0f172a 0%, 
                    #1b2f4b 30%, 
                    #2c4a6b 70%, 
                    #1b2f4b 100%
                )
            `
            }}
        >
            {/* Elementos decorativos de fondo */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#1DA1F2]/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
                {/* Contenido principal del footer */}
                <div className="container mx-auto px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

                        {/* Columna 1: Marca y Descripción */}
                        <div className="lg:col-span-1">
                            {/* Logo */}
                            <div className="mb-6">
                                <Image
                                    src="https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749048011/Logo_horizontal-removebg-preview_pm2q1z.webp"
                                    alt="LHC Legal & Consulting - Despacho de Abogados Madrid"
                                    width={200}
                                    height={80}
                                    className="h-12 w-auto brightness-0 invert"
                                    priority={false}
                                />
                            </div>

                            {/* Descripción */}
                            <p className="text-gray-200 text-sm leading-relaxed mb-6 text-justify [text-justify:inter-word] hyphens-auto max-w-prose mx-auto">

                                Asesoría legal moderna y cercana especializada en todas las ramas del derecho.
                                Ofrecemos soluciones jurídicas profesionales con un enfoque humano y transparente.
                            </p>

                            {/* Ubicación */}
                            <div className="flex items-center gap-2 text-gray-300 text-sm">
                                <MapPin className="w-4 h-4 text-[#1DA1F2]" />
                                <span>Madrid, España</span>
                            </div>
                        </div>

                            {/* Nuestras Especialidades */}
                       <div>
  <h3 className="text-white font-bold text-lg mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
    Nuestras Especialidades
  </h3>

  <div className="grid grid-cols-2 gap-x-6">
    <ul className="space-y-3 pl-1">
      {legalAreas.slice(0, 4).map((area) => (
        <li key={area.href}>
          <Link
            href={area.href}
            className="text-gray-300 hover:text-[#1DA1F2] transition-colors duration-300 text-sm"
          >
            {area.name}
          </Link>
        </li>
      ))}
    </ul>

    <ul className="space-y-3 pl-1">
      {legalAreas.slice(4).map((area) => (
        <li key={area.href}>
          <Link
            href={area.href}
            className="text-gray-300 hover:text-[#1DA1F2] transition-colors duration-300 text-sm"
          >
            {area.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
</div>


                        {/* Columna 3: Recursos */}
                        <div>
                            <h3 className="text-white font-bold text-lg mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                                Recursos
                            </h3>
                            <ul className="space-y-3">
                                {resources.map((resource) => (
                                    <li key={resource.href}>
                                        <Link
                                            href={resource.href}
                                            className="text-gray-300 hover:text-[#1DA1F2] transition-colors duration-300 text-sm"
                                        >
                                            {resource.name}
                                        </Link>
                                    </li>
                                ))}

                                {/* CTA destacado */}
                                <li className="pt-2">
                                    <Link href="/contact" passHref>
                                        <Button
                                            variant="lhc"
                                            size="sm"
                                            className="text-sm gap-1 px-4 py-2"
                                        >
                                            Primera Consulta Gratuita
                                        </Button>
                                    </Link>

                                </li>
                            </ul>
                        </div>

                        {/* Columna 4: Contacto */}
                        <div>
                            <h3 className="text-white font-bold text-lg mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                                Contacto
                            </h3>
                            <div className="space-y-4">
                                {/* WhatsApp */}
                                <div className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-[#1DA1F2] flex-shrink-0" />
                                    <div>
                                        <p className="text-gray-300 text-sm">WhatsApp</p>
                                        <a
                                            href="https://wa.me/34691818071"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white hover:text-[#1DA1F2] transition-colors duration-300 text-sm font-medium"
                                        >
                                            +34 691 818 071
                                        </a>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4 text-[#1DA1F2] flex-shrink-0" />
                                    <div>
                                        <p className="text-gray-300 text-sm">Email</p>
                                        <a
                                            href="mailto:lhclegalandconsulting@gmail.com"
                                            className="text-white hover:text-[#1DA1F2] transition-colors duration-300 text-sm font-medium break-all"
                                        >
                                            lhclegalandconsulting@gmail.com
                                        </a>
                                    </div>
                                </div>

                                {/* Horario */}
                                <div className="flex items-center gap-3">
                                    <Clock className="w-4 h-4 text-[#1DA1F2] flex-shrink-0" />
                                    <div>
                                        <p className="text-gray-300 text-sm">Horario</p>
                                        <p className="text-white text-sm">Lunes - Viernes</p>
                                        <p className="text-white text-sm">9:00 - 19:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Barra inferior con copyright y enlaces legales */}
                <div className="border-t border-white/20">
                    <div className="container mx-auto px-6 lg:px-8 py-6">
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                            {/* Copyright */}
                            <div className="text-gray-300 text-sm text-center lg:text-left">
                                © 2025 LHC Legal & Consulting. Todos los derechos reservados.
                            </div>

                            {/* Enlaces legales */}
                            <div className="flex flex-wrap justify-center lg:justify-end gap-6">
                                {legalLinks.map((link, index) => (
                                    <React.Fragment key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-300 hover:text-[#1DA1F2] transition-colors duration-300 text-sm"
                                        >
                                            {link.name}
                                        </Link>
                                        {index < legalLinks.length - 1 && (
                                            <span className="text-gray-500">|</span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        {/* Mensaje inspiracional */}
                        <div className="text-center mt-4 pt-4 border-t border-white/10">
                            <p className="text-gray-400 text-xs">
                                Diseñado con dedicación para hacer la justicia más accesible
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;