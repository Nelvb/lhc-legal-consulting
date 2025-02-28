import { Metadata } from 'next/types';
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Starter Template - Next.js, Flask, PostgreSQL & Tailwind",
  description: "Base optimizada para proyectos Full Stack con Next.js, TypeScript, Flask, PostgreSQL, Tailwind CSS y JWT Authentication.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-blue-500 text-white`} // Aplicando estilos Tailwind
      >
        {children}
      </body>
    </html>
  );
}
