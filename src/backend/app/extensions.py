# ============================================================
# app/extensions.py
# ------------------------------------------------------------
# Inicialización centralizada de extensiones Flask.
# Configura ORM, migraciones, JWT, serialización, CORS y sistema de email.
# Permite compatibilidad completa con entornos de desarrollo (localhost)
# y producción (Render + Vercel).
# Implementa patrón de inicialización tardía para flexibilidad.
# ============================================================

from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail

# Inicialización diferida de extensiones
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
ma = Marshmallow()
cors = CORS()
mail = Mail()


def init_app(app):
    """
    Inicializa todas las extensiones con la instancia Flask.
    Incluye configuración de CORS adaptable a desarrollo y producción.
    """

    # Inicialización de extensiones base
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    ma.init_app(app)
    mail.init_app(app)

    # Configuración completa de CORS
    cors.init_app(
        app,
        resources={
            r"/api/*": {
                "origins": [
                    # --- Desarrollo local ---
                    "http://localhost:3000",
                    "http://127.0.0.1:3000",
                    # --- Producción Vercel (frontend) ---
                    "https://lhc-legal-consulting.vercel.app",
                    "https://www.lhc-legal-consulting.vercel.app",
                    # --- Producción Render (backend) ---
                    "https://lhc-legal-consulting.onrender.com"
                ],
                "methods": ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
                "allow_headers": [
                    "Content-Type",
                    "Authorization",
                    "X-CSRF-TOKEN"
                ],
                "supports_credentials": True,
                "expose_headers": ["Content-Type", "X-CSRFToken"],
                "max_age": 3600
            }
        },
        supports_credentials=True
    )

    # Configuración de JWT (autenticación basada en cookies seguras)
    app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
    app.config["JWT_COOKIE_CSRF_PROTECT"] = True
    app.config["JWT_ACCESS_CSRF_HEADER_NAME"] = "X-CSRF-TOKEN"


# Export explícito de extensiones
__all__ = ["db", "migrate", "jwt", "ma", "cors", "mail", "init_app"]
