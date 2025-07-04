from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

load_dotenv()
# Crear la instancia de Base para los modelos
Base = declarative_base()

# Función para obtener la URL de la base de datos
def get_database_url():
    # return "postgresql+psycopg://postgres@localhost:5432/system_optimization"
    return os.getenv("DATABASE_URL") or "postgresql+psycopg://postgres@localhost:5432/system_optimization"

# Crear el engine
engine = create_engine(get_database_url(), echo=True)

# Configurar la sesión de la base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
