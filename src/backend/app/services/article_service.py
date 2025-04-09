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
import math

class ArticleService:
    @staticmethod
    def get_all_articles(page=1, limit=10):
        """Obtiene artículos paginados ordenados por fecha de creación."""
        # Calcula el offset
        offset = (page - 1) * limit
        
        # Obtiene los artículos paginados
        articles = Article.query.order_by(desc(Article.date)) \
            .offset(offset) \
            .limit(limit) \
            .all()
        
        # Cuenta total de artículos
        total_articles = Article.query.count()
        
        # Calcula total de páginas
        total_pages = math.ceil(total_articles / limit)
        
        return {
            'articles': articles,
            'total': total_articles,
            'current_page': page,
            'total_pages': total_pages
        }

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
        if 'excerpt' not in article_data or not article_data['excerpt']:
            content = article_data['content']
            clean_content = re.sub(r'<.*?>', '', content)
            article_data['excerpt'] = clean_content[:150] + '...' if len(clean_content) > 150 else clean_content

        # Convertir related a texto plano si viene como lista (asegura compatibilidad con el modelo actual)
        if 'related' in article_data and isinstance(article_data['related'], list):
            article_data['related'] = ','.join(article_data['related'])

        new_article = Article(**article_data)
        db.session.add(new_article)
        db.session.commit()
        return new_article

    @staticmethod
    def update_article(article_id, article_data):
        """Actualiza un artículo existente."""
        article = Article.query.get_or_404(article_id)

        for key, value in article_data.items():
            if key == 'related' and isinstance(value, list):
                value = ','.join(value)
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
