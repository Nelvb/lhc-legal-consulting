# Punto de entrada de la aplicación Flask: configuración y registro de componentes
# Implementa patrón Factory para inicializar la app con dependencias y rutas
# Centraliza la configuración de extensiones, blueprints y middlewares

from app.api.auth import auth_bp  # Importamos el blueprint de autenticación
from app.api.users import users_bp  # Importamos el blueprint de usuarios
from app.api.routes import routes  # Importamos el blueprint de rutas generales
from app.api.articles import articles_bp  # Importamos el blueprint de artículos
from app.api.images import images_bp  # Importamos el blueprint de imágenes
from app.api.account import account_bp
from app.config import DevelopmentConfig  # Configuración de la aplicación
from app.extensions import (
    cors,
    db,
    init_app,
    jwt,
    ma,
    migrate,
)
from app.services.image_service import ImageService  # Importamos el servicio de imágenes
from flask import Flask


def create_app(config_object=DevelopmentConfig):
    """
    Función de fábrica para crear una instancia de la aplicación Flask.
    Configura la app, las extensiones y registra los blueprints.
    """
    # Crear la aplicación Flask
    app = Flask(__name__)
    
    # Cargar la configuración de la app
    app.config.from_object(config_object)
    
    # Asegurarse de que la JWT_SECRET_KEY esté configurada
    if not app.config.get("JWT_SECRET_KEY"):
        app.config["JWT_SECRET_KEY"] = "development-key-not-for-production"
    
    # Inicializar todas las extensiones desde extensions.py
    init_app(app)
    
    # Inicializar Cloudinary
    ImageService.init_cloudinary(app)
    
    # Registrar los blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(users_bp, url_prefix="/api/users")
    app.register_blueprint(routes, url_prefix="/api")
    app.register_blueprint(articles_bp, url_prefix="/api/articles")
    app.register_blueprint(images_bp, url_prefix="/api/images")
    app.register_blueprint(account_bp, url_prefix="/api/account")

    return app