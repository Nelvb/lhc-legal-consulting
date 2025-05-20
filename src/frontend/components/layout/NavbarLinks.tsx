/**
 * NavbarLinks.tsx
 *
 * Renderiza los enlaces dinámicos de la navbar según la autenticación y la ruta actual.
 * Muestra saludo personalizado, enlaces condicionales y botón de cierre de sesión.
 */

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { isPublicRoute } from "@/constants/publicRoutes";
import Button from "@/components/ui/Button";

const NavbarLinks: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const pathname = usePathname();
  const isPublicRouteValue = isPublicRoute(pathname);

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);

  const isHomePage = pathname === "/" || pathname === "";
  const isLoginPage = pathname === "/login";
  const isSignupPage = pathname === "/signup";

  const perfilPath = user?.is_admin ? "/admin/perfil" : "/perfil";
  const dashboardPath = user?.is_admin ? "/admin" : "/dashboard";
  const isPerfilPage = pathname === perfilPath;
  const isDashboardPage = pathname === dashboardPath;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
      setShouldRender(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, pathname]);

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

    if (!isAuthenticated && !isPublicRouteValue) return null;

    return (
      <>
        <span className="text-white font-medium transition-all duration-300">
          Hola {user?.username}
        </span>

        {!isPerfilPage && (
          <Link
            href={perfilPath}
            className="transition-all ease-smooth hover:scale-hover text-white"
          >
            Mi Perfil
          </Link>
        )}

        {!isDashboardPage && (
          <Link
            href={dashboardPath}
            className="transition-all ease-smooth hover:scale-hover text-white"
          >
            Área Privada
          </Link>
        )}

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
