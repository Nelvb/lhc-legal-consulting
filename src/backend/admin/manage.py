# -*- coding: utf-8 -*-
"""
create_admin.py

Script CLI para crear un usuario administrador en la base de datos si no existe.
Utiliza Flask CLI con contexto de la app principal.
"""

import sys
import os
import click
from flask.cli import FlaskGroup
from werkzeug.security import generate_password_hash

# Añadir la ruta del proyecto para importar correctamente
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app import create_app
from app.extensions import db
from app.models.user import User

# Crear la app con CLI extendida
app = create_app()
cli = FlaskGroup(app)

@cli.command("create_admin")
def create_admin():
    """
    Crea un usuario administrador con valores predefinidos si no existe aún.
    """
    username = "Alberto"
    email = "bapboostaproject@gmail.com"
    password = "Ayb.1981"

    existing = User.query.filter_by(email=email).first()
    if existing:
        click.echo("❌ Ya existe un usuario administrador con este email.")
        return

    admin_user = User(
        username=username,
        email=email,
        password_hash=generate_password_hash(password),
        is_admin=True,
    )

    db.session.add(admin_user)
    db.session.commit()
    click.echo("✅ Usuario administrador creado correctamente.")

if __name__ == "__main__":
    cli()
