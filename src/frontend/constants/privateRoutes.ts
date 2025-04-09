// Lista de rutas privadas que requieren autenticación
// Usado para protección de vistas, navegación condicional, middleware, etc.

export const PRIVATE_ROUTES = [
    '/proyectos/[slug]',
    '/usuario',
    '/usuario/favoritos',
    '/usuario/inversiones',
    '/usuario/configuracion',
    '/dashboard',
    '/admin'
  ];
  