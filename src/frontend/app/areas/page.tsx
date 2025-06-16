/**
 * /areas/page.tsx
 *
 * Página principal de áreas legales con layout sidebar + contenido.
 * Sidebar: Cards en columna sin márgenes (pegadas) de todas las áreas.
 * Contenido: Descripción profesional, cercana y joven de LHC Legal.
 */

import type { Metadata } from "next";
import LegalAreasSidebar from "@/components/areas/LegalAreasSidebar";

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
            <section className="relative overflow-hidden">
                {/* Fondo gradiente */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(135deg, #1b2f4b 0%, #1DA1F2 50%, #1b2f4b 100%)`
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
                                Nuestras Áreas{" "}
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1DA1F2] via-[#60A5FA] to-[#1DA1F2] mt-4 animate-pulse pb-2">
                                    Legales
                                </span>
                            </h1>

                            <div className="w-24 h-1 bg-gradient-to-r from-[#1DA1F2] to-[#60A5FA] mx-auto mb-8 rounded-full" />

                            <p className="text-xl sm:text-2xl lg:text-3xl text-white/95 leading-relaxed font-light">
                                Especialistas en todas las ramas del derecho con enfoque cercano y profesional
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Layout Principal: Sidebar + Contenido */}
            <div className="flex flex-col lg:flex-row">
                {/* Sidebar - Áreas legales en columna */}
                <div className="lg:w-1/4 bg-white shadow-lg">
                    <div className="sticky top-0">
                        <LegalAreasSidebar />
                    </div>
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
                                    Nuestro enfoque combina <strong>juventud y experiencia</strong>, ofreciendo un trato cercano y personalizado
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
                                            <span className="font-semibold text-[#1b2f4b]">Equipo joven y especializado</span>
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
                                    ¿Necesitas asesoramiento legal?
                                </h3>

                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    Selecciona tu área legal en el menú de la izquierda o contáctanos directamente
                                    para una consulta personalizada.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a
                                        href="/contacto"
                                        className="bg-[#1DA1F2] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#1b8fd1] transition-colors duration-300 shadow-lg inline-block"
                                    >
                                        Consulta Gratuita
                                    </a>

                                    <a
                                        href="tel:+34691818071"
                                        className="border-2 border-[#1DA1F2] text-[#1DA1F2] font-semibold px-8 py-4 rounded-lg hover:bg-[#1DA1F2] hover:text-white transition-all duration-300 inline-block"
                                    >
                                        Llamar Ahora
                                    </a>
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