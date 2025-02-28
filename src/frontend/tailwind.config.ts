import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/frontend/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/frontend/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/frontend/components/**/*.{js,ts,jsx,tsx}",
    "./src/frontend/styles/globals.css",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
