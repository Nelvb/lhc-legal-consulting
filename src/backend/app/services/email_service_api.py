"""
Servicio profesional de envío de correos mediante la API REST de SendGrid.
Compatible con Render y 100 % gratuito hasta 100 emails/día.

Evita bloqueos SMTP y no depende de Flask-Mail.
Usa una simple petición HTTPS al endpoint oficial de SendGrid.

Autor: LHC Legal & Consulting - Equipo Backend
"""

import os
import requests
from flask import current_app

SENDGRID_API_URL = "https://api.sendgrid.com/v3/mail/send"


class SendGridEmailService:
    def __init__(self):
        # La API key ya la tienes en Render como MAIL_PASSWORD
        self.api_key = os.getenv("MAIL_PASSWORD") or current_app.config.get("MAIL_PASSWORD")
        self.default_sender = os.getenv("MAIL_DEFAULT_SENDER") or current_app.config.get("MAIL_DEFAULT_SENDER")

        if not self.api_key:
            raise ValueError("Falta la API key de SendGrid (MAIL_PASSWORD).")

    def send_email(self, subject: str, recipients: list[str], body: str, html: str = None) -> dict:
        """Envía un correo mediante la API de SendGrid."""
        if not recipients:
            return {"success": False, "error": "No se han especificado destinatarios."}

        data = {
            "personalizations": [
                {
                    "to": [{"email": r} for r in recipients],
                    "subject": subject,
                }
            ],
            "from": {"email": self.default_sender},
            "content": [
                {
                    "type": "text/plain" if not html else "text/html",
                    "value": html or body,
                }
            ],
        }

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        try:
            response = requests.post(SENDGRID_API_URL, json=data, headers=headers, timeout=10)
            if response.status_code in (200, 202):
                current_app.logger.info(f"[EMAIL] Enviado correctamente a {recipients}")
                return {"success": True, "message": "Correo enviado correctamente vía SendGrid API."}
            else:
                current_app.logger.error(f"[EMAIL] Error SendGrid ({response.status_code}): {response.text}")
                return {"success": False, "error": f"Error SendGrid: {response.status_code}"}

        except requests.Timeout:
            current_app.logger.error("[EMAIL] Timeout en la solicitud a SendGrid.")
            return {"success": False, "error": "Timeout en la solicitud a SendGrid."}

        except Exception as e:
            current_app.logger.error(f"[EMAIL] Error inesperado: {e}")
            return {"success": False, "error": str(e)}


def send_email_with_limit(subject: str, recipients: list[str], body: str, html: str = None):
    """
    Crea una instancia del servicio y envía el correo.
    Permite extenderse con límites por IP o usuario si se desea.
    """
    service = SendGridEmailService()
    return service.send_email(subject, recipients, body, html)
