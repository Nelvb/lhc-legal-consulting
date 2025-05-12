/**
 * Servicios de API: funciones para comunicación con endpoints del backend
 * Centraliza las llamadas HTTP para autenticación y gestión de usuario.
 * Incluye login, registro y perfil, manejando errores comunes y cookies seguras.
 * Asegura el parseo robusto de respuestas JSON para evitar fallos por respuestas vacías.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error("Falta la variable de entorno NEXT_PUBLIC_API_URL");
}

export const authService = {
  signup: async (userData: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Error en el registro');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include' // Enviar cookies JWT al backend
      });

      const text = await response.text();
      let data = null;

      try {
        data = text ? JSON.parse(text) : null;
      } catch (error) {
        console.error("authService.login - Error al parsear JSON:", error);
        throw new Error("Respuesta del servidor no válida");
      }

      if (!response.ok) {
        throw new Error(data?.msg || 'Error en el inicio de sesión');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  profile: async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Error al obtener perfil');
      }

      return data;
    } catch (error) {
      throw error;
    }
  }
};
