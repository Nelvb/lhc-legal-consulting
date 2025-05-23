/**
 * Navbar.tsx
 *
 * Componente de navegación global para todas las vistas.
 * Muestra el logo, enlaces condicionales y el botón hamburguesa.
 * Renderiza el menú lateral según el tipo de usuario: público, autenticado o administrador.
 * Mejora la UX ocultando título redundante ("Área Privada") y manteniendo consistencia visual.
 */

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import NavbarLinks from "@/components/layout/NavbarLinks";
import AdminSideMenu from "@/components/sideMenus/AdminSideMenu";
import UserSideMenu from "@/components/sideMenus/UserSideMenu";
import SideMenu from "@/components/sideMenus/SideMenu";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClasses = `
    fixed w-full top-0 left-0 z-20 h-36 flex items-center
    transition-colors duration-300
    ${scrolled ? "bg-[#1DA1F2] shadow-md" : "bg-transparent"}
  `;

  return (
    <>
      <nav className={navbarClasses}>
        <div className="w-full px-4 flex justify-between items-center h-full relative">
          {/* Logo principal */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="https://res.cloudinary.com/dy1pkrd52/image/upload/v1742894677/Logo-sin-fondo-3_d4ch0a.webp"
              alt="Boost A Project Logo"
              width={50}
              height={50}
              priority
              className="w-32 h-32 object-contain"
            />
            <span className="sr-only">Boost A Project</span>
          </Link>

          {/* Enlaces visibles y botón hamburguesa */}
          <div className="flex items-center space-x-8">
            <NavbarLinks key={`nav-links-${isAuthenticated}`} />

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white text-lg font-medium transition-all duration-300 hover:scale-110 transform-gpu"
              aria-label="Abrir menú"
            >
              {isOpen ? (
                <svg
                  className="h-10 w-10"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Menú lateral condicional por tipo de usuario */}
      {user?.is_admin ? (
        <AdminSideMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      ) : user ? (
        <UserSideMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      ) : (
        <SideMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
