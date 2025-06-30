"""crear tabla contact_messages

Revision ID: 6a5d6d68c26e
Revises: 02644fa8bb55
Create Date: 2025-06-27 15:53:56.680513
"""

# Este archivo define una migración Alembic para crear la tabla `contact_messages`
# y ajustar el tipo del campo `related` en `articles` utilizando JSONEncodedList.

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
from app.models.article import JSONEncodedList  # Import necesario para el tipo personalizado

# Identificadores de revisión de Alembic
revision = '6a5d6d68c26e'
down_revision = '02644fa8bb55'
branch_labels = None
depends_on = None


def upgrade():
    # Crear la tabla `contact_messages` para almacenar formularios de contacto y consentimiento
    op.create_table(
        'contact_messages',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('full_name', sa.String(length=120), nullable=False),
        sa.Column('email', sa.String(length=120), nullable=False),
        sa.Column('phone', sa.String(length=30), nullable=True),
        sa.Column('subject', sa.String(length=200), nullable=True),
        sa.Column('message', sa.Text(), nullable=False),
        sa.Column('privacy_accepted', sa.Boolean(), nullable=False),
        sa.Column('revoked', sa.Boolean(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('revoked_at', sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )

    # Actualizar el tipo del campo `related` en la tabla `articles`
    with op.batch_alter_table('articles', schema=None) as batch_op:
        batch_op.alter_column(
            'related',
            existing_type=postgresql.JSON(astext_type=sa.Text()),
            type_=JSONEncodedList(),
            existing_nullable=True
        )


def downgrade():
    # Revertir el cambio del tipo del campo `related` en `articles`
    with op.batch_alter_table('articles', schema=None) as batch_op:
        batch_op.alter_column(
            'related',
            existing_type=JSONEncodedList(),  # Corregido para evitar error de importación
            type_=postgresql.JSON(astext_type=sa.Text()),
            existing_nullable=True
        )

    # Eliminar la tabla `contact_messages`
    op.drop_table('contact_messages')
