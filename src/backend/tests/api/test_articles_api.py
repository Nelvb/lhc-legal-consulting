# src/backend/tests/test_articles_api.py
#
# Tests funcionales para la API REST de artículos (/api/articles).
# Valida el comportamiento de los endpoints HTTP:
# - Listar artículos con paginación
# - Obtener por ID y por slug
# - Crear, actualizar y eliminar artículos
# Usa mocking de ArticleService para evitar lógica de negocio real.

import pytest
from unittest.mock import patch, MagicMock
from app import create_app

@pytest.fixture(scope="module")
def app():
    app = create_app()
    app.testing = True
    ctx = app.app_context()
    ctx.push()
    yield app
    ctx.pop()

@pytest.fixture
def client(app):
    return app.test_client()

@patch("app.api.articles.ArticleService.get_all_articles")
def test_get_articles(mock_get_all, client):
    mock_get_all.return_value = {"articles": [], "total": 0, "current_page": 1, "total_pages": 1}
    res = client.get("/api/articles/")
    assert res.status_code == 200
    assert isinstance(res.get_json(), dict)

@patch("app.api.articles.ArticleService.get_article_by_id")
def test_get_article_by_id(mock_get, client):
    mock_get.return_value = {"id": 1, "title": "Test"}
    res = client.get("/api/articles/1")
    assert res.status_code == 200

@patch("app.api.articles.ArticleService.get_article_by_slug")
def test_get_article_by_slug(mock_get, client):
    mock_get.return_value = {"slug": "test-slug", "title": "Test"}
    res = client.get("/api/articles/slug/test-slug")
    assert res.status_code == 200

@patch("app.api.articles.ArticleService.create_article")
def test_create_article(mock_create, client):
    mock_create.return_value = {"id": 1, "title": "Nuevo"}
    res = client.post("/api/articles/", json={"title": "Nuevo", "content": "Contenido", "image": "url.jpg"})
    assert res.status_code == 201
    assert "id" in res.get_json()

@patch("app.api.articles.ArticleService.update_article")
def test_update_article(mock_update, client):
    mock_update.return_value = {"id": 1, "title": "Actualizado"}
    res = client.put("/api/articles/1", json={"title": "Actualizado"})
    assert res.status_code == 200

@patch("app.api.articles.ArticleService.update_article_by_slug")
def test_update_article_by_slug(mock_update, client):
    mock_update.return_value = {"id": 1, "title": "Editado"}
    res = client.put("/api/articles/slug/test-slug", json={"title": "Editado"})
    assert res.status_code == 200

@patch("app.api.articles.ArticleService.delete_article")
def test_delete_article(mock_delete, client):
    mock_delete.return_value = True
    res = client.delete("/api/articles/1")
    assert res.status_code == 200

@patch("app.api.articles.ArticleService.delete_article_by_slug")
def test_delete_article_by_slug(mock_delete, client):
    mock_delete.return_value = True
    res = client.delete("/api/articles/slug/test-slug")
    assert res.status_code == 200
