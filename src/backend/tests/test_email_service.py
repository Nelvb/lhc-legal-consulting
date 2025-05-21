# src/backend/tests/test_email_service.py
#
# Tests unitarios para el servicio de envío de emails (EmailService).
# Este módulo valida:
# - La correcta validación de direcciones de email.
# - El envío exitoso de un correo con datos válidos (mockeando Flask-Mail).
# - La gestión de errores cuando se proporcionan emails inválidos.
# - El manejo adecuado de excepciones del servidor SMTP.
#
# Nota importante:
# EmailService accede a `current_app.config` en su constructor. Por eso,
# el test `test_validate_email` requiere ejecutar dentro de un contexto Flask activo
# (usando `create_app()` y `app.app_context()` en una fixture).

import pytest
from unittest.mock import MagicMock, patch
from app.services.email_service import EmailService
from app import create_app

@pytest.fixture(scope="module")
def app():
    """
    Fixture que crea una app Flask con contexto activo.
    Necesario para poder acceder a current_app.config desde EmailService.
    """
    app = create_app()
    ctx = app.app_context()
    ctx.push()
    yield app
    ctx.pop()

def test_validate_email(app):
    """
    Valida que el método validate_email funcione correctamente para
    emails válidos e inválidos.
    """
    service = EmailService()
    assert service.validate_email("test@example.com") is True
    assert service.validate_email("invalid-email") is False

@patch("app.services.email_service.mail")
def test_send_email_success(mock_mail, app):
    """
    Test de envío exitoso de email.
    Se mockea Flask-Mail para evitar envío real.
    """
    mock_mail.send = MagicMock()
    service = EmailService(default_sender="sender@example.com")
    result = service.send_email("Asunto", ["recipient@example.com"], "Cuerpo")
    assert result["success"] is True
    mock_mail.send.assert_called_once()

@patch("app.services.email_service.mail")
def test_send_email_invalid_recipients(mock_mail, app):
    """
    Verifica que el envío falle cuando se usan emails inválidos.
    """
    service = EmailService()
    result = service.send_email("Asunto", ["bad-email"], "Cuerpo")
    assert result["success"] is False
    assert "inválido" in result["error"]

@patch("app.services.email_service.mail")
def test_send_email_exception(mock_mail, app):
    """
    Simula un error en el envío SMTP y comprueba que se maneje correctamente.
    """
    mock_mail.send.side_effect = Exception("SMTP error")
    service = EmailService()
    result = service.send_email("Asunto", ["test@example.com"], "Cuerpo")
    assert result["success"] is False
    assert "SMTP error" in result["error"]
