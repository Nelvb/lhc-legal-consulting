/**
 * ClientLayout.tsx
 *
 * Layout general para vistas públicas y de usuario con ancho máximo global.
 * Muestra AnnouncementBar (solo en home), Navbar y Footer excepto en rutas profundas del admin.
 * En las rutas raíz del admin (/admin y /admin/perfil) la Navbar y Footer siguen visibles.
 * Si el usuario está autenticado, se monta la capa global de modales (UiGlobalLayer).
 * Control global de ancho máximo para pantallas grandes.
 */

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import UiGlobalLayer from "@/components/layout/UiGlobalLayer";
import AnnouncementBar from "@/components/ui/AnnouncementBar";
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
  
  // Mostrar AnnouncementBar solo en home
  const showAnnouncementBar = pathname === "/" && !hideLayout;
  
  return (
    <>
      {showAnnouncementBar && (
        <AnnouncementBar 
          message="Primera consulta gratuita - Respuesta garantizada en 24h"
          ctaText="Contacta ahora"
          ctaLink="/contacto"
        />
      )}
      {!hideLayout && <Navbar />}
      
      <div className="max-w-[1920px] mx-auto">
        {children}
      </div>
      
      {!hideLayout && <Footer />}
      {isAuthenticated && <UiGlobalLayer />}
    </>
  );
};

export default ClientLayout;