/**
 * RootLayout.tsx
 *
 * Layout raíz de la aplicación (App Router de Next.js).
 * Aplica estilos globales, fuentes personalizadas y estructura base.
 * Elimina el antiguo AuthProvider al migrar a Zustand (useAuthStore).
 * Este layout es común a todas las rutas, incluyendo públicas, privadas y admin.
 *
 * - Optimizado para SEO y accesibilidad.
 * - Tipado estricto con TypeScript.
 * - Integración con fuentes Google vía next/font.
 * - Carga de estilos globales con Tailwind CSS.
 */

import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

// Configuración de fuentes de Google usando Next.js Font Optimization
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Boost A Project | Plataforma de inversión inmobiliaria",
  description:
    "Invierte de forma clara y segura. Boost A Project te acompaña en cada paso para que tomes decisiones informadas con transparencia y confianza.",
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
          ${geistSans.variable} ${geistMono.variable}
          antialiased
          text-[#1A1341]
          bg-white
        `}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
