/**
* Contexto de autenticación: gestiona el estado global de autenticación
* Proporciona funciones para login, registro y logout de usuarios
* Persiste el estado de autenticación usando localStorage y sincroniza entre pestañas
*/

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { authService } from "../lib/api";

// Definimos el tipo de usuario
interface User {
  id: string;
  name: string;
  email: string;
  [key: string]: any; // Para cualquier propiedad adicional que pueda tener el usuario
}

// Definimos la interfaz del contexto
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<any>;
  signup: (userData: {
    username: string;
    email: string;
    password: string;
  }) => Promise<any>;
  logout: () => void;
}

// Creamos el contexto con un valor por defecto
const AuthContext = createContext<AuthContextType | null>(null);

// Props para el provider
interface AuthProviderProps {
  children: ReactNode;
}

// Provider que contendrá la lógica de autenticación
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const router = useRouter();

  // Función para verificar autenticación (memoizada para evitar recreación)
  const checkAuth = useCallback(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      console.log("AuthContext - Verificando auth:", {
        storedUser: !!storedUser,
        token: !!token,
      });

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log(
          "AuthContext - Usuario cargado desde localStorage:",
          parsedUser
        );
      } else {
        setUser(null);
        console.log("AuthContext - No hay usuario en localStorage");
      }
    } catch (error) {
      console.error("AuthContext - Error al verificar autenticación:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
      setAuthChecked(true);
    }
  }, []);

  // Efecto para cargar el usuario cuando se monta el componente
  useEffect(() => {
    console.log("AuthContext - Iniciando verificación de autenticación");
    checkAuth();

    // Escuchar cambios en localStorage (para sincronizar entre pestañas)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token" || e.key === "user") {
        console.log("AuthContext - Cambio detectado en localStorage:", e.key);
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [checkAuth]);

  // Log cuando cambia el usuario
  useEffect(() => {
    console.log("AuthContext - Estado actualizado de user:", user);
  }, [user]);

  // Función para iniciar sesión
  const login = async (credentials: { email: string; password: string }) => {
    console.log("AuthContext - Intentando login con:", credentials.email);
    setLoading(true);
    setError(null);

    try {
      const data = await authService.login(credentials);

      // Guardar token y usuario en localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("AuthContext - Login exitoso:", data.user);
      setUser(data.user);

      // Primero actualizar el estado, luego navegar
      setUser(data.user);
      router.push("/dashboard");

      return data;
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Error desconocido";
      console.error("AuthContext - Error en login:", errorMsg);
      setError(errorMsg);
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
    console.log("AuthContext - Intentando registro con:", userData.email);
    setLoading(true);
    setError(null);

    try {
      // Registrar al usuario
      const data = await authService.signup(userData);
      console.log(
        "AuthContext - Registro exitoso, intentando login automático"
      );

      // Iniciar sesión automáticamente después del registro
      await login({
        email: userData.email,
        password: userData.password,
      });

      return data;
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : "Error desconocido";
      console.error("AuthContext - Error en registro:", errorMsg);
      setError(errorMsg);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    console.log("AuthContext - Ejecutando logout...");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  // Valor del contexto que se proporcionará
  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user && authChecked,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
