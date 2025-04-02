import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))


from flask.cli import FlaskGroup
from werkzeug.security import generate_password_hash

from app import create_app
from app.extensions import db
from app.models.user import User

# Crear la app con contexto Flask CLI
app = create_app()
cli = FlaskGroup(app)

@cli.command("create_admin")
def create_admin():
    """Crea un usuario administrador si no existe ya."""
    username = "Alberto"
    email = "bapboostaproject@gmail.com"
    password = "Ayb.1981"

    # Verificar si ya existe un usuario con ese email
    if User.query.filter_by(email=email).first():
        print("❌ El usuario administrador ya existe.")
        return

    # Crear el admin con contraseña encriptada
    admin_user = User(
        username=username,
        email=email,
        password_hash=generate_password_hash(password),
        is_admin=True
    )

    db.session.add(admin_user)
    db.session.commit()
    print("✅ Usuario administrador creado con éxito.")

if __name__ == "__main__":
    cli()
