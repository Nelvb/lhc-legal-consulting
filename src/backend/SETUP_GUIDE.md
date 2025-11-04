# Guía de Configuración - LHC Legal & Consulting Backend

## 📋 Índice
1. [Configuración de Base de Datos](#configuración-de-base-de-datos)
2. [Crear Usuario Administrador](#crear-usuario-administrador)
3. [Importar Artículos](#importar-artículos)
4. [Verificar Configuración](#verificar-configuración)

---

## 🔧 Configuración de Base de Datos

### 1. Variables de Entorno Requeridas

Crea un archivo `.env` en `src/backend/` con las siguientes variables:

```env
# Base de Datos
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=lhc_legal

# O usa DATABASE_URL directamente
DATABASE_URL=postgresql://postgres:tu_password@localhost/lhc_legal

# Flask
SECRET_KEY=tu_secret_key_muy_segura
FLASK_ENV=development

# JWT
JWT_SECRET_KEY=tu_jwt_secret_key

# Admin (para crear usuario administrador)
ADMIN_USERNAME=admin
ADMIN_LAST_NAME=Admin
ADMIN_EMAIL=lhclegalandconsulting@gmail.com
ADMIN_PASSWORD=Lhc.1234

# Cloudinary (opcional, para imágenes)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Email (opcional, para Flask-Mail)
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=tu_email@gmail.com
MAIL_PASSWORD=tu_app_password
```

### 2. Aplicar Migraciones

```bash
cd src/backend
flask db upgrade
```

Esto creará todas las tablas necesarias en la base de datos.

---

## 👤 Crear Usuario Administrador

### Método 1: Usando el Script CLI (Recomendado)

```bash
cd src/backend
python admin/manage.py create_admin
```

**Requisitos:**
- Las variables `ADMIN_USERNAME`, `ADMIN_LAST_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` deben estar en `.env`

**Salida esperada:**
```
✅ Usuario administrador 'admin' creado correctamente.
```

### Método 2: Manualmente con Python

```bash
cd src/backend
python
```

```python
from app import create_app
from app.extensions import db
from app.models.user import User
from werkzeug.security import generate_password_hash

app = create_app()
with app.app_context():
    admin = User(
        username='admin',
        last_name='Admin',
        email='lhclegalandconsulting@gmail.com',
        password_hash=generate_password_hash('Lhc.1234'),
        is_admin=True
    )
    db.session.add(admin)
    db.session.commit()
    print("✅ Usuario administrador creado")
```

---

## 📰 Importar Artículos

### Método 1: Automático (Al iniciar el backend)

El backend **importa automáticamente** los artículos desde `src/backend/app/data/articles.json` cuando:
- La tabla `articles` existe
- La tabla `articles` está vacía

**Ubicación del archivo:** `src/backend/app/data/articles.json`

### Método 2: Script CLI Manual

```bash
cd src/backend
python -m app.scripts.import_static_articles
```

**Salida esperada:**
```
Artículo creado: articulo-1
Artículo creado: articulo-2
...
Proceso de importación completado.
```

### Método 3: Usando Flask Shell

```bash
cd src/backend
flask shell
```

```python
from app.scripts.import_service import importar_articulos_desde_json
import json

with open('app/data/articles.json', 'r', encoding='utf-8') as f:
    articles_data = json.load(f)

resultados = importar_articulos_desde_json(articles_data)
for msg in resultados:
    print(msg)
```

---

## ✅ Verificar Configuración

### 1. Verificar Base de Datos

```bash
cd src/backend
flask shell
```

```python
from app.extensions import db
from app.models.user import User
from app.models.article import Article

# Verificar usuarios
print(f"Usuarios totales: {User.query.count()}")
print(f"Admins: {User.query.filter_by(is_admin=True).count()}")

# Verificar artículos
print(f"Artículos totales: {Article.query.count()}")
```

### 2. Verificar API

```bash
# Iniciar el servidor
cd src/backend
python run.py

# En otra terminal, probar endpoints
curl http://localhost:5000/api/health
curl http://localhost:5000/api/articles?page=1&limit=10
```

### 3. Verificar Admin

```bash
# Verificar que el admin existe
cd src/backend
python admin/manage.py create_admin
# Si ya existe, mostrará: ⚠️ Ya existe un usuario con el email...
```

---

## 🐛 Troubleshooting

### Error: "connection to server at localhost failed"
- **Causa:** PostgreSQL no está corriendo o credenciales incorrectas
- **Solución:** Verifica que PostgreSQL esté activo y las credenciales en `.env` sean correctas

### Error: "No se pudo verificar ni importar artículos"
- **Causa:** La tabla `articles` no existe o hay error de conexión
- **Solución:** Ejecuta `flask db upgrade` para crear las tablas

### Error: "Faltan variables de entorno ADMIN_*"
- **Causa:** Variables no definidas en `.env`
- **Solución:** Añade las variables `ADMIN_USERNAME`, `ADMIN_LAST_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` a tu `.env`

### Artículos no se importan automáticamente
- **Causa:** La tabla `articles` ya tiene datos o el archivo JSON no existe
- **Solución:** 
  1. Verifica que `app/data/articles.json` existe
  2. Si la tabla tiene datos, usa el script manual: `python -m app.scripts.import_static_articles`

---

## 📝 Notas Importantes

1. **Importación Automática:** Solo ocurre si la tabla está **vacía**. Si ya hay artículos, no se importarán automáticamente.

2. **Actualización de Artículos:** El script `import_static_articles.py` **actualiza** artículos existentes si el slug ya existe.

3. **Seguridad:** Nunca commitees el archivo `.env` con credenciales reales. Usa `.env.example` para documentar las variables necesarias.

4. **Base de Datos:** Asegúrate de que PostgreSQL esté corriendo antes de iniciar el backend.

---

## 🔗 Referencias

- **Modelos:** `src/backend/app/models/`
- **Scripts:** `src/backend/app/scripts/`
- **Admin CLI:** `src/backend/admin/manage.py`
- **Datos:** `src/backend/app/data/articles.json`

