from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.extensions import db
from app.models.user import User

# Crear el Blueprint para autenticación
auth_bp = Blueprint("auth", __name__)

# REGISTRO DE USUARIO
@auth_bp.route("/signup", methods=["POST"])
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
@auth_bp.route("/login", methods=["POST"])
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
    
    # Convertir el ID a string antes de usarlo como identidad
    access_token = create_access_token(identity=str(user.id))
    
    return jsonify({
        "access_token": access_token,
        "user": user.serialize()
    }), 200

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
        
        return jsonify(user.serialize()), 200
    except Exception as e:
        print(f"Error en el endpoint de perfil: {str(e)}")
        return jsonify({"msg": f"Error: {str(e)}"}), 500