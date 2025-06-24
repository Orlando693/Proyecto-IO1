from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from modelos import EntradaDatos
from optimizador import optimizar_asignacion

app = FastAPI()

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"mensaje": "API de optimización MILP funcionando correctamente"}

@app.post("/optimizar/")
def ejecutar_optimizador(entrada: EntradaDatos):
    """Endpoint para ejecutar el optimizador de asignación de aulas a grupos.
    Recibe un objeto EntradaDatos con la información de aulas, grupos, bloques disponibles,
    delta y lambda, y devuelve la asignación óptima de aulas a grupos + resumen de resultados con ia.
    """
    aulas = [aula.dict() for aula in entrada.aulas]
    grupos = [grupo.dict() for grupo in entrada.grupos]
    bloques_disponibles = entrada.bloques_disponibles
    delta = entrada.delta
    lambda_ = entrada.lambda_
    resultado = optimizar_asignacion(aulas, grupos, bloques_disponibles, delta, lambda_)
    print("Resultado de la optimización:", resultado)
    return {"asignacion": resultado}

