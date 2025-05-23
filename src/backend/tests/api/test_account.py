# tests/test_account.py
# ------------------------------------------------------------------------------
# Tests funcionales de gestión de cuenta: recuperación de contraseña y cambio de email
# Verifica flujos de:
# - Solicitud de recuperación de contraseña (con mocking del envío de email)
# - Restablecimiento real de contraseña con token válido
# - Error si el token es inválido o expirado
# - Solicitud de cambio de email autenticado con cookie + CSRF (mocked)
# - Confirmación de email por token
# Incluye casos de borde y fallos esperados
# ------------------------------------------------------------------------------

import pytest
from unittest.mock import patch
from app.extensions import db
from app.models.user import User
from itsdangerous import URLSafeTimedSerializer


@patch("app.api.account.send_email_with_limit", return_value={"success": True, "message": "Correo enviado correctamente."})
def test_request_password_reset(mock_send, client, app):
    """Solicita enlace de recuperación si el email existe (respuesta siempre 200)."""
    with app.app_context():
        user = User(username="resetuser", email="reset@example.com")
        user.set_password("resetpass")
        db.session.add(user)
        db.session.commit()

    response = client.post(
        "/api/account/request-password-reset",
        json={"email": "reset@example.com"},
    )
    assert response.status_code == 200
    assert "enlace de recuperación" in response.json["msg"].lower()
    assert mock_send.called


def test_reset_password_with_valid_token(client, app):
    """Restablece la contraseña usando un token válido."""
    with app.app_context():
        email = "validtoken@example.com"
        user = User(username="validtoken", email=email)
        user.set_password("oldpassword")
        db.session.add(user)
        db.session.commit()

        serializer = URLSafeTimedSerializer(app.config["SECRET_KEY"])
        token = serializer.dumps(email, salt="password-reset")

    response = client.post(
        "/api/account/reset-password",
        json={"token": token, "new_password": "newsecurepassword"},
    )

    assert response.status_code == 200
    assert "contraseña actualizada" in response.json["msg"].lower()

    with app.app_context():
        updated_user = User.query.filter_by(email=email).first()
        assert updated_user.check_password("newsecurepassword") is True


def test_reset_password_invalid_or_expired_token(client, app):
    """Muestra error si el token es inválido o expirado."""
    # Token inválido
    response = client.post(
        "/api/account/reset-password",
        json={"token": "invalidtoken", "new_password": "irrelevant"},
    )
    assert response.status_code == 400
    assert "token" in response.json["msg"].lower()


@patch("app.api.account.send_email_with_limit", return_value={"success": True, "message": "Correo enviado correctamente."})
def test_request_email_change_and_confirm(mock_send, client, app):
    """Prueba completa de solicitud y confirmación de cambio de email."""
    with app.app_context():
        user = User(username="change_email", email="old@example.com")
        user.set_password("changepass")
        db.session.add(user)
        db.session.commit()
        user_id = user.id

    login = client.post(
        "/api/auth/login",
        json={"email": "old@example.com", "password": "changepass"},
    )
    assert login.status_code == 200
    csrf_token = login.json["csrf_token"]

    response = client.post(
        "/api/account/request-email-change",
        json={"new_email": "new@example.com"},
        headers={"X-CSRF-TOKEN": csrf_token},
    )
    assert response.status_code == 200
    assert "confirmación" in response.json["msg"].lower()
    assert mock_send.called

    with app.app_context():
        serializer = URLSafeTimedSerializer(app.config["SECRET_KEY"])
        token = serializer.dumps(
            {"user_id": user_id, "new_email": "new@example.com"},
            salt="email-change"
        )

    confirm = client.get(f"/api/account/confirm-email?token={token}")
    assert confirm.status_code == 200
    assert "actualizado" in confirm.json["msg"].lower()

    with app.app_context():
        updated_user = db.session.get(User, user_id)
        assert updated_user.email == "new@example.com"

@patch("app.api.account.send_email_with_limit", return_value={"success": True})
def test_update_profile_success(mock_send, client, app):
    with app.app_context():
        user = User(username="update_me", email="me@example.com")
        user.set_password("mypassword")
        db.session.add(user)
        db.session.commit()
        user_id = user.id

    login = client.post("/api/auth/login", json={"email": "me@example.com", "password": "mypassword"})
    csrf_token = login.json["csrf_token"]

    res = client.put("/api/account/update-profile", json={
        "name": "NuevoNombre",
        "email": "me@example.com",
        "current_password": "mypassword"
    }, headers={"X-CSRF-TOKEN": csrf_token})
    assert res.status_code == 200
    assert "actualizado" in res.json["msg"].lower()

def test_update_profile_options(client):
    res = client.options("/api/account/update-profile")
    assert res.status_code == 200

@patch("app.api.account.send_email_with_limit", return_value={"success": True})
def test_contact_publico_sin_login(mock_send, client):
    """Permite enviar un mensaje de contacto sin estar autenticado."""
    data = {
        "name": "Cliente Público",
        "email": "cliente@publico.com",
        "subject": "Información general",
        "message": "Hola, me interesa saber más sobre los proyectos activos."
    }

    response = client.post("/api/account/contact", json=data)
    assert response.status_code == 200
    assert response.json["msg"] == "Mensaje enviado correctamente"
    assert mock_send.called


@patch("app.api.account.send_email_with_limit", return_value={"success": True})
def test_contact_usuario_autenticado(mock_send, client, test_user):
    """Permite enviar un mensaje de contacto como usuario logueado usando token por cookies."""
    # Extrae el email y username antes de que se "desvincule"
    email = test_user["email"]
    username = test_user["username"]


    login = client.post("/api/auth/login", json={
        "email": email,
        "password": "password123"
    })
    csrf_token = login.json["csrf_token"]

    data = {
        "name": username,
        "email": email,
        "subject": "Consulta personal",
        "message": "Me gustaría hablar de inversión personalizada."
    }

    response = client.post("/api/account/contact", json=data, headers={"X-CSRF-TOKEN": csrf_token})
    assert response.status_code == 200
    assert response.json["msg"] == "Mensaje enviado correctamente"
    assert mock_send.called
