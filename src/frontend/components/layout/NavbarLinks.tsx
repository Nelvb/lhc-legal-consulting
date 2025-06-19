/**
 * NavbarLinks.tsx
 *
 * Componente de navegación principal para usuarios no autenticados.
 * Muestra los enlaces públicos clave del sitio: Áreas, Blog, Preguntas Frecuentes,
 * Nosotros y Contacto, con estilos consistentes y resaltado automático de la sección activa.
 *
 * Utiliza `usePathname` para detectar la ruta actual y aplicar estilos condicionales
 * al enlace correspondiente. Esto mejora la experiencia del usuario al mostrar
 * de forma clara en qué sección se encuentra.
 *
 * Completamente responsivo: se oculta en móviles y se muestra a partir de md.
 */

"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

const NavbarLinks: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const pathname = usePathname();

  // Evita mostrar la navbar pública si el usuario está autenticado
  if (isAuthenticated) return null;

  // Aplica estilos especiales al enlace activo comparando pathname con href
  const linkClasses = (href: string) =>
    `text-lg font-medium transition-all ${
      pathname.startsWith(href)
        ? "text-[#1DA1F2] font-bold underline underline-offset-4"
        : "text-[#1b2f4b] hover:scale-110"
    }`;

  return (
    <div className="hidden md:flex items-center space-x-8">
      <Link href="/areas" className={linkClasses("/areas")}>
        Áreas
      </Link>
      <Link href="/blog" className={linkClasses("/blog")}>
        Blog
      </Link>
      <Link href="/faq" className={linkClasses("/faq")}>
        Preguntas Frecuentes
      </Link>
      <Link href="/about-us" className={linkClasses("/about-us")}>
        Nosotros
      </Link>
      <Link href="/contact" className={linkClasses("/contact")}>
        Contacto
      </Link>
    </div>
  );
};

export default NavbarLinks;
