/**
 * legalAreas.ts
 *
 * Datos estáticos para el carousel hero de LHC Legal & Consulting.
 * Cada objeto representa un área legal destacada, incluyendo título estilizado con JSX
 * (para resaltar una palabra clave) y una versión en texto plano (`titleText`) para fines SEO.
 * Se utiliza ReactNode en el campo `title` para permitir estilos personalizados sin romper tipado.
 */

import { LegalArea } from '@/types/carousel';

export const legalAreas: LegalArea[] = [
  {
    id: 'derecho-laboral',
    title: (
      <>
        ¿HAS SUFRIDO UN <span className="font-black">DESPIDO IMPROCEDENTE</span>?
      </>
    ),
    titleText: '¿HAS SUFRIDO UN DESPIDO IMPROCEDENTE?', //Texto plano para metadatos SEO
    subtitle: 'Defiende tus derechos laborales. Consulta gratuita en 24h',
    gradientEnd: '#ff6b35',
    backgroundImage: 'https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749069327/casa_construccion_desenfocada_uojcbm.webp',
    personImage: 'https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749078421/chica_construccion_1_-removebg-preview_ncti6g.webp',
    ctaText: 'Consulta Gratuita',
    link: '/situacion/despido-improcedente',
    order: 1,
  },

  // Puedes añadir más áreas como esta:
  // {
  //   id: 'herencias',
  //   title: (
  //     <>
  //       ¿TIENES <span className="font-extrabold">PROBLEMAS</span> CON UNA HERENCIA?
  //     </>
  //   ),
  //   titleText: '¿TIENES PROBLEMAS CON UNA HERENCIA?',
  //   ...
  // }
];
