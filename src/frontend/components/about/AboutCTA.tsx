/**
 * AboutCTA.tsx
 *
 * Componente Call to Action final para la página Sobre Nosotros.
 * Sección con fondo gradiente LHC que invita al usuario a contactar.
 * Layout responsive diferente para móvil y desktop:
 * - Móvil: Imagen arriba completa, texto abajo separado de la cara
 * - Desktop: Imagen izquierda con gradiente lateral, texto a la derecha
 */

import Link from "next/link";
import Button from "@/components/ui/Button";

const AboutCTA = () => {
    return (
        <section className="py-20 lg:py-32 relative overflow-hidden">
            {/* Fondo gradiente base */}
            <div className="absolute inset-0 bg-lhc-gradient" />

            {/* LAYOUT MÓVIL: Imagen arriba 100% + gradiente abajo */}
            <div className="absolute inset-0 lg:hidden">
                {/* Imagen ocupando toda la parte superior */}
                <div
                    className="absolute top-0 left-0 w-full h-96 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749855626/abogada-micro_mnnrn3.webp')`,
                        backgroundPosition: '20% top',
                        backgroundSize: 'cover'
                    }}
                />
                {/* Gradiente vertical que empieza más abajo para separar texto de la cara */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(to bottom, 
                            transparent 0%, 
                            transparent 50%, 
                            rgba(15, 23, 42, 0.3) 60%, 
                            rgba(15, 23, 42, 0.6) 70%, 
                            rgba(15, 23, 42, 0.8) 80%, 
                            rgba(15, 23, 42, 0.95) 90%, 
                            rgba(15, 23, 42, 1) 100%
                        )`
                    }}
                />
            </div>

            {/* LAYOUT DESKTOP: Imagen izquierda + gradiente lateral */}
            <div className="absolute inset-0 hidden lg:block">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749855626/abogada-micro_mnnrn3.webp')`,
                        backgroundPosition: 'left top',
                        backgroundSize: '60%'
                    }}
                />
                {/* Gradiente lateral para desktop */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(to right, 
                            rgba(15, 23, 42, 0.1) 0%, 
                            rgba(15, 23, 42, 0.2) 10%, 
                            rgba(15, 23, 42, 0.3) 20%, 
                            rgba(15, 23, 42, 0.4) 30%, 
                            rgba(15, 23, 42, 0.6) 40%, 
                            rgba(15, 23, 42, 0.8) 50%, 
                            rgba(15, 23, 42, 1) 60%
                        )`
                    }}
                />
            </div>

            <div className="relative z-10">
                <div className="container mx-auto px-6 lg:px-8">
                    {/* CONTENIDO RESPONSIVE - Texto muy abajo en móvil */}
                    <div className="text-center lg:text-left lg:ml-auto lg:max-w-3xl pt-96 sm:pt-[28rem] lg:pt-0">
                        <h2
                            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 lg:mb-8"
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: '800',
                                letterSpacing: '-0.02em',
                                textShadow: '0 4px 20px rgba(0,0,0,0.3)'
                            }}
                        >
                            Conoce cómo nuestro equipo puede ayudarte
                        </h2>

                        <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-white/90 mb-6 lg:mb-8 font-light leading-relaxed">
                            con tu situación específica. Primera consulta completamente gratuita.
                        </p>

                        <Link href="/contact">
                            <Button variant="outline" size="lg" className="shadow-2xl">
                                Contactar ahora
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutCTA;