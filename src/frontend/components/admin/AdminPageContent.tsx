"use client";

/**
 * Componente de contenido principal del panel de administración.
 * Encapsula la lógica de protección de ruta, autorización por rol (is_admin),
 * y renderiza las tarjetas con accesos rápidos a las funcionalidades clave del admin.
 *
 * Este componente se usa exclusivamente en /app/admin/page.tsx para cumplir
 * con las restricciones de hooks en layouts o páginas del App Router (Next.js).
 */

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminCard from "@/components/admin/AdminCard";

const AdminPageContent = () => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || !user?.is_admin) {
      router.replace("/");
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user?.is_admin) return null;

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-16">
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
};

export default AdminPageContent;
