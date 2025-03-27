"use client";

import Image from "next/image";
import React from "react";
import Button from "@/components/ui/Button";

const InvestorSupport: React.FC = () => {
  return (
    <section className="w-full bg-[#C2E7DA] py-20 px-4 sm:px-6 lg:px-24">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center gap-16">
        {/* Columna izquierda: texto + CTA */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1341] leading-snug">
            Invertir no es fácil. Por eso no estarás solo.
          </h2>
          <p className="text-[#1A1341] text-lg leading-relaxed">
            Cada inversor tiene necesidades diferentes. Por eso ofrecemos
            atención personalizada: resolvemos tus dudas, te ayudamos a entender
            cada proyecto y te acompañamos desde el primer contacto hasta que tu
            inversión esté funcionando.
            <br />
            <br />
            Si quieres que hablemos y resolver tus dudas, estamos aquí para ti.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button variant="outline" size="md">
              Contáctanos
            </Button>
          </div>
        </div>

        {/* Columna derecha: imagen */}
        <div className="w-full md:w-1/2">
          <div className="rounded-xl overflow-hidden shadow-xl">
            <Image
              src="https://res.cloudinary.com/dy1pkrd52/image/upload/v1743000111/la-confianza_zeffka.webp"
              alt="Acompañamiento inversor"
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

export default InvestorSupport;
