# src/backend/tests/api/test_routes_api.py
#
# Tests funcionales para rutas generales del sistema:
# - Verificación de salud (/api/health)
# - Información de la API (/api/info)

import pytest
from app import create_app

@pytest.fixture
def client():
    """Crea cliente de prueba para testing de rutas generales."""
    app = create_app()
    app.testing = True
    ctx = app.app_context()
    ctx.push()
    yield app.test_client()
    ctx.pop()

def test_health_check(client):
    """Verifica que /api/health responde correctamente."""
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.get_json()
    assert data["status"] == "ok"
    assert "message" in data

def test_api_info(client):
    """Verifica que /api/info devuelve metadatos correctos de la API."""
    response = client.get("/api/info")
    assert response.status_code == 200
    data = response.get_json()
    assert "name" in data
    assert "version" in data
    assert "endpoints" in data
    assert "auth" in data["endpoints"]
