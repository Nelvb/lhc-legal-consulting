# Esquema de validación y serialización para usuarios
# Define reglas de validación para campos como username, email, apellidos y password
# Controla qué campos son visibles en respuestas API vs. aceptados en peticiones

from marshmallow import Schema, fields, validate

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(
        required=True,
        validate=[
            validate.Length(min=3, max=50, error="El nombre de usuario debe tener entre 3 y 50 caracteres."),
            validate.Regexp(r"^[a-zA-Z0-9_]+$", error="El nombre de usuario solo puede contener letras, números y guiones bajos.")
        ]
    )
    last_name = fields.Str(
        required=False,
        validate=[
            validate.Length(min=2, max=120, error="El apellido debe tener entre 2 y 120 caracteres.")
        ]
    )
    email = fields.Email(
        required=True,
        validate=[
            validate.Length(max=120, error="El email no puede superar los 120 caracteres.")
        ]
    )
    password = fields.Str(
        required=True,
        validate=[
            validate.Length(min=8, error="La contraseña debe tener al menos 8 caracteres.")
        ],
        load_only=True
    )
    created_at = fields.DateTime(dump_only=True)
    is_admin = fields.Boolean(dump_only=True)
