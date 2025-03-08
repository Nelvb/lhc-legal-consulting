# Centralización de esquemas para serialización/deserialización de datos
# Exporta instancias preconfiguradas de esquemas para usuarios individuales y colecciones

from .user import UserSchema

user_schema = UserSchema()
users_schema = UserSchema(many=True)  # Para manejar múltiples usuarios