# Boost A Project

![Backend Tests](https://img.shields.io/badge/Backend_Tests-83_passed-brightgreen)
![Frontend Tests](https://img.shields.io/badge/Frontend_Tests-175_passed-brightgreen)
![Coverage](https://img.shields.io/badge/Coverage-93%25-brightgreen)
![Total Tests](https://img.shields.io/badge/Total_Tests-258-blue)

Plataforma web de inversión inmobiliaria diseñada para ofrecer transparencia, documentación clara y acompañamiento personalizado en cada etapa del proceso. Facilita el acceso a oportunidades seleccionadas, enfocándose en la confianza, la seguridad y una experiencia de usuario cuidada.

## Tecnologías

### Frontend

* Next.js 15.2 con App Router
* TypeScript para desarrollo sostenible
* Tailwind CSS + componentes personalizados
* React Testing Library + Jest (175 tests)
* Zustand para gestión de estado global
* JWT para autenticación segura

### Backend

* Flask con arquitectura modular
* SQLAlchemy + Alembic para migraciones
* PostgreSQL como base de datos
* JWT en cookies HttpOnly + protección CSRF
* Flask-Mail para recuperación de contraseñas y notificaciones
* Pytest con 93% de cobertura (83 tests)

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
│   │   │   ├── (public)/               # Rutas públicas (reset-password)
│   │   │   ├── admin/                  # Panel de administración
│   │   │   ├── blog/                   # Blog público
│   │   │   ├── dashboard/              # Área privada de usuario
│   │   │   └── ...
│   │   ├── components/                 # Componentes React
│   │   │   ├── admin/                  # Componentes del panel admin
│   │   │   ├── auth/                   # Formularios de autenticación
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── SignupForm.tsx
│   │   │   │   ├── ForgotPasswordForm.tsx
│   │   │   │   └── ResetPasswordForm.tsx
│   │   │   ├── Home/                   # Secciones de landing
│   │   │   ├── layout/                 # Navbar, Footer, etc.
│   │   │   ├── shared/                 # Componentes compartidos
│   │   │   ├── ui/                     # Componentes básicos (Button, Input)
│   │   │   └── user/                   # Componentes del área de usuario
│   │   ├── stores/                     # Zustand stores
│   │   │   ├── useAuthStore.ts         # Estado de autenticación
│   │   │   └── useUiStore.ts           # Estado de UI
│   │   ├── lib/
│   │   │   ├── api/                    # Servicios de API
│   │   │   │   ├── authService.ts
│   │   │   │   ├── userService.ts
│   │   │   │   ├── blogService.ts
│   │   │   │   └── contactService.ts
│   │   │   └── utils/                  # Utilidades (fetchWithAuth)
│   │   ├── types/                      # TypeScript interfaces
│   │   ├── constants/                  # Constantes y validaciones
│   │   ├── styles/                     # CSS global
│   │   ├── __mocks__/                  # Mocks reutilizables para tests
│   │   │   ├── useAuthStore.ts
│   │   │   ├── userService.ts
│   │   │   ├── blogService.ts
│   │   │   └── fetchMock.ts
│   │   └── __tests__/                  # Tests organizados por categoría (175 tests)
│   │       ├── auth/                   # Tests de formularios de autenticación
│   │       ├── admin/                  # Tests del panel de administración
│   │       ├── lib/                    # Tests de servicios y utilidades
│   │       ├── ui/                     # Tests de componentes UI
│   │       ├── shared/                 # Tests de componentes compartidos
│   │       └── utils/                  # Utilidades de testing
│   └── backend/
│       ├── admin/                      # Comandos CLI como create_admin
│       │   ├── __init__.py
│       │   └── manage.py
│       ├── app/
│       │   ├── api/                    # Endpoints REST
│       │   │   ├── auth.py
│       │   │   ├── account.py
│       │   │   ├── articles.py
│       │   │   ├── images.py
│       │   │   └── users.py
│       │   ├── config.py              # Config por entorno
│       │   ├── data/                   # JSON estáticos (articles.json)
│       │   ├── extensions.py           # Inicialización de extensiones Flask
│       │   ├── models/                 # Modelos SQLAlchemy
│       │   │   ├── user.py
│       │   │   └── article.py
│       │   ├── schemas/                # Validación y serialización
│       │   │   ├── user.py
│       │   │   ├── article_schema.py
│       │   │   └── contact_schema.py
│       │   ├── scripts/                # Scripts como import_static_articles.py
│       │   ├── services/               # Lógica de negocio
│       │   │   ├── article_service.py
│       │   │   ├── email_service.py
│       │   │   ├── image_service.py
│       │   │   └── import_service.py
│       │   └── utils/                  # Funciones auxiliares
│       ├── migrations/                 # Alembic
│       └── tests/                      # Tests del backend (83 tests, 93% coverage)
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

El proyecto cuenta con una arquitectura de testing robusta y profesional:

### Frontend (175 tests)

```bash
cd src/frontend
npm run test
```

**Características del testing frontend:**
- Tests organizados por funcionalidad
- Mocks reutilizables centralizados
- Cobertura completa de componentes UI
- Tests de integración para formularios
- Helper functions para reducir duplicación

### Backend (83 tests, 93% coverage)

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
* ✅ Recuperación de contraseña por email con ResetPasswordForm
* ✅ CRUD completo de artículos desde el panel admin
* ✅ Editor HTML manual con slug automático y SEO
* ✅ Sistema de imágenes con Cloudinary y drag & drop
* ✅ Dashboard privado para usuarios registrados
* ✅ Gestión de estado global con Zustand
* ✅ Arquitectura de testing robusta (258 tests totales)
* ✅ Mocks reutilizables para testing eficiente
* ✅ Formularios unificados con validación profesional

## Arquitectura de Testing

### Frontend
- **React Testing Library** + Jest
- **Mocks centralizados** en `__mocks__/`
- **Helper functions** para reducir duplicación
- **Cobertura por categorías**: auth, admin, UI, shared
- **175 tests** organizados profesionalmente

### Backend
- **Pytest** con fixtures robustas
- **93% de cobertura** de código
- **83 tests** organizados por dominio
- **Tests de API, modelos, servicios y schemas**

## Referencias cruzadas

* El archivo `articles.json` se importa automáticamente al ejecutar el script `import_static_articles.py`. No se duplican artículos aunque se ejecute varias veces.

## Arquitectura y Decisiones Técnicas

* **JWT en cookies HttpOnly**: Mayor seguridad contra XSS
* **Zustand para estado global**: Reemplazó Context API por mejor performance
* **Editor HTML manual**: Reemplaza TipTap/Quill por solución más estable
* **fetchWithAuth**: Wrapper para renovación automática de tokens expirados
* **AdminLayout**: Separación completa de interfaces admin/usuario
* **Arquitectura de componentes**: Modular y reutilizable
* **Sistema SEO**: Metadata dinámica con Next.js App Router
* **Mocks reutilizables**: Arquitectura profesional de testing

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
