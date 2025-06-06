// Hero section principal de LHC Legal & Consulting con carousel dinámico
'use client';

import React from 'react';
import HeroCarousel from './carousel/HeroCarousel';
import { legalAreas } from '@/app/data/legalAreas';

const HeroSection: React.FC = () => {
  return (
    <>
      {/* Carousel principal */}
      <HeroCarousel 
        areas={legalAreas}
        autoPlay={true}
        autoPlayInterval={4000}
      />
    </>
  );
};

export default HeroSection;