import pytest
from app.extensions import db
from app.models.user import User


def test_crear_usuario(app):
    """Prueba la creación de un usuario en la base de datos."""
    with app.app_context():
        # Insertar un usuario nuevo
        nuevo_usuario = User(username="nelson", email="nelson@example.com")
        nuevo_usuario.set_password("1234")
        db.session.add(nuevo_usuario)
        db.session.commit()

        # Verificar que se guardó bien
        usuario = User.query.filter_by(email="nelson@example.com").first()
        assert usuario is not None
        assert usuario.username == "nelson"
        assert usuario.check_password("1234") is True
