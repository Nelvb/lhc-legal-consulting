/**
 * /areas/page.tsx
 *
 * Página principal de áreas legales con layout sidebar + contenido.
 * Botones actualizados usando el componente Button con diseño responsive.
 * CTA diferenciado y professional para evitar redundancia con "consulta gratuita".
 */

import type { Metadata } from "next";
import Link from "next/link";
import AreasHero from "@/components/areas/AreasHero";
import LegalAreasSidebar from "@/components/areas/LegalAreasSidebar";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
    title: "Todas las Áreas Legales | LHC Legal & Consulting - Abogados Especialistas",
    description: "Servicios de asesoría legal profesional en todas las áreas del derecho. Derecho laboral, civil, penal, extranjería, bancario, mercantil, fiscal y administrativo. Consulta gratuita.",
    keywords: "áreas legales, servicios jurídicos, abogados especialistas, asesoría legal, LHC Legal Madrid",
    openGraph: {
        title: "Todas las Áreas Legales | LHC Legal & Consulting",
        description: "Servicios de asesoría legal profesional en todas las áreas del derecho. Consulta gratuita.",
        type: "website",
        url: "https://lhclegal.es/areas",
    },
    alternates: {
        canonical: "https://lhclegal.es/areas",
    },
};

export default function AreasPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <AreasHero />

            {/* Layout Principal: Sidebar + Contenido */}
            <div className="flex flex-col lg:flex-row">
                {/* Sidebar - Áreas legales en columna */}
                <div className="lg:w-1/4 bg-white shadow-lg">
                    <LegalAreasSidebar />
                </div>

                {/* Contenido Principal */}
                <div className="flex-1 lg:w-3/4 bg-gradient-to-b from-white to-gray-50">
                    <div className="container mx-auto px-6 lg:px-8 py-16">

                        {/* Título principal */}
                        <div className="max-w-4xl mx-auto mb-12">
                            <h2
                                className="text-3xl lg:text-4xl font-bold text-[#1b2f4b] mb-6"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                Áreas de Actuación del Despacho
                            </h2>

                            <div className="w-24 h-1 bg-gradient-to-r from-[#1DA1F2] to-[#60A5FA] mb-8 rounded-full" />
                        </div>

                        {/* Contenido descriptivo profesional */}
                        <div className="max-w-4xl mx-auto space-y-8">

                            {/* Párrafo principal */}
                            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg border border-gray-100">
                                <p
                                    className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-6"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    <strong className="text-[#1b2f4b]">LHC Legal & Consulting</strong> abarca prácticamente todas las ramas del Derecho,
                                    encontrándose especialmente especializado en aquellas áreas que vienen avaladas por la confianza
                                    de nuestros clientes y los procedimientos que hemos estado defendiendo exitosamente durante los últimos años.
                                </p>

                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Nuestro enfoque combina <strong>dinamismo y experiencia</strong>, ofreciendo un trato cercano y personalizado
                                    sin renunciar al máximo rigor profesional que exige cada caso.
                                </p>
                            </div>

                            {/* Nuestra orientación */}
                            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg border border-gray-100">
                                <h3
                                    className="text-2xl lg:text-3xl font-bold text-[#1b2f4b] mb-6"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    Nuestra Orientación Profesional
                                </h3>

                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-2 h-2 bg-[#1DA1F2] rounded-full mt-3 flex-shrink-0"></div>
                                        <p className="text-gray-700 leading-relaxed">
                                            <strong>Defensa integral:</strong> Asumimos la defensa, acusación y asesoramiento legal,
                                            así como la elaboración de dictámenes especializados en cuestiones del Derecho civil,
                                            mercantil, administrativo, penal y constitucional.
                                        </p>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="w-2 h-2 bg-[#1DA1F2] rounded-full mt-3 flex-shrink-0"></div>
                                        <p className="text-gray-700 leading-relaxed">
                                            <strong>Asesoramiento empresarial:</strong> Prestamos servicios tanto a particulares como a empresas
                                            y administraciones públicas, adaptando nuestro enfoque a las necesidades específicas de cada cliente.
                                        </p>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="w-2 h-2 bg-[#1DA1F2] rounded-full mt-3 flex-shrink-0"></div>
                                        <p className="text-gray-700 leading-relaxed">
                                            <strong>Prevención legal:</strong> Ofrecemos asesoramiento preventivo para evitar futuras responsabilidades,
                                            porque sabemos que <em>prevenir siempre es mejor que curar</em>.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Lo que nos diferencia */}
                            <div className="bg-gradient-to-br from-[#1DA1F2]/5 to-[#1b2f4b]/5 rounded-2xl p-8 lg:p-12 border border-[#1DA1F2]/20">
                                <h3
                                    className="text-2xl lg:text-3xl font-bold text-[#1b2f4b] mb-6"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    Lo que nos hace diferentes
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-[#1DA1F2] rounded-full flex items-center justify-center">
                                                <span className="text-white font-bold text-sm">✓</span>
                                            </div>
                                            <span className="font-semibold text-[#1b2f4b]">Respuesta en 24h garantizada</span>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-[#1DA1F2] rounded-full flex items-center justify-center">
                                                <span className="text-white font-bold text-sm">✓</span>
                                            </div>
                                            <span className="font-semibold text-[#1b2f4b]">Primera consulta gratuita</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-[#1DA1F2] rounded-full flex items-center justify-center">
                                                <span className="text-white font-bold text-sm">✓</span>
                                            </div>
                                            <span className="font-semibold text-[#1b2f4b]">Equipo dinámico y especializado</span>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-[#1DA1F2] rounded-full flex items-center justify-center">
                                                <span className="text-white font-bold text-sm">✓</span>
                                            </div>
                                            <span className="font-semibold text-[#1b2f4b]">Transparencia total</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="text-center bg-white rounded-2xl p-8 lg:p-12 shadow-lg border border-gray-100">
                                <h3
                                    className="text-2xl lg:text-3xl font-bold text-[#1b2f4b] mb-4"
                                    style={{ fontFamily: "'Inter', sans-serif" }}
                                >
                                    ¿Necesitas asesoramiento especializado?
                                </h3>

                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    Explora nuestras áreas de práctica o solicita una consulta personalizada para casos específicos.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                    <Link href="/contact">
                                        <Button variant="lhc" size="md">
                                            Realizar Consulta
                                        </Button>
                                    </Link>

                                    {/* Móvil: Botón clickeable */}
                                    <a href="tel:+34691818071" className="md:hidden">
                                        <Button variant="outline" size="md">
                                            Llamar Ahora
                                        </Button>
                                    </a>

                                    {/* Desktop/Tablet: Solo texto con número destacado */}
                                    <div className="hidden md:flex items-center text-[#1b2f4b] font-semibold text-lg">
                                        O llama al <span className="text-[#1DA1F2] ml-1">691 81 80 71</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menú móvil de áreas legales */}
            <div className="lg:hidden bg-gray-50 border-t border-gray-200">
                <div className="container mx-auto px-4 py-4">
                    <details className="group">
                        <summary className="flex items-center justify-between cursor-pointer text-[#1b2f4b] font-semibold">
                            <span>Ver Todas las Áreas Legales</span>
                            <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </summary>
                        <div className="mt-4">
                            <LegalAreasSidebar className="shadow-none" />
                        </div>
                    </details>
                </div>
            </div>
        </main>
    );
}