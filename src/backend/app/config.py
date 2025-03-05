import os
from dotenv import load_dotenv

# Determinar qué archivo .env cargar basado en el entorno
if os.path.exists(".env.docker") and "DOCKER" in os.environ:
    # Si estamos en Docker y existe el archivo .env.docker
    load_dotenv(".env.docker")
else:
    # De lo contrario, carga el archivo .env normal
    load_dotenv()

class Config:
    """Configuración base de la aplicación."""

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # Usar valores por defecto solo como último recurso
    SECRET_KEY = os.getenv("SECRET_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")


class DevelopmentConfig(Config):
    """Configuración específica para desarrollo."""

    DEBUG = True
    # Detectar si está en Docker o en local
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_USER = os.getenv("DB_USER", "postgres")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "postgres")
    DB_NAME = os.getenv("DB_NAME", "starter_template")
    
    SQLALCHEMY_DATABASE_URI = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"


class TestingConfig(Config):
    """Configuración específica para pruebas."""

    TESTING = True
    DEBUG = True
    # Usa una base de datos SQLite en memoria para pruebas
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"
    # Desactivar CSRF para pruebas
    WTF_CSRF_ENABLED = False


class ProductionConfig(Config):
    """Configuración específica para producción."""

    DEBUG = False
    # Priorizar la variable DATABASE_URL_PROD pero con opciones de respaldo
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_USER = os.getenv("DB_USER", "postgres")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_NAME = os.getenv("DB_NAME", "starter_template")
    
    # Intentar usar DATABASE_URL_PROD primero, luego la URI construida
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL_PROD",
        f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
    )


# Determinar entorno basado en la variable FLASK_ENV
env = os.getenv("FLASK_ENV", "development")

# Diccionario para seleccionar configuración
config = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}

# Configuración a usar
config_class = config.get(env, config["default"])