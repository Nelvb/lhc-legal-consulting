/**
 * AdminCard.tsx
 *
 * Tarjeta funcional para el panel de administración de LHC Legal & Consulting.
 * Diseño con fondo azul sólido + glassmorphism overlay para crear efecto satinado.
 * Consistente con la identidad visual del proyecto usando la paleta de colores LHC.
 */

"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface AdminCardProps {
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const AdminCard: React.FC<AdminCardProps> = ({
  title,
  description,
  buttonLabel,
  href,
  icon,
  disabled = false,
}) => {
  const cardContent = (
    <div 
      className={`
        bg-white rounded-2xl p-8 shadow-lg border-2 border-[#1DA1F2]
        transition-all duration-300 ease-out hover:shadow-xl hover:scale-105 hover:border-[#60A5FA]
        flex flex-col justify-between h-full min-h-[280px]
        ${disabled ? '' : 'cursor-pointer'}
      `}
    >
      {/* Header con icono */}
      <div>
        {icon && (
          <div className="mb-6">
            <div className="w-12 h-12 bg-[#1DA1F2]/10 rounded-xl flex items-center justify-center text-[#1DA1F2]">
              {icon}
            </div>
          </div>
        )}

        <h3 className="text-2xl font-bold text-[#1b2f4b] mb-4 leading-tight">
          {title}
        </h3>
        
        <p className="text-gray-600 text-base leading-relaxed mb-6">
          {description}
        </p>
      </div>

      {/* Footer con botón */}
      <div className="mt-auto">
        <Button 
          variant="primary" 
          size="md" 
          disabled={disabled}
          fullWidth
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );

  if (disabled) {
    return cardContent;
  }

  return (
    <Link href={href} className="block group">
      {cardContent}
    </Link>
  );
};

export default AdminCard;