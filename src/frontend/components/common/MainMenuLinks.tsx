// src/frontend/components/common/MainMenuLinks.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

// Tipado explícito de las props
interface MainMenuLinksProps {
  onClickLink?: () => void;
}

const MainMenuLinks: React.FC<MainMenuLinksProps> = ({ onClickLink }) => {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/proyectos", label: "Proyectos" },
    { href: "/blog", label: "Blog" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/faq", label: "Preguntas Frecuentes" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <ul className="flex flex-col space-y-1">
      {links.map(({ href, label }) => (
        <li key={href}>
          <Link
            href={href}
            onClick={onClickLink}
            className={`block px-4 py-2 rounded text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
              pathname === href ? "font-semibold underline" : ""
            }`}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MainMenuLinks;
