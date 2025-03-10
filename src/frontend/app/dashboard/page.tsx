"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-8 pt-32 pb-20">
      {/* Contenido principal */}
      <h1 className="text-4xl font-bold mt-6">
        ¡Bienvenido a tu área personal
        {user?.username ? ` ${user.username}` : ""}!
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
        Has accedido correctamente al área protegida del Starter Template. Desde
        aquí puedes comenzar a construir las funcionalidades específicas para tu
        proyecto.
      </p>

      {/* Información adicional */}
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
