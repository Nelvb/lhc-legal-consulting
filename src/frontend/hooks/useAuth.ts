/**
* Hook de autenticación: proporciona acceso simplificado al contexto de autenticación
* Re-exporta el hook del AuthContext para facilitar su uso en componentes
* Permite abstraer la implementación subyacente del sistema de autenticación
*/

"use client";

import { useAuth as useAuthContext } from "../contexts/AuthContext";

// Hook personalizado de autenticación (simplemente re-exporta el hook del contexto)
export function useAuth() {
  return useAuthContext();
}