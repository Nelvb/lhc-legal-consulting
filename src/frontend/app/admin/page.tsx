/**
 * Página principal del panel de administración
 * Protege el acceso solo a usuarios con is_admin === true
 * Muestra accesos directos a las secciones clave mediante AdminCard
 */

"use client";

import { redirect } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminCard from "@/components/admin/AdminCard";

export default function AdminPage() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user?.is_admin) {
    redirect("/");
  }

  return (
    <AdminLayout title="Panel de Administración">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminCard
          title="Proyectos"
          description="Gestiona, crea o edita los proyectos inmobiliarios activos."
          buttonLabel="Ver proyectos"
          href="/admin/projects"
        />

        <AdminCard
          title="Publicaciones del Blog"
          description="Escribe y publica artículos para informar a tus inversores."
          buttonLabel="Ir al blog"
          href="/admin/blog"
        />

        <AdminCard
          title="Mi cuenta"
          description="Edita tus datos personales, correo y contraseña."
          buttonLabel="Gestionar perfil"
          href="/admin/profile"
        />
      </div>
    </AdminLayout>
  );
}
