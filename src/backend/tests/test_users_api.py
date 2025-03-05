import pytest
from app.extensions import db
from app.models.user import User


def test_get_users_list(client, app):
    """Prueba obtener la lista de usuarios (requiere autenticación)."""
    # Crear un usuario para la prueba
    with app.app_context():
        # Limpiar cualquier usuario existente
        User.query.filter_by(email="testapi@example.com").delete()
        db.session.commit()
        
        # Crear usuario
        new_user = User(username="testapi", email="testapi@example.com")
        new_user.set_password("password123")
        db.session.add(new_user)
        db.session.commit()
        
        # Obtener token
        login_response = client.post(
            "/api/auth/login",
            json={"email": "testapi@example.com", "password": "password123"},
        )
        token = login_response.json["access_token"]
        
        # Usar el token para acceder a la lista de usuarios
        response = client.get(
            "/api/users/list", headers={"Authorization": f"Bearer {token}"}
        )
        
        # Verificar respuesta
        assert response.status_code == 200
        assert isinstance(response.json, list)
        
        # Limpiar
        db.session.delete(new_user)
        db.session.commit()


def test_get_user_by_id(client, app):
    """Prueba obtener un usuario por su ID."""
    with app.app_context():
        # Limpiar cualquier usuario existente
        User.query.filter_by(email="testuserid@example.com").delete()
        db.session.commit()
        
        # Crear usuario
        user = User(username="testuserid", email="testuserid@example.com")
        user.set_password("password123")
        db.session.add(user)
        db.session.commit()
        user_id = user.id
        
        # Obtener token
        login_response = client.post(
            "/api/auth/login",
            json={"email": "testuserid@example.com", "password": "password123"},
        )
        token = login_response.json["access_token"]
        
        # Usar el token para acceder a los detalles del usuario
        response = client.get(
            f"/api/users/{user_id}", headers={"Authorization": f"Bearer {token}"}
        )
        
        # Verificar respuesta
        assert response.status_code == 200
        assert response.json["email"] == "testuserid@example.com"
        assert response.json["username"] == "testuserid"
        
        # Limpiar
        db.session.delete(user)
        db.session.commit()


def test_update_user(client, app):
    """Prueba actualizar información de usuario."""
    with app.app_context():
        # Limpiar cualquier usuario existente
        User.query.filter_by(email="testupdate@example.com").delete()
        db.session.commit()
        
        # Crear usuario
        user = User(username="testupdate", email="testupdate@example.com")
        user.set_password("password123")
        db.session.add(user)
        db.session.commit()
        user_id = user.id
        
        # Obtener token
        login_response = client.post(
            "/api/auth/login",
            json={"email": "testupdate@example.com", "password": "password123"},
        )
        token = login_response.json["access_token"]
        
        # Actualizar el nombre de usuario
        response = client.put(
            "/api/users/update",
            headers={"Authorization": f"Bearer {token}"},
            json={"username": "updated_username"}
        )
        
        # Verificar respuesta
        assert response.status_code == 200
        assert "Usuario actualizado correctamente" in response.json["msg"]
        assert response.json["user"]["username"] == "updated_username"
        
        # Verificar que el cambio se guardó en la base de datos
        updated_user = db.session.get(User, user_id)
        assert updated_user.username == "updated_username"
        
        # Limpiar
        db.session.delete(updated_user)
        db.session.commit()