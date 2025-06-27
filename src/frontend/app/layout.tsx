/**
 * layout.tsx - Layout raíz con Context Provider de cookies
 *
 * Layout principal de LHC Legal & Consulting con fuentes optimizadas y sistema de cookies profesional.
 * Incluye CookieConsentProvider para estado global compartido entre componentes.
 * Banner y modal de cookies con Context Provider cumpliendo normativa RGPD.
 */

import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import { CookieConsentProvider } from "@/hooks/useCookieConsent";
import CookieBanner from "@/components/cookies/CookieBanner";
import CookieModal from "@/components/cookies/CookieModal";

// Carga de fuentes optimizadas de Google
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LHC Legal & Consulting | Asesoría Legal Profesional",
  description: "Asesoría legal especializada en derecho laboral, herencias, divorcios y más. Primera consulta gratuita. Respuesta garantizada en 24h.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`
          ${inter.variable} 
          font-sans 
          antialiased 
          text-[#1A1341] 
          bg-white
        `}
      >
        {/* Provider de cookies envuelve toda la aplicación */}
        <CookieConsentProvider>
          <ClientLayout>{children}</ClientLayout>
          
          {/* Sistema de cookies - ahora comparten el mismo estado */}
          <CookieBanner />
          <CookieModal />
        </CookieConsentProvider>
      </body>
    </html>
  );
}