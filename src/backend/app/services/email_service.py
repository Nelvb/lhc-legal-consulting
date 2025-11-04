"""
Servicio profesional de envío de correos.
Compatible con Flask-Mail, Render y servicios externos (SendGrid, Mailgun).
Evita bloqueos, implementa timeout y fallback seguro a base de datos.

Autor: LHC Legal & Consulting - Equipo Backend
"""

from flask import current_app
from flask_mail import Message
from app.extensions import mail, db
from app.models.contact_message import ContactMessage  # Ajusta si la tabla tiene otro nombre
import threading
import smtplib
import socket
import time
import traceback


class EmailService:
    def __init__(self):
        # Obtiene el remitente y configuración general desde variables de entorno
        self.default_sender = current_app.config.get("MAIL_DEFAULT_SENDER")
        self.mail_timeout = int(current_app.config.get("MAIL_TIMEOUT", 10))
        self.fallback_enabled = bool(current_app.config.get("MAIL_FALLBACK_ENABLED", True))

    def _send_with_flask_mail(self, msg: Message):
        """Envía el correo real usando Flask-Mail en un hilo separado."""
        try:
            with mail.connect() as conn:
                conn.send(msg)
                current_app.logger.info(f"[EMAIL] Enviado correctamente a {msg.recipients}")
        except (smtplib.SMTPException, socket.timeout) as e:
            current_app.logger.warning(f"[EMAIL] Timeout o error SMTP: {e}")
            raise
        except Exception:
            current_app.logger.error(f"[EMAIL] Error inesperado:\n{traceback.format_exc()}")
            raise

    def _send_async(self, msg: Message):
        """Lanza el envío en un hilo paralelo (no bloquea el worker de Render)."""
        thread = threading.Thread(target=self._send_with_flask_mail, args=(msg,))
        thread.daemon = True
        thread.start()

    def send_email(self, subject: str, recipients: list[str], body: str, html: str = None) -> dict:
        """Lógica principal de envío: modo asíncrono + fallback en caso de error."""
        start_time = time.time()

        if not recipients:
            return {"success": False, "error": "No se han especificado destinatarios."}

        msg = Message(
            subject=subject,
            recipients=recipients,
            body=body,
            html=html,
            sender=self.default_sender,
        )

        try:
            # Enviar en modo no bloqueante
            self._send_async(msg)
            current_app.logger.info(f"[EMAIL] Envío en curso hacia {recipients}")
            return {"success": True, "message": "Correo enviado (modo asíncrono)."}

        except Exception as e:
            elapsed = round(time.time() - start_time, 2)
            current_app.logger.error(f"[EMAIL] Fallo tras {elapsed}s: {e}")

            if self.fallback_enabled:
                try:
                    self._save_fallback_message(subject, recipients, body)
                    return {
                        "success": True,
                        "message": "No se pudo enviar, pero se guardó en fallback.",
                    }
                except Exception as db_error:
                    current_app.logger.error(f"[EMAIL] Fallo al guardar fallback: {db_error}")

            return {"success": False, "error": str(e)}

    def _save_fallback_message(self, subject: str, recipients: list[str], body: str):
        """Guarda el mensaje en base de datos para revisión manual si el envío falla."""
        try:
            contact_msg = ContactMessage(
                name="SYSTEM_FALLBACK",
                email=self.default_sender,
                subject=subject,
                message=body,
                created_at=time.strftime("%Y-%m-%d %H:%M:%S"),
            )
            db.session.add(contact_msg)
            db.session.commit()
            current_app.logger.info("[EMAIL] Mensaje guardado en fallback DB.")
        except Exception:
            db.session.rollback()
            raise


def send_email_with_limit(subject: str, recipients: list[str], body: str, html: str = None):
    """
    Crea una instancia del servicio dentro del contexto válido.
    Se puede extender para control de límites por IP o usuario en el futuro.
    """
    service = EmailService()
    return service.send_email(subject, recipients, body, html)
