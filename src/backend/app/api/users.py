"""
users.py - Gestión de usuarios
Este módulo contiene endpoints para administrar usuarios.
Proporciona funcionalidades como listar usuarios, obtener detalles de un usuario,
actualizar información de perfil, y otras operaciones relacionadas con usuarios.
"""

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.models.user import User
from app.schemas import user_schema, users_schema
from marshmallow import ValidationError

# Crear el blueprint para usuarios
users_bp = Blueprint("users", __name__)


@users_bp.route("/list", methods=["GET"])
@jwt_required()
def get_users():
    """Obtiene la lista de todos los usuarios (requiere autenticación)."""
    try:
        users = User.query.all()
        return jsonify(users_schema.dump(users)), 200
    except Exception as e:
        return jsonify({"msg": f"Error: {str(e)}"}), 500


@users_bp.route("/<int:user_id>", methods=["GET"])
@jwt_required()
def get_user(user_id):
    """Obtiene los detalles de un usuario específico."""
    try:
        user = db.session.get(User, user_id)
        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404
        
        return jsonify(user_schema.dump(user)), 200
    except Exception as e:
        return jsonify({"msg": f"Error: {str(e)}"}), 500


@users_bp.route("/update", methods=["PUT"])
@jwt_required()
def update_user():
    """Actualiza la información del usuario autenticado."""
    try:
        # Obtener ID del usuario actual
        user_id = int(get_jwt_identity())
        user = db.session.get(User, user_id)
        
        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404
        
        # Obtener datos a actualizar
        data = request.get_json()
        
        # Solo permitir actualizar ciertos campos
        allowed_updates = ['username', 'email']
        updates = {k: v for k, v in data.items() if k in allowed_updates}
        
        # Validar datos de actualización
        validated_data = user_schema.load(updates, partial=True)
        
        # Aplicar actualizaciones
        for key, value in validated_data.items():
            setattr(user, key, value)
        
        db.session.commit()
        
        return jsonify({
            "msg": "Usuario actualizado correctamente",
            "user": user_schema.dump(user)
        }), 200
        
    except ValidationError as err:
        return jsonify({"errors": err.messages}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": f"Error: {str(e)}"}), 500