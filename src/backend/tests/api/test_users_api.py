# tests/api/test_users_api.py
#
# Tests de API de usuarios: listar, consultar, actualizar y eliminar cuenta
# Verifica endpoints protegidos con autenticación basada en cookies + CSRF
# Incluye pruebas de actualización de datos y persistencia en base de datos
# Actualizado para coincidir con UserSchema profesional (nombres reales sin números)

import pytest
from app.extensions import db
from app.models.user import User


def test_get_users_list(client, app):
    """Prueba obtener la lista de usuarios (requiere autenticación)."""
    with app.app_context():
        User.query.filter_by(email="luis@example.com").delete()
        db.session.commit()

        new_user = User(username="Luis", last_name="Fernández Silva", email="luis@example.com")
        new_user.set_password("SecurePass123!")
        db.session.add(new_user)
        db.session.commit()

    # Login
    login_response = client.post(
        "/api/auth/login",
        json={"email": "luis@example.com", "password": "SecurePass123!"},
    )
    assert login_response.status_code == 200
    csrf_token = login_response.json["csrf_token"]

    # Acceder a recurso protegido con cookie + CSRF
    response = client.get(
        "/api/users/list",
        headers={"X-CSRF-TOKEN": csrf_token},
    )

    assert response.status_code == 200
    assert isinstance(response.json, list)

    with app.app_context():
        db.session.delete(new_user)
        db.session.commit()


def test_get_user_by_id(client, app):
    """Prueba obtener un usuario por su ID."""
    with app.app_context():
        User.query.filter_by(email="elena@example.com").delete()
        db.session.commit()

        user = User(username="Elena", last_name="Rodríguez Martín", email="elena@example.com")
        user.set_password("SecurePass123!")
        db.session.add(user)
        db.session.commit()
        user_id = user.id

    login_response = client.post(
        "/api/auth/login",
        json={"email": "elena@example.com", "password": "SecurePass123!"},
    )
    assert login_response.status_code == 200
    csrf_token = login_response.json["csrf_token"]

    response = client.get(
        f"/api/users/{user_id}",
        headers={"X-CSRF-TOKEN": csrf_token},
    )

    assert response.status_code == 200
    assert response.json["email"] == "elena@example.com"
    assert response.json["username"] == "Elena"
    assert response.json["last_name"] == "Rodríguez Martín"

    with app.app_context():
        db.session.delete(user)
        db.session.commit()


def test_update_user(client, app):
    """Prueba actualizar información de usuario."""
    with app.app_context():
        User.query.filter_by(email="carlos@example.com").delete()
        db.session.commit()

        user = User(username="Carlos", last_name="González Original", email="carlos@example.com")
        user.set_password("SecurePass123!")
        db.session.add(user)
        db.session.commit()
        user_id = user.id

    login_response = client.post(
        "/api/auth/login",
        json={"email": "carlos@example.com", "password": "SecurePass123!"},
    )
    assert login_response.status_code == 200
    csrf_token = login_response.json["csrf_token"]

    response = client.put(
        "/api/users/update",
        headers={"X-CSRF-TOKEN": csrf_token},
        json={"username": "Carlos Alberto", "last_name": "González Nuevo"}
    )

    assert response.status_code == 200
    assert "Usuario actualizado correctamente" in response.json["msg"]
    assert response.json["user"]["username"] == "Carlos Alberto"
    assert response.json["user"]["last_name"] == "González Nuevo"

    with app.app_context():
        updated_user = db.session.get(User, user_id)
        assert updated_user.username == "Carlos Alberto"
        assert updated_user.last_name == "González Nuevo"
        db.session.delete(updated_user)
        db.session.commit()


def test_delete_account(client, app):
    """Prueba la eliminación de la cuenta autenticada."""
    with app.app_context():
        user = User(username="Patricia", last_name="Morales López", email="patricia@example.com")
        user.set_password("SecurePass123!")
        db.session.add(user)
        db.session.commit()

    login_response = client.post(
        "/api/auth/login",
        json={"email": "patricia@example.com", "password": "SecurePass123!"}
    )
    assert login_response.status_code == 200
    csrf_token = login_response.json["csrf_token"]

    delete_response = client.delete(
        "/api/users/delete",
        headers={"X-CSRF-TOKEN": csrf_token},
    )

    assert delete_response.status_code == 200
    assert delete_response.get_json()["msg"] == "Cuenta eliminada correctamente"