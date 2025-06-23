/**
 * Navbar.tsx
 *
 * Navbar principal para LHC Legal & Consulting.
 * Logo horizontal actualizado, fondo claro y sticky, con menú lateral controlado por Zustand.
 * Cambia a icono X si el menú lateral está abierto. Añade sombra al hacer scroll.
 * Responsive y con diseño profesional.
 */

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUiStore } from "@/stores/useUiStore";
import NavbarLinks from "@/components/layout/NavbarLinks";
import LHCSideMenu from "@/components/layout/LHCSideMenu";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  const openSideMenu = useUiStore((state) => state.openSideMenu);
  const closeSideMenu = useUiStore((state) => state.closeSideMenu);

  const [scrolled, setScrolled] = useState(false);

  // Añadir sombra al hacer scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Alterna el menú lateral desde Zustand
  const toggleMenu = () => {
    if (isSideMenuOpen) {
      closeSideMenu();
    } else {
      openSideMenu();
    }
  };

  const navbarClasses = `
    sticky top-0 left-0 w-full z-20 h-20 flex items-center
    transition-colors duration-300 bg-[#F4F2ED] shadow-sm
    ${scrolled ? "shadow-md" : ""}
  `;

  return (
    <>
      <header className={navbarClasses}>
        <div className="w-full px-4 pr-6 flex justify-between items-center h-full relative">
          {/* Logo horizontal corporativo */}
          <Link href="/" className="flex items-center">
            <Image
              src="https://res.cloudinary.com/dvtzbfjwl/image/upload/v1749048011/Logo_horizontal-removebg-preview_pm2q1z.webp"
              alt="LHC Legal & Consulting"
              width={400}
              height={96}
              priority
              className="h-24 w-auto object-contain"
            />
            <span className="sr-only">LHC Legal & Consulting</span>
          </Link>

          {/* Enlaces + botón hamburguesa visible solo en móvil */}
          <div className="flex items-center space-x-8">
            <NavbarLinks key={`nav-links-${isAuthenticated}`} />

            <button
              onClick={toggleMenu}
              className="p-2 text-[#1b2f4b] text-lg font-medium hover:scale-110 transition-all md:hidden"
              aria-label="Abrir menú"
              aria-expanded={isSideMenuOpen}
            >
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
                  d={
                    isSideMenuOpen
                      ? "M6 18L18 6M6 6l12 12" // Icono X (cerrar)
                      : "M4 6h16M4 12h16M4 18h16" // Icono hamburguesa
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Menú lateral global controlado por Zustand */}
      <LHCSideMenu />
    </>
  );
};

export default Navbar;
