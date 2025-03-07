// src/frontend/hooks/useAuth.ts
"use client";

import { useAuth as useAuthContext } from "../contexts/AuthContext";

// Hook personalizado de autenticación (ahora simplemente re-exporta el hook del contexto)
export function useAuth() {
  return useAuthContext();
}