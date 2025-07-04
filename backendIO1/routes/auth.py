from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from schemas.auth import LoginRequest, LoginResponse, RegisterRequest
from schemas.user import User
from services import get_user_by_email, create_user, verify_password
from dependencies import get_db, create_access_token
from datetime import timedelta

auth = APIRouter()

@auth.post("/login", response_model=LoginResponse, tags=["auth"])
def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    """Iniciar sesión de usuario"""
    # Buscar usuario por email
    user = get_user_by_email(db, login_data.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Verificar contraseña
    if not verify_password(user.password, login_data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Crear token de acceso
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "created_at": user.created_at
        }
    }

@auth.post("/register", response_model=User, tags=["auth"])
def register(user_data: RegisterRequest, db: Session = Depends(get_db)):
    """Registrar nuevo usuario"""
    # Verificar si el email ya existe
    existing_user = get_user_by_email(db, user_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El email ya está registrado"
        )
    
    # Crear nuevo usuario
    user = create_user(db, user_data)
    return user
