"""
routes.py - Rutas generales de la aplicación
Este módulo contiene endpoints generales del sistema que no están relacionados
con autenticación o gestión específica de usuarios. Sirve como punto central 
para funcionalidades comunes de la aplicación.
"""

from flask import Blueprint, jsonify

# Crear el blueprint para rutas generales
routes = Blueprint("routes", __name__)


@routes.route("/health", methods=["GET"])
def health_check():
    """Endpoint de verificación de salud del sistema."""
    return jsonify({
        "status": "ok",
        "message": "API funcionando correctamente"
    }), 200


@routes.route("/info", methods=["GET"])
def api_info():
    """Proporciona información general sobre la API."""
    return jsonify({
        "name": "Starter Template API",
        "version": "1.0.0",
        "description": "API para el proyecto Starter Template",
        "endpoints": {
            "auth": ["/api/auth/signup", "/api/auth/login", "/api/auth/profile"],
            "users": ["/api/users/list"],
            "general": ["/api/health", "/api/info"]
        }
    }), 200