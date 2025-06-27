/**
 * ClientLayout.tsx
 *
 * Layout general simplificado para vistas públicas y de usuario.
 * Oculta Navbar y Footer completamente en cualquier ruta /admin.
 * Sin transiciones complejas que causan parpadeos - Next.js maneja la navegación.
 * 
 * Optimizaciones:
 * - Memoización de componentes pesados
 * - Carga condicional de componentes
 * - Sistema simple de loading
 */

"use client";

import React, { memo, useMemo } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUiStore } from "@/stores/useUiStore";
import { useRouteLoaderStore } from "@/stores/useRouteLoaderStore";

// Imports estáticos para componentes críticos
import Navbar from "@/components/layout/Navbar";
import ScrollToTop from "@/components/utils/ScrollToTop";

// Imports dinámicos para componentes no críticos
const Footer = dynamic(() => import("@/components/layout/Footer"), {
  ssr: true,
});

const UiGlobalLayer = dynamic(() => import("@/components/layout/UiGlobalLayer"), {
  ssr: false,
});

const AnnouncementBar = dynamic(() => import("@/components/ui/AnnouncementBar"), {
  ssr: true,
});

interface ClientLayoutProps {
  children: React.ReactNode;
}

// Memoizar AnnouncementBar para evitar re-renders innecesarios
const MemoizedAnnouncementBar = memo(() => (
  <AnnouncementBar
    message="Primera consulta gratuita - Respuesta garantizada en 24h"
    ctaText="Contacta ahora"
    ctaLink="/contact"
  />
));

MemoizedAnnouncementBar.displayName = 'MemoizedAnnouncementBar';

// Loading overlay simple
const SimpleLoader = memo(() => {
  const { isNavigating } = useRouteLoaderStore();
  
  if (!isNavigating) return null;
  
  return (
    <div 
      className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm flex items-center justify-center"
      role="status"
      aria-label="Cargando página"
    >
      <div className="w-8 h-8 border-2 border-gray-200 rounded-full animate-spin border-t-[#1b2f4b]"></div>
    </div>
  );
});

SimpleLoader.displayName = 'SimpleLoader';

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);

  // Memoizar cálculos de rutas para evitar re-computaciones
  const routeFlags = useMemo(() => {
    const isAdminRoute = pathname.startsWith("/admin");
    const hideLayout = isAdminRoute;
    const showAnnouncementBar = pathname === "/" && !hideLayout && !isSideMenuOpen;
    
    return {
      isAdminRoute,
      hideLayout,
      showAnnouncementBar,
    };
  }, [pathname, isSideMenuOpen]);

  return (
    <>
      {/* Loading overlay simple */}
      <SimpleLoader />
      
      {/* AnnouncementBar - Solo en home */}
      {routeFlags.showAnnouncementBar && <MemoizedAnnouncementBar />}
      
      {/* Navbar - Solo en rutas no-admin */}
      {!routeFlags.hideLayout && <Navbar />}

      {/* Scroll utility */}
      <ScrollToTop />

      {/* Contenido principal con ancho máximo */}
      <div className="max-w-[1920px] mx-auto" id="main-top">
        {children}
      </div>

      {/* Footer - Solo en rutas no-admin */}
      {!routeFlags.hideLayout && <Footer />}
      
      {/* UI Global Layer - Solo para usuarios autenticados */}
      {isAuthenticated && <UiGlobalLayer />}
    </>
  );
};

export default memo(ClientLayout);