/**
 * Contexto de autenticación global para el frontend.
 *
 * Este provider gestiona:
 * - Login, registro y logout de usuarios (con cookies HttpOnly)
 * - Almacenamiento del usuario en localStorage
 * - Sincronización automática entre pestañas
 * - Refresco del perfil desde el backend (/auth/profile)
 *
 * Las funciones están delegadas al servicio `authService` y utilizan `fetchWithAuth` cuando es necesario.
 * Este archivo sigue arquitectura limpia y es compatible con rutas protegidas, SSR y futuras extensiones.
 */

'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/api/authService';
import { fetchWithAuth } from '@/lib/utils/fetchWithAuth';

interface User {
  id: string;
  name: string;
  email: string;
  is_admin?: boolean;
  [key: string]: any;
}

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
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const router = useRouter();

  const checkAuth = useCallback(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('AuthContext - Error al verificar autenticación:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
      setAuthChecked(true);
    }
  }, []);

  useEffect(() => {
    checkAuth();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' || e.key === 'user') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [checkAuth]);

  const login = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    setError(null);

    try {
      const data = await authService.login(credentials);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);

      if (data.user?.is_admin) {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }

      return data;
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMsg);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData: {
    username: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const data = await authService.signup(userData);
      await login({
        email: userData.email,
        password: userData.password,
      });
      return data;
    } catch (error) {
      const errorMsg =
        error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMsg);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('AuthContext - Error en logout:', error);
    }

    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  const refreshUser = async () => {
    try {
      const response = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
        {
          method: 'GET',
        }
      );

      if (!response.ok) {
        throw new Error('Error al obtener perfil actualizado');
      }

      const updatedUser = await response.json();
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (err) {
      console.error('AuthContext - Error al refrescar usuario:', err);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    error,
    isAuthenticated: !!user && authChecked,
    login,
    signup,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
