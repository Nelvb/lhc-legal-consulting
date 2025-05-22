# src/backend/run.py
#
# Script de ejecución principal para la aplicación Flask en entorno local.
# Llama a la función factory `create_app()` y lanza el servidor.
# Todas las configuraciones, rutas, CORS y extensiones se gestionan desde `app/__init__.py`.

from dotenv import load_dotenv
from app import create_app

# Cargar variables de entorno desde .env
load_dotenv()

# Crear la instancia de Flask desde la función factory
app = create_app()

# Ejecutar el servidor si este archivo se lanza directamente
if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)
