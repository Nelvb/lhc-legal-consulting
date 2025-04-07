/**
 * Configuración de Next.js para el proyecto Boost a Project.
 *
 * Características:
 * - reactStrictMode: Activa el modo estricto de React para detectar errores potenciales.
 * - env: Define variables de entorno accesibles en el frontend.
 *   - API_URL: Cambia automáticamente según el entorno (producción o desarrollo).
 * - images: Configura patrones remotos permitidos para cargar imágenes (Cloudinary en este caso).
 * - rewrites (opcional, recomendado): Se puede añadir para redirigir automáticamente las rutas `/api/...`
 *   al backend en Flask sin tener que escribir la URL completa en cada `fetch`.
 *
 * Este archivo asegura que el entorno del frontend esté correctamente conectado al backend
 * y que Next.js permita la carga de imágenes desde dominios externos confiables.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NODE_ENV === "production"
        ? "http://backend:5000/api"
        : "http://localhost:5000/api",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
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
