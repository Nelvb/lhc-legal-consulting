# ============================================================
# app/config.py
# ------------------------------------------------------------
# Configuración centralizada para los diferentes entornos
# de la aplicación Flask (desarrollo, testing y producción).
# Detecta y carga automáticamente variables de entorno desde
# los archivos .env o .env.docker según corresponda.
# 
# Soporta:
# - Base de datos local o Neon (según entorno)
# - JWT seguro con cookies HttpOnly y CSRF
# - Envío de emails con Flask-Mail
# - Cloudinary para subida de imágenes
# ============================================================

import os
from dotenv import load_dotenv

# ------------------------------------------------------------
# Carga dinámica de variables según entorno
# ------------------------------------------------------------
if os.path.exists(".env.docker") and "DOCKER" in os.environ:
    load_dotenv(".env.docker")
else:
    load_dotenv()


class Config:
    """Configuración base común a todos los entornos."""

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "supersecretkey")

    # Configuración de cookies JWT (compatibles con desarrollo y producción)
    JWT_TOKEN_LOCATION = ["cookies"]
    JWT_COOKIE_SECURE = False  # True solo en producción con HTTPS
    JWT_COOKIE_SAMESITE = "Lax"
    JWT_SESSION_COOKIE = False
    JWT_COOKIE_CSRF_PROTECT = True
    JWT_ACCESS_COOKIE_PATH = "/"
    JWT_REFRESH_COOKIE_PATH = "/api/auth/refresh"
    JWT_CSRF_IN_COOKIES = True
    JWT_CSRF_METHODS = ["POST", "PUT", "PATCH", "DELETE"]
    JWT_ACCESS_COOKIE_NAME = "access_token_cookie"
    JWT_REFRESH_COOKIE_NAME = "refresh_token_cookie"

    JWT_ACCESS_TOKEN_EXPIRES = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRES", 3600))
    JWT_REFRESH_TOKEN_EXPIRES = int(os.getenv("JWT_REFRESH_TOKEN_EXPIRES", 86400))

    # --------------------------------------------------------
    # Cloudinary
    # --------------------------------------------------------
    CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME")
    CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY")
    CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET")

    # --------------------------------------------------------
    # Configuración de email (Flask-Mail)
    # --------------------------------------------------------
    MAIL_SERVER = os.getenv("MAIL_SERVER", "smtp.gmail.com")
    MAIL_PORT = int(os.getenv("MAIL_PORT", 587))
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    MAIL_DEFAULT_SENDER = os.getenv("MAIL_DEFAULT_SENDER", MAIL_USERNAME)
    MAIL_MAX_EMAILS_PER_DAY = int(os.getenv("MAIL_MAX_EMAILS_PER_DAY", 100))


# ============================================================
# ENTORNOS ESPECÍFICOS
# ============================================================

class DevelopmentConfig(Config):
    """Configuración para entorno de desarrollo local."""
    DEBUG = True
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_USER = os.getenv("DB_USER", "postgres")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "postgres")
    DB_NAME = os.getenv("DB_NAME", "lhc_legal_local")

    # Prioriza DATABASE_URL (Neon o local), luego construye fallback
    SQLALCHEMY_DATABASE_URI = (
        os.getenv("DATABASE_URL")
        or f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
    )


class TestingConfig(Config):
    """Configuración para entorno de pruebas automáticas (pytest)."""
    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"
    WTF_CSRF_ENABLED = False
    SECRET_KEY = "test-secret-key"
    JWT_SECRET_KEY = "test-jwt-secret"
    MAIL_SUPPRESS_SEND = True


class ProductionConfig(Config):
    """Configuración para entorno de producción (Render + Vercel)."""
    DEBUG = False
    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_USER = os.getenv("DB_USER", "postgres")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_NAME = os.getenv("DB_NAME", "lhc_legal_prod")

    # Prioriza URI completa de producción (Render o Neon)
    SQLALCHEMY_DATABASE_URI = (
        os.getenv("SQLALCHEMY_DATABASE_URI")
        or os.getenv("DATABASE_URL")
        or os.getenv("DATABASE_URL_PROD")
        or f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
    )


# ============================================================
# SELECCIÓN AUTOMÁTICA DE ENTORNO
# ============================================================

env = os.getenv("FLASK_ENV", "development")

config = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}

# Clase de configuración activa
config_class = config.get(env, config["default"])
