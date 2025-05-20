/**
 * ClientLayout.tsx
 *
 * Layout general para vistas públicas y de usuario.
 * Muestra Navbar y Footer excepto en rutas profundas del admin (/admin/blog, /admin/projects...).
 * En las rutas raíz del admin (/admin y /admin/perfil) la Navbar y Footer siguen visibles.
 */

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const isStrictlyAdminHomeOrProfile =
    pathname === "/admin" || pathname === "/admin/perfil";

  const hideLayout = pathname.startsWith("/admin") && !isStrictlyAdminHomeOrProfile;

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
};

export default ClientLayout;
