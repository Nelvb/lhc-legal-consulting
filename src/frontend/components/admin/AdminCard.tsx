/**
 * Componente AdminCard: Tarjeta funcional para el panel de administración.
 * Se usa como acceso visual a secciones como Proyectos, Blog o Perfil.
 * Internamente reutiliza el componente base Card del sistema UI.
 */

"use client";

import React from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface AdminCardProps {
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
}

const AdminCard: React.FC<AdminCardProps> = ({
  title,
  description,
  buttonLabel,
  href,
}) => {
  return (
    <Card className="p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-[#1A1341] mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
      </div>
      <div className="mt-auto">
        <Link href={href}>
          <Button variant="primary" size="md">
            {buttonLabel}
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default AdminCard;
