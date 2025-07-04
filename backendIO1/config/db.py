from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base

# Crear la instancia de Base para los modelos
Base = declarative_base()

# Función para obtener la URL de la base de datos
def get_database_url():
    return "postgresql://postgres@localhost:5432/system_optimization"

# Crear el engine
engine = create_engine(get_database_url(), echo=True)
