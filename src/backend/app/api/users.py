# API de gestión de usuarios: endpoints para listar, consultar y actualizar usuarios
# Proporciona operaciones CRUD protegidas con autenticación JWT
# Incluye validación de datos y manejo de casos de error para cada operación

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.models.user import User
from app.schemas import user_schema, users_schema
from marshmallow import ValidationError

users_bp = Blueprint("users", __name__)

@users_bp.route("/list", methods=["GET"])
@jwt_required(locations=["cookies"])
def get_users():
    """Retorna la lista de usuarios registrados."""
    try:
        users = User.query.all()
        return jsonify(users_schema.dump(users)), 200
    except Exception as e:
        return jsonify({"msg": f"Error: {str(e)}"}), 500

@users_bp.route("/<int:user_id>", methods=["GET"])
@jwt_required(locations=["cookies"])
def get_user(user_id):
    """Obtiene los detalles de un usuario específico por ID."""
    try:
        user = db.session.get(User, user_id)
        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404
        return jsonify(user_schema.dump(user)), 200
    except Exception as e:
        return jsonify({"msg": f"Error: {str(e)}"}), 500

@users_bp.route("/update", methods=["PUT"])
@jwt_required(locations=["cookies"])
def update_user():
    """Permite actualizar información del usuario autenticado."""
    try:
        user_id = int(get_jwt_identity())
        user = db.session.get(User, user_id)

        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        data = request.get_json()
        allowed_updates = {"username", "email", "last_name"}
        updates = {k: v for k, v in data.items() if k in allowed_updates}

        validated_data = user_schema.load(updates, partial=True)

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

@users_bp.route("/delete", methods=["DELETE"])
@jwt_required(locations=["cookies"])
def delete_user():
    """
    Elimina permanentemente la cuenta del usuario autenticado.
    Requiere autenticación con JWT.
    """
    try:
        user_id = int(get_jwt_identity())
        user = db.session.get(User, user_id)

        if not user:
            return jsonify({"msg": "Usuario no encontrado"}), 404

        db.session.delete(user)
        db.session.commit()

        return jsonify({"msg": "Cuenta eliminada correctamente"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": f"Error al eliminar la cuenta: {str(e)}"}), 500
