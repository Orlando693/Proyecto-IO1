from sqlalchemy.orm import Session
from models.models import Usuario, Optimization
from schemas.user import UserCreate, OptimizationCreate, OptimizationUpdate
from schemas.auth import RegisterRequest
from cryptography.fernet import Fernet
from datetime import datetime
from typing import List, Optional

# Configuración de encriptación - usar una clave fija para desarrollo
# En producción, usar una clave desde variables de entorno
ENCRYPTION_KEY = b'GnWd59n-82kzlCPINfI8kZM9rRjypdnuBC_aajeynyE='  # Clave válida Fernet
cipher_suite = Fernet(ENCRYPTION_KEY)

# Servicios para Usuario
def get_user_by_email(db: Session, email: str):
    """Obtener usuario por email"""
    return db.query(Usuario).filter(Usuario.email == email).first()

def get_user_by_id(db: Session, user_id: int):
    """Obtener usuario por ID"""
    return db.query(Usuario).filter(Usuario.id == user_id).first()

def create_user(db: Session, user: RegisterRequest):
    """Crear nuevo usuario"""
    # Encriptar la contraseña
    encrypted_password = cipher_suite.encrypt(user.password.encode('utf-8'))
    
    db_user = Usuario(
        name=user.name,
        email=user.email,
        password=encrypted_password.decode('utf-8')
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def verify_password(stored_password: str, provided_password: str) -> bool:
    """Verificar contraseña"""
    try:
        decrypted_password = cipher_suite.decrypt(stored_password.encode('utf-8')).decode('utf-8')
        return decrypted_password == provided_password
    except:
        return False

def get_users(db: Session, skip: int = 0, limit: int = 100):
    """Obtener lista de usuarios"""
    return db.query(Usuario).offset(skip).limit(limit).all()

def get_users_count(db: Session):
    """Obtener conteo de usuarios"""
    return db.query(Usuario).count()

# Servicios para Optimización
def create_optimization(db: Session, optimization: OptimizationCreate, user_id: int):
    """Crear nueva optimización"""
    db_optimization = Optimization(
        name=optimization.name,
        description=optimization.description,
        usuario_id=user_id,
        aulas=optimization.aulas,
        grupos=optimization.grupos,
        bloques_disponibles=optimization.bloques_disponibles,
        delta=optimization.delta,
        lambda_=optimization.lambda_
    )
    db.add(db_optimization)
    db.commit()
    db.refresh(db_optimization)
    return db_optimization

def get_optimizations(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    """Obtener optimizaciones del usuario"""
    return db.query(Optimization).filter(
        Optimization.usuario_id == user_id
    ).offset(skip).limit(limit).all()

def get_optimization_by_id(db: Session, optimization_id: int, user_id: int):
    """Obtener optimización por ID"""
    return db.query(Optimization).filter(
        Optimization.id == optimization_id,
        Optimization.usuario_id == user_id
    ).first()

def update_optimization(db: Session, optimization_id: int, user_id: int, optimization_update: OptimizationUpdate):
    """Actualizar optimización"""
    db_optimization = db.query(Optimization).filter(
        Optimization.id == optimization_id,
        Optimization.usuario_id == user_id
    ).first()
    
    if not db_optimization:
        return None
    
    update_data = optimization_update.dict(exclude_unset=True)
    if update_data:
        update_data['updated_at'] = datetime.utcnow()
        for field, value in update_data.items():
            setattr(db_optimization, field, value)
        
        db.commit()
        db.refresh(db_optimization)
    
    return db_optimization

def update_optimization_result(db: Session, optimization_id: int, user_id: int, resultado: dict, resumen_ia: str = None):
    """Actualizar resultado de optimización"""
    db_optimization = db.query(Optimization).filter(
        Optimization.id == optimization_id,
        Optimization.usuario_id == user_id
    ).first()
    
    if not db_optimization:
        return None
    
    db_optimization.resultado = resultado
    if resumen_ia:
        db_optimization.resumen_ia = resumen_ia
    db_optimization.updated_at = datetime.utcnow()
    
    db.commit()
    db.refresh(db_optimization)
    return db_optimization

def delete_optimization(db: Session, optimization_id: int, user_id: int):
    """Eliminar optimización"""
    db_optimization = db.query(Optimization).filter(
        Optimization.id == optimization_id,
        Optimization.usuario_id == user_id
    ).first()
    
    if not db_optimization:
        return False
    
    db.delete(db_optimization)
    db.commit()
    return True
