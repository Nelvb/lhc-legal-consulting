# models/contact_message.py
# Modelo SQLAlchemy para almacenar consultas legales de contacto y consentimiento de privacidad.
# Incluye campos de auditoría, metadatos legales, número de teléfono opcional y mecanismos de revocación.

from app.extensions import db
from sqlalchemy.sql import func

class ContactMessage(db.Model):
    __tablename__ = "contact_messages"

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(30), nullable=True)  # Número de teléfono opcional
    subject = db.Column(db.String(200), nullable=True)
    message = db.Column(db.Text, nullable=False)
    privacy_accepted = db.Column(db.Boolean, nullable=False, default=True)
    revoked = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    revoked_at = db.Column(db.DateTime(timezone=True), nullable=True)

    def __repr__(self):
        return f"<ContactMessage {self.email} | Revocado: {self.revoked}>"

    def serialize(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "email": self.email,
            "phone": self.phone,
            "subject": self.subject,
            "message": self.message,
            "privacy_accepted": self.privacy_accepted,
            "revoked": self.revoked,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "revoked_at": self.revoked_at.isoformat() if self.revoked_at else None,
        }
