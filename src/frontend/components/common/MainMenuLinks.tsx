/**
 * MainMenuLinks.tsx
 *
 * Enlaces principales del menú lateral.
 * Se utilizan en el SideMenu público y sirven de base visual para user/admin.
 * Resaltan el enlace activo con subrayado y negrita.
 * Aplican hover con fondo azul marino y texto blanco.
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface MainMenuLinksProps {
  onClickLink?: () => void;
}

const MainMenuLinks: React.FC<MainMenuLinksProps> = ({ onClickLink }) => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/proyectos", label: "Proyectos" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/blog", label: "Blog" },
    { href: "/faq", label: "Preguntas Frecuentes" },
    { href: "/contact", label: "Contacto" },
  ];

  return (
    <ul className="flex flex-col space-y-1">
      {links.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            onClick={onClickLink}
            className={`block px-4 py-2 rounded transition-colors text-[#1A1341] 
              hover:bg-[#1A1341] hover:text-white
              ${pathname === href ? "font-semibold underline" : ""}
            `}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MainMenuLinks;
