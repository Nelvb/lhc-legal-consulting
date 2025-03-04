import os

from app.api.auth import auth_bp  # Importa el blueprint de autenticación
from app.api.users import users_bp  # Importa el blueprint de usuarios
from app.config import config
from app.extensions import db
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate

# Cargar variables de entorno desde .env
load_dotenv()

# Inicializar la aplicación Flask
app = Flask(__name__)

# Definir entorno (development o production)
env = os.getenv("FLASK_ENV", "development")  # 'development' por defecto
app.config.from_object(config[env])  # Cargar configuración según el entorno

# Inicializar extensiones
db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
CORS(app)

# Registrar blueprints
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(users_bp, url_prefix="/api/users")


# Ruta de prueba
@app.route("/")
def home():
    return jsonify({"message": "API Flask funcionando correctamente"}), 200


# Manejo de errores global
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Recurso no encontrado"}), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Error interno del servidor"}), 500


# Ejecutar la aplicación
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
