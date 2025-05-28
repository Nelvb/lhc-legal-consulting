/**
 * ClientLayout.tsx
 *
 * Layout general para vistas públicas y de usuario.
 * Muestra Navbar y Footer excepto en rutas profundas del admin (/admin/blog, /admin/projects...).
 * En las rutas raíz del admin (/admin y /admin/perfil) la Navbar y Footer siguen visibles.
 * Si el usuario está autenticado, se monta la capa global de modales (UiGlobalLayer).
 */

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import UiGlobalLayer from "@/components/layout/UiGlobalLayer";
import { useAuthStore } from "@/stores/useAuthStore";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  const isStrictlyAdminHomeOrProfile =
    pathname === "/admin" || pathname === "/admin/perfil";

  const hideLayout = pathname.startsWith("/admin") && !isStrictlyAdminHomeOrProfile;

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
      {isAuthenticated && <UiGlobalLayer />}
    </>
  );
};

export default ClientLayout;
