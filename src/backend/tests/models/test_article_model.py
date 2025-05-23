# src/backend/tests/test_article_model.py
#
# Tests unitarios del modelo Article.
# Valida atributos, serialización y tipos personalizados como JSONEncodedList.

import pytest
from app.extensions import db
from app.models.article import Article

def test_article_model_creation(app):
    """Crea un artículo y verifica sus atributos básicos."""
    with app.app_context():
        article = Article(
            title="Título de prueba",
            slug="titulo-prueba",
            excerpt="Extracto breve",
            image="https://example.com/image.jpg",
            image_alt="Texto alternativo",
            content="<p>Contenido del artículo</p>",
            related=["intro", "otros-articulos"],
            meta_description="Meta descripción SEO",
            meta_keywords="SEO, prueba, artículo"
        )
        db.session.add(article)
        db.session.commit()

        saved = Article.query.filter_by(slug="titulo-prueba").first()
        assert saved is not None
        assert saved.title == "Título de prueba"
        assert saved.slug == "titulo-prueba"
        assert isinstance(saved.related, list)
        assert "intro" in saved.related

        db.session.delete(saved)
        db.session.commit()

def test_article_serialization(app):
    """Verifica el método serialize() del modelo."""
    with app.app_context():
        article = Article(
            title="Test Serialize",
            slug="test-serialize",
            image="img.jpg",
            content="Texto",
        )
        db.session.add(article)
        db.session.commit()

        data = article.serialize()
        assert data["title"] == "Test Serialize"
        assert data["slug"] == "test-serialize"
        assert "created_at" in data

        db.session.delete(article)
        db.session.commit()
