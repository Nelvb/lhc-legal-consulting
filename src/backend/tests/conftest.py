import pytest
from sqlalchemy import text
from app import create_app
from app.extensions import db
from app.models.user import User

@pytest.fixture(scope="function")
def app():
    """Crea y configura una instancia de Flask para las pruebas."""
    app = create_app('app.config.TestingConfig')
    
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
    """Crea un usuario de prueba."""
    user = User(
        username="testuser",
        email="test@example.com"
    )
    user.set_password("password123")
    
    with app.app_context():
        db.session.add(user)
        db.session.commit()
        
    yield user
    
    with app.app_context():
        db.session.delete(user)
        db.session.commit()