/**
 * page.tsx - Política de Cookies (/legal/cookies)
 *
 * Política de cookies para LHC Legal & Consulting conforme a la normativa europea.
 * Información detallada sobre tipos de cookies, finalidades, duración y gestión.
 * Actualizada a enero 2025 cumpliendo con ePrivacy y RGPD.
 */

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Política de Cookies - LHC Legal & Consulting',
    description: 'Política de cookies de LHC Legal & Consulting. Información sobre el uso de cookies en nuestro sitio web y cómo gestionarlas.',
    robots: { index: true, follow: true }
};

const CookiesPage = () => {
    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <section className="bg-gradient-to-r from-[#1b2f4b] to-[#1DA1F2] py-16 px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Política de Cookies
                    </h1>
                    <p className="text-xl text-blue-100">
                        Información sobre el uso de cookies en nuestro sitio web
                    </p>
                </div>
            </section>

            {/* Contenido */}
            <section className="py-16 px-6 lg:px-8">
                <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
                    
                    <div className="mb-8 p-6 bg-blue-50 rounded-lg border-l-4 border-[#1DA1F2]">
                        <p className="text-sm text-gray-600 mb-2">
                            <strong>Última actualización:</strong> Enero 2025
                        </p>
                        <p className="text-sm text-gray-600">
                            En cumplimiento de la Directiva 2009/136/CE y el Reglamento General de Protección de Datos (RGPD).
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">1. ¿Qué son las Cookies?</h2>
                    <p className="mb-4">
                        Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Permiten que el sitio web recuerde sus acciones y preferencias durante un período de tiempo, mejorando su experiencia de navegación.
                    </p>
                    <p className="mb-6">
                        Las cookies no dañan su dispositivo ni contienen virus. Son completamente seguras y se pueden eliminar en cualquier momento desde la configuración de su navegador.
                    </p>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">2. Tipos de Cookies que Utilizamos</h2>
                    
                    <div className="space-y-6 mb-8">
                        <div className="border border-gray-200 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-[#1b2f4b] mb-3">🔧 Cookies Técnicas (Necesarias)</h3>
                            <p className="mb-3">Son imprescindibles para el funcionamiento del sitio web. No requieren consentimiento.</p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p><strong>Finalidad:</strong> Navegación básica, seguridad, recordar sesión</p>
                                <p><strong>Duración:</strong> Durante la sesión de navegación</p>
                                <p><strong>Ejemplos:</strong> Cookies de sesión, preferencias de idioma, carrito de compras</p>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-[#1b2f4b] mb-3">📊 Cookies Analíticas</h3>
                            <p className="mb-3">Nos ayudan a entender cómo los visitantes interactúan con el sitio web.</p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p><strong>Finalidad:</strong> Estadísticas de uso, mejora del sitio web</p>
                                <p><strong>Duración:</strong> Hasta 2 años</p>
                                <p><strong>Proveedores:</strong> Google Analytics (con IP anonimizada)</p>
                            </div>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-[#1b2f4b] mb-3">⚙️ Cookies de Funcionalidad</h3>
                            <p className="mb-3">Mejoran la funcionalidad y personalización del sitio web.</p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p><strong>Finalidad:</strong> Recordar preferencias, personalización</p>
                                <p><strong>Duración:</strong> Hasta 1 año</p>
                                <p><strong>Ejemplos:</strong> Tema elegido, configuración de privacidad</p>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">3. Cookies de Terceros</h2>
                    <p className="mb-4">
                        Algunos servicios externos que utilizamos pueden establecer sus propias cookies:
                    </p>
                    
                    <div className="overflow-x-auto mb-6">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servicio</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Finalidad</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Más información</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Google Analytics</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Estadísticas de uso</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                            Política de Google
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cloudinary</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Gestión de imágenes</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                        <a href="https://cloudinary.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:underline">
                                            Política de Cloudinary
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">4. Gestión de Cookies</h2>
                    <p className="mb-4">
                        Puede gestionar o eliminar las cookies según sus preferencias. Tenga en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad del sitio web.
                    </p>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                        <h3 className="font-semibold text-[#1b2f4b] mb-2">⚠️ Importante</h3>
                        <p className="text-sm">
                            Si elimina o deshabilita las cookies técnicas, es posible que no pueda acceder a ciertas partes del sitio web o que algunas funcionalidades no trabajen correctamente.
                        </p>
                    </div>

                    <h3 className="text-xl font-semibold text-[#1b2f4b] mb-4">Configuración por Navegador</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">🌐 Google Chrome</h4>
                            <p className="text-sm">Configuración → Privacidad y seguridad → Cookies y otros datos de sitios</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">🦊 Mozilla Firefox</h4>
                            <p className="text-sm">Opciones → Privacidad y seguridad → Cookies y datos del sitio</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">🧭 Safari</h4>
                            <p className="text-sm">Preferencias → Privacidad → Gestionar datos de sitios web</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">🔷 Microsoft Edge</h4>
                            <p className="text-sm">Configuración → Privacidad, búsqueda y servicios → Cookies</p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">5. Contacto</h2>
                    <p className="mb-4">
                        Si tiene preguntas sobre nuestra política de cookies, puede contactarnos:
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg mb-8">
                        <p><strong>Email:</strong> lhclegalandconsulting@gmail.com</p>
                        <p><strong>Teléfono:</strong> +34 691 818 071</p>
                        <p><strong>Formulario:</strong> <Link href="/contact" className="text-[#1DA1F2] hover:underline">Página de contacto</Link></p>
                    </div>

                    <div className="text-center pt-8 border-t border-gray-200">
                        <div className="space-y-4">
                            <Link 
                                href="/legal/politica-privacidad" 
                                className="inline-flex items-center px-4 py-2 border border-[#1DA1F2] text-[#1DA1F2] rounded-lg hover:bg-[#1DA1F2] hover:text-white transition-colors duration-300 mr-4"
                            >
                                Ver Política de Privacidad
                            </Link>
                            <Link 
                                href="/" 
                                className="inline-flex items-center px-6 py-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1b2f4b] transition-colors duration-300"
                            >
                                Volver al inicio
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CookiesPage;