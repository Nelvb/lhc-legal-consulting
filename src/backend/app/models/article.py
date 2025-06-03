# app/models/article.py

"""
Modelo de datos para artículos del blog.

Define la estructura de la tabla de artículos en la base de datos y 
proporciona métodos para interactuar con los registros.

Convierte el valor almacenado a lista Python al recuperarlo de la base de datos.
Soporta casos donde el valor ya viene como lista (por ejemplo, artículos creados desde frontend o SQLite).
Incluye protección contra valores corruptos o cadenas vacías para evitar errores de decodificación JSON.
"""

from app.extensions import db
from sqlalchemy.sql import func
from sqlalchemy.types import TypeDecorator, Text
import json
import logging

logger = logging.getLogger(__name__)

# Tipo personalizado para almacenar listas como JSON en un campo de texto
class JSONEncodedList(TypeDecorator):
    """
    Almacena listas como JSON en un campo de texto (VARCHAR).
    Convierte string a list al leer desde la base de datos.
    """

    impl = Text
    cache_ok = True  # Mejora el rendimiento con SQLAlchemy 1.4+

    def process_bind_param(self, value, dialect):
        if value is None:
            return "[]"
        if isinstance(value, list):
            return json.dumps(value)
        raise ValueError(f"El valor para JSONEncodedList debe ser una lista. Se recibió: {type(value)}")

    def process_result_value(self, value, dialect):
        # Si el valor es None, cadena vacía o ya es lista, devolvemos directamente
        if value is None or value == "":
            return []
        if isinstance(value, list):
            return value
        try:
            result = json.loads(value)
            if isinstance(result, list):
                return result
            logger.warning(f"El valor decodificado no es una lista: {result}")
            return []
        except (json.JSONDecodeError, TypeError) as e:
            logger.error(f"Error al decodificar JSON desde base de datos: {e} - Valor original: {value}")
            return []

class Article(db.Model):
    __tablename__ = "articles"  # Nombre explícito de la tabla
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    slug = db.Column(db.String(255), unique=True, nullable=False)
    author = db.Column(db.String(100), nullable=False, default="Boost A Project")
    date = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=False)
    excerpt = db.Column(db.String(500), nullable=True)
    image = db.Column(db.String(255), nullable=False)
    image_alt = db.Column(db.String(255), nullable=True)  # NUEVO CAMPO: descripción alt de la imagen
    content = db.Column(db.Text, nullable=False)
    related = db.Column(JSONEncodedList, nullable=True)

    # Campos para SEO
    meta_description = db.Column(db.String(160), nullable=True)
    meta_keywords = db.Column(db.String(255), nullable=True)
    
    # Campos para auditoría
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<Article {self.title}>"
    
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "slug": self.slug,
            "author": self.author,
            "date": self.date,
            "excerpt": self.excerpt,
            "image": self.image,
            "image_alt": self.image_alt,
            "content": self.content,
            "related": self.related,
            "meta_description": self.meta_description,
            "meta_keywords": self.meta_keywords,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
