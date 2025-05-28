# Configuración de fixtures para tests de la aplicación
# Define recursos compartidos como instancia de app, cliente HTTP, usuario de prueba y BD
# Gestiona ciclos de vida de los recursos con setup y teardown automáticos
# Actualizado para coincidir con UserSchema profesional (nombres reales, contraseñas seguras)

import pytest
from app import create_app
from app.extensions import db
from app.models.user import User
from sqlalchemy import text
from app.config import TestingConfig


@pytest.fixture(scope="function")
def app():
    """Crea y configura una instancia de Flask para las pruebas."""
    app = create_app(TestingConfig)

    # Establecer el contexto de la aplicación
    with app.app_context():
        # Crear todas las tablas
        db.create_all()
        yield app
        # Limpiar después de la prueba
        db.session.remove()
        db.drop_all()


@pytest.fixture
def client(app):
    """Crea un cliente de prueba."""
    return app.test_client()


@pytest.fixture
def runner(app):
    """Crea un corredor de comandos de CLI para probar comandos de Flask."""
    return app.test_cli_runner()


@pytest.fixture
def _db(app):
    """Proporciona la extensión db."""
    return db


@pytest.fixture
def test_user(app):
    """Crea un usuario de prueba y devuelve sus datos planos para evitar errores de sesión.
    Actualizado para cumplir con UserSchema profesional: nombre real sin números,
    contraseña segura con complejidad requerida."""
    with app.app_context():
        user = User(username="TestUser", last_name="Test García", email="test@example.com")
        user.set_password("SecurePass123!")
        db.session.add(user)
        db.session.commit()
        return {
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "last_name": user.last_name
        }