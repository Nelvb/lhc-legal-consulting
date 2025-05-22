# src/backend/app/__init__.py
#
# Punto de entrada principal para la aplicación Flask.
# Implementa un patrón Factory para crear la instancia de la app con su configuración,
# extensiones, middlewares y rutas (blueprints) registradas.
# Centraliza toda la configuración para mantener el proyecto organizado y escalable.

from flask import Flask
from flask_cors import CORS
from app.api.auth import auth_bp
from app.api.users import users_bp
from app.api.routes import routes
from app.api.articles import articles_bp
from app.api.images import images_bp
from app.api.account import account_bp
from app.config import DevelopmentConfig
from app.extensions import cors, db, init_app, jwt, ma, migrate
from app.services.image_service import ImageService

def create_app(config_object=DevelopmentConfig):
    """
    Función fábrica para crear la aplicación Flask.
    - Carga configuración según entorno.
    - Inicializa extensiones (DB, JWT, CORS, migraciones, etc.).
    - Inicializa Cloudinary para subir imágenes.
    - Registra todos los blueprints.
    - Devuelve la app lista para ejecutarse.
    """

    # Crear la instancia Flask
    app = Flask(__name__)

    # Cargar configuración según entorno
    app.config.from_object(config_object)

    # Configuración global de CORS para el frontend (Next.js en localhost:3000)
    CORS(app, resources={
        r"/api/*": {
            "origins": ["http://localhost:3000"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization", "X-CSRF-TOKEN"],
            "supports_credentials": True,
            "expose_headers": ["Content-Type", "X-CSRFToken"],
        }
    }, supports_credentials=True)

    # Inicializar extensiones (db, jwt, mail, etc.)
    init_app(app)

    # Inicializar Cloudinary para imágenes
    ImageService.init_cloudinary(app)

    # Registrar blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(users_bp, url_prefix="/api/users")
    app.register_blueprint(routes, url_prefix="/api")
    app.register_blueprint(articles_bp, url_prefix="/api/articles")
    app.register_blueprint(images_bp, url_prefix="/api/images")
    app.register_blueprint(account_bp, url_prefix="/api/account")

    return app
