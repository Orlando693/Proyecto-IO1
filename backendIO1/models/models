from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, JSON, Float, Text
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    optimizations = relationship("Optimization", back_populates="usuario")

class Optimization(Base):
    __tablename__ = "optimizations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    aulas = Column(JSON, nullable=False)  # Lista de aulas en formato JSON
    grupos = Column(JSON, nullable=False)  # Lista de grupos en formato JSON
    bloques_disponibles = Column(JSON, nullable=False)  # Lista de bloques horarios
    delta = Column(Float, nullable=False)
    lambda_ = Column(Float, nullable=False)
    resultado = Column(JSON, nullable=True)  # Resultado de la optimización
    resumen_ia = Column(Text, nullable=True)  # Resumen generado por IA
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    usuario = relationship("Usuario", back_populates="optimizations")
