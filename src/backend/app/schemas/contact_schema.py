# Esquema de validación para el formulario de contacto (público y privado).
# Admite los campos: nombre, apellidos, email (opcional para usuarios autenticados), asunto y mensaje.
# Si el usuario está logueado, el backend puede omitir nombre, apellidos y email del payload.

from marshmallow import Schema, fields, validate

class ContactSchema(Schema):
    name = fields.Str(
        required=False,
        validate=validate.Length(
            min=2, max=100,
            error="El nombre debe tener entre 2 y 100 caracteres."
        )
    )
    last_name = fields.Str(
        required=False,
        validate=validate.Length(
            min=2, max=120,
            error="El apellido debe tener entre 2 y 120 caracteres."
        )
    )
    email = fields.Email(
        required=False,
        validate=validate.Length(
            max=120,
            error="El email no puede superar los 120 caracteres."
        )
    )
    subject = fields.Str(
        required=True,
        validate=validate.Length(
            min=4, max=120,
            error="El asunto debe tener entre 4 y 120 caracteres."
        )
    )
    message = fields.Str(
        required=True,
        validate=validate.Length(
            min=10, max=1000,
            error="El mensaje debe tener entre 10 y 1000 caracteres."
        )
    )
