from pydantic import BaseModel
from typing import List

class Aula(BaseModel):
    nombre: str
    capacidad: int
    piso: int

class Grupo(BaseModel):
    nombre: str
    materia: str
    cantidad: int

class EntradaDatos(BaseModel):
    aulas: List[Aula]
    grupos: List[Grupo]
    bloques_disponibles: List[str]
    delta: float
    lambda_: float

