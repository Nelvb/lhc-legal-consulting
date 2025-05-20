/**
 * Página principal del dashboard del administrador (/admin)
 *
 * Visual unificado con el dashboard de usuario: fondo dividido, cabecera profesional,
 * tarjetas con acceso rápido a funcionalidades clave.
 * Protección de ruta mediante verificación de is_admin.
 */

"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/shared/DashboardHeader";
import AdminCard from "@/components/admin/ui/AdminCard";

const AdminDashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !user?.is_admin) {
      router.replace("/");
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user?.is_admin) return null;

  return (
    <div className="relative min-h-screen pt-52">
      {/* Fondo dividido 30/70 */}
      <div className="absolute inset-0 flex">
        <div className="w-[30%] bg-[#C2E7DA]" />
        <div className="w-[70%] bg-[#1A1341]" />
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto px-4">
        <DashboardHeader
          badge="Panel Admin"
          title={`Panel de ${user.username}`}
          subtitle="Gestiona el contenido de la plataforma"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AdminCard
            title="Proyectos"
            description="Crea, edita o elimina proyectos inmobiliarios."
            buttonLabel="Ver proyectos"
            href="/admin/projects"
          />
          <AdminCard
            title="Blog"
            description="Publica artículos y mantén informados a los usuarios."
            buttonLabel="Ir al blog"
            href="/admin/blog"
          />
          <AdminCard
            title="Mi cuenta"
            description="Actualiza tu nombre de administrador."
            buttonLabel="Editar perfil"
            href="/admin/perfil"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
