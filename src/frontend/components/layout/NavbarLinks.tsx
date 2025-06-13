/**
 * NavbarLinks.tsx
 *
 * Versión limpia y profesional para vista pública de LHC Legal.
 * Muestra solo enlaces principales del sitio.
 */

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

const NavbarLinks: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const pathname = usePathname();

  if (isAuthenticated) return null;

  return (
    <div className="hidden md:flex items-center space-x-8">
      <Link href="/areas-de-actuacion" className="text-[#1b2f4b] text-lg font-medium hover:scale-110 transition-all">
        Áreas
      </Link>
      <Link href="/blog" className="text-[#1b2f4b] text-lg font-medium hover:scale-110 transition-all">
        Blog
      </Link>
      <Link href="/about-us" className="text-[#1b2f4b] text-lg font-medium hover:scale-110 transition-all">
        Nosotros
      </Link>
      <Link href="/contact" className="text-[#1b2f4b] text-lg font-medium hover:scale-110 transition-all">
        Contacto
      </Link>
    </div>
  );
};

export default NavbarLinks;
