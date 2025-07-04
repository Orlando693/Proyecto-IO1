from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from schemas.user import User, UserCount, UserCreate
from models.models import Usuario
from services import get_users, get_users_count, get_user_by_id, create_user
from dependencies import get_db, get_current_user

user = APIRouter()

@user.get(
    "/users",
    tags=["users"],
    response_model=List[User],
    description="Get a list of all users",
)
def get_all_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Obtener lista de todos los usuarios (requiere autenticación)"""
    users = get_users(db, skip, limit)
    return users

@user.get("/users/count", tags=["users"], response_model=UserCount)
def get_users_count_endpoint(
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Obtener conteo de usuarios (requiere autenticación)"""
    count = get_users_count(db)
    return {"total": count}

@user.get("/users/me", tags=["users"], response_model=User)
def get_current_user_info(current_user: Usuario = Depends(get_current_user)):
    """Obtener información del usuario actual"""
    return current_user

@user.get(
    "/users/{user_id}",
    tags=["users"],
    response_model=User,
    description="Get a single user by Id",
)
def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: Usuario = Depends(get_current_user)
):
    """Obtener un usuario específico por ID (requiere autenticación)"""
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )
    return user