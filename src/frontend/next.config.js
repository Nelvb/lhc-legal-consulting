/**
 * next.config.js
 *
 * Configuración optimizada y profesional para LHC Legal & Consulting.
 * Compatible con Next.js 15.2.4 — incluye ajustes de seguridad, rendimiento,
 * manejo de imágenes, y redirecciones para API en desarrollo.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración del workspace root para evitar warnings con múltiples lockfiles
  outputFileTracingRoot: require('path').join(__dirname, '../..'),
  
  // Activa el modo estricto de React solo en desarrollo para detectar errores potenciales
  // En producción se desactiva para evitar renders dobles y mejorar rendimiento
  reactStrictMode: process.env.NODE_ENV === 'development',

  // Funciones experimentales compatibles (validadas para producción)
  experimental: {
    forceSwcTransforms: true,
    optimizeCss: true,
    scrollRestoration: true,
  },

  // Elimina console.* en producción automáticamente
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Variables de entorno públicas para acceso desde el cliente
  // Prioriza la variable de entorno real, luego usa fallbacks según el entorno
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || // Prioriza variable de entorno real
      (process.env.NODE_ENV === 'production'
        ? 'https://lhc-legal-consulting.onrender.com/api' // URL de producción en Render
        : 'http://localhost:5000/api'), // URL de desarrollo local
  },

  // Configuración de imágenes remotas y formatos modernos
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    // Configuración de calidades para Next.js 16 (requerido para quality personalizado)
    qualities: [75, 80, 85, 90, 95, 100],
  },

  // Encabezados de seguridad y rendimiento
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirección para desarrollo local hacia el backend Flask
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ];
  },

  // Optimización de bundles y división de chunks en producción
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }

    return config;
  },

  // Gzip habilitado
  compress: true,

  // Elimina el encabezado "X-Powered-By" por razones de seguridad
  poweredByHeader: false,

  // No añade barra final automática a las URLs
  trailingSlash: false,
};

module.exports = nextConfig;
