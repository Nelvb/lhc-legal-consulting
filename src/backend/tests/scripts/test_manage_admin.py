"""
Test para el comando create_admin del script manage.py
Verifica que se crea correctamente un usuario administrador.
"""

from app.models.user import User


def test_create_admin_command_crea_usuario_admin(runner, app):
    """Ejecuta el comando create_admin desde Flask CLI y verifica el resultado."""

    with app.app_context():
        from admin.manage import create_admin
        app.cli.add_command(create_admin)

        existing = User.query.filter_by(email="bapboostaproject@gmail.com").first()
        if existing:
            from app.extensions import db
            db.session.delete(existing)
            db.session.commit()

    result = runner.invoke(args=["create_admin"])
    assert "Usuario administrador creado correctamente." in result.output


    # Verificar en base de datos
    with app.app_context():
        user = User.query.filter_by(email="bapboostaproject@gmail.com").first()
        assert user is not None
        assert user.username == "Alberto"
        assert user.last_name == "Modroño Martin"
        assert user.is_admin is True
        assert user.check_password("Ayb.1981")
