/**
 * ClientLayout.tsx
 *
 * Layout general para vistas públicas y de usuario.
 * ACTUALIZADO: Scroll global gestionado post-render al detectar cambio real de ruta.
 * Evita parpadeos y saltos prematuros al hacer click.
 * 
 * Optimizaciones:
 * - Memoización de componentes pesados
 * - Spinner simple global durante navegación
 * - Scroll al top sólo cuando corresponde (evita doble scroll)
 */

"use client";

import React, { memo, useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUiStore } from "@/stores/useUiStore";
import { useRouteLoaderStore } from "@/stores/useRouteLoaderStore";

// Imports críticos
import Navbar from "@/components/layout/Navbar";

// Imports diferidos
const Footer = dynamic(() => import("@/components/layout/Footer"), { ssr: true });
const UiGlobalLayer = dynamic(() => import("@/components/layout/UiGlobalLayer"), { ssr: false });
const AnnouncementBar = dynamic(() => import("@/components/ui/AnnouncementBar"), { ssr: true });

interface ClientLayoutProps {
  children: React.ReactNode;
}

// Memoized AnnouncementBar
const MemoizedAnnouncementBar = memo(() => (
  <AnnouncementBar
    message="Primera consulta gratuita - Respuesta garantizada en 24h"
    ctaText="Contacta ahora"
    ctaLink="/contact"
  />
));
MemoizedAnnouncementBar.displayName = "MemoizedAnnouncementBar";

// Spinner de navegación
const SimpleLoader = memo(() => {
  const { isNavigating } = useRouteLoaderStore();
  if (!isNavigating) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm flex items-center justify-center"
      role="status"
      aria-label="Cargando página"
    >
      <div className="w-8 h-8 border-2 border-gray-200 rounded-full animate-spin border-t-[#1b2f4b]" />
    </div>
  );
});
SimpleLoader.displayName = "SimpleLoader";

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  const lastPathRef = useRef<string>("");

  // Scroll global solo si cambia la ruta real
  useEffect(() => {
    if (pathname !== lastPathRef.current) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      });
      lastPathRef.current = pathname;
    }
  }, [pathname]);

  // Flags memorizados
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
      <SimpleLoader />

      {routeFlags.showAnnouncementBar && <MemoizedAnnouncementBar />}
      {!routeFlags.hideLayout && <Navbar />}

      <div className="max-w-[1920px] mx-auto" id="main-top">
        {children}
      </div>

      {!routeFlags.hideLayout && <Footer />}
      {isAuthenticated && <UiGlobalLayer />}
    </>
  );
};

export default memo(ClientLayout);
