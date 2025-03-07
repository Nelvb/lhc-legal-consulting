# Full-Stack Starter Template

Un template completo para iniciar proyectos full-stack con Next.js en el frontend y Flask en el backend. Incluye autenticación JWT, PostgreSQL, y Tailwind CSS, con soporte completo para Docker.

## Tecnologías

### Frontend
- Next.js (v15.2.0)
- TypeScript
- Tailwind CSS
- clsx para manejo de clases condicionales

### Backend
- Flask
- SQLAlchemy
- PostgreSQL
- JWT para autenticación
- Black & isort para formateo de código

## Estructura del Proyecto

```
starter-template/
├── .gitattributes
├── .gitignore
├── Dockerfile.backend
├── Dockerfile.frontend
├── LICENSE
├── README.md
├── docker-compose.yml
├── package-lock.json
├── project_structure.txt
├── pyproject.toml
└── src/
    ├── backend/
    │   └── ... (resto del backend sin cambios)
    └── frontend/
        ├── .next/
        ├── app/
        │   ├── (auth)/
        │   │   ├── login/
        │   │   │   └── page.tsx
        │   │   └── signup/
        │   │       └── page.tsx
        │   ├── dashboard/
        │   │   └── page.tsx
        │   ├── layout.tsx
        │   └── page.tsx
        ├── components/
        │   ├── auth/
        │   │   ├── LoginForm.tsx
        │   │   └── SignupForm.tsx
        │   ├── layout/
        │   │   ├── Footer.tsx
        │   │   ├── Navbar.tsx
        │   │   └── NavbarLinks.tsx
        │   ├── ui/
        │   │   ├── Button.tsx
        │   │   ├── Card.tsx
        │   │   └── Input.tsx
        ├── contexts/
        │   └── AuthContext.tsx
        ├── hooks/
        │   └── useAuth.ts
        ├── lib/
        │   ├── api.ts
        │   └── auth.ts
        ├── next-env.d.ts
        ├── next.config.js
        ├── node_modules/
        ├── package-lock.json
        ├── package.json
        ├── postcss.config.js
        ├── public/
        ├── styles/
        │   ├── globals.css
        │   └── output.css
        ├── tailwind.config.js
        ├── tsconfig.json
        └── types/
            └── index.ts
```

## Requisitos Previos

- Docker
- Docker Compose

## Instalación y Configuración

### Configuración con Docker (Recomendado)

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/starter-template.git
   cd starter-template
   ```

2. Configuración de variables de entorno:
   - Copia `.env.example` a `.env` para desarrollo local:
     ```bash
     cp src/backend/.env.example src/backend/.env
     ```
   - Copia `.env.docker.example` a `.env.docker` para Docker:
     ```bash
     cp src/backend/.env.docker.example src/backend/.env.docker
     ```
   - Actualiza los valores en los archivos con tus propias credenciales, especialmente:
     - SECRET_KEY
     - JWT_SECRET_KEY
     - DB_PASSWORD

3. Iniciar todos los servicios:
   ```bash
   docker-compose up --build
   ```

### Servicios Disponibles

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Base de datos PostgreSQL**:
  - Host: localhost
  - Puerto: 5432
  - Usuario: postgres
  - Contraseña: postgres
  - Base de datos: starter_db

### Comandos de Docker Compose

```bash
# Iniciar todos los servicios
docker-compose up

# Iniciar servicios específicos
docker-compose up backend
docker-compose up frontend
docker-compose up db

# Detener servicios
docker-compose down

# Detener servicios y eliminar volúmenes
docker-compose down -v

# Ejecutar migraciones de base de datos
docker-compose exec backend flask db upgrade
```

## Configuración sin Docker (Alternativa)

### Requisitos Previos

- Node.js (v18 o superior)
- Python (v3.8 o superior)
- PostgreSQL

### Frontend

1. Instalar dependencias:
   ```bash
   cd src/frontend
   npm install
   ```

2. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```

   El frontend estará disponible en http://localhost:3000

### Backend

1. Navegar al directorio del backend:
   ```bash
   cd src/backend
   ```

2. Crear un entorno virtual:
   ```bash
   python -m venv venv
   ```

3. Activar el entorno virtual:
   - En Windows:
     ```bash
     venv\Scripts\activate
     ```
   - En macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Instalar dependencias:
   ```bash
   pip install -r requirements.txt
   ```

5. Configurar archivo `.env`:
   ```bash
   cp .env.example .env
   ```
   Luego edita el archivo `.env` con tus configuraciones.

6. Configurar la base de datos:
   ```bash
   flask db init
   flask db migrate -m "Initial migration"
   flask db upgrade
   ```

7. Iniciar el servidor Flask:
   ```bash
   python run.py
   ```

   El backend API estará disponible en http://localhost:5000

## Funcionalidades

### Autenticación

- Registro de usuarios
- Inicio de sesión con JWT
- Middleware de autenticación para rutas protegidas

### Temas y UI

- Sistema de temas claro/oscuro
- Componentes UI personalizados
  - Botones con diferentes variantes: default, outline, ghost
  - Formularios estilizados
  - Layouts responsivos

## Desarrollo

### Comandos Frontend

```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Iniciar versión de producción
npm start
```

### Comandos Backend

```bash
# Activar entorno virtual
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows

# Iniciar servidor de desarrollo
python run.py

# Migraciones de base de datos
flask db migrate -m "Descripción del cambio"
flask db upgrade

# Formatear código
black .
isort .
```

## Base de Datos

### Migraciones

Cuando realices cambios en los modelos de datos, deberás actualizar la base de datos:

```bash
# Generar migración
flask db migrate -m "Descripción del cambio"

# Aplicar migración
flask db upgrade
```

### Restaurar a una migración anterior

```bash
flask db downgrade
```

## Despliegue

### Frontend (Vercel recomendado)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Despliegue
vercel
```

### Backend

Para el backend, puedes utilizar servicios como:
- Heroku
- DigitalOcean
- Railway
- Render

Asegúrate de configurar las variables de entorno correspondientes en el entorno de producción.

## Personalización

### Tema UI

El tema de la interfaz de usuario se puede personalizar en:
- `tailwind.config.js` para configuración de colores
- `app/styles/globals.css` para estilos globales

### Configuración del Backend

La configuración del backend se puede ajustar en el archivo `backend/config.py`.

## Solución de Problemas Comunes

### Error de conexión a la base de datos

Verifica que PostgreSQL esté en ejecución y que las credenciales en el archivo `.env` sean correctas.

### Errores de CORS

Si experimentas problemas de CORS, verifica la configuración en `backend/app/__init__.py`.

### Errores de JWT

Asegúrate de que `JWT_SECRET_KEY` esté correctamente configurado y que los tokens no hayan expirado.

## Contribución

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Realiza tus cambios y haz commit (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Licencia

MIT