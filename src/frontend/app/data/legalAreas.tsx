/**
 * legalAreas.ts
 *
 * Datos estáticos para el carousel hero de LHC Legal & Consulting.
 * Cada objeto representa un área legal destacada, incluyendo título estilizado con JSX
 * (para resaltar una palabra clave) y una versión en texto plano (`titleText`) para fines SEO.
 * Servicios más demandados en España con enfoque positivo y esperanzador.
 */

import { LegalArea } from '@/types/carousel';

export const legalAreas: LegalArea[] = [
  {
    id: 'reclamacion-impagos-autonomos',
    title: (
      <>
        ¿TUS CLIENTES NO TE <span className="font-black">PAGAN LAS FACTURAS</span>?
      </>
    ),
    titleText: '¿TUS CLIENTES NO TE PAGAN LAS FACTURAS?',
    subtitle: 'Recuperamos impagos para autónomos y empresas. Asesoría legal especializada en facturas sin cobrar.',
    gradientEnd: '#ff6b35',
    backgroundImage: 'https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749069327/casa_construccion_desenfocada_uojcbm.webp',
    personImage: 'https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749078421/chica_construccion_1_-removebg-preview_ncti6g.webp',
    ctaText: 'Consulta Gratuita',
    link: '/situacion/impagos-autonomos',
    order: 1,
  },
  {
    id: 'despido-improcedente',
    title: (
      <>
        ¿HAS SUFRIDO UN <span className="font-black">DESPIDO IMPROCEDENTE</span>?
      </>
    ),
    titleText: '¿HAS SUFRIDO UN DESPIDO IMPROCEDENTE?',
    subtitle: 'Defiende tus derechos laborales. Consulta gratuita en 24h',
    gradientEnd: '#1A1341',
    backgroundImage: 'https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749207707/oficina-vacia_wjcddh.webp',
    personImage: 'https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749302017/chica-joven-despido_2_fnirga.webp',
    ctaText: 'Consulta Gratuita',
    link: '/situacion/despido-improcedente',
    order: 2,
  },
  {
    id: 'tramites-extranjeria',
    title: (
      <>
        ¿NECESITAS TU <span className="font-black">PERMISO DE RESIDENCIA</span>?
      </>
    ),
    titleText: '¿NECESITAS TU PERMISO DE RESIDENCIA?',
    subtitle: 'Tramitamos NIE, residencia y nacionalidad española. Te acompañamos en todo el proceso legal.',
    gradientEnd: '#922B21',
    backgroundImage: 'https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749214727/palacio-real-madrid_ooqxxm.webp',
    personImage: 'https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749212160/chica-pasaporte_ltr5ku.webp',
    ctaText: 'Consulta Gratuita',
    link: '/situacion/tramites-extranjeria',
    order: 3,
  },
  {
    id: 'herencias-testamentos',
    title: (
      <>
        ¿TIENES PROBLEMAS CON UNA <span className="font-black">HERENCIA</span>?
      </>
    ),
    titleText: '¿TIENES PROBLEMAS CON UNA HERENCIA?',
    subtitle: 'Resolvemos herencias, testamentos y reparto de bienes. Asesoramiento familiar completo.',
    gradientEnd: '#2E8B57',
    backgroundImage: 'https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749215465/casa-tradicional-espana_jhuzsp.webp',
    personImage: 'https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749215133/mujer-herencia_gdvkb6.webp',
    ctaText: 'Consulta Gratuita',
    link: '/situacion/herencias-testamentos',
    order: 4,
  },
  {
    id: 'divorcios-mutuo-acuerdo',
    title: (
      <>
        ¿NECESITAS UN <span className="font-black">DIVORCIO RÁPIDO</span>?
      </>
    ),
    titleText: '¿NECESITAS UN DIVORCIO RÁPIDO?',
    subtitle: 'Divorcios de mutuo acuerdo y custodia compartida. Proceso ágil y sin complicaciones.',
    gradientEnd: '#2988BC',
    backgroundImage: 'https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749217705/juzgados_qmd7su.webp',
    personImage: 'https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749218493/hombre-divorcio_ofgkfa.webp',
    ctaText: 'Consulta Gratuita',
    link: '/situacion/divorcios-mutuo-acuerdo',
    order: 5,
  },
  {
    id: 'multas-trafico-injustas',
    title: (
      <>
        ¿UNA <span className="font-black">MULTA INJUSTA</span>?
      </>
    ),
    titleText: '¿UNA MULTA INJUSTA?',
    subtitle: 'Recurrimos multas de tráfico y sanciones administrativas. Alto porcentaje de éxito.',
    gradientEnd: '#FF8C00',
    backgroundImage: 'https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749220372/coche_1_z3h81a.webp',
    personImage: 'https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749220199/chico-multa_hf2sx7.webp',
    ctaText: 'Consulta Gratuita',
    link: '/situacion/multas-trafico-injustas',
    order: 6,
  },
  {
    id: 'clausulas-bancarias-abusivas',
    title: (
      <>
        ¿EL BANCO TE <span className="font-black">COBRA COMISIONES</span> ABUSIVAS?
      </>
    ),
    titleText: '¿EL BANCO TE COBRA COMISIONES ABUSIVAS?',
    subtitle: 'Reclamamos cláusulas abusivas, hipotecas y tarjetas revolving. Recupera tu dinero.',
    gradientEnd: '#36454F',
    backgroundImage: 'https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749242176/salon-blanco-con-portatil-en-mesa_zof09r.webp',
    personImage: 'https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749241670/mujer-salon-sonriendo_xxw17j.webp',
    ctaText: 'Consulta Gratuita',
    link: '/situacion/clausulas-bancarias-abusivas',
    order: 7,
  },
];