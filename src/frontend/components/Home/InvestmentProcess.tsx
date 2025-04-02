// src/frontend/components/Home/InvestmentProcess.tsx
"use client";

import React from "react";
import { Search, CalendarClock, Users, FileSignature } from "lucide-react";
import Button from "@/components/ui/Button";

const steps = [
  {
    icon: <Search className="w-10 h-10 text-white" />,
    title: "Explora",
    description:
      "Descubre proyectos que se alinean con tus objetivos financieros y revisa toda la documentación disponible online.",
  },
  {
    icon: <CalendarClock className="w-10 h-10 text-white" />,
    title: "Consulta",
    description:
      "Agenda una sesión personalizada con nuestro equipo (vía llamada, videollamada o presencial) para resolver tus dudas específicas.",
  },
  {
    icon: <Users className="w-10 h-10 text-white" />,
    title: "Análisis conjunto",
    description:
      "Evaluamos juntos la mejor opción según tu perfil inversor, con total transparencia sobre condiciones y expectativas.",
  },
  {
    icon: <FileSignature className="w-10 h-10 text-white" />,
    title: "Formalización",
    description:
      "Cerramos el acuerdo mediante una reunión personal, donde revisamos toda la documentación legal y formalizamos tu inversión.",
  },
];

const colors = [
  "bg-[#1DA1F2]", // Azul
  "bg-[#6290C3]", // Azul medio
  "bg-[#1A1341]", // Morado oscuro
  "bg-[#1DA1F2]", // Azul de nuevo para cerrar el ciclo
];

const InvestmentProcess: React.FC = () => {
  return (
    <section className="w-full bg-[#F7FAFF] py-20 px-4 sm:px-6 lg:px-24 border-t border-b border-gray-100">
      <div className="max-w-screen-2xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1341] mb-4">
            Invertir con nosotros es muy sencillo
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            A diferencia de otras plataformas automatizadas, en Boost A Project 
            creemos en las relaciones personales. Nuestro proceso está diseñado 
            para ofrecerte toda la información y acompañamiento que necesitas.
          </p>
        </div>

        {/* Timeline para pantallas medianas y grandes */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Línea conectora */}
            <div className="absolute top-24 left-0 w-full h-1 bg-gray-200"></div>

            <div className="grid grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  {/* Círculo con número */}
                  <div className="flex flex-col items-center">
                    <div className={`flex items-center justify-center w-20 h-20 rounded-full ${colors[index]} mb-2 shadow-lg transition-transform duration-300 hover:scale-110`}>
                      {step.icon}
                    </div>
                    <div className="bg-white text-[#1A1341] w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg ring-4 ring-[#F7FAFF] -mt-4">
                      {index + 1}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#1A1341] mt-4 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-700">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Versión móvil */}
        <div className="md:hidden">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start">
                {/* Círculo con número */}
                <div className="mr-4 flex-shrink-0">
                  <div className={`flex items-center justify-center w-14 h-14 rounded-full ${colors[index]} shadow-md`}>
                    {step.icon}
                  </div>
                  <div className="bg-white text-[#1A1341] w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm -mt-3 ml-8 ring-2 ring-[#F7FAFF]">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1A1341] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-[#1A1341] font-medium mb-6">
            ¿Estás listo para dar el primer paso?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              className="flex items-center gap-2"
            >
              Explorar proyectos
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
            >
              Agendar consulta
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentProcess;