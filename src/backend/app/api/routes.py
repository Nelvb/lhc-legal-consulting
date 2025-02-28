from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.extensions import db
from app.models.models import User


# Crear el blueprint para las rutas de autenticación
routes = Blueprint("routes", __name__)

# REGISTRO DE USUARIO
@routes.route("/signup", methods=["POST"])
def signup():
    """Registra un nuevo usuario."""
    data = request.get_json()

    username = data.get("username", "").strip()
    email = data.get("email", "").strip()
    password = data.get("password", "").strip()

    if not username or not email or not password:
        return jsonify({"msg": "Todos los campos son obligatorios"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "El usuario ya existe"}), 409

    new_user = User(username=username, email=email)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario registrado correctamente"}), 201


# LOGIN DE USUARIO
@routes.route("/login", methods=["POST"])
def login():
    """Autentica un usuario y genera un token de acceso."""
    data = request.get_json()

    email = data.get("email", "").strip()
    password = data.get("password", "").strip()

    if not email or not password:
        return jsonify({"msg": "Email y contraseña son obligatorios"}), 400

    user = User.query.filter_by(email=email).first()

    if user is None or not user.check_password(password):
        return jsonify({"msg": "Credenciales inválidas"}), 401

    access_token = create_access_token(identity=user.id)

    return jsonify({
        "access_token": access_token,
        "user": user.serialize()
    }), 200


# ENDPOINT PROTEGIDO (SOLO PARA USUARIOS AUTENTICADOS)
@routes.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    """Obtiene el perfil del usuario autenticado."""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    return jsonify(user.serialize()), 200
