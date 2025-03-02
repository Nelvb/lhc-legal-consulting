from app.extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.sql import func

class User(db.Model):
    __tablename__ = "users"  # Nombre explícito de la tabla

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now(), nullable=True)

    def __repr__(self):
        return f"<User {self.username}>"

    # Método para establecer la contraseña encriptada
    def set_password(self, password: str) -> None:
        """Genera un hash seguro de la contraseña proporcionada."""
        self.password_hash = generate_password_hash(password)

    # Método para verificar la contraseña
    def check_password(self, password: str) -> bool:
        """Verifica si la contraseña ingresada coincide con el hash almacenado."""
        return check_password_hash(self.password_hash, password)

    # Método para serializar los datos del usuario (sin incluir la contraseña)
    def serialize(self) -> dict:
        """Convierte el objeto User en un diccionario sin exponer la contraseña."""
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email
        }