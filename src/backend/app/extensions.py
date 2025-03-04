from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

# Inicializar las extensiones sin aplicación
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
ma = Marshmallow()
cors = CORS()


def init_app(app):
    """
    Inicializa las extensiones con la aplicación Flask.
    """
    db.init_app(app)
    migrate.init_app(app, db)

    # Configuración adicional de JWT
    jwt.init_app(app)

    # Configuraciones que podrían resolver problemas
    app.config["JWT_TOKEN_LOCATION"] = ["headers"]
    app.config["JWT_HEADER_NAME"] = "Authorization"
    app.config["JWT_HEADER_TYPE"] = "Bearer"

    ma.init_app(app)
    cors.init_app(app)


# Asegurándonos de que init_app está exportado correctamente
__all__ = ["db", "migrate", "jwt", "ma", "cors", "init_app"]
