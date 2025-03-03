import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-8 bg-gray-50 dark:bg-gray-900">
      {/* Título principal */}
      <h1 className="text-4xl font-bold mt-6 text-gray-900 dark:text-white">
        Starter Template para Proyectos Full Stack
      </h1>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
        Estructura lista para usar con <strong>Next.js, TypeScript, Flask, PostgreSQL y Tailwind CSS</strong>. 
        Optimizada para que puedas centrarte en construir, no en configurar.
      </p>

      {/* Beneficios clave */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center max-w-2xl">
        <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full text-sm">Autenticación JWT lista</span>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full text-sm">TypeScript configurado</span>
        <span className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100 rounded-full text-sm">API Backend en Flask</span>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 rounded-full text-sm">PostgreSQL integrado</span>
      </div>

      {/* Sección de documentación */}
      <div className="mt-12 w-full max-w-3xl">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Enlaces a documentación oficial
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Haz clic en los iconos para acceder a la documentación de cada tecnología
        </p>
        
        {/* Tecnologías (Enlaces con imágenes) */}
        <div className="flex flex-wrap gap-8 justify-center items-center">
          <a 
            href="https://nextjs.org/docs" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex flex-col items-center transition-transform hover:scale-110"
            title="Documentación de Next.js"
          >
            <Image src="/Next.js.webp" alt="Next.js" width={80} height={80} className="rounded-lg shadow-sm" />
            <span className="mt-2 text-sm text-gray-700 dark:text-gray-300">Next.js</span>
          </a>
          <a 
            href="https://www.typescriptlang.org/docs/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex flex-col items-center transition-transform hover:scale-110"
            title="Documentación de TypeScript"
          >
            <Image src="/typescript.webp" alt="TypeScript" width={80} height={80} className="rounded-lg shadow-sm" />
            <span className="mt-2 text-sm text-gray-700 dark:text-gray-300">TypeScript</span>
          </a>
          <a 
            href="https://flask.palletsprojects.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex flex-col items-center transition-transform hover:scale-110"
            title="Documentación de Flask"
          >
            <Image src="/Flask.webp" alt="Flask" width={80} height={80} className="rounded-lg shadow-sm" />
            <span className="mt-2 text-sm text-gray-700 dark:text-gray-300">Flask</span>
          </a>
          <a 
            href="https://www.postgresql.org/docs/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex flex-col items-center transition-transform hover:scale-110"
            title="Documentación de PostgreSQL"
          >
            <Image src="/postgresql.webp" alt="PostgreSQL" width={80} height={80} className="rounded-lg shadow-sm" />
            <span className="mt-2 text-sm text-gray-700 dark:text-gray-300">PostgreSQL</span>
          </a>
          <a 
            href="https://tailwindcss.com/docs" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex flex-col items-center transition-transform hover:scale-110"
            title="Documentación de Tailwind CSS"
          >
            <Image src="/tailwind-icon.webp" alt="Tailwind CSS" width={80} height={80} className="rounded-lg shadow-sm" />
            <span className="mt-2 text-sm text-gray-700 dark:text-gray-300">Tailwind CSS</span>
          </a>
          <a 
            href="https://jwt.io/introduction/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex flex-col items-center transition-transform hover:scale-110"
            title="Documentación de JWT"
          >
            <Image src="/JWT-images.webp" alt="JWT Authentication" width={80} height={80} className="rounded-lg shadow-sm" />
            <span className="mt-2 text-sm text-gray-700 dark:text-gray-300">JWT Auth</span>
          </a>
        </div>
      </div>

      {/* Sección de primeros pasos */}
      <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md max-w-2xl w-full">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Cómo empezar
        </h2>
        <div className="text-left text-gray-600 dark:text-gray-300">
          <p className="mb-2">
            1. Clona este repositorio
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded mb-4 overflow-x-auto">
            <code className="text-sm">git clone https://github.com/tu-usuario/starter-template.git</code>
          </div>
          <p className="mb-2">
            2. Instala las dependencias del frontend
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded mb-4 overflow-x-auto">
            <code className="text-sm">cd starter-template/src/frontend && npm install</code>
          </div>
          <p className="mb-2">
            3. Configura el backend siguiendo las instrucciones en el README
          </p>
        </div>
      </div>
    </main>
  );
}