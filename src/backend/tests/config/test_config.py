# src/backend/tests/config/test_config.py
#
# Tests unitarios para la configuración de entornos (config.py).
# Valida que cada clase de configuración cargue correctamente las variables clave
# como JWT, base de datos y entorno de ejecución.
# Asegura la compatibilidad con .env y valores por defecto seguros.

from app.config import DevelopmentConfig, TestingConfig, ProductionConfig
from importlib import reload
import app.config as config_module

def test_testing_config():
    """Verifica que TestingConfig carga correctamente los valores esperados para test."""
    config = TestingConfig()
    assert config.TESTING is True
    assert config.SQLALCHEMY_DATABASE_URI == "sqlite:///:memory:"
    assert config.JWT_SECRET_KEY == "test-jwt-secret"

def test_development_config_has_required_fields():
    """Verifica que DevelopmentConfig tenga los campos clave requeridos."""
    config = DevelopmentConfig()
    assert hasattr(config, "SQLALCHEMY_DATABASE_URI")
    assert config.JWT_COOKIE_SECURE is False
    assert isinstance(config.JWT_ACCESS_TOKEN_EXPIRES, int)

def test_production_config_fallback_url(monkeypatch):
    monkeypatch.setenv("DB_USER", "postgres")
    monkeypatch.setenv("DB_PASSWORD", "mypassword")
    monkeypatch.setenv("DB_HOST", "localhost")
    monkeypatch.setenv("DB_NAME", "mydb")

    reload(config_module)  # Forzar recarga del módulo con nuevas variables
    from app.config import ProductionConfig
    config = ProductionConfig()

    assert config.SQLALCHEMY_DATABASE_URI == "postgresql://postgres:mypassword@localhost/mydb"
