# Tests de API de usuarios: listar, consultar, actualizar y eliminar cuenta
# Verifica endpoints protegidos con autenticación basada en cookies + CSRF
# Incluye pruebas de actualización de datos y persistencia en base de datos

import pytest
from app.extensions import db
from app.models.user import User


def test_get_users_list(client, app):
    """Prueba obtener la lista de usuarios (requiere autenticación)."""
    with app.app_context():
        User.query.filter_by(email="testapi@example.com").delete()
        db.session.commit()

        new_user = User(username="testapi", last_name="ApellidoAPI", email="testapi@example.com")
        new_user.set_password("password123")
        db.session.add(new_user)
        db.session.commit()

    # Login
    login_response = client.post(
        "/api/auth/login",
        json={"email": "testapi@example.com", "password": "password123"},
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
        User.query.filter_by(email="testuserid@example.com").delete()
        db.session.commit()

        user = User(username="testuserid", last_name="ApellidoID", email="testuserid@example.com")
        user.set_password("password123")
        db.session.add(user)
        db.session.commit()
        user_id = user.id

    login_response = client.post(
        "/api/auth/login",
        json={"email": "testuserid@example.com", "password": "password123"},
    )
    assert login_response.status_code == 200
    csrf_token = login_response.json["csrf_token"]

    response = client.get(
        f"/api/users/{user_id}",
        headers={"X-CSRF-TOKEN": csrf_token},
    )

    assert response.status_code == 200
    assert response.json["email"] == "testuserid@example.com"
    assert response.json["username"] == "testuserid"
    assert response.json["last_name"] == "ApellidoID"

    with app.app_context():
        db.session.delete(user)
        db.session.commit()


def test_update_user(client, app):
    """Prueba actualizar información de usuario."""
    with app.app_context():
        User.query.filter_by(email="testupdate@example.com").delete()
        db.session.commit()

        user = User(username="testupdate", last_name="ApellidoOriginal", email="testupdate@example.com")
        user.set_password("password123")
        db.session.add(user)
        db.session.commit()
        user_id = user.id

    login_response = client.post(
        "/api/auth/login",
        json={"email": "testupdate@example.com", "password": "password123"},
    )
    assert login_response.status_code == 200
    csrf_token = login_response.json["csrf_token"]

    response = client.put(
        "/api/users/update",
        headers={"X-CSRF-TOKEN": csrf_token},
        json={"username": "updated_username", "last_name": "ApellidoNuevo"}
    )

    assert response.status_code == 200
    assert "Usuario actualizado correctamente" in response.json["msg"]
    assert response.json["user"]["username"] == "updated_username"
    assert response.json["user"]["last_name"] == "ApellidoNuevo"

    with app.app_context():
        updated_user = db.session.get(User, user_id)
        assert updated_user.username == "updated_username"
        assert updated_user.last_name == "ApellidoNuevo"
        db.session.delete(updated_user)
        db.session.commit()


def test_delete_account(client, app):
    """Prueba la eliminación de la cuenta autenticada."""
    with app.app_context():
        user = User(username="delete_me", last_name="DeleteApellido", email="deleteme@example.com")
        user.set_password("password123")
        db.session.add(user)
        db.session.commit()

    login_response = client.post(
        "/api/auth/login",
        json={"email": "deleteme@example.com", "password": "password123"}
    )
    assert login_response.status_code == 200
    csrf_token = login_response.json["csrf_token"]

    delete_response = client.delete(
        "/api/users/delete",
        headers={"X-CSRF-TOKEN": csrf_token},
    )

    assert delete_response.status_code == 200
    assert delete_response.get_json()["msg"] == "Cuenta eliminada correctamente"
