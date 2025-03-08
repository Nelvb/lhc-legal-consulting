# Configuración centralizada para diferentes entornos de la aplicación
# Define ajustes para desarrollo, pruebas y producción con carga dinámica de variables
# Gestiona conexiones a bases de datos y configuración de seguridad según el entorno

import os
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo adecuado
if os.path.exists(".env.docker") and "DOCKER" in os.environ:
    load_dotenv(".env.docker")
else:
    load_dotenv()

class Config:
    """Configuración base de la aplicación."""
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    
    # Tiempo de expiración de los tokens (segundos)
    JWT_ACCESS_TOKEN_EXPIRES = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES", 3600))
    JWT_REFRESH_TOKEN_EXPIRES = int(os.getenv("JWT_REFRESH_TOKEN_EXPIRES", 86400))

class DevelopmentConfig(Config):
    """Configuración para el entorno de desarrollo."""
    
    DEBUG = True
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_USER = os.getenv("DB_USER", "postgres")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "postgres")
    DB_NAME = os.getenv("DB_NAME", "starter_template")
    
    SQLALCHEMY_DATABASE_URI = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"

class TestingConfig(Config):
    """Configuración para el entorno de pruebas."""
    
    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"  # Base de datos en memoria para pruebas
    WTF_CSRF_ENABLED = False  # Desactivar CSRF en pruebas

class ProductionConfig(Config):
    """Configuración para el entorno de producción."""
    
    DEBUG = False
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_USER = os.getenv("DB_USER", "postgres")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_NAME = os.getenv("DB_NAME", "starter_template")
    
    # Intentar usar la variable DATABASE_URL_PROD, si no, usar la configuración manual
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL_PROD",
        f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
    )

# Determinar el entorno actual basado en la variable FLASK_ENV
env = os.getenv("FLASK_ENV", "development")

# Mapeo de configuraciones según el entorno
config = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}

# Seleccionar la configuración adecuada
config_class = config.get(env, config["default"])
