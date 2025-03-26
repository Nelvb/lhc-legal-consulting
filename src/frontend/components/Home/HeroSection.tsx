"use client";

import Image from "next/image";
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="w-full relative overflow-hidden">
      {/* Fondo dividido en 2 colores */}
      <div className="absolute inset-0 flex">
        <div className="w-[30%] bg-[#C2E7DA]" />
        <div className="w-[70%] bg-[#1A1341]" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-24 py-20 pt-52 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Columna izquierda: imagen con marco desplazado */}
        <div className="w-full md:w-[60%] flex justify-start md:justify-center items-center pl-4 sm:pl-6">
          <div className="relative w-full max-w-[700px]">
            {/* Marco detrás de la imagen */}
            <div className="absolute -top-6 -left-6 w-full h-full bg-[#6290C3] rounded-tl-[70px] rounded-br-[70px] -z-10" />

            {/* Imagen principal */}
            <div className="overflow-hidden rounded-tl-[60px] rounded-br-[60px] shadow-lg">
              <Image
                src="https://res.cloudinary.com/dy1pkrd52/image/upload/v1742829793/imagen_portada_rszj5g.webp"
                alt="Reunión inversión inmobiliaria"
                width={1200}
                height={700}
                className="object-cover w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>

        {/* Columna derecha: texto principal */}
        <div className="w-full md:w-[40%] flex flex-col items-start justify-center gap-8 relative px-4 sm:px-0">
          {/* Burbuja de mensaje principal */}
          <div className="bg-[#6290C3] text-white p-8 sm:p-10 rounded-tl-[60px] rounded-br-[60px] w-full shadow-xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug">
              Transforme su capital en patrimonio
            </h1>
          </div>

          {/* Burbuja del nombre de empresa */}
          <div className="bg-white text-[#6290C3] px-6 py-3 rounded-tr-[40px] rounded-bl-[40px] shadow-md">
            <span className="text-lg sm:text-xl font-semibold">
              Boost A Project
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
