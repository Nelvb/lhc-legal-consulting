# src/backend/tests/test_article_service.py

import pytest
from unittest.mock import MagicMock, patch
from app.services.article_service import ArticleService
from app import create_app

# Fixture para crear la app y activar contexto Flask
@pytest.fixture(scope="module")
def app():
    app = create_app()
    ctx = app.app_context()
    ctx.push()
    yield app
    ctx.pop()

# Fixture para cliente HTTP si lo necesitas
@pytest.fixture(scope="module")
def client(app):
    return app.test_client()

# Fixture para mockear Article.query con contexto activo
@pytest.fixture
def mock_article_query(monkeypatch, app):
    class QueryMock:
        def order_by(self, *args, **kwargs): return self
        def offset(self, n): return self
        def limit(self, n): return self
        def all(self): return ["article1", "article2"]
        def count(self): return 20
        def get_or_404(self, id): return MagicMock(id=id)
        def filter_by(self, **kwargs): return self
        def first_or_404(self): return MagicMock()
    monkeypatch.setattr("app.services.article_service.Article.query", QueryMock())

@pytest.mark.usefixtures("mock_article_query")
def test_get_all_articles_pagination():
    result = ArticleService.get_all_articles(page=2, limit=10)
    assert result["articles"] == ["article1", "article2"]
    assert result["total"] == 20
    assert result["current_page"] == 2
    assert result["total_pages"] == 2

def test_get_article_by_id():
    with patch("app.services.article_service.Article.query") as mock_query:
        mock_article = MagicMock()
        mock_query.get_or_404.return_value = mock_article
        article = ArticleService.get_article_by_id(1)
        assert article == mock_article

@patch("app.services.article_service.db.session")
@patch("app.services.article_service.Article")
def test_create_article(mock_article_class, mock_db_session):
    mock_article_instance = MagicMock()
    mock_article_class.return_value = mock_article_instance
    data = {
        "content": "<p>Contenido</p>",
        "related": ["slug1", "slug2"]
    }
    article = ArticleService.create_article(data)
    assert article == mock_article_instance
    mock_db_session.add.assert_called_once_with(mock_article_instance)
    mock_db_session.commit.assert_called_once()
