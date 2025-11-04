# Rutas generales de la API para monitoreo y diagnóstico del sistema
# Define endpoints para verificación de salud y metadatos de la aplicación
# Sirve como punto de entrada para información general sobre la API

from flask import Blueprint, jsonify, make_response

# Crear el blueprint para rutas generales
routes = Blueprint("routes", __name__)


@routes.route("/health", methods=["GET"])
def health_check():
    """Endpoint de verificación de salud del sistema con caché HTTP de 1 minuto."""
    response = make_response(jsonify({
        "status": "ok",
        "message": "API funcionando correctamente"
    }))
    response.headers['Cache-Control'] = 'public, max-age=60'  # 1 minuto para health check
    return response, 200


@routes.route("/info", methods=["GET"])
def api_info():
    """Proporciona información general sobre la API con caché HTTP de 5 minutos."""
    response = make_response(jsonify({
        "name": "Starter Template API",
        "version": "1.0.0",
        "description": "API para el proyecto Starter Template",
        "endpoints": {
            "auth": ["/api/auth/signup", "/api/auth/login", "/api/auth/profile"],
            "users": ["/api/users/list"],
            "general": ["/api/health", "/api/info"]
        }
    }))
    response.headers['Cache-Control'] = 'public, max-age=300'  # 5 minutos
    return response, 200