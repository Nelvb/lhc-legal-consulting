"""
Modelo de datos para artículos del blog.

Define la estructura de la tabla de artículos en la base de datos y 
proporciona métodos para interactuar con los registros.
"""

from app.extensions import db
from sqlalchemy.sql import func
from sqlalchemy.types import TypeDecorator, Text
import json

# Tipo personalizado para almacenar listas como JSON en un campo de texto
class JSONEncodedList(TypeDecorator):
    impl = Text

    def process_bind_param(self, value, dialect):
        if value is None:
            return "[]"
        return json.dumps(value)

    def process_result_value(self, value, dialect):
        if value is None:
            return []
        return json.loads(value)

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
