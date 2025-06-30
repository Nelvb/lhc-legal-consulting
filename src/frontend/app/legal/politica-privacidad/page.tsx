/**
 * page.tsx - Política de Privacidad (/legal/politica-privacidad)
 *
 * Política de privacidad para LHC Legal & Consulting conforme al RGPD y LOPDGDD.
 * Información detallada sobre tratamiento de datos personales, derechos de los usuarios
 * y medidas de seguridad implementadas. Actualizada a enero 2025.
 */

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Política de Privacidad - LHC Legal & Consulting',
    description: 'Política de privacidad de LHC Legal & Consulting. Información sobre el tratamiento de datos personales conforme al RGPD y LOPDGDD.',
    robots: { index: true, follow: true }
};

const PoliticaPrivacidadPage = () => {
    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <section className="bg-gradient-to-r from-[#1b2f4b] to-[#1DA1F2] py-16 px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Política de Privacidad
                    </h1>
                    <p className="text-xl text-blue-100">
                        Protección de datos personales conforme al RGPD
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
                            En cumplimiento del Reglamento General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).
                        </p>
                    </div>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">1. Responsable del Tratamiento</h2>
                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                        <p><strong>Responsable:</strong> LHC Legal & Consulting</p>
                        <p><strong>Domicilio:</strong> Madrid, España</p>
                        <p><strong>Email:</strong> lhclegalandconsulting@gmail.com</p>
                        <p><strong>Teléfono:</strong> +34 691 818 071</p>
                        <p><strong>Delegado de Protección de Datos:</strong> lhclegalandconsulting@gmail.com</p>
                    </div>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">2. Datos que Recopilamos</h2>
                    <p className="mb-4">
                        Recopilamos y tratamos los siguientes tipos de datos personales:
                    </p>
                    
                    <div className="space-y-4 mb-6">
                        <div className="border-l-4 border-[#1DA1F2] pl-4">
                            <h3 className="text-lg font-semibold text-[#1b2f4b] mb-2">Datos de Identificación</h3>
                            <p>Nombre, apellidos, email, teléfono, dirección postal (cuando sea necesario para la prestación del servicio).</p>
                        </div>
                        
                        <div className="border-l-4 border-[#1DA1F2] pl-4">
                            <h3 className="text-lg font-semibold text-[#1b2f4b] mb-2">Datos de Navegación</h3>
                            <p>Dirección IP, tipo de navegador, páginas visitadas, tiempo de permanencia, cookies técnicas.</p>
                        </div>
                        
                        <div className="border-l-4 border-[#1DA1F2] pl-4">
                            <h3 className="text-lg font-semibold text-[#1b2f4b] mb-2">Datos de Consultas Legales</h3>
                            <p>Información proporcionada en formularios de contacto, consultas legales, documentos adjuntos.</p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">3. Finalidades del Tratamiento</h2>
                    <p className="mb-4">
                        Tratamos sus datos personales para las siguientes finalidades:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li><strong>Prestación de servicios jurídicos:</strong> Asesoramiento legal, representación, gestión de expedientes</li>
                        <li><strong>Comunicación:</strong> Responder consultas, enviar información solicitada</li>
                        <li><strong>Gestión administrativa:</strong> Facturación, contabilidad, archivo de expedientes</li>
                        <li><strong>Cumplimiento legal:</strong> Obligaciones del Colegio de Abogados, conservación de expedientes</li>
                        <li><strong>Marketing directo:</strong> Envío de información legal de interés (con consentimiento)</li>
                        <li><strong>Mejora del sitio web:</strong> Análisis estadístico, mejora de la experiencia del usuario</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">4. Base Jurídica del Tratamiento</h2>
                    <div className="space-y-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p><strong>Ejecución contractual:</strong> Prestación de servicios jurídicos contratados</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p><strong>Consentimiento:</strong> Suscripción a newsletters, marketing directo</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p><strong>Interés legítimo:</strong> Mejora del sitio web, seguridad, prevención de fraudes</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p><strong>Cumplimiento legal:</strong> Obligaciones colegiales, conservación de expedientes</p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">5. Conservación de Datos</h2>
                    <p className="mb-4">
                        Los plazos de conservación de sus datos son:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li><strong>Expedientes legales:</strong> Mínimo 6 años tras finalización del servicio (normativa colegial)</li>
                        <li><strong>Datos de facturación:</strong> 4 años (normativa fiscal)</li>
                        <li><strong>Formularios de contacto:</strong> 2 años desde la última comunicación</li>
                        <li><strong>Cookies técnicas:</strong> Durante la sesión de navegación</li>
                        <li><strong>Newsletter:</strong> Hasta que retire el consentimiento</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">6. Cesión de Datos a Terceros</h2>
                    <p className="mb-4">
                        Sus datos pueden ser comunicados a:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li><strong>Administraciones públicas:</strong> Cuando sea requerido por ley</li>
                        <li><strong>Colegio de Abogados:</strong> Para cumplimiento de obligaciones deontológicas</li>
                        <li><strong>Proveedores de servicios:</strong> Hosting, email marketing (con garantías de protección)</li>
                        <li><strong>Colaboradores jurídicos:</strong> Otros abogados o procuradores cuando sea necesario</li>
                        <li><strong>Entidades financieras:</strong> Para el cobro de honorarios</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">7. Transferencias Internacionales</h2>
                    <p className="mb-6">
                        Algunos de nuestros proveedores de servicios tecnológicos (como proveedores de email o hosting) pueden estar ubicados fuera del Espacio Económico Europeo. En estos casos, garantizamos que existen medidas de protección adecuadas mediante decisiones de adecuación de la Comisión Europea o cláusulas contractuales tipo.
                    </p>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">8. Sus Derechos</h2>
                    <p className="mb-4">
                        Como titular de los datos, tiene derecho a:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-[#1b2f4b] mb-2">✓ Acceso</h3>
                            <p className="text-sm">Conocer qué datos tratamos sobre usted</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-[#1b2f4b] mb-2">✓ Rectificación</h3>
                            <p className="text-sm">Corregir datos inexactos o incompletos</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-[#1b2f4b] mb-2">✓ Supresión</h3>
                            <p className="text-sm">Eliminar sus datos cuando sea procedente</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-[#1b2f4b] mb-2">✓ Limitación</h3>
                            <p className="text-sm">Restringir el tratamiento de sus datos</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-[#1b2f4b] mb-2">✓ Portabilidad</h3>
                            <p className="text-sm">Recibir sus datos en formato estructurado</p>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-[#1b2f4b] mb-2">✓ Oposición</h3>
                            <p className="text-sm">Oponerse al tratamiento en determinados casos</p>
                        </div>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                        <h3 className="font-semibold text-[#1b2f4b] mb-2">Ejercicio de Derechos</h3>
                        <p className="text-sm">
                            Para ejercer estos derechos, envíe un email a <strong>lhclegalandconsulting@gmail.com</strong> 
                            adjuntando copia de su DNI o documento identificativo equivalente. 
                            Responderemos en un plazo máximo de 1 mes.
                        </p>
                    </div>

                    <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
                        <h3 className="font-semibold text-[#1b2f4b] mb-2">Revocación de Consentimiento</h3>
                        <p className="text-sm mb-4">
                            Si desea eliminar completamente sus datos de nuestros sistemas:
                        </p>
                        
                        {/* Opción 1: Botón automático */}
                        <div className="text-center mb-4">
                            <a
                                href="mailto:lhclegalandconsulting@gmail.com?subject=REVOCACIÓN%20DE%20CONSENTIMIENTO&body=Estimados%20señores%2C%0A%0ASolicito%20la%20eliminación%20completa%20de%20mis%20datos%20personales.%0A%0ANombre%3A%20%0AEmail%3A%20%0AMotivo%3A%20%0A%0AConfirmo%20que%20soy%20el%20titular.%0A%0ASaludos"
                                className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-300 font-medium text-base min-h-[40px]"
                            >
                                📧 Enviar Email Automático
                            </a>
                        </div>
                        
                        {/* Separador */}
                        <div className="text-center text-xs text-gray-400 mb-4">
                            - o -
                        </div>
                        
                        {/* Opción 2: Email manual */}
                        <div className="text-center bg-white p-4 rounded-lg border border-red-200">
                            <p className="text-sm text-gray-600 mb-2">Envíe un email manual a:</p>
                            <a 
                                href="mailto:lhclegalandconsulting@gmail.com" 
                                className="text-lg font-bold text-[#1DA1F2] hover:underline"
                            >
                                lhclegalandconsulting@gmail.com
                            </a>
                            <p className="text-xs text-gray-500 mt-2">
                                <strong>Asunto:</strong> REVOCACIÓN DE CONSENTIMIENTO<br/>
                                <strong>Incluya:</strong> Su nombre, email y motivo
                            </p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">9. Medidas de Seguridad</h2>
                    <p className="mb-4">
                        Implementamos medidas técnicas y organizativas apropiadas para proteger sus datos:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>Cifrado de datos en tránsito (HTTPS/SSL)</li>
                        <li>Acceso restringido a datos personales</li>
                        <li>Sistemas de backup y recuperación</li>
                        <li>Formación del personal en protección de datos</li>
                        <li>Evaluaciones de impacto cuando sea necesario</li>
                        <li>Auditorías periódicas de seguridad</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">10. Cookies</h2>
                    <p className="mb-4">
                        Utilizamos cookies técnicas necesarias para el funcionamiento del sitio web. Para más información, consulte nuestra <Link href="/legal/cookies" className="text-[#1DA1F2] hover:underline">Política de Cookies</Link>.
                    </p>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">11. Menores de Edad</h2>
                    <p className="mb-6">
                        Nuestros servicios están dirigidos a mayores de 18 años. No recopilamos intencionadamente datos de menores de 14 años sin consentimiento parental. Los menores entre 14 y 18 años requieren autorización de sus padres o tutores.
                    </p>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">12. Autoridad de Control</h2>
                    <p className="mb-4">
                        Tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) si considera que hemos vulnerado sus derechos:
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                        <p><strong>AEPD:</strong> https://www.aepd.es</p>
                        <p><strong>Dirección:</strong> C/ Jorge Juan, 6, 28001 Madrid</p>
                        <p><strong>Teléfono:</strong> 901 100 099 / 912 663 517</p>
                    </div>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">13. Modificaciones</h2>
                    <p className="mb-6">
                        Podemos actualizar esta política de privacidad para reflejar cambios en nuestras prácticas o en la normativa aplicable. Le notificaremos cualquier cambio significativo por email o mediante aviso destacado en nuestro sitio web.
                    </p>

                    <h2 className="text-2xl font-bold text-[#1b2f4b] mb-4">14. Contacto</h2>
                    <p className="mb-4">
                        Para cualquier consulta sobre esta política de privacidad o el tratamiento de sus datos:
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

export default PoliticaPrivacidadPage;