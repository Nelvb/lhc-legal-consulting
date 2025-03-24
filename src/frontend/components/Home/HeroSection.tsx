// src/frontend/components/auth/Home/HeroSection.tsx
"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full bg-[#D6F3FF] pt-24">
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Imagen lado izquierdo */}
        <div className="w-full md:w-1/2">
          <div className="overflow-hidden rounded-tl-[60px] rounded-br-[60px]">
            <Image
              src="https://res.cloudinary.com/dy1pkrd52/image/upload/v1742829793/imagen_portada_rszj5g.webp"
              alt="Reunión inversión inmobiliaria"
              width={1000}
              height={500}
              className="object-cover w-full h-auto"
            />
          </div>
        </div>

        {/* Bloque de texto lado derecho */}
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center gap-8">
          <div className="bg-[#26C4FF] text-white p-8 rounded-tl-[60px] rounded-br-[60px] w-full shadow-md">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
              Transforme su capital en patrimonio
            </h1>
          </div>

          <div className="bg-white text-[#26C4FF] px-6 py-3 rounded-tr-[40px] rounded-bl-[40px] shadow-md">
            <span className="text-base sm:text-lg font-semibold">
              Boost A Project
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
