// components/layout/MobileMenu.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import Button from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { usePathname } from 'next/navigation';

// Definimos una interfaz más precisa para las props
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const pathname = usePathname();
  
  // Determinar en qué página estamos
  const isHomePage = pathname === "/" || pathname === "";
  const isDashboardPage = pathname === "/dashboard";
  const isLoginPage = pathname === "/login";
  const isSignupPage = pathname === "/signup";

  // Si no está abierto, no renderizamos nada
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-40" 
      onClick={onClose}  // Permite cerrar haciendo click fuera
    >
      <div 
        className="fixed top-0 right-0 w-64 bg-white dark:bg-gray-800 shadow-xl z-50 h-auto max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}  // Evita que el click dentro del menú lo cierre
      >
        <div className="flex flex-col">
          {/* Header with Close Button */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {isAuthenticated ? `Hola ${user?.username}` : 'Menú'}
            </span>
            <button
              onClick={onClose}
              aria-label="Cerrar menú"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
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
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="py-4">
            <ul className="space-y-1">
              {/* Inicio - solo mostrar si NO estamos en la página principal */}
              {!isHomePage && (
                <li>
                  <Link
                    href="/"
                    onClick={onClose}
                    className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    Inicio
                  </Link>
                </li>
              )}

              {/* Área Privada - solo para usuarios autenticados y si no estamos en dashboard */}
              {isAuthenticated && !isDashboardPage && (
                <li>
                  <Link
                    href="/dashboard"
                    onClick={onClose}
                    className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    Área Privada
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          {/* Auth Actions */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            {!isAuthenticated ? (
              <div className="space-y-2">
                {/* Iniciar Sesión - no mostrar si estamos en login */}
                {!isLoginPage && (
                  <Link href="/login" onClick={onClose} className="block w-full">
                    <Button 
                      variant="outline" 
                      size="md" 
                      className="w-full"
                    >
                      Iniciar Sesión
                    </Button>
                  </Link>
                )}
                
                {/* Registrarse - no mostrar si estamos en signup */}
                {!isSignupPage && (
                  <Link href="/signup" onClick={onClose} className="block w-full">
                    <Button 
                      variant="primary" 
                      size="md" 
                      className="w-full"
                    >
                      Registrarse
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  console.log("Click en Cerrar Sesión (móvil)");
                  logout();
                  onClose();
                }}
                className="w-full text-center py-2 text-red-600 hover:bg-red-50 rounded"
              >
                Cerrar Sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;