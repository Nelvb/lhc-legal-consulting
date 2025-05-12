# API de gestión de cuenta: recuperación de contraseña, cambio de email, verificación de registro
# Este módulo gestiona acciones sensibles del usuario que requieren confirmación por email
# Mantiene separación de responsabilidades respecto al sistema de autenticación básico

from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.models.user import User
from app.schemas import user_schema
from app.services.email_service import send_email_with_limit
from itsdangerous import URLSafeTimedSerializer, BadSignature, SignatureExpired

account_bp = Blueprint("account", __name__)

serializer = URLSafeTimedSerializer(current_app.config["SECRET_KEY"])


@account_bp.route("/account/request-password-reset", methods=["POST"])
def request_password_reset():
    data = request.get_json()
    email = data.get("email")

    if not email:
        return jsonify({"msg": "Email obligatorio"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    token = serializer.dumps(email, salt="password-reset")
    reset_url = f"{request.host_url}reset-password?token={token}"

    send_email_with_limit(
        subject="Recuperación de contraseña",
        recipients=[email],
        body=f"Haz clic aquí para restablecer tu contraseña: {reset_url}",
    )

    return jsonify({"msg": "Correo enviado para recuperar contraseña"}), 200


@account_bp.route("/account/reset-password", methods=["POST"])
def reset_password():
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


@account_bp.route("/account/request-email-change", methods=["POST"])
@jwt_required()
def request_email_change():
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

    send_email_with_limit(
        subject="Confirmar cambio de email",
        recipients=[new_email],
        body=f"Confirma tu nuevo correo haciendo clic aquí: {confirm_url}",
    )

    return jsonify({"msg": "Correo de confirmación enviado"}), 200


@account_bp.route("/account/confirm-email", methods=["GET"])
def confirm_email_change():
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
