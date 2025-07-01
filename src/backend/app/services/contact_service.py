# app/services/contact_service.py
# Servicio profesional para gestionar leads enviados a través del formulario público.
# Permite almacenar el mensaje y revocar posteriormente el consentimiento de privacidad.
# Incluye filtrado avanzado por email, estado y ordenación para el panel admin.

from app.extensions import db
from app.models.contact_message import ContactMessage
from datetime import datetime
from typing import Optional

def save_contact_message(name: str, email: str, subject: str, message: str, phone: Optional[str] = None) -> ContactMessage:

    """
    Guarda un mensaje de contacto en la base de datos.
    Se marca por defecto como consentimiento aceptado (privacy_accepted=True).
    El número de teléfono es opcional.
    """
    new_message = ContactMessage(
        full_name=name.strip(),
        email=email.strip().lower(),
        subject=subject.strip(),
        message=message.strip(),
        phone=phone.strip() if phone else None,
        privacy_accepted=True,
        revoked=False,
        created_at=datetime.utcnow()
    )
    db.session.add(new_message)
    db.session.commit()
    return new_message


def revoke_contact_privacy(contact_id: int) -> bool:
    """
    Marca un contacto como revocado (privacy_accepted = False).
    Guarda la fecha de revocación.
    """
    message = ContactMessage.query.get(contact_id)
    if not message or message.revoked:
        return False

    message.privacy_accepted = False
    message.revoked = True
    message.revoked_at = datetime.utcnow()
    db.session.commit()
    return True


def get_all_contact_messages() -> list[ContactMessage]:
    """
    Devuelve todos los mensajes de contacto registrados.
    Útil para el panel del administrador.
    """
    return ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()


def get_filtered_contact_messages(
    email_filter: str = '',
    status_filter: str = 'all',
    sort_by: str = 'created_at',
    order: str = 'desc'
) -> list[ContactMessage]:
    """
    Devuelve mensajes de contacto filtrados y ordenados.
    Permite búsqueda por email, filtrado por estado y ordenación personalizada.
    
    Args:
        email_filter: Búsqueda parcial por email (case-insensitive)
        status_filter: 'all', 'active', 'revoked'
        sort_by: 'created_at', 'email', 'full_name'
        order: 'asc', 'desc'
    """
    query = ContactMessage.query
    
    # Filtro por email (búsqueda parcial, case-insensitive)
    if email_filter:
        query = query.filter(ContactMessage.email.ilike(f'%{email_filter}%'))
    
    # Filtro por estado de privacidad
    if status_filter == 'active':
        query = query.filter(ContactMessage.privacy_accepted == True, ContactMessage.revoked == False)
    elif status_filter == 'revoked':
        query = query.filter(ContactMessage.revoked == True)
    # 'all' no necesita filtro adicional
    
    # Ordenación
    if sort_by == 'email':
        if order == 'asc':
            query = query.order_by(ContactMessage.email.asc())
        else:
            query = query.order_by(ContactMessage.email.desc())
    elif sort_by == 'full_name':
        if order == 'asc':
            query = query.order_by(ContactMessage.full_name.asc())
        else:
            query = query.order_by(ContactMessage.full_name.desc())
    else:  # sort_by == 'created_at' (default)
        if order == 'asc':
            query = query.order_by(ContactMessage.created_at.asc())
        else:
            query = query.order_by(ContactMessage.created_at.desc())
    
    return query.all()