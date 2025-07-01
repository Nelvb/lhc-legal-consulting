# LHC Legal & Consulting

[![Backend Tests](https://img.shields.io/badge/Backend_Tests-83_passing-brightgreen.svg)](https://github.com/your-username/lhc-legal-consulting)
[![Frontend Tests](https://img.shields.io/badge/Frontend_Tests-187_passing-brightgreen.svg)](https://github.com/your-username/lhc-legal-consulting)
[![Coverage](https://img.shields.io/badge/Coverage-93%25-brightgreen.svg)](https://github.com/your-username/lhc-legal-consulting)
[![Total Tests](https://img.shields.io/badge/Total_Tests-270-blue.svg)](https://github.com/your-username/lhc-legal-consulting)

Plataforma web de asesoría legal profesional diseñada para conectar clientes con servicios jurídicos especializados. Ofrece consultas gratuitas, información legal completa por áreas de práctica, y un sistema de gestión de contenido para abogados especialistas.

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 15** con App Router y TypeScript
- **Tailwind CSS** con componentes personalizados
- **Zustand** para gestión de estado global
- **React Testing Library + Jest** (187 tests)

### Backend
- **Flask** con arquitectura modular
- **PostgreSQL** + SQLAlchemy + Alembic
- **JWT** en cookies HttpOnly + protección CSRF
- **Flask-Mail** + **Cloudinary**
- **Pytest** con 93% cobertura (83 tests)

## 📁 Estructura Principal

```
LHC-LEGAL-AND-CONSULTING/
├── src/
│   ├── frontend/
│   │   ├── app/                    # Next.js App Router
│   │   │   ├── about-us/           # Página institucional
│   │   │   ├── admin/              # Panel administración
│   │   │   ├── areas/              # Áreas legales dinámicas
│   │   │   ├── blog/               # Blog jurídico
│   │   │   ├── contact/            # Formulario contacto
│   │   │   ├── faq/                # 203 preguntas frecuentes
│   │   │   └── legal/              # Páginas legales obligatorias
│   │   ├── components/             # Componentes React
│   │   │   ├── layout/             # Header, Footer, Menú
│   │   │   ├── ui/                 # Componentes básicos
│   │   │   ├── admin/              # Panel administración
│   │   │   └── areas/, blog/, faq/ # Componentes específicos
│   │   ├── stores/                 # Zustand stores
│   │   ├── lib/                    # Servicios y utilidades
│   │   └── types/                  # TypeScript interfaces
│   └── backend/
│       ├── app/
│       │   ├── api/                # Endpoints REST
│       │   ├── models/             # Modelos SQLAlchemy
│       │   ├── services/           # Lógica de negocio
│       │   └── schemas/            # Validación Marshmallow
│       └── tests/                  # Tests backend
```

## ⚡ Instalación Rápida

### Con Docker (Recomendado)
```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/lhc-legal-consulting.git
cd lhc-legal-consulting

# Configurar variables de entorno
cp .env.example .env
cp .env.docker.example .env.docker
cd src/frontend && cp .env.local.example .env.local && cd ../..

# Iniciar servicios
docker-compose up --build
```

### Desarrollo Local
```bash
# Backend
cd src/backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
flask db upgrade && python run.py

# Frontend (nueva terminal)
cd src/frontend
npm install && npm run dev
```

## 🎯 Funcionalidades Principales

### ✅ Frontend Público
- **Landing profesional** con carousel de áreas legales
- **Áreas legales dinámicas** (/areas/[slug]) con navegación lateral  
- **Blog jurídico** completo con SEO optimizado
- **FAQ avanzado** con 203 preguntas y búsqueda inteligente
- **Formulario de contacto** profesional con validación
- **Páginas institucionales** y legales obligatorias

### ✅ Panel de Administración
- **Dashboard admin** con gestión completa
- **Editor de blog** con upload de imágenes
- **Gestión de leads** y mensajes de contacto
- **Sistema de emails** profesional

### ✅ Características Técnicas
- **SEO profesional** con metadata dinámica y Schema.org
- **Responsive design** completo con animaciones suaves
- **Arquitectura escalable** con TypeScript y testing
- **Transiciones de página** fluidas y profesionales

## 🗺️ Rutas Principales

| Ruta | Descripción |
|------|-------------|
| `/` | Landing con carousel y servicios destacados |
| `/areas` | Listado de áreas legales |
| `/areas/[slug]` | Área legal específica |
| `/contact` | Formulario de contacto |
| `/faq` | Preguntas frecuentes con búsqueda |
| `/blog` | Blog jurídico |
| `/admin` | Panel de administración |

## 🧪 Testing

```bash
# Frontend (187 tests)
cd src/frontend && npm run test

# Backend (83 tests, 93% coverage)
cd src/backend && python -m pytest
```

## 🚀 Variables de Entorno

El proyecto requiere 4 archivos de configuración:

**Backend:**
- `.env` (desarrollo Flask)
- `.env.docker` (Docker Compose)

**Frontend:**
- `.env.local` (desarrollo Next.js)
- `.env.test` (testing Jest)

Copia desde las plantillas `.example` incluidas y actualiza las variables críticas:
- `SECRET_KEY`, `JWT_SECRET_KEY`
- Credenciales PostgreSQL
- Configuración Cloudinary y SMTP

## 🌐 Despliegue

### Frontend
- **Vercel** (recomendado)
- Netlify, AWS Amplify

### Backend  
- **Railway**, **Render**
- DigitalOcean, VPS con Docker

## 📊 SEO y Performance

- **Metadata dinámica** por página
- **Schema.org** structured data 
- **URLs amigables** y navegación semántica
- **Core Web Vitals** optimizados
- **Accesibilidad WCAG 2.1**

## 🛠️ Comandos Útiles

```bash
# Crear admin
cd src/backend && python admin/manage.py

# Importar artículos
python app/scripts/import_static_articles.py

# Migraciones
flask db upgrade

# Coverage detallado
coverage run -m pytest && coverage html
```

---

**Plataforma desarrollada para LHC Legal & Consulting** - Asesoría legal profesional con enfoque en transparencia y atención personalizada.
