# import_static_articles.py
# -----------------------------------------------------------------------------
# Script CLI para importar artículos desde un archivo JSON a la base de datos.
# Ejecuta la lógica de importación una sola vez sin duplicar artículos.
# -----------------------------------------------------------------------------

import os
import json
from app import create_app
from app.extensions import db
from app.scripts.import_service import importar_articulos_desde_json

# Ruta al archivo JSON con los artículos
JSON_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'articles.json')

# Crear app y ejecutar dentro del contexto
app = create_app()

with app.app_context():
    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        articles_data = json.load(f)

    resultados = importar_articulos_desde_json(articles_data)

    for msg in resultados:
        print(msg)

    print("Proceso de importación completado.")
