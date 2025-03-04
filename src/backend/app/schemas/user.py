from marshmallow import Schema, fields, validate, ValidationError

class UserSchema(Schema):
    id = fields.Int(dump_only=True)  # Solo se muestra, no se puede establecer
    username = fields.Str(
        required=True, 
        validate=[
            validate.Length(min=3, max=50, error='Username must be between 3 and 50 characters'),
            validate.Regexp('^[a-zA-Z0-9_]+$', error='Username can only contain letters, numbers, and underscores')
        ]
    )
    email = fields.Email(
        required=True, 
        validate=[
            validate.Length(max=120, error='Email is too long'),
            validate.Email(error='Invalid email format')
        ]
    )
    password = fields.Str(
        required=True,
        validate=[
            validate.Length(min=8, error='Password must be at least 8 characters long')
        ],
        load_only=True  # No se devuelve en las respuestas
    )
    created_at = fields.DateTime(dump_only=True)

    def validate_unique_username(self, data):
        # Aquí podrías añadir lógica para verificar si el username ya existe
        from app.models.user import User
        if User.query.filter_by(username=data['username']).first():
            raise ValidationError('Username already exists')

    def validate_unique_email(self, data):
        # Verificar si el email ya existe
        from app.models.user import User
        if User.query.filter_by(email=data['email']).first():
            raise ValidationError('Email already registered')