/**
 * Configuración de Next.js para el proyecto Boost a Project.
 *
 * Características:
 * - reactStrictMode: Activa el modo estricto de React para detectar errores potenciales.
 * - env: Define variables de entorno accesibles en el frontend.
 * - images: Configura patrones remotos permitidos para cargar imágenes.
 * - rewrites: Redirige automáticamente las rutas `/api/...` al backend.
 * - experimental.forceSwcTransforms: Asegura el uso de SWC para compilación.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Configuración para asegurar que SWC se use para todas las transformaciones,
  // incluso cuando existe un archivo de configuración de Babel en el proyecto
  experimental: {
    forceSwcTransforms: true,
    // Otras configuraciones experimentales que puedas necesitar
  },
  
  // Variables de entorno
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NODE_ENV === "production"
        ? "http://backend:5000/api"
        : "http://localhost:5000/api",
  },
  
  // Configuración de imágenes remotas
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  
  // Configuración de rewrites para el backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;