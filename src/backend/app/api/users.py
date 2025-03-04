from flask import Blueprint, jsonify

users_bp = Blueprint("users", __name__)


@users_bp.route("/test-users", methods=["GET"])
def test_users():
    return jsonify({"message": "Users funcionando"})
