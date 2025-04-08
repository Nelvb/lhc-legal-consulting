"""
Script para importar artículos desde un archivo JSON a la base de datos.

Este script se ejecuta una sola vez para insertar los artículos definidos como contenido
inicial (por ejemplo, artículos estáticos preexistentes en production). Se asegura que
no se dupliquen en caso de múltiples ejecuciones.

Uso:
  python import_static_articles.py
"""

import os
import json
from app import create_app
from app.extensions import db
from app.models.article import Article
import sqlalchemy as sa  # Añadir esta importación

# Ruta absoluta al archivo JSON de artículos
JSON_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'articles.json')

# Crear la app con el contexto de Flask
app = create_app()

with app.app_context():
    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        articles_data = json.load(f)

    for item in articles_data:
        # Verificar si el slug ya existe en la base de datos
        existing = Article.query.filter_by(slug=item['slug']).first()
        
        if existing:
            # Si el artículo existe, actualizamos los campos
            existing.title = item['title']
            existing.excerpt = item['excerpt']
            existing.image = item['image']
            existing.image_alt = item.get('image_alt', existing.image_alt)
            existing.content = item['content']
            existing.meta_description = item['meta_description']
            existing.meta_keywords = item['meta_keywords']
            existing.updated_at = sa.func.now()  # Actualizamos la fecha de modificación

            db.session.commit()
            print(f"Artículo actualizado: {item['slug']}")
        else:
            # Si el artículo no existe, lo creamos
            item.pop("id", None)  # Evitamos incluir el ID en el nuevo artículo
            article = Article(**item)
            db.session.add(article)
            db.session.commit()
            print(f"Artículo creado: {item['slug']}")

    print("Proceso de importación completado.")

