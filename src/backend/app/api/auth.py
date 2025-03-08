# API de autenticación: endpoints para registro, login y perfil de usuario
# Gestiona el registro de usuarios, autenticación, generación de tokens JWT y consulta de perfiles
# Incluye validación de datos y manejo de errores para cada operación

from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required,
)
from marshmallow import ValidationError
from app.extensions import db
from app.models.user import User
from app.schemas import user_schema

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
    """Autentica un usuario y genera un token de acceso."""
    try:
        data = request.get_json()
        email = data.get("email", "").strip()
        password = data.get("password", "").strip()

        if not email or not password:
            return jsonify({"msg": "Email y contraseña son obligatorios"}), 400

        user = User.query.filter_by(email=email).first()

        if user is None or not user.check_password(password):
            return jsonify({"msg": "Credenciales inválidas"}), 401

        access_token = create_access_token(identity=str(user.id))

        return jsonify({
            "access_token": access_token,
            "user": user_schema.dump(user)
        }), 200

    except Exception as e:
        return jsonify({"msg": f"Error: {str(e)}"}), 500

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
