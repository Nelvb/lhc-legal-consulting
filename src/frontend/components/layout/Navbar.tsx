// components/layout/Navbar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";
import NavbarLinks from "./NavbarLinks";
import MobileMenu from "../ui/MobileMenu";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();
  
  // Este useEffect es para debug y verificar que el estado de autenticación cambia correctamente
  useEffect(() => {
    console.log("Navbar - Estado de autenticación:", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <>
      <nav className="bg-white dark:bg-gray-800 text-white shadow-md fixed w-full top-0 left-0 z-10 h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between h-full items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold transition-all ease-smooth hover:scale-hover text-gray-800 dark:text-white"
              >
                Starter Template
              </Link>
            </div>

            {/* Enlaces de navegación (separados en otro componente) */}
            <NavbarLinks key={`nav-links-${isAuthenticated}`} />

            {/* Botón de menú para móviles */}
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Abrir menú</span>
                {isOpen ? (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Menú para móviles */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Navbar;