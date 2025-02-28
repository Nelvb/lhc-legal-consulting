from app import app, db
from models import User

with app.app_context():
    nuevo_usuario = User(username="nelson", email="nelson@example.com")
    nuevo_usuario.set_password("1234")  # Hash de la contraseña
    db.session.add(nuevo_usuario)
    db.session.commit()

    print(User.query.all())  # Esto debe mostrar [<User nelson>]
