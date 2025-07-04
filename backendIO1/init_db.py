from database import engine
from models.models import Base

def create_tables():
    """Crear todas las tablas en la base de datos"""
    print("⏳ Creando tablas...")
    Base.metadata.create_all(bind=engine)
    print("✅ Tablas creadas exitosamente.")

if __name__ == "__main__":
    create_tables()