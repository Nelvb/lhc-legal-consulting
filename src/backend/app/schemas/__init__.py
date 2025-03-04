from .user import UserSchema

user_schema = UserSchema()
users_schema = UserSchema(many=True)  # Para manejar múltiples usuarios