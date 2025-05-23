# src/backend/tests/schemas/test_user_schema.py
#
# Tests para el esquema de validación de usuarios (UserSchema)

import pytest
from marshmallow import ValidationError
from app.schemas.user import UserSchema
from datetime import datetime


user_schema = UserSchema()

def test_user_schema_valid_data():
    """Carga datos válidos y verifica que se procesan correctamente."""
    data = {
        "username": "usuario123",
        "email": "usuario@example.com",
        "password": "segura1234"
    }
    result = user_schema.load(data)
    assert result["username"] == "usuario123"
    assert result["email"] == "usuario@example.com"
    assert result["password"] == "segura1234"

def test_user_schema_invalid_username():
    """Verifica error por username inválido."""
    data = {
        "username": "usuario con espacios",
        "email": "usuario@example.com",
        "password": "segura1234"
    }
    with pytest.raises(ValidationError) as err:
        user_schema.load(data)
    assert "username" in err.value.messages

def test_user_schema_invalid_email():
    """Verifica error por email inválido."""
    data = {
        "username": "usuario123",
        "email": "correo-no-valido",
        "password": "segura1234"
    }
    with pytest.raises(ValidationError) as err:
        user_schema.load(data)
    assert "email" in err.value.messages

def test_user_schema_short_password():
    """Verifica error por contraseña muy corta."""
    data = {
        "username": "usuario123",
        "email": "usuario@example.com",
        "password": "123"
    }
    with pytest.raises(ValidationError) as err:
        user_schema.load(data)
    assert "password" in err.value.messages

def test_user_schema_dump_excludes_password_and_includes_admin():
    """Verifica que password no aparece en dump y is_admin sí se permite como solo lectura."""
    input_data = {
        "id": 1,
        "username": "usuario123",
        "email": "usuario@example.com",
        "is_admin": True,
        "created_at": datetime(2024, 1, 1, 0, 0, 0)
    }

    dumped = user_schema.dump(input_data)
    assert "password" not in dumped
    assert dumped["is_admin"] is True
    assert dumped["username"] == "usuario123"
