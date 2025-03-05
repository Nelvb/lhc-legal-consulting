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
        
        # Verificar que el usuario existe en la base de datos
        usuario = User.query.filter_by(email="test@example.com").first()
        assert usuario is not None
        assert usuario.username == "testuser"


def test_signup_invalid_data(client, app):
    """Prueba la validación de datos en el registro."""
    # Caso 1: Contraseña demasiado corta
    response = client.post(
        "/api/auth/signup",
        json={
            "username": "testuser",
            "email": "test@example.com",
            "password": "short",
        },
    )
    assert response.status_code == 400
    assert "errors" in response.json
    assert "password" in response.json["errors"]
    
    # Caso 2: Email inválido
    response = client.post(
        "/api/auth/signup",
        json={
            "username": "testuser",
            "email": "invalid-email",
            "password": "securepass",
        },
    )
    assert response.status_code == 400
    assert "errors" in response.json
    assert "email" in response.json["errors"]
    
    # Caso 3: Nombre de usuario inválido (caracteres no permitidos)
    response = client.post(
        "/api/auth/signup",
        json={
            "username": "test user@",  # Espacio y @ no permitidos
            "email": "test@example.com",
            "password": "securepass",
        },
    )
    assert response.status_code == 400
    assert "errors" in response.json
    assert "username" in response.json["errors"]


def test_login(client, app, test_user):
    """Prueba el inicio de sesión de un usuario."""
    response = client.post(
        "/api/auth/login",
        json={"email": "test@example.com", "password": "password123"},
    )
    
    assert response.status_code == 200
    assert "access_token" in response.json
    
    # Verificar que la respuesta incluye datos de usuario serializados por el schema
    assert "user" in response.json
    assert response.json["user"]["email"] == "test@example.com"
    assert response.json["user"]["username"] == "testuser"
    assert "password" not in response.json["user"]  # Verificar que el password no se incluye


def test_login_invalid_credentials(client, app, test_user):
    """Prueba login con credenciales inválidas."""
    response = client.post(
        "/api/auth/login",
        json={"email": "test@example.com", "password": "wrongpassword"},
    )
    assert response.status_code == 401
    assert "Credenciales inválidas" in response.json["msg"]


def test_profile(client, app):
    """Prueba el acceso al perfil con un token JWT."""
    # Crear un usuario específico para esta prueba
    with app.app_context():
        user = User(username="profile_test", email="profile@example.com")
        user.set_password("password123")
        db.session.add(user)
        db.session.commit()
        user_id = user.id  # Guardar el ID para comprobar después
    
    # Iniciar sesión para obtener token
    login_response = client.post(
        "/api/auth/login",
        json={"email": "profile@example.com", "password": "password123"},
    )
    
    # Verificar login exitoso
    assert login_response.status_code == 200
    token = login_response.json["access_token"]
    
    # Usar el token para acceder al perfil
    profile_response = client.get(
        "/api/auth/profile", headers={"Authorization": f"Bearer {token}"}
    )
    
    # Verificar respuesta correcta
    assert profile_response.status_code == 200
    assert profile_response.json["username"] == "profile_test"
    assert profile_response.json["email"] == "profile@example.com"
    assert "password" not in profile_response.json  # Verificar que el password no se incluye