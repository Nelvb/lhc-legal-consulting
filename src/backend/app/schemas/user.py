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
