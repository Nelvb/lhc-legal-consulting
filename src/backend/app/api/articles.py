"""
Rutas API para gestión de artículos del blog.

Este módulo define los endpoints para crear, leer, actualizar y eliminar artículos.
Las rutas gestionan las peticiones HTTP mientras delegan la lógica de negocio
al servicio de artículos.
"""

from flask import Blueprint, jsonify, request
from app.schemas.article_schema import article_schema, articles_schema
from app.services.article_service import ArticleService

articles_bp = Blueprint("articles", __name__)

@articles_bp.route("", methods=["GET"], strict_slashes=False)
@articles_bp.route("/", methods=["GET"], strict_slashes=False)
def get_articles():
    """Obtiene artículos paginados."""
    try:
        page = request.args.get('page', 1, type=int)
        limit = request.args.get('limit', 10, type=int)
        
        articles_data = ArticleService.get_all_articles(page, limit)
        
        return jsonify({
            'articles': articles_schema.dump(articles_data['articles']),
            'total': articles_data['total'],
            'current_page': articles_data['current_page'],
            'total_pages': articles_data['total_pages']
        }), 200
    except Exception as e:
        import traceback
        error_trace = traceback.format_exc()
        print(f"Error en get_articles: {e}\n{error_trace}")
        return jsonify({
            'error': 'Error interno del servidor',
            'message': str(e)
        }), 500

@articles_bp.route("/<int:article_id>", methods=["GET"])
def get_article(article_id):
    """Obtiene un artículo por su ID."""
    article = ArticleService.get_article_by_id(article_id)
    return jsonify(article_schema.dump(article)), 200

@articles_bp.route("/slug/<string:slug>", methods=["GET"])
def get_article_by_slug(slug):
    """Obtiene un artículo por su slug."""
    article = ArticleService.get_article_by_slug(slug)
    return jsonify(article_schema.dump(article)), 200

@articles_bp.route("/", methods=["POST"])
def create_article():
    """Crea un nuevo artículo."""
    if not request.is_json:
        return jsonify({"message": "La solicitud debe ser JSON"}), 400
        
    data = request.get_json()
    
    try:
        # Validar los datos usando el esquema
        article_data = article_schema.load(data)
        
        # Crear el artículo usando el servicio
        new_article = ArticleService.create_article(article_data)
        
        return jsonify(article_schema.dump(new_article)), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 400

@articles_bp.route("/<int:article_id>", methods=["PUT"])
def update_article(article_id):
    """Actualiza un artículo existente."""
    if not request.is_json:
        return jsonify({"message": "La solicitud debe ser JSON"}), 400
        
    data = request.get_json()
    
    try:
        # Validar los datos usando el esquema (permitiendo datos parciales)
        article_data = article_schema.load(data, partial=True)
        
        # Actualizar el artículo usando el servicio
        updated_article = ArticleService.update_article(article_id, article_data)
        
        return jsonify(article_schema.dump(updated_article)), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 400

@articles_bp.route("/<int:article_id>", methods=["DELETE"])
def delete_article(article_id):
    """Elimina un artículo por su ID."""
    try:
        ArticleService.delete_article(article_id)
        return jsonify({"message": "Artículo eliminado correctamente"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 400

@articles_bp.route("/slug/<string:slug>", methods=["DELETE"])
def delete_article_by_slug(slug):
    """Elimina un artículo por su slug."""
    try:
        ArticleService.delete_article_by_slug(slug)
        return jsonify({"message": "Artículo eliminado correctamente"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 400

@articles_bp.route("/slug/<string:slug>", methods=["PUT"])
def update_article_by_slug(slug):
    """Actualiza un artículo existente por su slug."""
    if not request.is_json:
        return jsonify({"message": "La solicitud debe ser JSON"}), 400

    data = request.get_json()

    try:
        # Validar los datos usando el esquema (permitiendo datos parciales)
        article_data = article_schema.load(data, partial=True)

        # Actualizar el artículo usando el servicio
        updated_article = ArticleService.update_article_by_slug(slug, article_data)

        return jsonify(article_schema.dump(updated_article)), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 400

@articles_bp.route("/by-slugs", methods=["POST"])
def get_articles_by_slugs():
    """
    Obtiene una lista de artículos a partir de sus slugs.
    
    Recibe un JSON con una lista de slugs:
    {
        "slugs": ["slug1", "slug2", "slug3"]
    }
    
    Devuelve una lista de artículos correspondientes.
    """
    data = request.get_json()
    slugs = data.get("slugs", [])

    if not isinstance(slugs, list):
        return jsonify({"message": "El campo 'slugs' debe ser una lista"}), 400

    try:
        articles = ArticleService.get_articles_by_slugs(slugs)
        return jsonify(articles_schema.dump(articles)), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 400
