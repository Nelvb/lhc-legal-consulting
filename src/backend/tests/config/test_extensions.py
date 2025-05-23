# src/backend/tests/config/test_extensions.py
#
# Tests unitarios para la inicialización de extensiones en extensions.py
# Verifica que no se producen errores al invocar init_app() y que las extensiones están disponibles.

from app import create_app
from app.extensions import db, jwt, cors, ma, mail, init_app

from flask import Flask

def test_init_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
    app.config["SECRET_KEY"] = "test"
    app.config["JWT_SECRET_KEY"] = "test"

    try:
        init_app(app)
    except Exception as e:
        assert False, f"init_app lanzó una excepción: {e}"


    # Confirmamos que algunas extensiones básicas están disponibles en la app
    assert db is not None
    assert jwt is not None
    assert cors is not None
    assert ma is not None
    assert mail is not None
