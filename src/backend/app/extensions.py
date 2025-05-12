# Inicialización centralizada de extensiones Flask para la aplicación
# Configura componentes como ORM, migraciones, JWT, serialización, CORS y sistema de email
# Implementa patrón de inicialización tardía para flexibilidad en tests y configuración

from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail

# Inicializar las extensiones sin aplicación
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
ma = Marshmallow()
cors = CORS()
mail = Mail()


def init_app(app):
    """
    Inicializa las extensiones con la aplicación Flask.
    """
    db.init_app(app)
    migrate.init_app(app, db)

    jwt.init_app(app)
    ma.init_app(app)
    cors.init_app(app)
    mail.init_app(app)

    # Configuración adicional de JWT
    app.config["JWT_TOKEN_LOCATION"] = ["headers"]
    app.config["JWT_HEADER_NAME"] = "Authorization"
    app.config["JWT_HEADER_TYPE"] = "Bearer"


# Asegurándonos de que init_app está exportado correctamente
__all__ = ["db", "migrate", "jwt", "ma", "cors", "mail", "init_app"]
