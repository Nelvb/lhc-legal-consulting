# app/api/contact_api.py
# API pública para recepción de consultas legales desde el formulario.
# Procesa los datos del formulario, valida el esquema y guarda el mensaje como lead.

from flask import Blueprint, request, jsonify
from app.schemas.contact_schema import ContactSchema
from app.services.contact_service import save_contact_message
from marshmallow import ValidationError

contact_api = Blueprint("contact_api", __name__, url_prefix="/api/contact")

@contact_api.route("", methods=["POST"])
def submit_contact_message():
    """
    Endpoint público para recibir una consulta legal desde el formulario de contacto.
    Valida los datos recibidos y guarda el mensaje en la base de datos como lead.
    """
    schema = ContactSchema()

    try:
        data = schema.load(request.json)
    except ValidationError as err:
        return jsonify({"status": "error", "errors": err.messages}), 400

    try:
        saved = save_contact_message(
            name=f"{data.get('name', '')} {data.get('last_name', '')}".strip(),
            email=data.get("email", "").strip(),
            subject=data["subject"],
            message=data["message"]
        )
        return jsonify({
            "status": "success",
            "message": "Consulta enviada correctamente.",
            "data": {
                "id": saved.id,
                "created_at": saved.created_at.isoformat()
            }
        }), 201

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": "Error interno al procesar la consulta.",
            "error": str(e)
        }), 500
