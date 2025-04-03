/**
 * Vista del dashboard para usuarios normales (no administradores).
 * Si el usuario no está autenticado o es administrador, redirige automáticamente.
 */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";

export default function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
  };

  // Redirección si no debe estar aquí
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    } else if (user?.is_admin) {
      router.push("/admin");
    }
  }, [isAuthenticated, user, router]);

  // No mostrar nada mientras redirige
  if (!isAuthenticated || user?.is_admin) {
    return null;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-8 pt-32 pb-20">
      <h1 className="text-4xl font-bold mt-6">
        ¡Bienvenido a tu área personal {user?.username}!
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
        Has accedido correctamente al área protegida. Desde aquí puedes comenzar
        a construir las funcionalidades específicas para tu proyecto.
      </p>

      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md max-w-2xl w-full">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Personaliza este espacio
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Este dashboard es solo un punto de partida. Puedes modificarlo según
          las necesidades específicas de tu proyecto añadiendo componentes,
          gráficas o integraciones con el backend.
        </p>
      </div>

      <Button variant="outline" onClick={handleLogout} className="mt-8">
        Cerrar Sesión
      </Button>
    </main>
  );
}
