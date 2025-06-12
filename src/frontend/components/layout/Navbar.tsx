/**
 * Navbar.tsx
 *
 * Navbar principal para LHC Legal & Consulting.
 * Logo horizontal actualizado, fondo claro y sticky, con menú lateral condicional.
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
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClasses = `
    sticky w-full top-0 left-0 z-20 h-20 flex items-center
    transition-colors duration-300 bg-[#F4F2ED] shadow-sm
  `;

  return (
    <>
      <nav className={navbarClasses}>
        <div className="w-full px-4 flex justify-between items-center h-full relative">
          {/* Logo horizontal */}
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

          {/* Enlaces + hamburguesa */}
          <div className="flex items-center space-x-8">
            <NavbarLinks key={`nav-links-${isAuthenticated}`} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-[#1b2f4b] text-lg font-medium hover:scale-110 transition-all"
              aria-label="Abrir menú"
            >
              <svg
                className="h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Menú lateral por tipo de usuario */}
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
