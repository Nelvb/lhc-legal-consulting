# Boost A Project

![Backend Tests](https://github.com/Nelvb/Plataforma-inversion/actions/workflows/backend-tests.yml/badge.svg)

![Coverage](https://img.shields.io/badge/Coverage-92%25-brightgreen)

Plataforma web de inversión inmobiliaria diseñada para ofrecer transparencia, documentación clara y acompañamiento personalizado en cada etapa del proceso. Facilita el acceso a oportunidades seleccionadas, enfocándose en la confianza, la seguridad y una experiencia de usuario cuidada.

## Tecnologías

### Frontend

* Next.js 15.2 con App Router
* TypeScript para desarrollo sostenible
* Tailwind CSS + componentes personalizados
* React Testing Library + Jest
* JWT para autenticación segura

### Backend

* Flask con arquitectura modular
* SQLAlchemy + Alembic para migraciones
* PostgreSQL como base de datos
* JWT en cookies HttpOnly + protección CSRF
* Flask-Mail para recuperación de contraseñas y notificaciones

### DevOps

* Docker y Docker Compose
* GitHub Actions para CI/CD
* Cloudinary para gestión de imágenes

## Estructura del Proyecto

```bash
Plataforma-inversion/
├── .env, .env.example, .env.docker
├── docker-compose.yml
├── package-lock.json, pyproject.toml
├── README.md
├── src/
│   ├── frontend/
│   │   ├── app/                        # App Router de Next.js
│   │   │   ├── (auth)/                 # Rutas de login y signup
│   │   │   ├── admin/                  # Panel de administración
│   │   │   ├── blog/                   # Blog público
│   │   │   ├── dashboard/              # Área privada de usuario
│   │   │   └── ...
│   │   ├── components/                 # Componentes React
│   │   │   ├── admin/                  # Componentes del panel admin
│   │   │   ├── articles/               # Componentes de blog
│   │   │   ├── auth/                   # Formularios de autenticación
│   │   │   ├── Home/                   # Secciones de landing
│   │   │   ├── layout/                 # Navbar, Footer, etc.
│   │   │   └── ui/                     # Componentes básicos (Button, Input)
│   │   ├── contexts/                   # Context Providers
│   │   ├── hooks/                      # Hooks personalizados
│   │   ├── lib/
│   │   │   ├── api/                    # Servicios de API
│   │   │   └── utils/                  # Utilidades (fetchWithAuth)
│   │   ├── styles/                     # CSS global
│   │   ├── types/                      # TypeScript interfaces
│   │   └── __tests__/                  # Tests organizados por categoría
│   └── backend/
│       ├── admin/                      # Comandos CLI como create_admin
│       │   ├── __init__.py
│       │   └── manage.py
│       ├── app/
│       │   ├── api/                    # Endpoints REST
│       │   ├── config.py              # Config por entorno
│       │   ├── data/                   # JSON estáticos (articles.json)
│       │   ├── extensions.py           # Inicialización de extensiones Flask
│       │   ├── models/                 # Modelos SQLAlchemy
│       │   ├── schemas/                # Validación y serialización
│       │   ├── scripts/                # Scripts como import_static_articles.py
│       │   ├── services/               # Lógica de negocio: artículos, email...
│       │   └── utils/                  # Funciones auxiliares
│       ├── migrations/                 # Alembic
│       └── tests/
│           ├── api/                    # Test de endpoints
│           ├── config/                 # Test de configuración y extensiones
│           ├── models/                 # Test unitarios de modelos
│           ├── schemas/                # Test de validación con Marshmallow
│           ├── scripts/                # Test de comandos Flask CLI
│           ├── services/               # Test de lógica de negocio
│           └── test_db.py              # Test de conexión DB
```

## Requisitos Previos

* Docker y Docker Compose (recomendado)
* Alternativamente:

  * Node.js (v18 o superior)
  * Python (v3.9 o superior)
  * PostgreSQL

## Instalación y Configuración

### Con Docker (recomendado)

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/boost-a-project.git
cd boost-a-project

# Configurar variables de entorno
cp .env.example .env
cp .env.docker.example .env.docker

# Iniciar servicios
docker-compose up --build
```

### Sin Docker

#### Frontend

```bash
cd src/frontend
npm install
npm run dev
```

#### Backend

```bash
cd src/backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
flask db upgrade
python run.py
```

## Testing

### Frontend

```bash
cd src/frontend
npm run test
```

### Backend

```bash
cd src/backend
python -m pytest
```

### Ejecutar tests con cobertura

```bash
cd src/backend

# 1. Ejecuta los tests con coverage
coverage run -m pytest

# 2. Muestra el resumen en consola con líneas faltantes
coverage report -m

# 3. Genera un informe visual HTML en htmlcov/index.html
coverage html

# Abre el informe en el navegador (opcional)
start htmlcov/index.html  # Windows
open htmlcov/index.html   # macOS
```

## Comandos CLI

```bash
# Crear usuario administrador por terminal
cd src/backend
flask create_admin
```

Esto crea el usuario Alberto con rol de administrador para usar el panel de control.

## Funcionalidades destacadas

* ✅ Login con JWT en cookies + CSRF
* ✅ Recuperación de contraseña por email
* ✅ CRUD completo de artículos desde el panel admin
* ✅ Editor HTML manual con slug automático y SEO
* ✅ Sistema de imágenes con Cloudinary y drag & drop
* ✅ Dashboard privado para usuarios registrados

## Referencias cruzadas

* El archivo `articles.json` se importa automáticamente al ejecutar el script `import_static_articles.py`. No se duplican artículos aunque se ejecute varias veces.

## Arquitectura y Decisiones Técnicas

* **JWT en cookies HttpOnly**: Mayor seguridad contra XSS
* **Editor HTML manual**: Reemplaza TipTap/Quill por solución más estable
* **fetchWithAuth**: Wrapper para renovación automática de tokens expirados
* **AdminLayout**: Separación completa de interfaces admin/usuario
* **Arquitectura de componentes**: Modular y reutilizable
* **Sistema SEO**: Metadata dinámica con Next.js App Router

## Despliegue

### Frontend

* Vercel (recomendado)
* Netlify
* AWS Amplify

### Backend

* Railway
* Render
* DigitalOcean App Platform
* VPS tradicional con Docker

## Contribución

```bash
# 1. Fork del repositorio
git checkout -b feature/nueva-funcionalidad

# 2. Commit de cambios
git commit -m 'Añadir nueva funcionalidad'

# 3. Push a la rama
git push origin feature/nueva-funcionalidad

# 4. Abrir Pull Request
```

## Licencia

MIT - Nelson Valero Barcelona
