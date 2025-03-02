from flask import Flask
from app.extensions import db, migrate, jwt, cors, ma, init_app  # Correcto, ahora incluye init_app correctamente
from app.api.auth import auth_bp  # Importamos el blueprint de autenticación
from app.api.users import users_bp  # Importamos el blueprint de usuarios
from app.config import DevelopmentConfig  # Configuración de la aplicación

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
    
    # Registrar los blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(users_bp, url_prefix='/api/users')
    
    # Retornar la aplicación
    return app