# API de autenticación: endpoints para registro, login, logout y perfil de usuario
# Gestiona el registro de usuarios, autenticación mediante JWT y el almacenamiento
# del token en cookies seguras HttpOnly para protección profesional en middleware.
# Incluye validación de datos, roles, y manejo de errores para cada operación.

from flask import Blueprint, jsonify, request, make_response
from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required,
    set_access_cookies,
    unset_jwt_cookies,
)
from marshmallow import ValidationError
from datetime import timedelta
from app.extensions import db
from app.models.user import User
from app.schemas import user_schema
from flask import current_app as app

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    """Registra un nuevo usuario."""
    try:
        data = request.get_json()
        user_data = user_schema.load(data)

        if User.query.filter_by(email=user_data["email"]).first():
            return jsonify({"msg": "El email ya está registrado"}), 409

        if User.query.filter_by(username=user_data["username"]).first():
            return jsonify({"msg": "El nombre de usuario ya existe"}), 409

        new_user = User(
            username=user_data["username"],
            email=user_data["email"]
        )
        new_user.set_password(user_data["password"])

        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "msg": "Usuario registrado correctamente",
            "user": user_schema.dump(new_user)
        }), 201

    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": f"Error: {str(e)}"}), 500

@auth_bp.route("/login", methods=["POST"])
def login():
    """Autentica un usuario, genera un token JWT y lo guarda en cookie segura."""
    try:
        data = request.get_json()
        email = data.get("email", "").strip()
        password = data.get("password", "").strip()

        if not email or not password:
            return jsonify({"msg": "Email y contraseña son obligatorios"}), 400

        user = User.query.filter_by(email=email).first()

        if user is None or not user.check_password(password):
            return jsonify({"msg": "Credenciales inválidas"}), 401

        # Generar token con rol
        access_token = create_access_token(
            identity=str(user.id),
            additional_claims={"role": "admin" if user.is_admin else "user"},
            expires_delta=timedelta(seconds=app.config["JWT_ACCESS_TOKEN_EXPIRES"])
        )

        # Crear respuesta y setear cookie HttpOnly
        response = make_response(jsonify({
            "msg": "Inicio de sesión exitoso",
            "access_token": access_token,
            "user": user_schema.dump(user)
        }), 200)

        set_access_cookies(response, access_token, max_age=app.config["JWT_ACCESS_TOKEN_EXPIRES"])

        return response

    except Exception as e:
        return jsonify({"msg": f"Error: {str(e)}"}), 500

@auth_bp.route("/logout", methods=["POST"])
def logout():
    """Elimina la cookie JWT del usuario actual (logout profesional)."""
    response = make_response(jsonify({"msg": "Sesión cerrada correctamente"}), 200)
    unset_jwt_cookies(response)
    return response

@auth_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    """Obtiene el perfil del usuario autenticado."""
    try:
        user_id = get_jwt_identity()

        user = db.session.get(User, int(user_id))

        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        return jsonify(user_schema.dump(user)), 200

    except Exception as e:
        return jsonify({"msg": f"Error: {str(e)}"}), 500
