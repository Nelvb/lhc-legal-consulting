# src/backend/tests/schemas/test_user_schema.py
#
# Tests para el esquema de validación de usuarios (UserSchema).
# Verifica que las validaciones funcionen correctamente según la filosofía de diseño:
# - username: nombres reales sin números ni símbolos (ej: "Mario", "José Luis")
# - last_name: apellidos reales con longitudes realistas (2-50 caracteres)
# - email: validación estándar hasta 100 caracteres
# - password: seguridad robusta aceptando cualquier carácter especial
#
# Cubre casos válidos, inválidos, límites de longitud y serialización.

import pytest
from marshmallow import ValidationError
from app.schemas.user import UserSchema
from datetime import datetime

user_schema = UserSchema()

# ==================== TESTS DE CASOS VÁLIDOS ====================

def test_user_schema_valid_data():
    """Carga datos válidos y verifica que se procesan correctamente."""
    data = {
        "username": "Mario",
        "last_name": "García López",
        "email": "mario@example.com",
        "password": "MiPassword123!"
    }
    result = user_schema.load(data)
    assert result["username"] == "Mario"
    assert result["last_name"] == "García López"
    assert result["email"] == "mario@example.com"
    assert result["password"] == "MiPassword123!"

def test_username_valid_names():
    """Verifica que nombres reales válidos son aceptados."""
    valid_names = [
        "Ana",
        "José Luis",
        "María Carmen",
        "Jean-Pierre",
        "O'Connor",
        "Ángel",
        "François"
    ]
    
    for name in valid_names:
        data = {
            "username": name,
            "last_name": "Apellido",
            "email": "test@example.com",
            "password": "Password123!"
        }
        result = user_schema.load(data)
        assert result["username"] == name

def test_password_accepts_any_special_chars():
    """Verifica que la contraseña acepta cualquier carácter especial."""
    special_chars = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", ".", ",", "?", "/", "\\", "|"]
    
    for char in special_chars:
        password = f"Password123{char}"
        data = {
            "username": "Mario",
            "last_name": "García",
            "email": "test@example.com",
            "password": password
        }
        result = user_schema.load(data)
        assert result["password"] == password

# ==================== TESTS DE CASOS INVÁLIDOS ====================

def test_username_invalid_with_numbers():
    """Verifica que usernames con números son rechazados."""
    invalid_names = ["Mario123", "Ana_90", "Jose2024", "User1"]
    
    for name in invalid_names:
        data = {
            "username": name,
            "last_name": "Apellido",
            "email": "test@example.com",
            "password": "Password123!"
        }
        with pytest.raises(ValidationError) as err:
            user_schema.load(data)
        assert "username" in err.value.messages

def test_username_invalid_with_symbols():
    """Verifica que usernames con símbolos no permitidos son rechazados."""
    invalid_names = ["Mario@", "Ana#123", "José$", "User%", "Test&"]
    
    for name in invalid_names:
        data = {
            "username": name,
            "last_name": "Apellido", 
            "email": "test@example.com",
            "password": "Password123!"
        }
        with pytest.raises(ValidationError) as err:
            user_schema.load(data)
        assert "username" in err.value.messages

def test_username_length_limits():
    """Verifica límites de longitud para username."""
    # Muy corto (1 caracter)
    data = {
        "username": "A",
        "last_name": "Apellido",
        "email": "test@example.com", 
        "password": "Password123!"
    }
    with pytest.raises(ValidationError) as err:
        user_schema.load(data)
    assert "username" in err.value.messages
    
    # Muy largo (31 caracteres)
    data["username"] = "A" * 31
    with pytest.raises(ValidationError) as err:
        user_schema.load(data)
    assert "username" in err.value.messages

def test_last_name_length_limits():
    """Verifica límites de longitud para apellidos."""
    # Muy corto (1 caracter)
    data = {
        "username": "Mario",
        "last_name": "A",
        "email": "test@example.com",
        "password": "Password123!"
    }
    with pytest.raises(ValidationError) as err:
        user_schema.load(data)
    assert "last_name" in err.value.messages
    
    # Muy largo (51 caracteres)
    data["last_name"] = "A" * 51
    with pytest.raises(ValidationError) as err:
        user_schema.load(data)
    assert "last_name" in err.value.messages

def test_email_invalid_format():
    """Verifica que emails con formato inválido son rechazados."""
    invalid_emails = ["correo-no-valido", "sin@punto", "@sindominio.com", "espacios @email.com"]
    
    for email in invalid_emails:
        data = {
            "username": "Mario",
            "last_name": "García",
            "email": email,
            "password": "Password123!"
        }
        with pytest.raises(ValidationError) as err:
            user_schema.load(data)
        assert "email" in err.value.messages

def test_email_too_long():
    """Verifica que emails muy largos son rechazados."""
    long_email = "a" * 90 + "@example.com"  # > 100 caracteres
    data = {
        "username": "Mario",
        "last_name": "García",
        "email": long_email,
        "password": "Password123!"
    }
    with pytest.raises(ValidationError) as err:
        user_schema.load(data)
    assert "email" in err.value.messages

def test_password_too_short():
    """Verifica que contraseñas muy cortas son rechazadas."""
    data = {
        "username": "Mario",
        "last_name": "García",
        "email": "mario@example.com",
        "password": "123"
    }
    with pytest.raises(ValidationError) as err:
        user_schema.load(data)
    assert "password" in err.value.messages

def test_password_missing_complexity():
    """Verifica que contraseñas sin complejidad requerida son rechazadas."""
    weak_passwords = [
        "password",           # Sin mayúscula, número, carácter especial
        "PASSWORD",           # Sin minúscula, número, carácter especial
        "Password",           # Sin número, carácter especial
        "Password123",        # Sin carácter especial
        "Password!",          # Sin número
        "12345678!"           # Sin letras
    ]
    
    for password in weak_passwords:
        data = {
            "username": "Mario",
            "last_name": "García",
            "email": "mario@example.com",
            "password": password
        }
        with pytest.raises(ValidationError) as err:
            user_schema.load(data)
        assert "password" in err.value.messages

# ==================== TESTS DE SERIALIZACIÓN ====================

def test_user_schema_dump_excludes_password():
    """Verifica que password nunca aparece en serialización y campos read-only sí."""
    input_data = {
        "id": 1,
        "username": "Mario",
        "last_name": "García López",
        "email": "mario@example.com",
        "password": "Password123!",  # No debe aparecer en dump
        "is_admin": True,
        "created_at": datetime(2024, 1, 1, 0, 0, 0)
    }

    dumped = user_schema.dump(input_data)
    
    # Verifica que password no se serializa
    assert "password" not in dumped
    
    # Verifica que campos read-only sí aparecen
    assert dumped["id"] == 1
    assert dumped["is_admin"] is True
    assert dumped["username"] == "Mario"
    assert dumped["last_name"] == "García López"
    assert dumped["email"] == "mario@example.com"

def test_required_fields_missing():
    """Verifica que campos requeridos faltantes generan error."""
    required_fields = ["username", "last_name", "email", "password"]
    
    for missing_field in required_fields:
        data = {
            "username": "Mario",
            "last_name": "García",
            "email": "mario@example.com", 
            "password": "Password123!"
        }
        del data[missing_field]
        
        with pytest.raises(ValidationError) as err:
            user_schema.load(data)
        assert missing_field in err.value.messages