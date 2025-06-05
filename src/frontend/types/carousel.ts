/**
 * carousel.ts
 *
 * Interfaces TypeScript para el sistema de carousel de áreas legales de LHC Legal & Consulting.
 * - `LegalArea`: define cada slide del hero con un título estilizado (`title`) y una versión texto (`titleText`) para SEO.
 * - `CarouselProps`: props del componente principal del carousel.
 * - `CarouselSlideProps`: props para cada slide individual.
 */

export interface LegalArea {
    id: string;
    title: React.ReactNode;
    titleText: string;
    subtitle: string;
    gradientEnd: string;
    backgroundImage: string;
    personImage: string;
    ctaText: string;
    link: string;
    order: number;
}

export interface CarouselProps {
    areas: LegalArea[];
    autoPlay?: boolean;
    autoPlayInterval?: number;
}

export interface CarouselSlideProps {
    area: LegalArea;
    isActive: boolean;
}