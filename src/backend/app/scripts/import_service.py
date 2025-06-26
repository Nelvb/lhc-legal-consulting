# import_service.py
# -----------------------------------------------------------------------------
# Servicio para importar artículos desde un archivo JSON a la base de datos.
# Esta función puede usarse tanto desde CLI como en tests con mocking.
# Maneja creación o actualización según si el slug ya existe.
# -----------------------------------------------------------------------------

import sqlalchemy as sa
from app.extensions import db
from app.models.article import Article


def importar_articulos_desde_json(articles_data):
    """
    Importa artículos desde una lista de diccionarios (parsed JSON).
    - Actualiza los artículos existentes por slug.
    - Crea nuevos si no existen.
    Devuelve una lista con mensajes por cada acción.
    """
    resultados = []

    for item in articles_data:
        existing = Article.query.filter_by(slug=item['slug']).first()

        if existing:
            existing.title = item['title']
            existing.excerpt = item['excerpt']
            existing.image = item['image']
            existing.image_alt = item.get('image_alt', existing.image_alt)
            existing.content = item['content']
            existing.meta_description = item['meta_description']
            existing.meta_keywords = item['meta_keywords']
            existing.related = item.get('related', [])  # ✅ se añade related
            existing.updated_at = sa.func.now()

            db.session.commit()
            resultados.append(f"Artículo actualizado: {item['slug']}")
        else:
            item.pop("id", None)  # Si el JSON trae ID, ignorarlo
            nuevo = Article(**item)
            db.session.add(nuevo)
            db.session.commit()
            resultados.append(f"Artículo creado: {item['slug']}")

    return resultados
