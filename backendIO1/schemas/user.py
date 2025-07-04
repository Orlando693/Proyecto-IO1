from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List, Any

class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class UserCount(BaseModel):
    total: int

class OptimizationBase(BaseModel):
    name: str
    description: Optional[str] = None
    aulas: List[dict]
    grupos: List[dict]
    bloques_disponibles: List[str]
    delta: float
    lambda_: float

class OptimizationCreate(OptimizationBase):
    pass

class OptimizationUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    aulas: Optional[List[dict]] = None
    grupos: Optional[List[dict]] = None
    bloques_disponibles: Optional[List[str]] = None
    delta: Optional[float] = None
    lambda_: Optional[float] = None

class Optimization(OptimizationBase):
    id: int
    usuario_id: int
    resultado: Optional[dict] = None
    resumen_ia: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True