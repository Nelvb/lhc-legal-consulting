/**
 * layout.tsx - Layout raíz de LHC Legal & Consulting
 *
 * Este archivo define el layout principal de toda la aplicación Next.js.
 * Integra:
 * - Tipografía optimizada con Inter.
 * - Proveedor de estado global de cookies cumpliendo normativa RGPD.
 * - Sistema completo de consentimiento con banner y modal.
 * - Favicons compatibles con todos los navegadores modernos y dispositivos.
 *
 * IMPORTANTE:
 * - Todos los archivos favicon deben estar en la carpeta /public:
 *   favicon.ico, favicon-32x32.png, favicon-16x16.png, apple-touch-icon.png
 */

import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import PageLoader from "@/components/ui/PageLoader";
import ClientLayout from "@/components/layout/ClientLayout";
import { CookieConsentProvider } from "@/hooks/useCookieConsent";
import CookieBanner from "@/components/cookies/CookieBanner";
import CookieModal from "@/components/cookies/CookieModal";

// Carga optimizada de tipografía Inter desde Google Fonts
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Metadata global para SEO y favicons (sin manifest)
export const metadata: Metadata = {
  metadataBase: new URL("https://lhclegal.es"),
  title: "LHC Legal & Consulting | Asesoría Legal Profesional",
  description:
    "Asesoría legal especializada en derecho laboral, herencias, divorcios y más. Primera consulta gratuita. Respuesta garantizada en 24h.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
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
        {/* Loader inicial de pantalla completa */}
        <PageLoader />
        
        {/* Contexto global de cookies RGPD */}
        <CookieConsentProvider>
          <ClientLayout>{children}</ClientLayout>
          <CookieBanner />
          <CookieModal />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
