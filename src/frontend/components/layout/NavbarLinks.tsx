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

'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/stores/useAuthStore'
import SmartLink from '@/components/ui/SmartLink'

const NavbarLinks: React.FC = () => {
  const { isAuthenticated } = useAuthStore()
  const pathname = usePathname()

  // Evita mostrar la navbar pública si el usuario está autenticado (admin)
  if (isAuthenticated) return null

  // Estilos condicionales para el enlace activo
  const linkClasses = (href: string) =>
    `text-lg font-medium transition-all ${
      pathname.startsWith(href)
        ? 'text-[#1DA1F2] font-bold underline underline-offset-4'
        : 'text-[#1b2f4b] hover:scale-110'
    }`

  return (
    <div className="hidden md:flex items-center space-x-8">
      <SmartLink href="/areas" className={linkClasses('/areas')}>
        Áreas
      </SmartLink>
      <SmartLink href="/blog" className={linkClasses('/blog')}>
        Blog
      </SmartLink>
      <SmartLink href="/faq" className={linkClasses('/faq')}>
        Preguntas Frecuentes
      </SmartLink>
      <SmartLink href="/about-us" className={linkClasses('/about-us')}>
        Nosotros
      </SmartLink>
      <SmartLink href="/contact" className={linkClasses('/contact')}>
        Contacto
      </SmartLink>
    </div>
  )
}

export default NavbarLinks
