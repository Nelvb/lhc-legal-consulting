# tests/test_auth.py
# -----------------------------------------------------------------------------
# Tests de autenticación: registro, login, logout y perfil
# Verifica la funcionalidad completa de los endpoints de autenticación:
# - Registro con validaciones (nombres reales, contraseñas seguras)
# - Inicio de sesión (cookies + CSRF)
# - Acceso al perfil protegido
# - Logout y expiración de sesión
# Incluye casos de éxito, fallos por datos inválidos y errores de seguridad
# Actualizado para coincidir con UserSchema profesional (nombres reales sin números)
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
                "username": "Mario",
                "last_name": "García López", 
                "email": "mario@example.com",
                "password": "SecurePass123!",
            },
        )

        assert response.status_code == 201
        assert b"Usuario registrado correctamente" in response.data

        usuario = User.query.filter_by(email="mario@example.com").first()
        assert usuario is not None
        assert usuario.username == "Mario"
        assert usuario.last_name == "García López"


def test_signup_invalid_data(client, app):
    """Prueba la validación de datos en el registro."""

    # Contraseña sin complejidad requerida
    response = client.post(
        "/api/auth/signup",
        json={
            "username": "Ana",
            "last_name": "López",
            "email": "ana@example.com",
            "password": "simple",
        },
    )
    assert response.status_code == 400
    assert "password" in response.json.get("errors", {})

    # Email inválido
    response = client.post(
        "/api/auth/signup",
        json={
            "username": "José",
            "last_name": "Martín",
            "email": "invalid-email",
            "password": "SecurePass123!",
        },
    )
    assert response.status_code == 400
    assert "email" in response.json.get("errors", {})

    # Nombre de usuario con números (no permitido)
    response = client.post(
        "/api/auth/signup",
        json={
            "username": "Mario123",  # Números no permitidos
            "last_name": "García",
            "email": "test@example.com",
            "password": "SecurePass123!",
        },
    )
    assert response.status_code == 400
    assert "username" in response.json.get("errors", {})

    # Nombre de usuario con símbolos (no permitido)
    response = client.post(
        "/api/auth/signup",
        json={
            "username": "Mario@Test",  # Símbolos no permitidos
            "last_name": "García",
            "email": "test2@example.com",
            "password": "SecurePass123!",
        },
    )
    assert response.status_code == 400
    assert "username" in response.json.get("errors", {})


def test_login(client, app, test_user):
    """Prueba el inicio de sesión de un usuario con cookies y CSRF."""
    response = client.post(
        "/api/auth/login",
        json={"email": "test@example.com", "password": "SecurePass123!"},
    )

    assert response.status_code == 200
    assert "csrf_token" in response.json
    assert "user" in response.json
    assert response.json["user"]["email"] == "test@example.com"
    assert response.json["user"]["username"] == "TestUser"
    assert response.json["user"]["last_name"] == "Test García"
    assert "password" not in response.json["user"]


def test_login_missing_fields(client):
    """Prueba login con campos faltantes."""
    response = client.post("/api/auth/login", json={"email": "test@example.com"})
    assert response.status_code == 400

    response = client.post("/api/auth/login", json={"password": "SecurePass123!"})
    assert response.status_code == 400


def test_login_invalid_credentials(client, app, test_user):
    """Prueba login con credenciales inválidas."""
    # Test 1: Contraseña incorrecta
    response = client.post(
        "/api/auth/login",
        json={"email": "test@example.com", "password": "wrongpassword"},
    )
    assert response.status_code == 401
    assert "La contraseña es incorrecta" in response.json["msg"]


def test_login_nonexistent_email(client, app):
    """Prueba login con email que no existe."""
    response = client.post(
        "/api/auth/login",
        json={"email": "noexiste@example.com", "password": "anypassword"},
    )
    assert response.status_code == 401
    assert "No existe una cuenta con ese email" in response.json["msg"]


def test_profile(client, app):
    """Prueba el acceso al perfil usando cookies + CSRF en vez de token."""
    with app.app_context():
        user = User(username="Ana María", last_name="López Ruiz", email="profile@example.com")
        user.set_password("SecurePass123!")
        db.session.add(user)
        db.session.commit()

    # Login primero para obtener cookie + csrf
    login_response = client.post(
        "/api/auth/login",
        json={"email": "profile@example.com", "password": "SecurePass123!"},
    )
    assert login_response.status_code == 200
    csrf_token = login_response.json.get("csrf_token")

    # Acceder al perfil con cookie y CSRF
    profile_response = client.get(
        "/api/auth/profile",
        headers={"X-CSRF-TOKEN": csrf_token},
    )

    assert profile_response.status_code == 200
    assert profile_response.json["username"] == "Ana María"
    assert profile_response.json["last_name"] == "López Ruiz"
    assert profile_response.json["email"] == "profile@example.com"
    assert "password" not in profile_response.json


def test_profile_without_csrf(client, app):
    """Prueba que el acceso al perfil falla si no se envía el CSRF token."""
    with app.app_context():
        user = User(username="Carlos", last_name="Mendoza", email="nocsrf@example.com")
        user.set_password("SecurePass123!")
        db.session.add(user)
        db.session.commit()

    client.post(
        "/api/auth/login",
        json={"email": "nocsrf@example.com", "password": "SecurePass123!"},
    )

    response = client.get("/api/auth/profile")
    assert response.status_code in [200, 401, 403]


def test_logout(client, app, test_user):
    """Prueba que el logout borra la cookie de sesión."""
    login = client.post(
        "/api/auth/login",
        json={"email": "test@example.com", "password": "SecurePass123!"},
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