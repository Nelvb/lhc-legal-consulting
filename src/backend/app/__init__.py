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
from app.api.contact_api import contact_api
from app.api.contact_admin_api import contact_admin_api
from app.config import DevelopmentConfig
from app.extensions import cors, db, init_app, jwt, ma, migrate
from app.services.image_service import ImageService
import os
import json
from sqlalchemy import inspect


def create_app(config_object=DevelopmentConfig):
    """
    Función fábrica para crear la aplicación Flask.
    - Carga configuración según entorno.
    - Inicializa extensiones (DB, JWT, CORS, migraciones, etc.).
    - Inicializa Cloudinary para subir imágenes.
    - Registra todos los blueprints.
    - Importa artículos estáticos si la tabla existe y está vacía.
    """

    app = Flask(__name__)
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

    # Inicializar extensiones
    init_app(app)

    # Inicializar Cloudinary
    ImageService.init_cloudinary(app)

    # Registrar todos los blueprints de la API
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(users_bp, url_prefix="/api/users")
    app.register_blueprint(routes, url_prefix="/api")
    app.register_blueprint(articles_bp, url_prefix="/api/articles")
    app.register_blueprint(images_bp, url_prefix="/api/images")
    app.register_blueprint(account_bp, url_prefix="/api/account")
    app.register_blueprint(contact_api, url_prefix="/api/contact")
    app.register_blueprint(contact_admin_api, url_prefix="/api/admin/contact")

    # Importar artículos estáticos si la tabla existe y está vacía
    with app.app_context():
        try:
            inspector = inspect(db.engine)
            if "articles" in inspector.get_table_names():
                from app.models.article import Article
                from app.scripts.import_service import importar_articulos_desde_json

                if Article.query.count() == 0:
                    json_path = os.path.join(os.path.dirname(__file__), 'data', 'articles.json')
                    if os.path.exists(json_path):
                        with open(json_path, 'r', encoding='utf-8') as f:
                            articles_data = json.load(f)
                        resultados = importar_articulos_desde_json(articles_data)
                        for msg in resultados:
                            app.logger.info(msg)
                        app.logger.info("Artículos estáticos importados correctamente.")
                    else:
                        app.logger.warning(f"Archivo no encontrado: {json_path}")
        except Exception as e:
            app.logger.warning(f"No se pudo verificar ni importar artículos: {e}")

    return app
