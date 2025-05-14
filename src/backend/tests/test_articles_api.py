import pytest
from app import create_app
from app.extensions import db
from app.models.article import Article
from app.config import TestingConfig


# Crear la app de prueba
@pytest.fixture
def app():
    app = create_app(TestingConfig)  # Usar el entorno de testing
    with app.app_context():
        yield app

# Configuración de la base de datos de prueba
@pytest.fixture
def init_db(app):
    db.create_all()
    yield db
    db.session.remove()
    db.drop_all()

# Test para crear un artículo
def test_create_article(app, init_db):
    article_data = {
        'title': 'Nuevo artículo de prueba',
        'author': 'Boost A Project',
        'excerpt': 'Este es un artículo de prueba',
        'image': 'https://example.com/image.jpg',
        'image_alt': 'Imagen decorativa del artículo', 
        'content': 'Contenido del artículo',
        'meta_description': 'Descripción meta del artículo',
        'meta_keywords': 'artículo, prueba, seo'
    }
    response = app.test_client().post('/api/articles/', json=article_data)
    print(">>> RESPONSE JSON:", response.get_json())
    print(">>> STATUS CODE:", response.status_code)
    assert response.status_code == 201  # 201 creado
    assert 'slug' in response.json  # Asegurarse de que el slug está en la respuesta

# Test para obtener todos los artículos
def test_get_articles(app, init_db):
    response = app.test_client().get('/api/articles/')
    assert response.status_code == 200

    json_data = response.get_json()
    assert isinstance(json_data, dict)
    assert "articles" in json_data
    assert isinstance(json_data["articles"], list)


# Test para obtener un artículo por slug
def test_get_article_by_slug(app, init_db):
    article = Article(title='Test', slug='test-article', content='Test content', image='image.jpg')
    db.session.add(article)
    db.session.commit()
    
    response = app.test_client().get(f'/api/articles/slug/{article.slug}')
    assert response.status_code == 200
    assert response.json['slug'] == article.slug  # Asegurarse de que el slug es correcto
