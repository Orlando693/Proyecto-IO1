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

class Horario(BaseModel):
    dia: str
    bloque: str

class EntradaDatos(BaseModel):
    aulas: List[Aula]
    grupos: List[Grupo]
    horarios: List[Horario]
    delta: float
    lambda_: float
