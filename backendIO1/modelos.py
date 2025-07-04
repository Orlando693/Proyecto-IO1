from pydantic import BaseModel
from typing import List, Union

class Aula(BaseModel):
    nombre: str
    capacidad: int
    piso: int

class Grupo(BaseModel):
    nombre: str
    materia: str
    cantidad: int

class BloqueHorario(BaseModel):
    id: int
    bloque: str
    fechaCreacion: str

class EntradaDatos(BaseModel):
    aulas: List[Aula]
    grupos: List[Grupo]
    bloques_disponibles: List[BloqueHorario]
    delta: float
    lambda_: float

