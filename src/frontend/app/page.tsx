import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-8 bg-gray-50 dark:bg-gray-900">
      {/* Título */}
      <h1 className="text-4xl font-bold mt-6 text-gray-900 dark:text-white">
        Starter Template para Proyectos Full Stack
      </h1>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
        Base profesional para iniciar proyectos con <strong>Next.js, TypeScript, Flask, PostgreSQL y JWT Authentication</strong>. 
        Configuración optimizada para desarrollo y producción.
      </p>

      {/* Tecnologías (Enlaces con imágenes) */}
      <div className="mt-8 flex flex-wrap gap-8 justify-center items-center">
        <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
          <Image src="/Next.js.webp" alt="Next.js" width={80} height={80} />
          <span className="mt-2 text-sm text-gray-700 dark:text-gray-300">Next.js</span>
        </a>
        <a href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
          <Image src="/typescript.webp" alt="TypeScript" width={80} height={80} />
          <span className="mt-2 text-sm text-gray-700 dark:text-gray-300">TypeScript</span>
        </a>
        <a href="https://flask.palletsprojects.com/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
          <Image src="/Flask.webp" alt="Flask" width={80} height={80} />
          <span className="mt-2 text-sm text-gray-700 dark:text-gray-300">Flask</span>
        </a>
        <a href="https://www.postgresql.org/docs/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
          <Image src="/postgresql.webp" alt="PostgreSQL" width={80} height={80} />
          <span className="mt-2 text-sm text-gray-700 dark:text-gray-300">PostgreSQL</span>
        </a>
        <a href="https://jwt.io/introduction/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center">
          <Image src="/JWT-images.webp" alt="JWT Authentication" width={80} height={80} />
          <span className="mt-2 text-sm text-gray-700 dark:text-gray-300">JWT Auth</span>
        </a>
      </div>
    </main>
  );
}
