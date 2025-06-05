/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	// Configuración de archivos a los que Tailwind aplicará sus estilos
	// Incluye todos los archivos .js, .ts, .jsx, .tsx, .mdx en app y components
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./styles/**/*.css",
	],

	theme: {
		extend: {
			transitionTimingFunction: {
				smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
			},
			transitionDuration: {
				smooth: '300ms'
			},
			scale: {
				hover: '1.05'
			},
			boxShadow: {
				subtle: '0 2px 4px rgba(0, 0, 0, 0.1)',
				hover: '0 4px 6px rgba(0, 0, 0, 0.15)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ['var(--font-inter)', 'sans-serif'],
			},
			colors: {
				// Colores base LHC Legal & Consulting
				lhc: {
					primary: '#1b2f4b',     // Azul oscuro corporativo del logo
					secondary: '#f2eee7',   // Beige/crema suave del logo
				},
				// Colores del sistema shadcn/ui existentes
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			screens: {
				'mobile-sm': '515px',
				'mobile-lg': '561px',
			},
		}
	},

	// Plugins adicionales de Tailwind
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/typography"),
	],
};