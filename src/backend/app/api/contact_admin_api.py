# app/api/contact_admin_api.py
# API privada para administración de consultas legales (leads).
# Permite al administrador ver todos los mensajes y revocar la privacidad.
# Incluye filtrado por email, estado y ordenación profesional.

from flask import Blueprint, jsonify, request
from app.services.contact_service import get_all_contact_messages, revoke_contact_privacy, get_filtered_contact_messages
from app.utils.auth import admin_required

contact_admin_api = Blueprint("contact_admin_api", __name__, url_prefix="/api/admin/contact")


@contact_admin_api.route("", methods=["GET"])
@admin_required
def get_all_contacts():
    """
    Devuelve todos los mensajes enviados desde los formularios de contacto.
    Soporta filtrado por email, estado y ordenación.
    Accesible solo para administradores autenticados.
    
    Parámetros query opcionales:
    - email: filtrar por email (búsqueda parcial)
    - status: 'all', 'active', 'revoked'
    - sort: 'created_at', 'email', 'full_name'
    - order: 'asc', 'desc'
    """
    # Obtener parámetros de filtrado
    email_filter = request.args.get('email', '').strip()
    status_filter = request.args.get('status', 'all')
    sort_by = request.args.get('sort', 'created_at')
    order = request.args.get('order', 'desc')
    
    # Validar parámetros
    valid_statuses = ['all', 'active', 'revoked']
    valid_sorts = ['created_at', 'email', 'full_name']
    valid_orders = ['asc', 'desc']
    
    if status_filter not in valid_statuses:
        status_filter = 'all'
    if sort_by not in valid_sorts:
        sort_by = 'created_at'
    if order not in valid_orders:
        order = 'desc'
    
    # Obtener mensajes filtrados
    messages = get_filtered_contact_messages(
        email_filter=email_filter,
        status_filter=status_filter,
        sort_by=sort_by,
        order=order
    )
    
    return jsonify({
        'messages': [m.serialize() for m in messages],
        'total': len(messages),
        'filters': {
            'email': email_filter,
            'status': status_filter,
            'sort': sort_by,
            'order': order
        }
    }), 200


@contact_admin_api.route("/<int:contact_id>/revoke", methods=["PATCH"])
@admin_required
def revoke_privacy(contact_id):
    """
    Revoca el consentimiento de privacidad de un lead concreto.
    Marca el mensaje como revocado y guarda la fecha de revocación.
    """
    success = revoke_contact_privacy(contact_id)
    if not success:
        return jsonify({"error": "Mensaje no encontrado o ya revocado"}), 404
    return jsonify({"message": "Consentimiento revocado correctamente"}), 200