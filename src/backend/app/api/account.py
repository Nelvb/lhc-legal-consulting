# ============================================================
# src/backend/app/api/account.py
# ------------------------------------------------------------
# API de gestión de cuenta y contacto general.
# Gestiona actualización de perfil, recuperación de contraseña,
# cambio de email y envío del formulario de contacto.
# CORS se gestiona globalmente desde app/extensions.py.
# Incluye manejo correcto de preflight (OPTIONS) para evitar
# bloqueos en navegadores en producción (Render + Vercel).
# ============================================================

from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from itsdangerous import URLSafeTimedSerializer, BadSignature, SignatureExpired

from app.extensions import db
from app.models.user import User
from app.schemas.contact_schema import ContactSchema
from app.services.email_service_api import send_email_with_limit
from app.services.contact_service import save_contact_message

# Definición del Blueprint
account_bp = Blueprint("account", __name__)

contact_schema = ContactSchema()


# ============================================================
# Actualización de perfil
# ============================================================

@account_bp.route("/update-profile", methods=["OPTIONS"])
def update_profile_options():
    """Responde al preflight de CORS para /update-profile."""
    response = jsonify({})
    response.headers.add("Access-Control-Allow-Origin", request.headers.get("Origin", "*"))
    response.headers.add("Access-Control-Allow-Methods", "PUT, OPTIONS")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization, X-CSRF-TOKEN")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response, 200


