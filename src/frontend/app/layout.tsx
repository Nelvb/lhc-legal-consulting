// src/frontend/app/layout.tsx
import React from "react";
import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Configuración de fuentes de Google usando Next.js Font Optimization
// Geist Sans: Fuente principal para texto general
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadatos del sitio web para SEO y configuraciones del navegador
export const metadata: Metadata = {
  title: "Starter Template - Next.js, Flask, PostgreSQL & Tailwind",
  description:
    "Base optimizada para proyectos Full Stack con Next.js, TypeScript, Flask, PostgreSQL, Tailwind CSS y JWT Authentication.",
  icons: {
    icon: "/favicon.ico",
  },
};

// Layout raíz que envuelve toda la aplicación
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* 
        Configuración de clases globales:
        - Fuentes personalizadas
        - Antialiasing para mejor renderizado de texto
        - Colores de fondo y texto para modo claro y oscuro 
      */}
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable}
          antialiased
          text-[#1A1341]
          bg-white
        `}
      >
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
