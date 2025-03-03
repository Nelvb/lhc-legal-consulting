// components/layout/Navbar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold hover:scale-105 transition-transform">
              Starter Template
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            {!isAuthenticated && <Link href="/" className="nav-link">Inicio</Link>}
            {isAuthenticated && <Link href="/dashboard" className="nav-link">Dashboard</Link>}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            {!isAuthenticated ? (
              <>
                <Link href="/login" className="hover:scale-105 transition-transform">Iniciar Sesión</Link>
                <Link href="/signup" className="hover:scale-105 transition-transform">Registrarse</Link>
              </>
            ) : (
              <button className="hover:scale-105 transition-transform" onClick={() => console.log("Cerrar Sesión")}>
                Cerrar Sesión
              </button>
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
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
          {!isAuthenticated && <Link href="/" className="nav-link block">Inicio</Link>}
          {isAuthenticated && <Link href="/dashboard" className="nav-link block">Dashboard</Link>}
          <div className="border-t border-gray-700 pt-4">
            {!isAuthenticated ? (
              <>
                <Link href="/login" className="block hover:scale-105 transition-transform">Iniciar Sesión</Link>
                <Link href="/signup" className="block hover:scale-105 transition-transform">Registrarse</Link>
              </>
            ) : (
              <button className="block hover:scale-105 transition-transform" onClick={() => console.log("Cerrar Sesión")}>
                Cerrar Sesión
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

