# Tests unitarios del modelo de usuario
# Verifica atributos, hashing de contraseñas y restricciones de unicidad
# Comprueba el correcto funcionamiento de la serialización y validación de datos

import pytest
from app.extensions import db
from app.models.user import User

def test_user_model_attributes(app):
    """Prueba los atributos y métodos del modelo User."""
    with app.app_context():
        # Crear un usuario para pruebas
        usuario = User(username="usertest", last_name="ApellidoTest", email="usertest@example.com")
        usuario.set_password("securepassword")
        db.session.add(usuario)
        db.session.commit()
        
        # Probar atributos del modelo
        assert usuario.username == "usertest"
        assert usuario.last_name == "ApellidoTest"
        assert usuario.email == "usertest@example.com"
        assert hasattr(usuario, "created_at")
        
        # Probar verificación de contraseña
        assert usuario.check_password("securepassword") is True
        assert usuario.check_password("wrongpassword") is False
        
        # Probar método serialize
        serialized = usuario.serialize()
        assert serialized["username"] == "usertest"
        assert serialized["last_name"] == "ApellidoTest"
        assert serialized["email"] == "usertest@example.com"
        assert "password_hash" not in serialized
        
        # Limpiar
        db.session.delete(usuario)
        db.session.commit()

def test_user_password_hashing(app):
    """Prueba específicamente la funcionalidad de hash de contraseña."""
    with app.app_context():
        user1 = User(username="test1", email="test1@example.com")
        user1.set_password("same_password")
        
        user2 = User(username="test2", email="test2@example.com")
        user2.set_password("same_password")
        
        # Verificar que contraseñas iguales producen hashes diferentes
        assert user1.password_hash != user2.password_hash
        
        # Pero la verificación funciona para ambos
        assert user1.check_password("same_password") is True
        assert user2.check_password("same_password") is True

def test_user_unique_constraints(app):
    """Prueba las restricciones de unicidad en el modelo User."""
    with app.app_context():
        # Crear el primer usuario
        user1 = User(username="unique", email="unique@example.com")
        user1.set_password("password")
        db.session.add(user1)
        db.session.commit()
        
        # Intentar crear un segundo usuario con el mismo username
        user2 = User(username="unique", email="different@example.com")
        user2.set_password("password")
        db.session.add(user2)
        
        # Debería fallar al hacer commit por violación de constraint
        with pytest.raises(Exception):
            db.session.commit()
        
        # Limpiar la sesión después del error
        db.session.rollback()
        
        # Intentar crear un usuario con el mismo email
        user3 = User(username="different", email="unique@example.com")
        user3.set_password("password")
        db.session.add(user3)
        
        # Debería fallar al hacer commit
        with pytest.raises(Exception):
            db.session.commit()
            
        # Limpiar
        db.session.rollback()
        db.session.delete(user1)
        db.session.commit()
