# API de autenticación: login, registro, logout y perfil de usuario.
# Usa JWT almacenado en cookies HttpOnly con protección CSRF.
# Permite registrar nuevos usuarios, iniciar sesión, cerrar sesión y obtener datos del perfil.
# Rutas públicas: /signup, /login, /logout
# Ruta protegida: /profile

from flask import Blueprint, jsonify, request, make_response
from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required,
    set_access_cookies,
    unset_jwt_cookies,
    get_csrf_token,
)
from marshmallow import ValidationError
from datetime import timedelta
from app.extensions import db
from app.models.user import User
from app.schemas import user_schema
from flask import current_app as app
from flask_cors import cross_origin  # Importación para control CORS por ruta

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/signup", methods=["POST"])
@cross_origin(supports_credentials=True, origins=["http://localhost:3000"])
def signup():
    """Registro de usuario con validaciones y almacenamiento seguro de contraseña."""
    try:
        data = request.get_json()
        user_data = user_schema.load(data)

        if User.query.filter_by(email=user_data["email"]).first():
            return jsonify({"msg": "El email ya está registrado"}), 409

        if User.query.filter_by(username=user_data["username"]).first():
            return jsonify({"msg": "El nombre de usuario ya existe"}), 409

        new_user = User(username=user_data["username"], email=user_data["email"])
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
@cross_origin(supports_credentials=True, origins=["http://localhost:3000"])
def login():
    """Inicio de sesión. Devuelve JWT en cookie HttpOnly + token CSRF en respuesta."""
    try:
        data = request.get_json()
        email = data.get("email", "").strip()
        password = data.get("password", "").strip()

        if not email or not password:
            return jsonify({"msg": "Email y contraseña son obligatorios"}), 400

        user = User.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            return jsonify({"msg": "Credenciales inválidas"}), 401

        access_token = create_access_token(
            identity=str(user.id),
            additional_claims={"role": "admin" if user.is_admin else "user"},
            expires_delta=timedelta(seconds=app.config["JWT_ACCESS_TOKEN_EXPIRES"])
        )

        response = make_response(jsonify({
            "msg": "Inicio de sesión exitoso",
            "csrf_token": get_csrf_token(access_token),
            "user": user_schema.dump(user)
        }), 200)

        set_access_cookies(response, access_token)
        return response

    except Exception as e:
        return jsonify({"msg": f"Error: {str(e)}"}), 500

@auth_bp.route("/logout", methods=["POST"])
@cross_origin(supports_credentials=True, origins=["http://localhost:3000"])
def logout():
    """Cierra la sesión del usuario eliminando las cookies JWT."""
    response = make_response(jsonify({"msg": "Sesión cerrada correctamente"}), 200)
    unset_jwt_cookies(response)
    return response

@auth_bp.route("/profile", methods=["GET"])
@jwt_required(locations=["cookies"])
def profile():
    """Devuelve los datos del usuario autenticado a partir del JWT."""
    try:
        user_id = get_jwt_identity()
        user = db.session.get(User, int(user_id))

        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        return jsonify(user_schema.dump(user)), 200
    except Exception as e:
        return jsonify({"msg": f"Error: {str(e)}"}), 500
