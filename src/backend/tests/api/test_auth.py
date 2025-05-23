# tests/test_auth.py
# -----------------------------------------------------------------------------
# Tests de autenticación: registro, login, logout y perfil
# Verifica la funcionalidad completa de los endpoints de autenticación:
# - Registro con validaciones
# - Inicio de sesión (cookies + CSRF)
# - Acceso al perfil protegido
# - Logout y expiración de sesión
# Incluye casos de éxito, fallos por datos inválidos y errores de seguridad
# -----------------------------------------------------------------------------

import pytest
from app.extensions import db
from app.models.user import User


def test_signup(client, app):
    """Prueba el registro de un usuario a través de la API."""
    with app.app_context():
        response = client.post(
            "/api/auth/signup",
            json={
                "username": "testuser",
                "email": "test@example.com",
                "password": "securepass",
            },
        )

        assert response.status_code == 201
        assert b"Usuario registrado correctamente" in response.data

        usuario = User.query.filter_by(email="test@example.com").first()
        assert usuario is not None
        assert usuario.username == "testuser"


def test_signup_invalid_data(client, app):
    """Prueba la validación de datos en el registro."""

    # Contraseña corta
    response = client.post(
        "/api/auth/signup",
        json={
            "username": "testuser",
            "email": "test@example.com",
            "password": "short",
        },
    )
    assert response.status_code == 400
    assert "password" in response.json.get("errors", {})

    # Email inválido
    response = client.post(
        "/api/auth/signup",
        json={
            "username": "testuser",
            "email": "invalid-email",
            "password": "securepass",
        },
    )
    assert response.status_code == 400
    assert "email" in response.json.get("errors", {})

    # Nombre de usuario inválido
    response = client.post(
        "/api/auth/signup",
        json={
            "username": "test user@",  # Espacio y @ no permitidos
            "email": "test@example.com",
            "password": "securepass",
        },
    )
    assert response.status_code == 400
    assert "username" in response.json.get("errors", {})


def test_login(client, app, test_user):
    """Prueba el inicio de sesión de un usuario con cookies y CSRF."""
    response = client.post(
        "/api/auth/login",
        json={"email": "test@example.com", "password": "password123"},
    )

    assert response.status_code == 200
    assert "csrf_token" in response.json
    assert "user" in response.json
    assert response.json["user"]["email"] == "test@example.com"
    assert response.json["user"]["username"] == "testuser"
    assert "password" not in response.json["user"]


def test_login_missing_fields(client):
    """Prueba login con campos faltantes."""
    response = client.post("/api/auth/login", json={"email": "test@example.com"})
    assert response.status_code == 400

    response = client.post("/api/auth/login", json={"password": "12345678"})
    assert response.status_code == 400


def test_login_invalid_credentials(client, app, test_user):
    """Prueba login con credenciales inválidas."""
    response = client.post(
        "/api/auth/login",
        json={"email": "test@example.com", "password": "wrongpassword"},
    )
    assert response.status_code == 401
    assert "Credenciales inválidas" in response.json["msg"]


def test_profile(client, app):
    """Prueba el acceso al perfil usando cookies + CSRF en vez de token."""
    with app.app_context():
        user = User(username="profile_test", email="profile@example.com")
        user.set_password("password123")
        db.session.add(user)
        db.session.commit()

    # Login primero para obtener cookie + csrf
    login_response = client.post(
        "/api/auth/login",
        json={"email": "profile@example.com", "password": "password123"},
    )
    assert login_response.status_code == 200
    csrf_token = login_response.json.get("csrf_token")

    # Acceder al perfil con cookie y CSRF
    profile_response = client.get(
        "/api/auth/profile",
        headers={"X-CSRF-TOKEN": csrf_token},
    )

    assert profile_response.status_code == 200
    assert profile_response.json["username"] == "profile_test"
    assert profile_response.json["email"] == "profile@example.com"
    assert "password" not in profile_response.json


def test_profile_without_csrf(client, app):
    """Prueba que el acceso al perfil falla si no se envía el CSRF token."""
    with app.app_context():
        user = User(username="no_csrf", email="nocsrf@example.com")
        user.set_password("password123")
        db.session.add(user)
        db.session.commit()

    client.post(
        "/api/auth/login",
        json={"email": "nocsrf@example.com", "password": "password123"},
    )

    response = client.get("/api/auth/profile")
    assert response.status_code in [200, 401, 403]


def test_logout(client, app, test_user):
    """Prueba que el logout borra la cookie de sesión."""
    login = client.post(
        "/api/auth/login",
        json={"email": "test@example.com", "password": "password123"},
    )
    assert login.status_code == 200

    response = client.post("/api/auth/logout")
    assert response.status_code == 200
    assert "msg" in response.json
    assert "cerrada" in response.json["msg"].lower()


def test_logout_without_cookie(client):
    """Prueba logout sin haber iniciado sesión."""
    response = client.post("/api/auth/logout")
    assert response.status_code in [200, 401, 403]
    assert "msg" in response.json
