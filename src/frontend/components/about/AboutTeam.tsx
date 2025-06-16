/**
 * AboutTeam.tsx
 *
 * Componente "Nuestro Equipo" para la página Sobre Nosotros.
 * Presenta las características del equipo especializado con iconos y descripción.
 * Grid responsive con 4 características principales del equipo legal.
 */

import Icon from "@/components/ui/Icon";
import { Users, Award, BookOpen, Heart } from "lucide-react";

const AboutTeam = () => {
    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1b2f4b] mb-8"
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: '800',
                            letterSpacing: '-0.02em'
                        }}
                    >
                        Especialistas en cada área legal
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#1DA1F2] to-[#60A5FA] mx-auto mb-8 rounded-full" />
                    <div className="max-w-5xl mx-auto">
                        <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 leading-relaxed font-light">
                            Nuestro equipo multidisciplinar cuenta con abogados especializados en cada rama del derecho. 
                            Desde derecho laboral hasta extranjería, pasando por herencias y derecho penal, cada caso es 
                            atendido por el profesional con mayor experiencia en esa materia específica.
                            <span className="block mt-4 font-semibold text-[#1b2f4b] text-lg sm:text-xl lg:text-2xl">
                                Creemos en la especialización como garantía de excelencia.
                            </span>
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 max-w-6xl mx-auto">
                    <div className="text-center">
                        <Icon size="large" blur="md" centered className="mb-6">
                            <Award />
                        </Icon>
                        <h3 className="text-xl font-bold text-[#1b2f4b] mb-3">Experiencia demostrada</h3>
                        <p className="text-gray-600">Años de práctica en tribunales españoles</p>
                    </div>

                    <div className="text-center">
                        <Icon size="large" blur="md" centered className="mb-6">
                            <BookOpen />
                        </Icon>
                        <h3 className="text-xl font-bold text-[#1b2f4b] mb-3">Formación continua</h3>
                        <p className="text-gray-600">Actualización constante en legislación</p>
                    </div>

                    <div className="text-center">
                        <Icon size="large" blur="md" centered className="mb-6">
                            <Users />
                        </Icon>
                        <h3 className="text-xl font-bold text-[#1b2f4b] mb-3">Red de colaboradores</h3>
                        <p className="text-gray-600">Especialistas en áreas muy específicas</p>
                    </div>

                    <div className="text-center">
                        <Icon size="large" blur="md" centered className="mb-6">
                            <Heart />
                        </Icon>
                        <h3 className="text-xl font-bold text-[#1b2f4b] mb-3">Enfoque humano</h3>
                        <p className="text-gray-600">Tratamos personas, no expedientes</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutTeam;