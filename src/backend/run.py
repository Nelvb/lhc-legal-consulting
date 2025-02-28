import os
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from app.config import config
from app.extensions import db
from app.api.routes import routes

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

# Importar y registrar las rutas
app.register_blueprint(routes)

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
    app.run(debug=True)
