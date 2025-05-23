# src/backend/tests/test_article_schema.py

import pytest
from marshmallow import ValidationError
from app.schemas.article_schema import article_schema

def test_article_schema_load_and_slug_generation():
    data = {
        "title": "Hola Mundo!",
        "image": "imagen.jpg",
        "content": "Contenido de prueba",
        "related": ["slug1", "slug2"],
        "meta_description": "Descripción meta",
        "meta_keywords": "test, ejemplo"
    }
    result = article_schema.load(data)
    assert result["slug"] == "hola-mundo"
    assert result["title"] == "Hola Mundo!"

def test_article_schema_validation_errors():
    data_invalid = {
        "title": "",  # título vacío
        "image": "",
        "content": ""
    }
    with pytest.raises(ValidationError):
        article_schema.load(data_invalid)
