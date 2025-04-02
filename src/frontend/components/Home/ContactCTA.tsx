// src/frontend/components/Home/LetsTalk.tsx
"use client";

import Image from "next/image";
import React from "react";
import Button from "@/components/ui/Button";

const ContactCTA: React.FC = () => {
  return (
    <section className="w-full bg-[#C2E7DA] py-20 px-4 sm:px-6 lg:px-24">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Columna izquierda: texto + CTA */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1341] leading-snug">
            ¿Hablamos sobre tu próxima inversión?
          </h2>
          <p className="text-[#1A1341] text-lg leading-relaxed">
            Si tienes dudas, quieres que te asesoremos o simplemente quieres
            saber más sobre cómo invertir con Boost A Project, estamos aquí
            para ayudarte. Nuestro equipo te acompaña en cada paso del proceso.
          </p>
          <div className="flex flex-wrap gap-4 mt-2">
            <Button variant="outline" size="md">
              Contactar
            </Button>
          </div>
        </div>

        {/* Columna derecha: imagen */}
        <div className="w-full md:w-1/2">
          <div className="rounded-xl overflow-hidden shadow-xl">
            <Image
              src="https://res.cloudinary.com/dy1pkrd52/image/upload/v1743083668/futuro_me6fdx.webp"
              alt="Pareja visualizando el futuro"
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
