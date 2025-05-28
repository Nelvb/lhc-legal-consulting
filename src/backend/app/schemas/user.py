# UserSchema.py
#
# Esquema de validación y serialización para usuarios de Boost A Project.
# Define reglas de validación estrictas y realistas para registro e identificación de usuarios.
# Controla qué campos son visibles en respuestas API vs. aceptados en peticiones.
#
# Filosofía de diseño:
# - username: Nombre real de la persona (ej: "Mario", "Ana", "José Luis") - SIN números ni símbolos
# - last_name: Apellidos reales con longitud realista
# - email: Validación estándar con longitud práctica
# - password: Seguridad robusta aceptando cualquier carácter especial
#
# Validaciones alineadas con UX profesional:
# - Mensajes de error claros y orientados a solución
# - Longitudes realistas para uso real
# - Regex permisivos para nombres internacionales
# - Seguridad sin restricciones arbitrarias

from marshmallow import Schema, fields, validate

class UserSchema(Schema):
    """
    Schema para validación y serialización de usuarios.
    
    Campos de solo lectura (dump_only):
    - id: Identificador único del usuario
    - created_at: Fecha de creación de la cuenta
    - is_admin: Estado de administrador
    
    Campos de solo escritura (load_only):
    - password: Solo para registro/actualización, nunca se expone
    
    Campos bidireccionales:
    - username: Nombre real del usuario (para mostrar e identificar)
    - last_name: Apellidos del usuario
    - email: Correo electrónico para login y comunicación
    """
    
    id = fields.Int(dump_only=True)

    username = fields.Str(
        required=True,
        validate=[
            validate.Length(
                min=2,
                max=30,
                error="El nombre debe tener entre 2 y 30 caracteres."
            ),
            validate.Regexp(
                r"^[a-zA-ZÀ-ÿ\s'-]+$",
                error="El nombre solo puede contener letras, espacios, guiones y apóstrofes."
            )
        ]
    )

    last_name = fields.Str(
        required=True,
        validate=[
            validate.Length(
                min=2,
                max=50,
                error="Los apellidos deben tener entre 2 y 50 caracteres."
            ),
            validate.Regexp(
                r"^[a-zA-ZÀ-ÿ\s'-]+$",
                error="Los apellidos solo pueden contener letras, espacios, guiones y apóstrofes."
            )
        ]
    )

    email = fields.Email(
        required=True,
        validate=[
            validate.Length(
                max=100,
                error="El email no puede superar los 100 caracteres."
            )
        ]
    )

    password = fields.Str(
        required=True,
        validate=[
            validate.Length(
                min=8,
                error="La contraseña debe tener al menos 8 caracteres."
            ),
            validate.Regexp(
                r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$",
                error="La contraseña debe incluir mayúsculas, minúsculas, un número y un carácter especial."
            )
        ],
        load_only=True
    )

    created_at = fields.DateTime(dump_only=True)
    is_admin = fields.Boolean(dump_only=True)