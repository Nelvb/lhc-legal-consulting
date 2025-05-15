# Servicio de envío de emails para la aplicación Boost A Project
# Usa Flask-Mail con validación y preparado para servicios externos

from flask_mail import Message
from flask import current_app
from app.extensions import mail
import re

class EmailService:
    def __init__(self, default_sender=None):
        self.default_sender = default_sender or current_app.config.get("MAIL_DEFAULT_SENDER")

    def validate_email(self, email: str) -> bool:
        pattern = r"^[\w\.-]+@[\w\.-]+\.\w+$"
        return bool(re.match(pattern, email))

    def send_email(self, subject: str, recipients: list[str], body: str, html: str = None) -> dict:
        if not recipients or not all(self.validate_email(r) for r in recipients):
            return {"success": False, "error": "Email(s) inválido(s)."}

        try:
            msg = Message(subject=subject, recipients=recipients, body=body, html=html, sender=self.default_sender)
            mail.send(msg)
            return {"success": True, "message": "Correo enviado correctamente."}

        except Exception as e:
            current_app.logger.error(f"Error al enviar email: {str(e)}")
            return {"success": False, "error": f"No se pudo enviar el correo: {str(e)}"}

# NO crear instancia global aquí

def send_email_with_limit(subject: str, recipients: list[str], body: str, html: str = None):
    """
    Crea una instancia del servicio dentro del contexto válido.
    Se puede extender para añadir límites por IP/email/etc.
    """
    service = EmailService()
    return service.send_email(subject, recipients, body, html)
