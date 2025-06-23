/**
 * SideMenuHeader.tsx
 *
 * Cabecera profesional del menú lateral en LHC Legal & Consulting.
 * Aplica el azul corporativo exacto (#0E2A47) como fondo sólido.
 * El logo se muestra ampliado y centrado visualmente.
 * No se incluye saludo personalizado para mantener neutralidad institucional.
 */

"use client";

import React from "react";
import Image from "next/image";

interface SideMenuHeaderProps {
  onClose: () => void;
}

const SideMenuHeader: React.FC<SideMenuHeaderProps> = ({ onClose }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-[#0E2A47]">
      <div className="flex items-center space-x-3">
        <Image
          src="https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749048011/Logo_horizontal-removebg-preview_pm2q1z.webp"
          alt="LHC Legal & Consulting"
          width={200}
          height={60}
          priority
          className="h-20 w-auto object-contain invert brightness-0"
        />
      </div>
      <button
        onClick={onClose}
        aria-label="Cerrar menú"
        className="text-white hover:text-[#C2E7DA]"
      >
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default SideMenuHeader;
