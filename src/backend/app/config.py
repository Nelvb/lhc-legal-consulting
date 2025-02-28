import os
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env
load_dotenv()

class Config:
    """Configuración base de la aplicación."""
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "supersecretkey")

class DevelopmentConfig(Config):
    """Configuración específica para desarrollo."""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "postgresql://postgres:Nelson1978@localhost/starter_template")

class ProductionConfig(Config):
    """Configuración específica para producción."""
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL_PROD", "postgresql://usuario:password@servidor/produccion")

# Diccionario para seleccionar configuración
config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig
}
