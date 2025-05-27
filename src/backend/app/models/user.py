# Modelo de datos para usuarios con autenticación y seguridad de contraseñas
# Define la estructura de la tabla users con campos para autenticación, datos personales y timestamps
# Incluye métodos para hash seguro de contraseñas y serialización de datos

from app.extensions import db
from sqlalchemy.sql import func
from werkzeug.security import check_password_hash, generate_password_hash


class User(db.Model):
    __tablename__ = "users"  # Nombre explícito de la tabla

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    last_name = db.Column(db.String(120), nullable=True)  # Campo nuevo: apellidos
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    is_admin = db.Column(db.Boolean, nullable=False, server_default='false')
    created_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now(), nullable=True
    )

    def __repr__(self):
        return f"<User {self.username}>"

    def set_password(self, password: str) -> None:
        self.password_hash = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        return check_password_hash(self.password_hash, password)

    def serialize(self) -> dict:
        return {
            "id": self.id,
            "username": self.username,
            "last_name": self.last_name,
            "email": self.email,
        }
