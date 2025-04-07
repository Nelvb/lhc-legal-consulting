"""
Servicios para la gestión de artículos.

Este módulo contiene la lógica de negocio relacionada con los artículos del blog.
Centraliza todas las operaciones de acceso, creación, actualización y eliminación.
"""

from app.models.article import Article
from app.extensions import db
from flask import abort
from sqlalchemy import desc
import re

class ArticleService:
    @staticmethod
    def get_all_articles():
        """Obtiene todos los artículos ordenados por fecha de creación."""
        return Article.query.order_by(desc(Article.date)).all()
    
    @staticmethod
    def get_article_by_id(article_id):
        """Obtiene un artículo por su ID."""
        article = Article.query.get_or_404(article_id)
        return article
    
    @staticmethod
    def get_article_by_slug(slug):
        """Obtiene un artículo por su slug."""
        article = Article.query.filter_by(slug=slug).first_or_404()
        return article
    
    @staticmethod
    def create_article(article_data):
        """Crea un nuevo artículo."""
        # Verificar si necesitamos generar un extracto automático
        if 'excerpt' not in article_data or not article_data['excerpt']:
            content = article_data['content']
            # Eliminar etiquetas HTML si existen para el extracto
            clean_content = re.sub(r'<.*?>', '', content)
            # Limitar a 150 caracteres
            article_data['excerpt'] = clean_content[:150] + '...' if len(clean_content) > 150 else clean_content
        
        # Crear y guardar el artículo
        new_article = Article(**article_data)
        db.session.add(new_article)
        db.session.commit()
        return new_article
    
    @staticmethod
    def update_article(article_id, article_data):
        """Actualiza un artículo existente."""
        article = Article.query.get_or_404(article_id)
        
        # Actualizar los campos del artículo
        for key, value in article_data.items():
            setattr(article, key, value)
        
        db.session.commit()
        return article
    
    @staticmethod
    def delete_article(article_id):
        """Elimina un artículo."""
        article = Article.query.get_or_404(article_id)
        db.session.delete(article)
        db.session.commit()
        return True