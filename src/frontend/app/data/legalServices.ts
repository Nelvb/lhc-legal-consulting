/**
 * legalAreasData.ts
 * 
 * Datos estáticos de las áreas legales principales de LHC Legal & Consulting.
 * Configuración centralizada de servicios, colores y metadatos SEO.
 * Optimizado para posicionamiento y conversión.
 */

import { LegalService } from '@/types/legalService';

export const LEGAL_SERVICES: LegalService[] = [
  {
    id: 'derecho-laboral',
    title: 'Derecho Laboral',
    description: 'Despidos, reclamaciones salariales y contratos de trabajo',
    color: '#1A1341',
    hoverColor: '#0f0a2e',
    slug: '/areas/derecho-laboral',
    metaTitle: 'Abogado Laboralista Madrid | Despidos y Reclamaciones | LHC Legal',
    metaDescription: 'Especialistas en derecho laboral. Defendemos tus derechos en despidos improcedentes, reclamaciones salariales y contratos. Consulta gratuita.'
  },
  {
    id: 'derecho-civil',
    title: 'Derecho Civil',
    description: 'Herencias, divorcios y responsabilidad civil',
    color: '#2E8B57',
    hoverColor: '#236b43',
    slug: '/areas/derecho-civil',
    metaTitle: 'Abogado Civilista Madrid | Herencias y Divorcios | LHC Legal',
    metaDescription: 'Expertos en derecho civil. Tramitamos herencias, divorcios y responsabilidad civil con total profesionalidad. Primera consulta gratuita.'
  },
  {
    id: 'derecho-extranjeria',
    title: 'Derecho de Extranjería',
    description: 'NIE, residencia y nacionalidad española',
    color: '#922B21',
    hoverColor: '#7a241c',
    slug: '/areas/derecho-extranjeria',
    metaTitle: 'Abogado Extranjería Madrid | NIE, Residencia, Nacionalidad | LHC Legal',
    metaDescription: 'Especialistas en extranjería. Tramitamos NIE, permisos de residencia y nacionalidad española. Asesoría legal completa para extranjeros.'
  },
  {
    id: 'derecho-penal',
    title: 'Derecho Penal',
    description: 'Defensa penal y juicios rápidos',
    color: '#2988BC',
    hoverColor: '#206fa0',
    slug: '/areas/derecho-penal',
    metaTitle: 'Abogado Penalista Madrid | Defensa Penal | LHC Legal',
    metaDescription: 'Defensa penal especializada. Asistencia al detenido, juicios rápidos y procedimientos penales. Experiencia y eficacia garantizada.'
  },
  {
    id: 'derecho-administrativo',
    title: 'Derecho Administrativo',
    description: 'Multas de tráfico y sanciones administrativas',
    color: '#FF8C00',
    hoverColor: '#e07a00',
    slug: '/areas/derecho-administrativo',
    metaTitle: 'Recurrir Multas Tráfico Madrid | Derecho Administrativo | LHC Legal',
    metaDescription: 'Recurrimos multas de tráfico y sanciones administrativas. Alto porcentaje de éxito. Consulta el estado de tu recurso online.'
  },
  {
    id: 'derecho-bancario',
    title: 'Derecho Bancario',
    description: 'Cláusulas abusivas y reclamaciones bancarias',
    color: '#36454F',
    hoverColor: '#2a363c',
    slug: '/areas/derecho-bancario',
    metaTitle: 'Cláusulas Abusivas Madrid | Reclamaciones Bancarias | LHC Legal',
    metaDescription: 'Reclamamos cláusulas bancarias abusivas, hipotecas y tarjetas revolving. Recupera tu dinero con nuestros especialistas.'
  },
  {
    id: 'derecho-mercantil',
    title: 'Derecho Mercantil',
    description: 'Reclamación de impagos y asesoría empresarial',
    color: '#ff6b35',
    hoverColor: '#e55a2b',
    slug: '/areas/derecho-mercantil',
    metaTitle: 'Reclamación Impagos Madrid | Derecho Mercantil | LHC Legal',
    metaDescription: 'Recuperamos impagos para autónomos y empresas. Asesoría mercantil completa. Procedimiento monitorio y gestión de deudas.'
  },
  {
    id: 'derecho-fiscal',
    title: 'Derecho Fiscal',
    description: 'Recursos ante Hacienda y planificación fiscal',
    color: '#8B5CF6',
    hoverColor: '#7C3AED',
    slug: '/areas/derecho-fiscal',
    metaTitle: 'Abogado Fiscal Madrid | Recursos Hacienda | LHC Legal',
    metaDescription: 'Especialistas en derecho fiscal. Recursos ante Hacienda, planificación fiscal y representación en inspecciones. Consulta inicial gratuita.'
  }
];

// Configuración de animaciones por defecto
export const DEFAULT_ANIMATION_CONFIG = {
  threshold: 0.1,
  staggerDelay: 100,
  triggerOnce: true,
  rootMargin: '50px'
};

// Textos de la sección
export const SECTION_CONTENT = {
  title: 'Nuestras Áreas de',
  titleHighlight: 'Especialización',
  subtitle: 'Ofrecemos asesoría legal profesional en las principales ramas del derecho.',
  subtitleHighlight: 'Encuentra la solución perfecta para tu caso.',
  ctaText: 'Consulta Personalizada',
  ctaDescription: '¿No encuentras tu área específica? Contáctanos y te ayudamos a encontrar la solución legal que necesitas.'
};