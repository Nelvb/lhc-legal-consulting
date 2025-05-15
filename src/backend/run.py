# Punto de entrada principal para la aplicación Flask
# Configura el entorno, extensiones y rutas para ejecutar el servidor
# Define manejadores de errores globales y usa init_app para inicializar extensiones como JWT, CORS, DB, etc.

import os
from flask import Flask, jsonify
from dotenv import load_dotenv

from app.api.auth import auth_bp
from app.api.users import users_bp
from app.api.articles import articles_bp
from app.api.images import images_bp
from app.models.article import Article
from app.services.image_service import ImageService
from app.api.articles_static import static_articles_bp
from app.api.account import account_bp


from app.config import config
from app.extensions import init_app  # Importa init_app desde extensions

# Cargar variables de entorno desde .env
load_dotenv()

# Inicializar la aplicación Flask
app = Flask(__name__)

# Configuración según entorno
env = os.getenv("FLASK_ENV", "development")
app.config.from_object(config[env])

# Inicializar servicios externos (como Cloudinary)
ImageService.init_cloudinary(app)

# Inicializar extensiones Flask (DB, JWT, CORS, Mail, etc.)
init_app(app)

# Registrar blueprints de rutas
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(users_bp, url_prefix="/api/users")
app.register_blueprint(articles_bp, url_prefix="/api/articles")
app.register_blueprint(images_bp, url_prefix="/api/images")
app.register_blueprint(static_articles_bp, url_prefix="/api/articles")
app.register_blueprint(account_bp, url_prefix="/api/account")


# Ruta de prueba
@app.route("/")
def home():
    return jsonify({"message": "API Flask funcionando correctamente"}), 200

# Errores globales
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Recurso no encontrado"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Error interno del servidor"}), 500

# Ejecutar la aplicación
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
