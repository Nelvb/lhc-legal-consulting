"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import NavbarLinks from "@/components/layout/NavbarLinks";
import SideMenu from "@/components/layout/SideMenu";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClasses = `
    fixed w-full top-0 left-0 z-10 h-20 flex items-center
    transition-colors duration-300
    ${scrolled ? "bg-[#1DA1F2] shadow-md" : "bg-transparent"}
  `;

  return (
    <>
      <nav className={navbarClasses}>
        <div className="w-full px-6 flex justify-between items-center h-full">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-white hover:opacity-90 transition-opacity"
            >
              Boost A Project
            </Link>
          </div>

          {/* Enlaces de autenticación */}
          <NavbarLinks key={`nav-links-${isAuthenticated}`} />

          {/* Botón menú lateral (siempre visible) */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            aria-label="Abrir menú"
          >
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
                  strokeWidth={2}
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
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Menú lateral */}
      <SideMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Navbar;
