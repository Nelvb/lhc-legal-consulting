/**
 * ClientLayout envuelve las vistas del usuario y las vistas públicas.
 * Oculta automáticamente Navbar y Footer si la ruta comienza con /admin.
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

  // Ocultar Navbar y Footer si estamos en /admin o alguna subruta de /admin
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
};

export default ClientLayout;
