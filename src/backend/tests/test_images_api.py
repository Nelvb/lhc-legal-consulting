# src/backend/tests/test_images_api.py
#
# Tests para el endpoint POST /api/images/upload que permite la subida de imágenes.
# Este módulo cubre múltiples escenarios del flujo de subida:
# - Sin archivo enviado
# - Archivo sin nombre
# - Archivo con extensión no permitida
# - Subida exitosa (mockeando Cloudinary)
# - Excepción durante el proceso de subida
#
# Se utiliza FlaskClient para simular peticiones HTTP y `patch` para evitar llamadas reales
# a Cloudinary mediante mocks de ImageService.upload_image.

import io
import pytest
from unittest.mock import patch
from app import create_app

@pytest.fixture
def client():
    """Fixture para crear cliente de pruebas con app Flask activa."""
    app = create_app()
    app.testing = True
    ctx = app.app_context()
    ctx.push()
    yield app.test_client()
    ctx.pop()

def test_upload_image_no_file(client):
    """Devuelve 400 si no se envía ningún archivo."""
    response = client.post("/api/images/upload", data={})
    assert response.status_code == 400
    assert response.get_json()["message"] == "No se incluyó ninguna imagen"

def test_upload_image_empty_filename(client):
    """Devuelve 400 si se envía un archivo sin nombre."""
    data = {
        'image': (io.BytesIO(b'testdata'), '')
    }
    response = client.post("/api/images/upload", data=data, content_type='multipart/form-data')
    assert response.status_code == 400
    assert response.get_json()["message"] == "No se seleccionó ningún archivo"

def test_upload_image_invalid_extension(client):
    """Devuelve 400 si el archivo tiene una extensión no permitida."""
    data = {
        'image': (io.BytesIO(b'testdata'), 'file.txt')
    }
    response = client.post("/api/images/upload", data=data, content_type='multipart/form-data')
    assert response.status_code == 400
    assert response.get_json()["message"] == "Tipo de archivo no permitido"

@patch("app.services.image_service.ImageService.upload_image")
def test_upload_image_success(mock_upload, client):
    """Responde con 201 y los datos de imagen si la subida es exitosa."""
    mock_upload.return_value = {
        "url": "http://fakeurl.com/image.jpg",
        "public_id": "abc123",
        "width": 800,
        "height": 600,
        "format": "jpg"
    }
    data = {
        'image': (io.BytesIO(b'testdata'), 'image.jpg')
    }
    response = client.post("/api/images/upload", data=data, content_type='multipart/form-data')
    assert response.status_code == 201
    json_data = response.get_json()
    assert json_data["message"] == "Imagen subida correctamente"
    assert "image" in json_data
    assert json_data["image"]["url"] == "http://fakeurl.com/image.jpg"
    mock_upload.assert_called_once()

@patch("app.services.image_service.ImageService.upload_image")
def test_upload_image_exception(mock_upload, client):
    """Devuelve 500 si ocurre un error inesperado durante la subida."""
    mock_upload.side_effect = Exception("Error en Cloudinary")
    data = {
        'image': (io.BytesIO(b'testdata'), 'image.jpg')
    }
    response = client.post("/api/images/upload", data=data, content_type='multipart/form-data')
    assert response.status_code == 500
    assert "Error al subir la imagen" in response.get_json()["message"]
