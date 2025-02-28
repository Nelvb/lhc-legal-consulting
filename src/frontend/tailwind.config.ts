import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/frontend/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/frontend/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/frontend/components/**/*.{js,ts,jsx,tsx}",
    "./src/frontend/styles/globals.css",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
