// src/frontend/hooks/useAuth.ts


"use client";

import { useState, useEffect } from "react";

// Definimos el tipo de usuario
interface User {
  id: string;
  name: string;
  email: string;
}

// Hook personalizado de autenticación
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Efecto para cargar el usuario desde localStorage cuando se monta el componente
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Función para iniciar sesión (simulada, luego se conecta con Flask)
  const login = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return {
    user,           // Si es `null`, no está logueado. Si tiene datos, sí lo está.
    loading,        // Para manejar el estado de carga
    isAuthenticated: !!user,  // Booleano para saber si está logueado
    login,
    logout,
  };
}
