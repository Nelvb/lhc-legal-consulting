# Boost A Project

![Backend Tests](https://img.shields.io/badge/Backend_Tests-83_passed-brightgreen)
![Frontend Tests](https://img.shields.io/badge/Frontend_Tests-187_passed-brightgreen)
![Coverage](https://img.shields.io/badge/Coverage-93%25-brightgreen)
![Total Tests](https://img.shields.io/badge/Total_Tests-270-blue)

Plataforma web de inversión inmobiliaria diseñada para ofrecer transparencia, documentación clara y acompañamiento personalizado en cada etapa del proceso. Facilita el acceso a oportunidades seleccionadas, enfocándose en la confianza, la seguridad y una experiencia de usuario cuidada.

## Tecnologías

### Frontend

* Next.js 15.2 con App Router
* TypeScript para desarrollo sostenible
* Tailwind CSS + componentes personalizados
* React Testing Library + Jest (187 tests)
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
├── .env.example, .env.docker.example      # Plantillas de configuración backend
├── docker-compose.yml                     # Configuración Docker
├── package-lock.json, pyproject.toml     # Dependencias
├── README.md                              # Documentación principal
├── src/
│   ├── frontend/
│   │   ├── .env.local.example, .env.test.example  # Plantillas frontend
│   │   ├── app/                           # App Router de Next.js
│   │   │   ├── (auth)/                    # Rutas de login y signup
│   │   │   ├── (public)/                  # Rutas públicas (reset-password)
│   │   │   ├── admin/                     # Panel de administración
│   │   │   ├── blog/                      # Blog público
│   │   │   ├── dashboard/                 # Área privada de usuario
│   │   │   ├── contacto/                  # Página de contacto
│   │   │   ├── nosotros/                  # Página sobre nosotros
│   │   │   ├── preguntas-frecuentes/      # FAQ
│   │   │   └── page.tsx                   # Landing principal
│   │   ├── components/                    # Componentes React
│   │   │   ├── admin/                     # Componentes del panel admin
│   │   │   │   ├── blog/                  # Editor de artículos
│   │   │   │   ├── layout/                # Layout admin
│   │   │   │   └── sideMenu/              # Menú lateral admin
│   │   │   ├── auth/                      # Formularios de autenticación
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── SignupForm.tsx
│   │   │   │   ├── ForgotPasswordForm.tsx
│   │   │   │   └── ResetPasswordForm.tsx
│   │   │   ├── Home/                      # Secciones de landing
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── ValueProposition.tsx
│   │   │   │   ├── InvestorSupport.tsx
│   │   │   │   ├── CompanyValues.tsx
│   │   │   │   └── ActiveProjects.tsx
│   │   │   ├── layout/                    # Navbar, Footer, etc.
│   │   │   ├── shared/                    # Componentes compartidos
│   │   │   │   ├── ProfileForm.tsx
│   │   │   │   ├── ProfileView.tsx
│   │   │   │   └── DashboardHeader.tsx
│   │   │   ├── ui/                        # Componentes básicos (Button, Input)
│   │   │   └── user/                      # Componentes del área de usuario
│   │   ├── stores/                        # Zustand stores
│   │   │   ├── useAuthStore.ts            # Estado de autenticación
│   │   │   └── useUiStore.ts              # Estado de UI
│   │   ├── lib/
│   │   │   ├── api/                       # Servicios de API
│   │   │   │   ├── authService.ts
│   │   │   │   ├── userService.ts
│   │   │   │   ├── blogService.ts
│   │   │   │   └── contactService.ts
│   │   │   └── utils/                     # Utilidades (fetchWithAuth)
│   │   │       ├── fetchWithAuth.ts
│   │   │       └── string-utils.ts
│   │   ├── types/                         # TypeScript interfaces
│   │   │   ├── auth.ts
│   │   │   ├── blog.ts
│   │   │   └── user.ts
│   │   ├── constants/                     # Constantes y validaciones
│   │   │   └── validation.ts
│   │   ├── styles/                        # CSS global
│   │   ├── __mocks__/                     # Mocks reutilizables para tests
│   │   │   ├── useAuthStore.ts
│   │   │   ├── userService.ts
│   │   │   ├── blogService.ts
│   │   │   └── fetchMock.ts
│   │   └── __tests__/                     # Tests organizados por categoría (187 tests)
│   │       ├── auth/                      # Tests de formularios de autenticación
│   │       ├── admin/                     # Tests del panel de administración
│   │       ├── lib/                       # Tests de servicios y utilidades
│   │       ├── ui/                        # Tests de componentes UI
│   │       ├── shared/                    # Tests de componentes compartidos
│   │       └── utils/                     # Utilidades de testing
│   └── backend/
│       ├── admin/                         # Comandos CLI como create_admin
│       │   ├── __init__.py
│       │   └── manage.py
│       ├── app/
│       │   ├── api/                       # Endpoints REST
│       │   │   ├── auth.py                # Login, logout, signup
│       │   │   ├── account.py             # Perfil, contacto, reset password
│       │   │   ├── articles.py            # CRUD artículos blog
│       │   │   ├── images.py              # Upload Cloudinary
│       │   │   └── users.py               # Gestión usuarios admin
│       │   ├── config.py                  # Config por entorno
│       │   ├── data/                      # JSON estáticos (articles.json)
│       │   ├── extensions.py              # Inicialización de extensiones Flask
│       │   ├── models/                    # Modelos SQLAlchemy
│       │   │   ├── user.py
│       │   │   └── article.py
│       │   ├── schemas/                   # Validación y serialización
│       │   │   ├── user.py
│       │   │   ├── article_schema.py
│       │   │   └── contact_schema.py
│       │   ├── scripts/                   # Scripts como import_static_articles.py
│       │   ├── services/                  # Lógica de negocio
│       │   │   ├── article_service.py
│       │   │   ├── email_service.py
│       │   │   ├── image_service.py
│       │   │   └── import_service.py
│       │   └── utils/                     # Funciones auxiliares
│       ├── migrations/                    # Alembic
│       └── tests/                         # Tests del backend (83 tests, 93% coverage)
│           ├── api/                       # Test de endpoints
│           ├── config/                    # Test de configuración y extensiones
│           ├── models/                    # Test unitarios de modelos
│           ├── schemas/                   # Test de validación con Marshmallow
│           ├── scripts/                   # Test de comandos Flask CLI
│           ├── services/                  # Test de lógica de negocio
│           └── test_db.py                 # Test de conexión DB
```

## Requisitos Previos

* Docker y Docker Compose (recomendado)
* Alternativamente:
  * Node.js (v18 o superior)
  * Python (v3.9 o superior)
  * PostgreSQL

## 🛠️ Configuración de Variables de Entorno

El proyecto requiere **4 archivos de entorno** que debes crear copiando desde las plantillas incluidas. Todos los archivos `.example` contienen valores de ejemplo que deben ser actualizados con tus credenciales reales.

### Paso 1: Variables del Backend
Desde la **raíz del proyecto** (`Plataforma-inversion/`):

```bash
# Variables para desarrollo del backend (Flask)
cp .env.example .env

# Variables para Docker Compose
cp .env.docker.example .env.docker
```

### Paso 2: Variables del Frontend
Navega al directorio del frontend:

```bash
cd src/frontend

# Variables para desarrollo local de Next.js
cp .env.local.example .env.local

# Variables para ejecutar tests con Jest
cp .env.test.example .env.test
```

### Estructura Completa de Archivos

| Archivo | Ubicación | Propósito | Variables Principales |
|---------|-----------|-----------|----------------------|
| `.env` | `/Plataforma-inversion/` | Backend desarrollo local | DB local, JWT secrets, Cloudinary, Email |
| `.env.docker` | `/Plataforma-inversion/` | Docker Compose | DB containerizada, mismas APIs |
| `.env.local` | `/src/frontend/` | Next.js desarrollo | `NEXT_PUBLIC_API_URL=http://localhost:5000/api` |
| `.env.test` | `/src/frontend/` | Jest testing | `NEXT_PUBLIC_API_URL=http://localhost:5000/api` |

### Configuración Requerida

#### Backend (.env y .env.docker)
Ambos archivos contienen las mismas variables, pero con valores diferentes para el entorno:

**Variables críticas que DEBES actualizar:**
- `SECRET_KEY`: Clave secreta para Flask (genera una única)
- `JWT_SECRET_KEY`: Clave para firmar tokens JWT (diferente a SECRET_KEY)
- `DB_*`: Credenciales de tu base de datos PostgreSQL
- `CLOUDINARY_*`: Credenciales de tu cuenta Cloudinary para imágenes
- `MAIL_*`: Configuración SMTP para envío de emails

**Diferencias principales:**
- `.env`: `DB_HOST=localhost` (base de datos local)
- `.env.docker`: `DB_HOST=db` (contenedor Docker)

#### Frontend (.env.local y .env.test)
Ambos archivos son idénticos y solo contienen:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Verificación de la Configuración

Después de copiar y configurar los archivos:

```bash
# Verificar que existen los archivos del backend (desde la raíz)
ls -la .env .env.docker

# Verificar archivos del frontend
ls -la src/frontend/.env.local src/frontend/.env.test

# Verificar que las variables están cargadas (opcional)
cd src/backend && python -c "from app.config import Config; print('✅ Configuración cargada correctamente')"
```

### ⚠️ Importante

1. **Nunca commitees** los archivos `.env` reales al repositorio
2. **Genera claves únicas** para `SECRET_KEY` y `JWT_SECRET_KEY` en producción
3. **Las credenciales de ejemplo** deben ser reemplazadas por las reales
4. **Para producción** crea variables de entorno específicas del hosting

### Generar Claves Seguras (Opcional)

Para generar claves secretas seguras:

```python
# Ejecutar en terminal de Python
import secrets
print("SECRET_KEY:", secrets.token_urlsafe(32))
print("JWT_SECRET_KEY:", secrets.token_urlsafe(32))
```

## Instalación y Configuración

### Con Docker (recomendado)

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/boost-a-project.git
cd boost-a-project

# Configurar variables de entorno (ver sección anterior)
cp .env.example .env
cp .env.docker.example .env.docker
cd src/frontend
cp .env.local.example .env.local
cp .env.test.example .env.test
cd ../..

# Iniciar servicios
docker-compose up --build
```

### Sin Docker

#### Backend

```bash
cd src/backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
flask db upgrade
python run.py
```

#### Frontend

```bash
cd src/frontend
npm install
npm run dev
```

## Testing

El proyecto cuenta con una arquitectura de testing robusta y profesional:

### Frontend (187 tests)

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
* ✅ Arquitectura de testing robusta (270 tests totales)
* ✅ Mocks reutilizables para testing eficiente
* ✅ Formularios unificados con validación profesional
* ✅ Formulario de contacto con envío de emails
* ✅ Protección de rutas por roles (admin/usuario)

## Arquitectura de Testing

### Frontend
- **React Testing Library** + Jest
- **Mocks centralizados** en `__mocks__/`
- **Helper functions** para reducir duplicación
- **Cobertura por categorías**: auth, admin, UI, shared
- **187 tests** organizados profesionalmente

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
* **Validaciones centralizadas**: Sistema unificado frontend-backend
* **Protección de rutas**: Componentes AdminPageContent y UserPageContent

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
