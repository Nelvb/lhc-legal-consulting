# schemas/contact_message_schema.py
# Esquema de serialización para mostrar mensajes legales al administrador.
# Incluye campos de contacto, privacidad, fechas de creación y revocación.

from marshmallow import Schema, fields

class ContactMessageSchema(Schema):
    id = fields.Int()
    full_name = fields.Str()
    email = fields.Email()
    phone = fields.Str(allow_none=True)  # Teléfono opcional
    subject = fields.Str()
    message = fields.Str()
    privacy_accepted = fields.Bool()
    revoked = fields.Bool()
    created_at = fields.DateTime()
    revoked_at = fields.DateTime(allow_none=True)
