// src/frontend/hooks/useAuth.ts
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from '../lib/api';

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
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Efecto para cargar el usuario desde localStorage cuando se monta el componente
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Función para iniciar sesión
  const login = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await authService.login(credentials);

      // Guardar usuario en localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      router.push('/dashboard');
      return data;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Función para registrarse
  const signup = async (userData: {
    username: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const data = await authService.signup(userData);

      // Éxito - redirigir a login
      router.push('/login');
      return data;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push('/login');
  };

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
  };
}