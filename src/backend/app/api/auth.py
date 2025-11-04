# ============================================================
# src/backend/app/api/auth.py
# ------------------------------------------------------------
# API de autenticación completa para LHC Legal & Consulting.
# Gestiona registro, login, refresh, logout y perfil de usuario.
# Utiliza JWT en cookies HttpOnly con protección CSRF.
# CORS se gestiona de forma global desde app/extensions.py.
# Compatible con entornos de desarrollo (localhost) y producción (Render + Vercel).
# ============================================================

from flask import Blueprint, jsonify, request, make_response, current_app as app
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    jwt_required,
    set_access_cookies,
    set_refresh_cookies,
    unset_jwt_cookies,
    get_csrf_token,
)
from marshmallow import ValidationError
from datetime import timedelta
from app.extensions import db
from app.models.user import User
from app.schemas import user_schema

# Definición del Blueprint principal para autenticación
auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/signup", methods=["POST"])
def signup():
    """
    Registro de usuario con validaciones completas.
    - Verifica duplicados por email y username.
    - Almacena contraseña encriptada con salt.
    - Devuelve el usuario creado si tiene éxito.
    """
    try:
        data = request.get_json()
        user_data = user_schema.load(data)

        if User.query.filter_by(email=user_data["email"]).first():
            return jsonify({"msg": "El email ya está registrado"}), 409

        if User.query.filter_by(username=user_data["username"]).first():
            return jsonify({"msg": "El nombre de usuario ya existe"}), 409

        new_user = User(
            username=user_data["username"],
            last_name=user_data.get("last_name", "").strip(),
            email=user_data["email"]
        )
        new_user.set_password(user_data["password"])

        db.session.add(new_user)
        db.session.commit()

        app.logger.info(f"🟢 Usuario creado: {new_user.email}")
        return jsonify({
            "msg": "Usuario registrado correctamente",
            "user": user_schema.dump(new_user)
        }), 201

    except ValidationError as err:
        app.logger.warning(f"Errores de validación: {err.messages}")
        return jsonify({"errors": err.messages}), 400
    except Exception as e:
        db.session.rollback()
        app.logger.error(f"Error interno en registro: {e}")
        return jsonify({"msg": "Error interno del servidor"}), 500


@auth_bp.route("/login", methods=["POST"])
def login():
    """
    Inicio de sesión del usuario.
    - Verifica credenciales.
    - Devuelve JWT en cookies HttpOnly y token CSRF.
    """
    try:
        data = request.get_json()
        email = data.get("email", "").strip()
        password = data.get("password", "").strip()

        if not email or not password:
            return jsonify({"msg": "Email y contraseña son obligatorios"}), 400

        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"msg": "No existe una cuenta con ese email"}), 401

        if not user.check_password(password):
            return jsonify({"msg": "La contraseña es incorrecta"}), 401

        access_token = create_access_token(
            identity=str(user.id),
            additional_claims={"role": "admin" if user.is_admin else "user"},
            expires_delta=timedelta(seconds=app.config["JWT_ACCESS_TOKEN_EXPIRES"])
        )
        refresh_token = create_refresh_token(identity=str(user.id))

        response = make_response(jsonify({
            "msg": "Inicio de sesión exitoso",
            "csrf_token": get_csrf_token(access_token),
            "user": user_schema.dump(user)
        }), 200)

        set_access_cookies(response, access_token)
        set_refresh_cookies(response, refresh_token)
        app.logger.info(f"🟢 Usuario autenticado: {email}")
        return response

    except Exception as e:
        app.logger.error(f"Error en login: {e}")
        return jsonify({"msg": "Error interno del servidor"}), 500


@auth_bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True, locations=["cookies"])
def refresh():
    """
    Renueva el access_token usando el refresh_token.
    Devuelve un nuevo CSRF y actualiza la cookie.
    """
    try:
        user_id = get_jwt_identity()
        access_token = create_access_token(
            identity=user_id,
            expires_delta=timedelta(seconds=app.config["JWT_ACCESS_TOKEN_EXPIRES"])
        )

        response = make_response(jsonify({
            "msg": "Token renovado correctamente",
            "csrf_token": get_csrf_token(access_token)
        }), 200)

        set_access_cookies(response, access_token)
        app.logger.info(f"🔄 Token renovado para usuario: {user_id}")
        return response

    except Exception as e:
        app.logger.error(f"Error al renovar token: {e}")
        return jsonify({"msg": "Error al renovar token"}), 500


@auth_bp.route("/logout", methods=["POST"])
def logout():
    """
    Cierra la sesión eliminando las cookies JWT.
    """
    response = make_response(jsonify({"msg": "Sesión cerrada correctamente"}), 200)
    unset_jwt_cookies(response)
    app.logger.info("🔒 Sesión cerrada correctamente")
    return response


@auth_bp.route("/profile", methods=["GET"])
@jwt_required(locations=["cookies"])
def profile():
    """
    Devuelve los datos del usuario autenticado.
    """
    try:
        user_id = get_jwt_identity()
        user = db.session.get(User, int(user_id))

        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        return jsonify(user_schema.dump(user)), 200
    except Exception as e:
        app.logger.error(f"Error al obtener perfil: {e}")
        return jsonify({"msg": "Error interno del servidor"}), 500
