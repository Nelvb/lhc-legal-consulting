"use client";

import React from "react";
import { CheckCircle, ShieldCheck, Handshake, BarChart3 } from "lucide-react";

const values = [
  {
    icon: <CheckCircle className="w-8 h-8 text-[#1A1341]" />,
    title: "Transparencia real",
    description:
      "Cada proyecto incluye toda la información legal, técnica y financiera que necesitas para decidir con confianza.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-[#1A1341]" />,
    title: "Seguridad jurídica",
    description:
      "Operamos con contratos claros y revisados. Todas las operaciones están protegidas legalmente desde el inicio.",
  },
  {
    icon: <Handshake className="w-8 h-8 text-[#1A1341]" />,
    title: "Cercanía profesional",
    description:
      "No eres un número. Te asesoramos personalmente, sin prisas, con el foco en lo que tú necesitas como inversor.",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-[#1A1341]" />,
    title: "Rentabilidad con sentido",
    description:
      "Buscamos proyectos con recorrido, bien analizados y con visión a futuro. Invertir no es apostar, es decidir con datos.",
  },
];

const CompanyValues: React.FC = () => {
  return (
    <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-24">
      <div className="max-w-screen-2xl mx-auto text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1341]">
          ¿Por qué confiar en Boost A Project?
        </h2>
      </div>

      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {values.map((value, index) => (
          <div
            key={index}
            className="bg-[#F1FFEF] rounded-xl p-6 shadow-md text-left flex flex-col items-start gap-4"
          >
            {value.icon}
            <h3 className="text-xl font-semibold text-[#1A1341]">
              {value.title}
            </h3>
            <p className="text-gray-700 text-base leading-relaxed">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompanyValues;
