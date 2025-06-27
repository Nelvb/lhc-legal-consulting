# -*- coding: utf-8 -*-
"""
manage.py

CLI de administración para LHC Legal & Consulting.
Incluye comando para crear un usuario administrador.
"""

import sys
import os
import click
from flask.cli import FlaskGroup
from werkzeug.security import generate_password_hash
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv()

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
    Crea un usuario administrador con los datos definidos en .env si no existe aún.
    """
    username = os.getenv("ADMIN_USERNAME")
    last_name = os.getenv("ADMIN_LAST_NAME")
    email = os.getenv("ADMIN_EMAIL")
    password = os.getenv("ADMIN_PASSWORD")

    if not all([username, last_name, email, password]):
        click.echo("❌ Faltan variables de entorno: ADMIN_USERNAME, ADMIN_LAST_NAME, ADMIN_EMAIL o ADMIN_PASSWORD.")
        return

    existing = User.query.filter_by(email=email).first()
    if existing:
        click.echo(f"⚠️ Ya existe un usuario con el email {email}")
        return

    admin_user = User(
        username=username,
        last_name=last_name,
        email=email,
        password_hash=generate_password_hash(password),
        is_admin=True,
    )

    db.session.add(admin_user)
    db.session.commit()
    click.echo(f"✅ Usuario administrador '{username}' creado correctamente.")

if __name__ == "__main__":
    cli()
