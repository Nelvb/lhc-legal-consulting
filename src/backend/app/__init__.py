# src/backend/app/__init__.py
#
# Punto de entrada principal para la aplicación Flask.
# Implementa un patrón Factory para crear la instancia de la app con su configuración,
# extensiones, middlewares y rutas (blueprints) registradas.
# Centraliza toda la configuración para mantener el proyecto organizado y escalable.

from app.api.auth import auth_bp               # Blueprint de autenticación (login, registro, logout)
from app.api.users import users_bp             # Blueprint para gestión de usuarios
from app.api.routes import routes               # Blueprint para rutas generales o raíz del API
from app.api.articles import articles_bp        # Blueprint para gestión de artículos dinámicos en BD
from app.api.images import images_bp             # Blueprint para gestión de imágenes (subida, borrado)
from app.api.account import account_bp           # Blueprint para funcionalidades de cuenta (recuperación, cambio email)
from app.config import DevelopmentConfig         # Configuración base para entorno de desarrollo
from app.extensions import (                      # Extensiones Flask usadas en el proyecto
    cors, db, init_app, jwt, ma, migrate,
)
from app.services.image_service import ImageService  # Servicio para integración con Cloudinary
from flask import Flask

def create_app(config_object=DevelopmentConfig):
    """
    Función fábrica para crear la aplicación Flask.
    - Carga configuración según entorno.
    - Inicializa extensiones (BD, JWT, CORS, migraciones, etc.).
    - Inicializa Cloudinary para subir imágenes.
    - Registra todos los blueprints con sus prefijos de ruta.
    - Devuelve la instancia de la app lista para ejecutar o testear.
    """

    # Crear la instancia de Flask
    app = Flask(__name__)

    # Cargar configuración desde el objeto de configuración
    app.config.from_object(config_object)

    # Establecer clave JWT si no está configurada (solo desarrollo)
    if not app.config.get("JWT_SECRET_KEY"):
        app.config["JWT_SECRET_KEY"] = "development-key-not-for-production"

    # Inicializar todas las extensiones (db, jwt, cors, migraciones, etc.)
    init_app(app)

    # Inicializar configuración y credenciales de Cloudinary para imágenes
    ImageService.init_cloudinary(app)

    # Registrar blueprints de la API con sus rutas base (url_prefix)
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(users_bp, url_prefix="/api/users")
    app.register_blueprint(routes, url_prefix="/api")
    app.register_blueprint(articles_bp, url_prefix="/api/articles")
    app.register_blueprint(images_bp, url_prefix="/api/images")
    app.register_blueprint(account_bp, url_prefix="/api/account")

    # Retornar la app Flask configurada
    return app
