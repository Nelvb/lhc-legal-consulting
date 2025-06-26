"""
Esquema de validación para artículos del blog.

Este módulo define la estructura y validación de datos para los artículos.
Incluye validaciones para cada campo y generación automática de slugs
para URLs amigables a partir del título del artículo.
"""

from marshmallow import Schema, fields, validate, post_load
import re
import unicodedata

def create_slug(text):
    """
    Convierte un texto en un slug válido para URL.
    Ejemplo: "Hola Mundo!" -> "hola-mundo"
    """
    # Normalizar: convertir acentos y caracteres especiales
    text = unicodedata.normalize('NFKD', text)
    text = text.encode('ascii', 'ignore').decode('ascii')
    # Convertir a minúsculas
    text = text.lower()
    # Reemplazar espacios con guiones
    text = re.sub(r'[^\w\s-]', '', text).strip()
    text = re.sub(r'[-\s]+', '-', text)
    return text

class ArticleSchema(Schema):
    id = fields.Int(dump_only=True)  # Solo para serializar, no se espera al crear
    title = fields.Str(required=True, validate=validate.Length(min=3, max=255))
    slug = fields.Str(dump_only=True)  # Generado automáticamente
    author = fields.Str(load_default="Boost A Project", validate=validate.Length(max=100))
    date = fields.DateTime(dump_only=True)  # Generado automáticamente
    excerpt = fields.Str(validate=validate.Length(max=500))
    image = fields.Str(required=True, validate=validate.Length(max=255))
    image_alt = fields.Str(validate=validate.Length(max=255))
    content = fields.Str(required=True)
    related = fields.List(fields.Str(), load_default=[], dump_default=[])
    meta_description = fields.Str(validate=validate.Length(max=160))
    meta_keywords = fields.Str(validate=validate.Length(max=255))

    @post_load
    def generate_slug(self, data, **kwargs):
        """Genera automáticamente un slug basado en el título."""
        if 'title' in data:
            data['slug'] = create_slug(data['title'])
        return data

# Instancias del esquema para uso en la API
article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)
