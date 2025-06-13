/**
 * legalServices.ts
 * 
 * Datos estáticos de las áreas legales principales de LHC Legal & Consulting.
 * Configuración centralizada de servicios con paleta profesional de baja saturación.
 * Colores sofisticados y suaves que mantienen contraste visual sin agresividad.
 * Optimizado para posicionamiento SEO y conversión de clientes.
 */

import { LegalService } from '@/types/legalService';

export const LEGAL_SERVICES: LegalService[] = [
  {
    id: 'derecho-laboral',
    title: 'Derecho Laboral',
    description: 'Despidos, reclamaciones salariales y contratos de trabajo',
    color: '#5A7FA7', // Azul profundo suavizado
    hoverColor: '#536F95',
    slug: '/areas/derecho-laboral',
    metaTitle: 'Abogado Laboralista Madrid | Despidos y Reclamaciones | LHC Legal',
    metaDescription: 'Especialistas en derecho laboral. Defendemos tus derechos en despidos improcedentes, reclamaciones salariales y contratos. Consulta gratuita.'
  },
  {
    id: 'derecho-civil',
    title: 'Derecho Civil',
    description: 'Herencias, divorcios y responsabilidad civil',
    color: '#7BA396', // Verde salvia suavizado
    hoverColor: '#6E9488',
    slug: '/areas/derecho-civil',
    metaTitle: 'Abogado Civilista Madrid | Herencias y Divorcios | LHC Legal',
    metaDescription: 'Expertos en derecho civil. Tramitamos herencias, divorcios y responsabilidad civil con total profesionalidad. Primera consulta gratuita.'
  },
  {
    id: 'derecho-extranjeria',
    title: 'Derecho de Extranjería',
    description: 'NIE, residencia y nacionalidad española',
    color: '#A67B8A', // Burdeos muy suavizado
    hoverColor: '#986E7D',
    slug: '/areas/derecho-extranjeria',
    metaTitle: 'Abogado Extranjería Madrid | NIE, Residencia, Nacionalidad | LHC Legal',
    metaDescription: 'Especialistas en extranjería. Tramitamos NIE, permisos de residencia y nacionalidad española. Asesoría legal completa para extranjeros.'
  },
  {
    id: 'derecho-penal',
    title: 'Derecho Penal',
    description: 'Defensa penal y juicios rápidos',
    color: '#6B9CAD', // Azul acero suavizado
    hoverColor: '#5F8A9A',
    slug: '/areas/derecho-penal',
    metaTitle: 'Abogado Penalista Madrid | Defensa Penal | LHC Legal',
    metaDescription: 'Defensa penal especializada. Asistencia al detenido, juicios rápidos y procedimientos penales. Experiencia y eficacia garantizada.'
  },
  {
    id: 'derecho-administrativo',
    title: 'Derecho Administrativo',
    description: 'Multas de tráfico y sanciones administrativas',
    color: '#C4967A', // Terracota muy suavizada
    hoverColor: '#B5886D',
    slug: '/areas/derecho-administrativo',
    metaTitle: 'Recurrir Multas Tráfico Madrid | Derecho Administrativo | LHC Legal',
    metaDescription: 'Recurrimos multas de tráfico y sanciones administrativas. Alto porcentaje de éxito. Consulta el estado de tu recurso online.'
  },
  {
    id: 'derecho-bancario',
    title: 'Derecho Bancario',
    description: 'Cláusulas abusivas y reclamaciones bancarias',
    color: '#6B7280', // Gris azulado suavizado
    hoverColor: '#5B626F',
    slug: '/areas/derecho-bancario',
    metaTitle: 'Cláusulas Abusivas Madrid | Reclamaciones Bancarias | LHC Legal',
    metaDescription: 'Reclamamos cláusulas bancarias abusivas, hipotecas y tarjetas revolving. Recupera tu dinero con nuestros especialistas.'
  },
  {
    id: 'derecho-mercantil',
    title: 'Derecho Mercantil',
    description: 'Reclamación de impagos y asesoría empresarial',
    color: '#D4A574', // Oro suavizado
    hoverColor: '#C49966',
    slug: '/areas/derecho-mercantil',
    metaTitle: 'Reclamación Impagos Madrid | Derecho Mercantil | LHC Legal',
    metaDescription: 'Recuperamos impagos para autónomos y empresas. Asesoría mercantil completa. Procedimiento monitorio y gestión de deudas.'
  },
  {
    id: 'derecho-fiscal',
    title: 'Derecho Fiscal',
    description: 'Recursos ante Hacienda y planificación fiscal',
    color: '#9B7ECC', // Morado muy suavizado
    hoverColor: '#8F72BF',
    slug: '/areas/derecho-fiscal',
    metaTitle: 'Abogado Fiscal Madrid | Recursos Hacienda | LHC Legal',
    metaDescription: 'Especialistas en derecho fiscal. Recursos ante Hacienda, planificación fiscal y representación en inspecciones. Consulta inicial gratuita.'
  }
];

// Configuración de animaciones por defecto optimizada
export const DEFAULT_ANIMATION_CONFIG = {
  threshold: 0.1,
  staggerDelay: 120, // Ligeramente más lento para efecto más elegante
  triggerOnce: true,
  rootMargin: '50px'
};

// Textos de la sección optimizados para SEO
export const SECTION_CONTENT = {
  title: 'Nuestras Áreas de',
  titleHighlight: 'Especialización',
  subtitle: 'Ofrecemos asesoría legal profesional en las principales ramas del derecho.',
  subtitleHighlight: 'Encuentra la solución perfecta para tu caso.',
  ctaTitle: '¿Tu situación es diferente?',
  ctaSubtitle: 'Cada caso es único. Contacta con nosotros para una consulta personalizada',
  ctaButtonText: 'Contactar Ahora'
};