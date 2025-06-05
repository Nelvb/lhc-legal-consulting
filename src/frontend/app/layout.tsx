// Layout raíz de la app con fuentes personalizadas optimizadas
import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
