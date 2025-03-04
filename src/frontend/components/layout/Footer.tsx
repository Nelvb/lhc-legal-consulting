// components/layout/Footer.tsx
import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-6 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Nelson Valero Barcelona. Todos
              los derechos reservados.
            </p>
          </div>

          <div className="flex space-x-6">
            <a
              href="https://github.com/Nelvb/Starter_template#readme"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
            >
              Documentación
            </a>
            <a
              href="https://github.com/Nelvb/Starter_template"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/nelvb/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
            >
              Contacto (LinkedIn)
            </a>
          </div>
        </div>

        <div className="mt-4 text-xs text-center text-gray-600 dark:text-gray-400">
          Desarrollado con Next.js, Flask, PostgreSQL & Tailwind CSS
        </div>
      </div>
    </footer>
  );
};

export default Footer;
