/**
 * AboutWhoWeAre.tsx
 *
 * Componente "Quiénes somos" para la página Sobre Nosotros.
 * Presenta la misión y estilo del despacho de forma cercana y profesional.
 * Animación de entrada del bloque de contenido con useInView.
 */

'use client';

import { useInView } from '@/hooks/useInView';

const AboutWhoWeAre = () => {
    const { ref, inView } = useInView({
        threshold: 0.4,
        triggerOnce: true,
    });

    return (
        <section className="py-16 lg:py-24 relative overflow-hidden">
            {/* Fondo gradiente LHC fijo */}
            <div className="absolute inset-0 bg-lhc-gradient" />

            {/* Contenido animado */}
            <div className="relative z-10">
                <div
                    ref={ref}
                    className={`container mx-auto px-6 lg:px-8 max-w-5xl text-center transition-all duration-700 transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                        }`}
                >
                    <h2
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-10"
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: '800',
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Quiénes somos
                    </h2>

                    <div className="w-24 h-1 bg-gradient-to-r from-[#1DA1F2] to-[#60A5FA] mx-auto mb-10 rounded-full" />

                    <p className="text-lg lg:text-xl text-white/95 leading-relaxed">
                        LHC Legal & Consulting nació con una misión clara: ofrecer un enfoque legal moderno, cercano y eficaz.
                        Apostamos por la especialización, la transparencia y el acompañamiento real en cada proceso. Nuestro
                        compromiso no se basa solo en la experiencia técnica, sino en la forma en que acompañamos a nuestros
                        clientes: con claridad, humanidad y responsabilidad. Creemos que un buen asesoramiento legal no empieza
                        en los tribunales, sino en la manera en que te escuchamos desde el primer momento.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutWhoWeAre;
