/**
 * /areas/page.tsx
 *
 * Página principal de áreas legales con layout sidebar + contenido.
 * Server Component que mantiene metadata para SEO óptimo.
 * Las animaciones están delegadas a AreasPageContent (Client Component).
 */

import type { Metadata } from "next";
import AreasHero from "@/components/areas/AreasHero";
import LegalAreasSidebar from "@/components/areas/LegalAreasSidebar";
import AreasPageContent from "@/components/areas/AreasPageContent";

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

                {/* Contenido Principal con animaciones */}
                <div className="flex-1 lg:w-3/4 bg-gradient-to-b from-white to-gray-50">
                    <AreasPageContent />
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