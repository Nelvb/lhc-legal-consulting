/**
 * page.tsx - Aviso Legal (/legal/aviso-legal)
 *
 * Página de aviso legal para LHC Legal & Consulting conforme a la normativa española.
 * Incluye información sobre titularidad, datos de contacto, responsabilidades y limitaciones legales.
 * Actualizada a enero 2025 con cumplimiento LSSI-CE y normativas vigentes.
 */

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Aviso Legal - LHC Legal & Consulting',
    description: 'Aviso legal de LHC Legal & Consulting. Información sobre la titularidad del sitio web, condiciones de uso, responsabilidades y limitaciones legales.',
    robots: { index: true, follow: true }
};

const AvisoLegalPage = () => {
    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <section className="bg-gradient-to-r from-[#1b2f4b] to-[#1DA1F2] py-16 px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Aviso Legal
                    </h1>
                    <p className="text-xl text-blue-100">
                        Información legal sobre LHC Legal & Consulting
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
                            En cumplimiento de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">1. Datos del Prestador de Servicios</h2>
                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                        <p><strong>Denominación social:</strong> LHC Legal & Consulting</p>
                        <p><strong>Actividad:</strong> Servicios de asesoramiento jurídico</p>
                        <p><strong>Domicilio:</strong> Madrid, España</p>
                        <p><strong>Email:</strong> lhclegalandconsulting@gmail.com</p>
                        <p><strong>Teléfono:</strong> +34 691 818 071</p>
                        <p><strong>Web:</strong> https://lhclegal.es</p>
                    </div>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">2. Objeto y Condiciones de Uso</h2>
                    <p className="mb-4">
                        El presente sitio web tiene por objeto proporcionar información sobre los servicios de asesoramiento jurídico que presta LHC Legal & Consulting, así como facilitar el contacto entre los usuarios y nuestro despacho.
                    </p>
                    <p className="mb-6">
                        El acceso y uso de este sitio web implica la aceptación expresa y sin reservas de todas las condiciones establecidas en este aviso legal. Si no está de acuerdo con alguna de estas condiciones, debe abstenerse de utilizar este sitio web.
                    </p>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">3. Condiciones de Acceso y Uso</h2>
                    <p className="mb-4">
                        El acceso a este sitio web es gratuito y no requiere suscripción o registro previo. El usuario se compromete a:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>Hacer un uso adecuado y lícito del sitio web</li>
                        <li>No utilizar el sitio para fines ilícitos o prohibidos</li>
                        <li>No dañar, inutilizar o sobrecargar el sitio web</li>
                        <li>No introducir virus o códigos maliciosos</li>
                        <li>Respetar los derechos de propiedad intelectual</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">4. Responsabilidad y Limitaciones</h2>
                    <p className="mb-4">
                        LHC Legal & Consulting se esfuerza por mantener la información actualizada y libre de errores, pero no garantiza la exactitud, completitud o actualidad de la información contenida en el sitio web.
                    </p>
                    <p className="mb-4">
                        <strong>Limitaciones de responsabilidad:</strong>
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>No nos responsabilizamos de los daños derivados del uso indebido del sitio web</li>
                        <li>No garantizamos la disponibilidad continua del sitio web</li>
                        <li>No respondemos por interrupciones técnicas o fallos del sistema</li>
                        <li>La información legal general no constituye asesoramiento personalizado</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">5. Propiedad Intelectual e Industrial</h2>
                    <p className="mb-4">
                        Todos los contenidos del sitio web (textos, imágenes, diseño, código fuente, logotipos, marcas) son propiedad de LHC Legal & Consulting o de terceros que han autorizado su uso, y están protegidos por las leyes de propiedad intelectual e industrial.
                    </p>
                    <p className="mb-6">
                        Queda prohibida la reproducción, distribución, transformación o comunicación pública de los contenidos sin autorización expresa del titular de los derechos.
                    </p>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">6. Enlaces a Terceros</h2>
                    <p className="mb-4">
                        Este sitio web puede contener enlaces a sitios web de terceros. LHC Legal & Consulting no controla ni se responsabiliza del contenido, políticas de privacidad o prácticas de dichos sitios web externos.
                    </p>
                    <p className="mb-6">
                        La inclusión de enlaces no implica endorsement o recomendación del contenido enlazado.
                    </p>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">7. Protección de Datos</h2>
                    <p className="mb-4">
                        El tratamiento de datos personales se rige por nuestra <Link href="/legal/politica-privacidad" className="text-[#1DA1F2] hover:underline">Política de Privacidad</Link>, elaborada conforme al Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales.
                    </p>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">8. Modificaciones</h2>
                    <p className="mb-4">
                        LHC Legal & Consulting se reserva el derecho a modificar este aviso legal en cualquier momento. Los cambios serán efectivos desde su publicación en el sitio web.
                    </p>
                    <p className="mb-6">
                        Se recomienda revisar periódicamente este aviso legal para estar informado de cualquier actualización.
                    </p>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">9. Legislación Aplicable y Jurisdicción</h2>
                    <p className="mb-4">
                        Este aviso legal se rige por la legislación española. Para la resolución de cualquier conflicto derivado del uso de este sitio web, las partes se someten expresamente a los Juzgados y Tribunales de Madrid, con renuncia expresa a cualquier otro fuero que pudiera corresponderles.
                    </p>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">10. Contacto</h2>
                    <p className="mb-4">
                        Para cualquier consulta relacionada con este aviso legal, puede contactarnos a través de:
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg mb-8">
                        <p><strong>Email:</strong> lhclegalandconsulting@gmail.com</p>
                        <p><strong>Teléfono:</strong> +34 691 818 071</p>
                        <p><strong>Formulario:</strong> <Link href="/contact" className="text-[#1DA1F2] hover:underline">Página de contacto</Link></p>
                    </div>

                    <div className="text-center pt-8 border-t border-gray-200">
                        <Link 
                            href="/" 
                            className="inline-flex items-center px-6 py-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1b2f4b] transition-colors duration-300"
                        >
                            Volver al inicio
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AvisoLegalPage;