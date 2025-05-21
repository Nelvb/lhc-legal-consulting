# src/backend/tests/test_article_model.py

import pytest
from app.models.article import Article

def test_article_creation_and_serialize():
    article = Article(
        title="Test Artículo",
        slug="test-articulo",
        author="Boost A Project",
        excerpt="Resumen de prueba",
        image="imagen.jpg",
        image_alt="Descripción de la imagen",
        content="Contenido del artículo",
        related=["slug1", "slug2"],
        meta_description="Meta descripción",
        meta_keywords="keyword1, keyword2"
    )
    
    assert article.title == "Test Artículo"
    assert article.related == ["slug1", "slug2"] or isinstance(article.related, str)
    
    serialized = article.serialize()
    assert serialized["title"] == "Test Artículo"
    assert serialized["image_alt"] == "Descripción de la imagen"
    assert "created_at" in serialized
    assert "updated_at" in serialized
