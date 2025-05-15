# API de gestión de cuenta: recuperación de contraseña, cambio de email, verificación de registro.
# Rutas públicas que funcionan con tokens firmados para recuperación o confirmación.
# Totalmente separadas del sistema de login.
# Usa Flask-Mail para enviar enlaces con tokens.
# Los tokens se generan con itsdangerous y caducan automáticamente.
# Se aplica CORS a nivel de blueprint para permitir acceso desde frontend (Next.js).

from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import CORS
from app.extensions import db
from app.models.user import User
from app.schemas import user_schema
from app.services.email_service import send_email_with_limit
from itsdangerous import URLSafeTimedSerializer, BadSignature, SignatureExpired

# Definición del blueprint y aplicación de CORS solo a este módulo
account_bp = Blueprint("account", __name__)
CORS(account_bp, supports_credentials=True, origins=["http://localhost:3000"])

@account_bp.route("/request-password-reset", methods=["POST"])
def request_password_reset():
    """
    Solicita un enlace de recuperación de contraseña y lo envía al email si el usuario existe.
    No revela si el usuario existe por seguridad.
    """
    serializer = URLSafeTimedSerializer(current_app.config["SECRET_KEY"])
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({"msg": "Email obligatorio"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "Si existe una cuenta con ese email, recibirás un enlace de recuperación"}), 200

    token = serializer.dumps(email, salt="password-reset")
    frontend_url = current_app.config.get("FRONTEND_URL", "http://localhost:3000")
    reset_url = f"{frontend_url}/reset-password?token={token}&email={email}"

    result = send_email_with_limit(
        subject="Recuperación de contraseña",
        recipients=[email],
        body=f"Haz clic aquí para restablecer tu contraseña: {reset_url}",
    )

    print(">>>> RESULTADO DEL ENVÍO:", result)
    # Mostrar resultado en consola para depuración
    current_app.logger.info(f"Resultado del envío de recuperación: {result}")

    if result.get("success"):
        return jsonify({"msg": "Si existe una cuenta con ese email, recibirás un enlace de recuperación"}), 200
    else:
        return jsonify({"msg": "Error al enviar el correo de recuperación"}), 500

@account_bp.route("/reset-password", methods=["POST"])
def reset_password():
    """
    Cambia la contraseña del usuario tras validar el token recibido.
    """
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

@account_bp.route("/request-email-change", methods=["POST"])
@jwt_required(locations=["cookies"])
def request_email_change():
    """
    Solicita el cambio de email y envía enlace de confirmación al nuevo correo.
    Protegido por JWT.
    """
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

    current_app.logger.info(f"Resultado del envío de confirmación: {result}")

    if result.get("success"):
        return jsonify({"msg": "Correo de confirmación enviado"}), 200
    else:
        return jsonify({"msg": "Error al enviar el correo de confirmación"}), 500

@account_bp.route("/confirm-email", methods=["GET"])
def confirm_email_change():
    """
    Confirma el cambio de email verificando el token recibido por enlace.
    """
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
