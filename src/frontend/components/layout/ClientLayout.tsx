/**
 * ClientLayout.tsx
 *
 * Layout general para vistas públicas y de usuario con ancho máximo global.
 * Oculta Navbar y Footer completamente en cualquier ruta /admin (incluido /admin y /admin/perfil).
 * La Navbar y Footer del admin se gestionan exclusivamente desde AdminLayout.
 * Muestra AnnouncementBar solo en home.
 */

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import UiGlobalLayer from "@/components/layout/UiGlobalLayer";
import AnnouncementBar from "@/components/ui/AnnouncementBar";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUiStore } from "@/stores/useUiStore";
import RouteChangeLoader from "@/components/ui/RouteChangeLoader"
import ScrollToTop from "@/components/utils/ScrollToTop";



interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);

  // Ocultar layout global por completo en cualquier ruta admin
  const isAdminRoute = pathname.startsWith("/admin");
  const hideLayout = isAdminRoute;

  // Mostrar AnnouncementBar solo en home y cuando el menú no esté abierto
  const showAnnouncementBar =
    pathname === "/" && !hideLayout && !isSideMenuOpen;

  return (
    <>
      {showAnnouncementBar && (
        <AnnouncementBar
          message="Primera consulta gratuita - Respuesta garantizada en 24h"
          ctaText="Contacta ahora"
          ctaLink="/contact"
        />
      )}
      {!hideLayout && <Navbar />}

      <RouteChangeLoader />
      <ScrollToTop />

      <div className="max-w-[1920px] mx-auto" id="main-top">
        {children}
      </div>

      {!hideLayout && <Footer />}
      {isAuthenticated && <UiGlobalLayer />}
    </>
  );
};

export default ClientLayout;
