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
    aulas = [aula.dict() for aula in entrada.aulas]
    grupos = [grupo.dict() for grupo in entrada.grupos]
    horarios = [horario.dict() for horario in entrada.horarios]
    delta = entrada.delta
    lambda_ = entrada.lambda_

    resultado = optimizar_asignacion(aulas, grupos, horarios, delta, lambda_)
    return {"asignacion": resultado}
