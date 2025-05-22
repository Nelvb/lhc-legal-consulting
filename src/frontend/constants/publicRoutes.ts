// Lista centralizada de rutas públicas accesibles sin autenticación.
// Útil para navegación, control de acceso y middleware.
// Evita lógica duplicada y mejora la escalabilidad del proyecto.

export const PUBLIC_ROUTES = [
  '/',
  '/blog',
  '/nosotros',
  '/contact',
  '/preguntas-frecuentes',
  '/login',
  '/signup'
];

// Esta función permite detectar rutas dinámicas como /blog/ia-sector-inmobiliario
export const isPublicRoute = (pathname: string): boolean => {
  if (PUBLIC_ROUTES.includes(pathname)) return true;
  if (pathname.startsWith('/blog/')) return true;
  return false;
};
