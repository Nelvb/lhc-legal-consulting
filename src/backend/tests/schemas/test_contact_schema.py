# tests/schemas/test_contact_schema.py
# -------------------------------------------------------------------
# Tests unitarios de validación del esquema ContactSchema
# Verifica que los datos del formulario cumplan los requisitos
# y que los errores de validación se detecten correctamente.
# -------------------------------------------------------------------

import pytest
from app.schemas.contact_schema import ContactSchema

schema = ContactSchema()

def test_contact_schema_valido():
    data = {
        "name": "Juan",
        "last_name": "Pérez",
        "email": "juan@example.com",
        "subject": "Interesado en invertir",
        "message": "Quiero información detallada sobre el próximo proyecto."
    }

    result = schema.load(data)
    assert result["name"] == "Juan"
    assert result["last_name"] == "Pérez"
    assert result["email"] == "juan@example.com"


@pytest.mark.parametrize("data, campo_esperado", [
    ({"name": "", "email": "test@test.com", "subject": "Hola", "message": "Mensaje válido"}, "name"),
    ({"name": "Ana", "email": "no-es-email", "subject": "Hola", "message": "Mensaje válido"}, "email"),
    ({"name": "Ana", "email": "ana@example.com", "subject": "Hi", "message": "Mensaje válido"}, "subject"),
    ({"name": "Ana", "email": "ana@example.com", "subject": "Asunto válido", "message": "Hola"}, "message"),
    ({"name": "Juan", "last_name": "A", "email": "juan@example.com", "subject": "Tema", "message": "Mensaje válido"}, "last_name"),
])
def test_contact_schema_invalido(data, campo_esperado):
    with pytest.raises(Exception) as exc:
        schema.load(data)
    assert campo_esperado in str(exc.value)