@account_bp.route("/update-profile", methods=["PUT"])
@jwt_required(locations=["cookies"])
def update_profile():
    """Actualiza datos básicos del usuario autenticado."""
    user_id = get_jwt_identity()
    data = request.get_json()

    name = data.get("name", "").strip()
    last_name = data.get("last_name", "").strip()
    email = data.get("email", "").strip()
    current_password = data.get("current_password", "")

    if not name or not current_password:
        return jsonify({"msg": "Nombre y contraseña son obligatorios"}), 400

    user = db.session.get(User, int(user_id))
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    if not user.check_password(current_password):
        return jsonify({"msg": "La contraseña actual no es válida"}), 401

    user.username = name
    user.last_name = last_name

    if email and email != user.email:
        existing = User.query.filter(User.email == email, User.id != user.id).first()
        if existing:
            return jsonify({"msg": "Ese email ya está en uso"}), 400
        user.email = email

    try:
        db.session.commit()
        return jsonify({"msg": "Perfil actualizado correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Error al guardar perfil: {e}")
        return jsonify({"msg": "Error al guardar los cambios"}), 500


# ============================================================
# Recuperación y cambio de contraseña
# ============================================================

@account_bp.route("/request-password-reset", methods=["POST"])
def request_password_reset():
    """Genera y envía token de recuperación de contraseña."""
    serializer = URLSafeTimedSerializer(current_app.config["SECRET_KEY"])
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({"msg": "Email obligatorio"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "Si existe una cuenta con ese email, recibirás un enlace"}), 200

    token = serializer.dumps(email, salt="password-reset")
    frontend_url = current_app.config.get("FRONTEND_URL", "http://localhost:3000")
    reset_url = f"{frontend_url}/reset-password?token={token}&email={email}"

    result = send_email_with_limit(
        subject="Recuperación de contraseña",
        recipients=[email],
        body=f"Haz clic aquí para restablecer tu contraseña: {reset_url}",
    )

    if result.get("success"):
        return jsonify({"msg": "Correo de recuperación enviado"}), 200
    else:
        return jsonify({"msg": "Error al enviar el correo"}), 500


@account_bp.route("/reset-password", methods=["POST"])
def reset_password():
    """Valida token y cambia la contraseña del usuario."""
    serializer = URLSafeTimedSerializer(current_app.config["SECRET_KEY"])
    data = request.get_json()
    token = data.get("token")
    new_password = data.get("new_password")

    if not token or not new_password:
        return jsonify({"msg": "Token y nueva contraseña son obligatorios"}), 400

    try:
        email = serializer.loads(token, salt="password-reset", max_age=3600)
    except SignatureExpired:
        return jsonify({"msg": "El token ha expirado"}), 400
    except BadSignature:
        return jsonify({"msg": "Token inválido"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    user.set_password(new_password)
    db.session.commit()
    return jsonify({"msg": "Contraseña actualizada correctamente"}), 200


# ============================================================
# Cambio y confirmación de email
# ============================================================

@account_bp.route("/request-email-change", methods=["POST"])
@jwt_required(locations=["cookies"])
def request_email_change():
    """Solicita cambio de email y envía enlace de confirmación."""
    serializer = URLSafeTimedSerializer(current_app.config["SECRET_KEY"])
    data = request.get_json()
    new_email = data.get("new_email")

    if not new_email:
        return jsonify({"msg": "Nuevo email obligatorio"}), 400

    user_id = get_jwt_identity()
    user = db.session.get(User, int(user_id))
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    token = serializer.dumps({"user_id": user.id, "new_email": new_email}, salt="email-change")
    confirm_url = f"{request.host_url}confirm-email?token={token}"

    result = send_email_with_limit(
        subject="Confirmar cambio de email",
        recipients=[new_email],
        body=f"Confirma tu nuevo correo haciendo clic aquí: {confirm_url}",
    )

    if result.get("success"):
        return jsonify({"msg": "Correo de confirmación enviado"}), 200
    else:
        return jsonify({"msg": "Error al enviar el correo"}), 500


@account_bp.route("/confirm-email", methods=["GET"])
def confirm_email_change():
    """Confirma el cambio de email verificando token recibido por enlace."""
    serializer = URLSafeTimedSerializer(current_app.config["SECRET_KEY"])
    token = request.args.get("token")

    if not token:
        return jsonify({"msg": "Token obligatorio"}), 400

    try:
        data = serializer.loads(token, salt="email-change", max_age=3600)
        user_id = data.get("user_id")
        new_email = data.get("new_email")
    except SignatureExpired:
        return jsonify({"msg": "El token ha expirado"}), 400
    except BadSignature:
        return jsonify({"msg": "Token inválido"}), 400

    user = db.session.get(User, int(user_id))
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    user.email = new_email
    db.session.commit()
    return jsonify({"msg": "Email actualizado correctamente"}), 200


# ============================================================
# Formulario de contacto general
# ============================================================

@account_bp.route("/contact", methods=["OPTIONS", "POST"])
def contact():
    """
    Maneja el formulario de contacto.
    Incluye soporte completo para preflight CORS.
    """
    if request.method == "OPTIONS":
        response = jsonify({})
        response.headers.add("Access-Control-Allow-Origin", request.headers.get("Origin", "*"))
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization, X-CSRF-TOKEN")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        return response, 200

    verify_jwt_in_request(optional=True)
    try:
        user_id = get_jwt_identity()
    except Exception:
        user_id = None

    try:
        data = request.get_json()
        if not data:
            current_app.logger.warning("Datos vacíos o inválidos en contacto")
            return jsonify({"msg": "Datos requeridos"}), 400

        errors = contact_schema.validate(data)
        if errors:
            current_app.logger.warning(f"Errores de validación: {errors}")
            return jsonify({"errors": errors}), 400

        name = data["name"]
        last_name = data.get("last_name", "").strip()
        email = data.get("email", "no enviado")
        phone = data.get("phone")
        subject = data["subject"]
        message = data["message"]

        full_message = (
            f"Nuevo mensaje desde el formulario de contacto\n\n"
            f"{'ID usuario: ' + str(user_id) if user_id else 'Usuario no autenticado'}\n"
            f"Nombre: {name} {last_name}\n"
            f"Email: {email}\n"
            f"Teléfono: {phone or 'No proporcionado'}\n"
            f"Asunto: {subject}\n\n"
            f"Mensaje:\n{message}"
        )

        result = send_email_with_limit(
            subject=f"[LHC Legal & Consulting] Contacto: {subject}",
            recipients=[current_app.config.get("MAIL_DEFAULT_RECEIVER") or "lhclegalandconsulting@gmail.com"],
            body=full_message
        )

        if result.get("success"):
            try:
                save_contact_message(
                    name=f"{name} {last_name}",
                    email=email,
                    subject=subject,
                    message=message,
                    phone=phone
                )
            except Exception as db_error:
                current_app.logger.error(f"Error guardando mensaje: {db_error}")

            return jsonify({"msg": "Mensaje enviado correctamente"}), 200
        else:
            current_app.logger.error(f"Error enviando email: {result.get('error')}")
            return jsonify({"msg": "No se pudo enviar el mensaje"}), 500

    except Exception as e:
        current_app.logger.error(f"Error inesperado en /contact: {e}", exc_info=True)
        return jsonify({"msg": "Error interno del servidor"}), 500
