/** @type {import('tailwindcss').Config} */
module.exports = {
  // Configuración de archivos a los que Tailwind aplicará sus estilos
  // Incluye todos los archivos .js, .ts, .jsx, .tsx, .mdx en app y components
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.css",
  ],

  // Modo oscuro automático basado en la configuración del sistema operativo
  darkMode: 'media',

  theme: {
    extend: {
      // Personalización de la función de temporización para transiciones más suaves
      // Utiliza una curva de Bézier para un movimiento más natural
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)'
      },

      // Duración personalizada de transiciones para mantener consistencia
      transitionDuration: {
        'smooth': '300ms'
      },

      // Escala de hover personalizada para efectos de interacción consistentes
      scale: {
        'hover': '1.05'
      },

      // Sombras personalizadas para diferentes estados de componentes
      boxShadow: {
        // Sombra sutil para elementos en estado normal
        'subtle': '0 2px 4px rgba(0, 0, 0, 0.1)',
        // Sombra más pronunciada para hover o estados activos
        'hover': '0 4px 6px rgba(0, 0, 0, 0.15)'
      }
    },
  },

  // Plugins adicionales de Tailwind (actualmente vacío)
  plugins: [],
};