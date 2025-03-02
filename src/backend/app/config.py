import os
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env
load_dotenv()

class Config:
    """Configuración base de la aplicación."""
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "supersecretkey")

class DevelopmentConfig(Config):
    """Configuración específica para desarrollo."""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = f"postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"

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
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL_PROD", "postgresql://usuario:password@servidor/produccion")

# Diccionario para seleccionar configuración
config = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig
}