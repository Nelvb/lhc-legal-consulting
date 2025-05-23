/**
 * NavbarLinks.tsx
 *
 * Renderiza los enlaces superiores de navegación.
 * En modo público muestra Inicio, Iniciar sesión y Registro.
 * En modo autenticado solo muestra el saludo y botón de logout.
 * 
 * SOLUCIONADO: Loop infinito causado por useEffect con dependencias incorrectas
 */

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { isPublicRoute } from "@/constants/publicRoutes";
import Button from "@/components/ui/Button";

const NavbarLinks: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  const pathname = usePathname();
  const isPublicRouteValue = isPublicRoute(pathname);

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);

  const isHomePage = pathname === "/" || pathname === "";
  const isLoginPage = pathname === "/login";
  const isSignupPage = pathname === "/signup";

  // ARREGLO: useEffect solo se ejecuta una vez al montar
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
      setShouldRender(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []); // ← SIN DEPENDENCIAS - solo se ejecuta una vez

  const renderNavigation = () => {
    if (!isAuthenticated && isPublicRouteValue) {
      return (
        <>
          {!isHomePage && (
            <Link
              href="/"
              className="text-white text-lg font-medium transition-all duration-300 hover:scale-110 transform-gpu"
            >
              Inicio
            </Link>
          )}
          {!isLoginPage && (
            <Link
              href="/login"
              className="text-white text-lg font-medium transition-all duration-300 hover:scale-110 transform-gpu"
            >
              Iniciar Sesión
            </Link>
          )}
          {!isSignupPage && (
            <Link
              href="/signup"
              className="text-white text-lg font-medium transition-all duration-300 hover:scale-110 transform-gpu mr-6"
            >
              Registrarse
            </Link>
          )}
        </>
      );
    }

    if (!isAuthenticated) return null;

    return (
      <>
        <span className="text-white font-medium transition-all duration-300">
          Hola {user?.username}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="transition-all ease-smooth hover:scale-hover"
        >
          Cerrar Sesión
        </Button>
      </>
    );
  };

  return (
    <div
      className={`hidden md:flex items-center space-x-10 transition-all duration-300 ease-smooth
        ${isInitialLoad ? "opacity-0" : "opacity-100"}
        ${shouldRender ? "visible" : "invisible"}
      `}
    >
      {renderNavigation()}
    </div>
  );
};

export default NavbarLinks;