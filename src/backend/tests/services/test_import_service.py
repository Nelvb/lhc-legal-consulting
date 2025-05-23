# test_import_service.py
# -----------------------------------------------------------------------------
# Tests del servicio de importación de artículos desde JSON.
# Valida creación y actualización de artículos sin afectar la base real.
# Se usa mocking sobre el modelo Article y la sesión de base de datos.
# -----------------------------------------------------------------------------

import pytest
from unittest.mock import MagicMock, patch
from app.scripts.import_service import importar_articulos_desde_json


@patch("app.scripts.import_service.db.session")
@patch("app.scripts.import_service.Article")
def test_importa_articulos_crea_nuevos(mock_article_class, mock_session):
    """Crea artículos si no existen previamente (no hay duplicados)."""
    mock_article_class.query.filter_by.return_value.first.return_value = None

    datos = [
        {
            "slug": "test-slug",
            "title": "Test",
            "excerpt": "Resumen",
            "image": "img.jpg",
            "image_alt": "alt",
            "content": "Contenido",
            "meta_description": "desc",
            "meta_keywords": "kw",
        }
    ]

    resultado = importar_articulos_desde_json(datos)

    assert "Artículo creado: test-slug" in resultado
    assert mock_session.add.called
    assert mock_session.commit.called


@patch("app.scripts.import_service.db.session")
@patch("app.scripts.import_service.sa.func.now")
@patch("app.scripts.import_service.Article")
def test_importa_articulos_actualiza_existente(mock_article_class, mock_now, mock_session):
    """Actualiza artículos existentes si el slug ya existe."""
    mock_existente = MagicMock()
    mock_article_class.query.filter_by.return_value.first.return_value = mock_existente

    datos = [
        {
            "slug": "existente",
            "title": "Nuevo Título",
            "excerpt": "Nuevo resumen",
            "image": "imagen.jpg",
            "image_alt": "Nuevo alt",
            "content": "Contenido actualizado",
            "meta_description": "Meta desc",
            "meta_keywords": "kw1, kw2"
        }
    ]

    resultado = importar_articulos_desde_json(datos)

    assert "Artículo actualizado: existente" in resultado
    assert mock_existente.title == "Nuevo Título"
    assert mock_existente.content == "Contenido actualizado"
    assert mock_session.commit.called
