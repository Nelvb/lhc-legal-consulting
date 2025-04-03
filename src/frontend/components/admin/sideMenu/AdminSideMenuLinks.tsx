// src/frontend/components/admin/sideMenu/AdminSideMenuLinks.tsx

"use client";

/**
 * Enlaces de navegación interna del panel admin.
 * Estilo, márgenes y comportamiento igual que el menú global.
 */

import React from "react";
import Link from "next/link";

interface AdminSideMenuLinksProps {
  onClickLink: () => void;
}

const AdminSideMenuLinks: React.FC<AdminSideMenuLinksProps> = ({ onClickLink }) => {
  const links = [
    { href: "/admin/projects", label: "Proyectos" },
    { href: "/admin/blog", label: "Blog" },
    { href: "/admin/profile", label: "Mi Cuenta" },
  ];

  return (
    <nav className="py-4 px-2">
      <ul className="flex flex-col space-y-1">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              onClick={onClickLink}
              className="block px-4 py-2 rounded text-[#1A1341] hover:bg-[#F1FFEF] transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminSideMenuLinks;
