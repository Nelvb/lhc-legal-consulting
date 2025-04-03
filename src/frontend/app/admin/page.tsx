// src/frontend/app/admin/page.tsx

/**
 * Página principal del panel de administración (App Router)
 * Renderiza el componente cliente que contiene la lógica de autenticación y el contenido
 */

import AdminPageContent from "@/components/admin/AdminPageContent";

export const metadata = {
  title: "Panel de Administración | Boost a Project",
  description:
    "Gestiona proyectos, artículos del blog y tu perfil como administrador.",
};

export default function AdminPage() {
  return <AdminPageContent />;
}
