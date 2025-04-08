import json
from flask import Blueprint, jsonify
from pathlib import Path

static_articles_bp = Blueprint("static_articles", __name__)

@static_articles_bp.route("/static-articles", methods=["GET"])
def get_static_articles():
    """Devuelve artículos almacenados en el JSON estático."""
    path = Path(__file__).resolve().parent.parent / "data" / "articles.json"
    with open(path, "r", encoding="utf-8") as f:
        articles = json.load(f)
    return jsonify(articles), 200
