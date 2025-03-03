// components/layout/Navbar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";
import MobileMenu from "../ui/MobileMenu";
import Button from "../ui/Button";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();

  return (
    <>
      <nav className="bg-white dark:bg-gray-800 text-white shadow-md fixed w-full top-0 left-0 z-10 h-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between h-full items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold transition-all ease-smooth hover:scale-hover"
              >
                Starter Template
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-6">
              {isAuthenticated && (
                <Link href="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              )}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-6">
              {!isAuthenticated ? (
                <>
                  <Link
                    href="/"
                    className="transition-all ease-smooth hover:scale-hover"
                  >
                    Inicio
                  </Link>
                  <Link href="/login" className="transition-all ease-smooth hover:scale-hover">
                    <Button variant="outline" size="sm">
                      Iniciar Sesión
                    </Button>
                  </Link>
                  <Link href="/signup" className="transition-all ease-smooth hover:scale-hover">
                    <Button variant="primary" size="sm">
                      Registrarse
                    </Button>
                  </Link>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => console.log("Cerrar Sesión")}
                  className=":transition-all ease-smooth hover:scale-hover"
                >
                  Cerrar Sesión
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Navbar;
