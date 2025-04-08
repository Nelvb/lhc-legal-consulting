"""
Migración personalizada para agregar `image_alt` y `related` a artículos, 
y también importar artículos estáticos desde JSON si no existen.
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
from app import create_app
from app.models.article import Article
from app.extensions import db
import json
import os

# revision identifiers, used by Alembic
revision = '834f79aef443'  # Identificador único de esta migración
down_revision = '99143f90c755'  # Este es el identificador de la migración anterior
branch_labels = None
depends_on = None

# Ruta al archivo JSON
JSON_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'articles.json')

# Crear la app con contexto Flask
app = create_app()

def import_articles():
    """Importa los artículos desde el JSON si no existen en la base de datos."""
    with app.app_context():
        with open(JSON_PATH, 'r', encoding='utf-8') as f:
            articles_data = json.load(f)

        for item in articles_data:
            # Verificar si el artículo ya existe en la base de datos
            existing = Article.query.filter_by(slug=item['slug']).first()
            if existing:
                print(f"Artículo ya existe: {item['slug']} — ignorado.")
                continue  # Si el artículo ya existe, no lo agregamos

            # Convertir 'related' de lista a texto si existe
            if 'related' in item and isinstance(item['related'], list):
                item['related'] = ','.join(item['related'])

            # Crear el artículo y agregarlo a la sesión
            article = Article(**item)
            db.session.add(article)

        db.session.commit()
        print("Artículos importados correctamente.")

def upgrade():
    """Aplica la migración: modifica la tabla y agrega artículos si es necesario."""
    with op.batch_alter_table('articles', schema=None) as batch_op:
        # Agregar columna 'image_alt'
        batch_op.add_column(sa.Column('image_alt', sa.String(length=255), nullable=True))
        
        # Modificar la columna 'related' para usar JSONEncodedList
        batch_op.alter_column('related',
               existing_type=postgresql.JSON(astext_type=sa.Text()),
               type_=sa.JSON(),  # Se puede cambiar si necesitas un tipo especial
               existing_nullable=True)

    # Ejecutar la importación de artículos
    import_articles()

def downgrade():
    """Revierte los cambios realizados en esta migración."""
    with op.batch_alter_table('articles', schema=None) as batch_op:
        batch_op.alter_column('related',
               existing_type=sa.JSON(),
               type_=postgresql.JSON(astext_type=sa.Text()),
               existing_nullable=True)
        batch_op.drop_column('image_alt')
