"""
Servicio para gestión de imágenes.

Este módulo proporciona funciones para subir, procesar y gestionar imágenes
utilizando Cloudinary como servicio de almacenamiento en la nube.
"""

import cloudinary
import cloudinary.uploader
import os
from flask import current_app

class ImageService:
    @staticmethod
    def init_cloudinary(app):
        """Inicializa la configuración de Cloudinary desde las variables de entorno."""
        cloudinary.config(
            cloud_name=app.config.get('CLOUDINARY_CLOUD_NAME'),
            api_key=app.config.get('CLOUDINARY_API_KEY'),
            api_secret=app.config.get('CLOUDINARY_API_SECRET')
        )
    
    @staticmethod
    def upload_image(file, folder="blog"):
        """
        Sube una imagen a Cloudinary y devuelve la URL.
        
        Args:
            file: Objeto archivo de Flask (request.files['image'])
            folder: Carpeta en Cloudinary donde guardar la imagen
            
        Returns:
            dict: Información de la imagen subida, incluyendo URL
        """
        # Comprueba si el archivo es válido
        if not file:
            raise ValueError("No se proporcionó un archivo")
        
        # Configuración de transformaciones y opciones
        options = {
            "folder": folder,
            "resource_type": "image",
            "transformation": [
                # Optimización para web
                {"quality": "auto", "fetch_format": "auto"},
                # Redimensionar manteniendo la proporción
                {"width": 1200, "crop": "limit"}
            ]
        }
        
        # Subir la imagen
        result = cloudinary.uploader.upload(file, **options)
        
        return {
            "url": result['secure_url'],
            "public_id": result['public_id'],
            "width": result['width'],
            "height": result['height'],
            "format": result['format']
        }
    
    @staticmethod
    def delete_image(public_id):
        """
        Elimina una imagen de Cloudinary.
        
        Args:
            public_id: ID público de la imagen en Cloudinary
            
        Returns:
            bool: True si se eliminó correctamente
        """
        if not public_id:
            return False
        
        result = cloudinary.uploader.destroy(public_id)
        return result.get('result') == 'ok'