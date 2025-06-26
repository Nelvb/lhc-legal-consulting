/**
 * MainMenuLinks.tsx
 *
 * Enlaces públicos para el menú lateral de LHC Legal & Consulting.
 * Incluye navegación principal para usuarios no autenticados: Áreas, Blog,
 * Preguntas Frecuentes, Nosotros y Contacto.
 *
 * Se destaca visualmente el enlace activo mediante subrayado y negrita.
 * En cada clic se cierra el SideMenu gracias a `onClickLink()`.
 *
 * No hay navegación privada para usuarios normales (solo admin).
 */

'use client';

import React from 'react';
import SmartLink from '@/components/ui/SmartLink';
import { usePathname } from 'next/navigation';

interface MainMenuLinksProps {
  onClickLink?: () => void;
}

const MainMenuLinks: React.FC<MainMenuLinksProps> = ({ onClickLink }) => {
  const pathname = usePathname();

  const links = [
    { href: '/areas', label: 'Áreas' },
    { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'Preguntas Frecuentes' },
    { href: '/about-us', label: 'Nosotros' },
    { href: '/contact', label: 'Contacto' },
  ];

  return (
    <ul className="flex flex-col space-y-1">
      {links.map(({ href, label }) => {
        const isActive = pathname.startsWith(href);
        return (
          <li key={href}>
            <SmartLink
              href={href}
              onClick={onClickLink}
              className={`block px-4 py-2 rounded transition-colors text-[#1A1341] 
                hover:bg-[#1A1341] hover:text-white
                ${isActive ? 'font-semibold underline underline-offset-4' : ''}
              `}
            >
              {label}
            </SmartLink>
          </li>
        );
      })}
    </ul>
  );
};

export default MainMenuLinks;

