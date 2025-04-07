"""
Rutas API para gestión de imágenes.

Este módulo proporciona endpoints para subir y gestionar imágenes
para el blog, utilizando Cloudinary como servicio de almacenamiento.
"""

from flask import Blueprint, jsonify, request
from app.services.image_service import ImageService
import os

images_bp = Blueprint("images", __name__)

@images_bp.route("/upload", methods=["POST"])
def upload_image():
    """
    Sube una imagen a Cloudinary.
    
    La imagen debe enviarse como un archivo en un formulario multipart con el campo 'image'.
    Devuelve la URL y otros detalles de la imagen subida.
    """
    if 'image' not in request.files:
        return jsonify({"message": "No se incluyó ninguna imagen"}), 400
    
    file = request.files['image']
    
    if file.filename == '':
        return jsonify({"message": "No se seleccionó ningún archivo"}), 400
    
    # Verificar tipo de archivo
    allowed_extensions = {'png', 'jpg', 'jpeg', 'gif', 'webp'}
    if not ('.' in file.filename and file.filename.rsplit('.', 1)[1].lower() in allowed_extensions):
        return jsonify({"message": "Tipo de archivo no permitido"}), 400
    
    try:
        # Subir la imagen a Cloudinary
        result = ImageService.upload_image(file)
        
        return jsonify({
            "message": "Imagen subida correctamente",
            "image": result
        }), 201
    
    except Exception as e:
        return jsonify({"message": f"Error al subir la imagen: {str(e)}"}), 500