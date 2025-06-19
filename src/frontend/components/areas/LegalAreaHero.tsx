/**
 * LegalAreaHero.tsx
 *
 * Hero section para páginas específicas de áreas legales (/areas/[slug]).
 * Gradiente personalizado con el color específico del área legal.
 * Botones CTA dinámicos desde los datos JSON del área.
 */

'use client';

import React from 'react';

interface LegalAreaHeroProps {
    areaTitle: string;
    areaDescription: string;
    areaColor: string;
    cta: {
        primaryButton: {
            text: string;
            action: 'contact' | 'phone' | 'whatsapp' | 'form';
            value?: string;
        };
        secondaryButton?: {
            text: string;
            action: 'contact' | 'phone' | 'whatsapp' | 'form';
            value?: string;
        };
    };
    className?: string;
}

const LegalAreaHero: React.FC<LegalAreaHeroProps> = ({
    areaTitle,
    areaDescription,
    areaColor,
    cta,
    className = ""
}) => {

    const handleButtonClick = (button: { action: string; value?: string }) => {
        switch (button.action) {
            case 'contact':
                window.location.href = '/contacto';
                break;
            case 'phone':
                window.location.href = `tel:${button.value}`;
                break;
            case 'whatsapp':
                window.open(`https://wa.me/${button.value}`, '_blank');
                break;
            case 'form':
                window.location.href = '/contacto';
                break;
        }
    };

    return (
        <section className={`relative overflow-hidden ${className}`}>
            {/* Fondo gradiente con color específico del área */}
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(135deg, #1b2f4b 0%, ${areaColor} 50%, #1b2f4b 100%)`
                }}
            />

            <div className="relative z-10 py-20 lg:py-32">
                <div className="container mx-auto px-6 lg:px-8 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1
                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8"
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: '800',
                                letterSpacing: '-0.02em',
                                textShadow: '0 4px 20px rgba(0,0,0,0.3)'
                            }}
                        >
                            {areaTitle.split(' ')[0]}{" "}
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1DA1F2] via-[#60A5FA] to-[#1DA1F2] mt-4 animate-pulse pb-2">
                                {areaTitle.split(' ').slice(1).join(' ')}
                            </span>
                        </h1>

                        <div className="w-24 h-1 bg-gradient-to-r from-[#1DA1F2] to-[#60A5FA] mx-auto mb-8 rounded-full" />

                        <p className="text-xl sm:text-2xl lg:text-3xl text-white/95 leading-relaxed font-light mb-8">
                            {areaDescription}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LegalAreaHero;