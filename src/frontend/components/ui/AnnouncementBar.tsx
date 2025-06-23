/**
 * AnnouncementBar.tsx
 *
 * Barra informativa superior para LHC Legal & Consulting.
 * Incluye mensaje + botón CTA usando nuestro componente Button.
 * Diseño corporativo, semántico y responsive.
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Scale, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

interface AnnouncementBarProps {
    message?: string;
    ctaText?: string;
    ctaLink?: string;
    isVisible?: boolean;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
    message = "Primera consulta gratuita - Respuesta garantizada en 24h",
    ctaText = "Contacta ahora",
    ctaLink = "/contact",
    isVisible = true
}) => {
    const router = useRouter();
    if (!isVisible) return null;

    return (
        <div className="w-full bg-emerald-600 text-white py-3 shadow-sm relative overflow-hidden">
            {/* Patrón decorativo de fondo */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '30px 30px'
                    }}
                />
            </div>

            <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-24">
                <div className="flex items-center justify-center gap-4 text-center sm:text-left">

                    {/* Icono corporativo */}
                    <div className="hidden sm:flex items-center justify-center w-8 h-8 bg-white/20 rounded-full">
                        <Scale size={16} className="text-white" />
                    </div>

                    {/* Mensaje visible */}
                    <div className="flex-1">
                        <p className="text-sm sm:text-base font-medium tracking-wide">
                            {message}
                        </p>
                    </div>

                    {/* Botón CTA personalizado */}
                    <div className="flex-shrink-0">
                        <Button
                            onClick={() => router.push(ctaLink)}
                            icon={<ArrowRight size={16} />}
                            iconPosition="right"
                            variant="outline"
                            size="sm"
                        >
                            {ctaText}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementBar;
