"""
Test para el comando create_admin del script manage.py
Verifica que se crea correctamente un usuario administrador con datos desde .env.
"""

import os
from app.models.user import User
from app.extensions import db
from dotenv import load_dotenv

load_dotenv()

def test_create_admin_command_crea_usuario_admin(runner, app):
    """Ejecuta el comando create_admin desde Flask CLI y verifica el resultado."""



    # Leer los datos esperados del entorno (como hace manage.py)
    username = os.getenv("ADMIN_USERNAME")
    last_name = os.getenv("ADMIN_LAST_NAME")
    email = os.getenv("ADMIN_EMAIL")
    password = os.getenv("ADMIN_PASSWORD")

    assert all([username, last_name, email, password]), "Faltan variables de entorno ADMIN_*"

    # Eliminar si ya existe antes de probar
    with app.app_context():
        from admin.manage import create_admin
        app.cli.add_command(create_admin)

        existing = User.query.filter_by(email=email).first()
        if existing:
            db.session.delete(existing)
            db.session.commit()

    # Ejecutar el comando
    result = runner.invoke(args=["create_admin"])

    assert f"Usuario administrador '{username}' creado correctamente." in result.output

    # Verificar en base de datos
    with app.app_context():
        user = User.query.filter_by(email=email).first()
        assert user is not None
        assert user.username == username
        assert user.last_name == last_name
        assert user.is_admin is True
        assert user.check_password(password)
