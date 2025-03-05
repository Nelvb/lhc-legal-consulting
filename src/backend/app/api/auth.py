"""
auth.py - Gestión de autenticación de usuarios
Este módulo contiene los endpoints para registro, login y perfil de usuario.
Usa Marshmallow para validación de datos y Flask-JWT-Extended para la gestión de tokens.
"""

from app.extensions import db
from app.models.user import User
from app.schemas import user_schema, users_schema
from flask import Blueprint, jsonify, request
from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required,
)
from marshmallow import ValidationError

# Crear el Blueprint para autenticación
auth_bp = Blueprint("auth", __name__)


# REGISTRO DE USUARIO
@auth_bp.route("/signup", methods=["POST"])
def signup():
    """Registra un nuevo usuario."""
    try:
        # Validar los datos de entrada con el schema
        data = request.get_json()
        
        # Validar datos usando el schema
        user_data = user_schema.load(data)
        
        # Verificar si el usuario ya existe
        if User.query.filter_by(email=user_data['email']).first():
            return jsonify({"msg": "El email ya está registrado"}), 409
        
        if User.query.filter_by(username=user_data['username']).first():
            return jsonify({"msg": "El nombre de usuario ya existe"}), 409
        
        # Crear nuevo usuario
        new_user = User(
            username=user_data['username'],
            email=user_data['email']
        )
        new_user.set_password(user_data['password'])
        
        db.session.add(new_user)
        db.session.commit()
        
        # Devolver respuesta formateada con el schema
        return jsonify({
            "msg": "Usuario registrado correctamente",
            "user": user_schema.dump(new_user)
        }), 201
        
    except ValidationError as err:
        # Capturar errores de validación del schema
        return jsonify({"errors": err.messages}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": f"Error: {str(e)}"}), 500


# LOGIN DE USUARIO
@auth_bp.route("/login", methods=["POST"])
def login():
    """Autentica un usuario y genera un token de acceso."""
    try:
        data = request.get_json()
        
        # Validación básica
        if not data or 'email' not in data or 'password' not in data:
            return jsonify({"msg": "Email y contraseña son obligatorios"}), 400
        
        email = data.get("email", "").strip()
        password = data.get("password", "").strip()
        
        user = User.query.filter_by(email=email).first()
        
        if user is None or not user.check_password(password):
            return jsonify({"msg": "Credenciales inválidas"}), 401
        
        # Convertir el ID a string antes de usarlo como identidad
        access_token = create_access_token(identity=str(user.id))
        
        # Usar el schema para serializar la respuesta
        return jsonify({
            "access_token": access_token,
            "user": user_schema.dump(user)
        }), 200
        
    except Exception as e:
        return jsonify({"msg": f"Error: {str(e)}"}), 500


# ENDPOINT PROTEGIDO (SOLO PARA USUARIOS AUTENTICADOS)
@auth_bp.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    """Obtiene el perfil del usuario autenticado."""
    try:
        # Obtener la identidad del JWT (ahora es un string)
        user_id_str = get_jwt_identity()
        
        # Convertir de string a entero para la consulta
        try:
            user_id = int(user_id_str)
        except ValueError:
            return jsonify({"msg": "ID de usuario inválido"}), 400
        
        user = db.session.get(User, user_id)
        
        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404
        
        # Usar el schema para serializar la respuesta
        return jsonify(user_schema.dump(user)), 200
        
    except Exception as e:
        print(f"Error en el endpoint de perfil: {str(e)}")
        return jsonify({"msg": f"Error: {str(e)}"}), 500