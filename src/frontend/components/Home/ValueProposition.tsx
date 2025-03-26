// src/frontend/components/Home/ValueProposition.tsx
"use client";

import Image from "next/image";
import React from "react";
import Button from "@/components/ui/Button";

const ValueProposition: React.FC = () => {
  return (
    <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-24">
      <div className="max-w-screen-2xl mx-auto flex flex-col-reverse md:flex-row items-center gap-16">
        
        {/* Bloque izquierdo: imágenes superpuestas */}
        <div className="w-full md:w-1/2 flex justify-start items-center relative">
          <div className="relative w-full max-w-[700px] mx-auto">
            {/* Imagen de fondo (casa) */}
            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://res.cloudinary.com/dy1pkrd52/image/upload/v1742984757/casa_reformada_en_tonos_blancos_ndeuxp.webp"
                alt="Casa reformada"
                width={1000}
                height={700}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            {/* Imagen secundaria (pareja) */}
            <div className="hidden md:block absolute -bottom-8 -right-8 w-1/2 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="https://res.cloudinary.com/dy1pkrd52/image/upload/v1742984575/business-people-hand-shake_wpqtsa.webp"
                alt="Inversores negociando"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Versión mobile: centrado y más pequeño */}
            <div className="md:hidden absolute left-1/2 -bottom-4 transform -translate-x-1/2 w-2/3 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="https://res.cloudinary.com/dy1pkrd52/image/upload/v1742984575/business-people-hand-shake_wpqtsa.webp"
                alt="Inversores negociando"
                width={400}
                height={300}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bloque derecho: texto */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 px-2 sm:px-0">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug">
            ¿Buscas invertir en inmobiliaria pero no sabes por dónde empezar?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Te acompañamos desde el primer paso. Analizamos tus objetivos, te
            mostramos oportunidades reales y te guiamos durante todo el proceso.
            Invertir en proyectos sólidos ahora es más fácil, transparente y
            personalizado.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button variant="primary" size="md">
              Explorar Proyectos
            </Button>
            <Button variant="outline" size="md">
              Solicitar Asesoramiento
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
