# Boost A Project

![Backend Tests](https://github.com/Nelvb/Plataforma-inversion/actions/workflows/backend-tests.yml/badge.svg)

![Coverage](https://img.shields.io/badge/Coverage-91%25-brightgreen)


Plataforma web de inversión inmobiliaria diseñada para ofrecer transparencia, documentación clara y acompañamiento personalizado en cada etapa del proceso. Facilita el acceso a oportunidades seleccionadas, enfocándose en la confianza, la seguridad y una experiencia de usuario cuidada.

## Tecnologías

### Frontend

- Next.js 15.2 con App Router
- TypeScript para desarrollo sostenible
- Tailwind CSS + componentes personalizados 
- React Testing Library + Jest
- JWT para autenticación segura

### Backend

- Flask con arquitectura modular
- SQLAlchemy + Alembic para migraciones
- PostgreSQL como base de datos
- JWT en cookies HttpOnly + protección CSRF
- Flask-Mail para recuperación de contraseñas y notificaciones

### DevOps

- Docker y Docker Compose
- GitHub Actions para CI/CD
- Cloudinary para gestión de imágenes

## Estructura del Proyecto

```
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
│       ├── app/
│       │   ├── api/                    # Endpoints REST
│       │   ├── models/                 # Modelos SQLAlchemy
│       │   ├── schemas/                # Esquemas de datos
│       │   ├── services/               # Lógica de negocio
│       │   └── utils/                  # Utilidades
│       ├── migrations/                 # Migraciones Alembic
│       └── tests/                      # Tests con pytest
```

## Requisitos Previos

- Docker y Docker Compose (recomendado)
- Alternativamente:
  - Node.js (v18 o superior)
  - Python (v3.9 o superior)
  - PostgreSQL

## Instalación y Configuración

### Con Docker (recomendado)

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/boost-a-project.git
   cd boost-a-project
   ```

2. Configuración de variables de entorno:
   ```bash
   cp .env.example .env
   cp .env.docker.example .env.docker
   ```
   Actualiza los valores con tus credenciales.

3. Iniciar servicios:
   ```bash
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

## Funcionalidades

### Públicas
- Página principal con secciones Hero, ValueProposition, InvestorSupport, CompanyValues, ActiveProjects
- Blog con artículos sobre inversión inmobiliaria
- Vista detallada de proyectos inmobiliarios

### Autenticación
- Registro de usuarios
- Login con JWT en cookies HttpOnly + CSRF
- Recuperación de contraseña vía email
- Perfil editable y seguro

### Panel de usuario
- Dashboard personalizado
- Gestión de perfil (nombre, email, contraseña)
- Seguimiento de proyectos de interés

### Panel de administración
- Gestión completa de blog (CRUD)
- Gestión de proyectos inmobiliarios
- Editor de artículos con conversión automática HTML
- Selector de imágenes destacadas
- Selector de artículos relacionados

## Testing

### Frontend
```bash
cd src/frontend
npm run test
```

Tests implementados para componentes UI (Button, Card), formularios (BlogArticleForm, ProfileForm) y componentes complejos (SideMenu, NavbarLinks).

### Backend
```bash
cd src/backend
python -m pytest
```

### Ejecutar tests con cobertura
```bash
cd src/backend
coverage run -m pytest
coverage report -m
coverage html  # Genera informe visual en htmlcov/index.html
```

Incluye tests para autenticación, gestión de usuario y artículos, con base de datos SQLite en memoria.

## Arquitectura y Decisiones Técnicas

- **JWT en cookies HttpOnly**: Mayor seguridad contra XSS
- **Editor HTML manual**: Reemplaza TipTap/Quill por solución más estable
- **fetchWithAuth**: Wrapper para renovación automática de tokens expirados
- **AdminLayout**: Separación completa de interfaces admin/usuario
- **Arquitectura de componentes**: Modular y reutilizable
- **Sistema SEO**: Metadata dinámica con Next.js App Router

## Despliegue

### Frontend
El frontend de Next.js puede desplegarse en:
- Vercel (recomendado)
- Netlify
- AWS Amplify

### Backend
El backend Flask funciona en:
- Railway
- Render
- DigitalOcean App Platform
- VPS tradicional con Docker

## Contribución

1. Fork del repositorio
2. Crear rama de funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

## Licencia

MIT - Nelson Valero Barcelona
