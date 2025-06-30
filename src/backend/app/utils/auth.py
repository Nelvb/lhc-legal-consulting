# app/utils/auth.py
# Decorador para restringir rutas a administradores.
# Se basa en el claim "role" dentro del JWT.

from flask_jwt_extended import verify_jwt_in_request, get_jwt
from functools import wraps
from flask import jsonify

def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        claims = get_jwt()
        if claims.get("role") != "admin":
            return jsonify({"msg": "Acceso denegado: se requieren permisos de administrador"}), 403
        return fn(*args, **kwargs)
    return wrapper
