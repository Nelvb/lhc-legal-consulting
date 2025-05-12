# Servicio de envío de emails para la aplicación Boost A Project
# Utiliza Flask-Mail con configuración dinámica y validación de campos
# Profesional, escalable y preparado para ser extendido o sustituido por servicios externos como SendGrid

from flask_mail import Message
from flask import current_app
from app.extensions import mail
import re


class EmailService:
    """
    Servicio centralizado para envío de correos electrónicos.
    Puede escalar fácilmente a otros proveedores (SendGrid, Mailgun).
    """

    def __init__(self, default_sender=None):
        self.default_sender = default_sender or current_app.config.get("MAIL_DEFAULT_SENDER")

    def validate_email(self, email: str) -> bool:
        """
        Valida formato de email.
        """
        pattern = r"^[\w\.-]+@[\w\.-]+\.\w+$"
        return bool(re.match(pattern, email))

    def send_email(self, subject: str, recipients: list[str], body: str, html: str = None) -> dict:
        """
        Envía un correo electrónico.

        :param subject: Asunto del email
        :param recipients: Lista de destinatarios
        :param body: Texto plano
        :param html: HTML opcional
        :return: Diccionario con éxito o error
        """
        if not recipients or not all(self.validate_email(r) for r in recipients):
            return {"success": False, "error": "Email(s) inválido(s)."}

        try:
            msg = Message(subject=subject, recipients=recipients, body=body, html=html, sender=self.default_sender)
            mail.send(msg)
            return {"success": True, "message": "Correo enviado correctamente."}

        except Exception as e:
            current_app.logger.error(f"Error al enviar email: {str(e)}")
            return {"success": False, "error": f"No se pudo enviar el correo: {str(e)}"}
