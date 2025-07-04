from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from modelos import EntradaDatos
from optimizador import optimizar_asignacion
from routes.user import user
from routes.auth import auth
from routes.optimization import optimization
from config.openapi import tags_metadata
from dependencies import get_db, get_current_user
from models.models import Usuario

app = FastAPI(
    title="Sistema de Optimización de Aulas",
    description="API para la optimización de asignación de aulas a grupos utilizando programación lineal entera mixta (MILP). Incluye autenticación de usuarios y gestión de optimizaciones.",
    version="1.0.0",
    openapi_tags=tags_metadata,
)

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:8002",
        "https://io1.devhoo.me",
        "https://www.io1.devhoo.me",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(auth, prefix="/api/auth")
app.include_router(user, prefix="/api")
app.include_router(optimization, prefix="/api")

@app.get("/")
def home():
    return {
        "mensaje": "API de optimización MILP funcionando correctamente",
        "version": "1.0.0",
        "endpoints": {
            "auth": "/api/auth",
            "users": "/api/users", 
            "optimizations": "/api/optimizations"
        }
    }

@app.post("/api/optimizar/")
def ejecutar_optimizador(
    entrada: EntradaDatos,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Endpoint legacy para ejecutar el optimizador de asignación de aulas a grupos.
    Recibe un objeto EntradaDatos con la información de aulas, grupos, bloques disponibles,
    delta y lambda, y devuelve la asignación óptima de aulas a grupos + resumen de resultados con IA.
    
    NOTA: Este endpoint se mantiene para compatibilidad con el frontend existente.
    Se recomienda usar los nuevos endpoints de /api/optimizations para gestión completa.
    """
    from services import create_optimization
    from schemas.user import OptimizationCreate
    from datetime import datetime
    
    aulas = [aula.dict() for aula in entrada.aulas]
    grupos = [grupo.dict() for grupo in entrada.grupos]
    
    bloques_disponibles = [bloque.bloque for bloque in entrada.bloques_disponibles]
    print(f"Bloques procesados: {bloques_disponibles}")  # Debug
    
    delta = entrada.delta
    lambda_ = entrada.lambda_
    
    # Ejecutar optimización
    print(f"Enviando al optimizador - Bloques: {bloques_disponibles}")  # Debug
    resultado = optimizar_asignacion(aulas, grupos, bloques_disponibles, delta, lambda_)
    print("Resultado de la optimización:", resultado)
    
    # Crear y guardar la optimización en la base de datos
    try:
        optimization_data = OptimizationCreate(
            name=f"Optimización {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
            description="Optimización generada automáticamente desde el frontend",
            aulas=aulas,
            grupos=grupos,
            bloques_disponibles=bloques_disponibles,
            delta=delta,
            lambda_=lambda_
        )
        
        # Crear la optimización en la base de datos
        db_optimization = create_optimization(db, optimization_data, current_user.id)
        
        # Actualizar con el resultado
        if "error" not in resultado:
            from services import update_optimization_result
            resumen_ia = resultado.get("resumen_generado", None)
            asignacion = resultado.get("asignacion", [])
            
            update_optimization_result(
                db, db_optimization.id, current_user.id, 
                {"asignacion": asignacion}, resumen_ia
            )
        
        print(f"Optimización guardada con ID: {db_optimization.id}")
        
    except Exception as e:
        print(f"Error al guardar la optimización: {str(e)}")
        # Continuar devolviendo el resultado aunque falle el guardado
    
    return {"asignacion": resultado}

# Evento de inicio para crear las tablas
@app.on_event("startup")
def startup_event():
    from database import engine
    from models.models import Base
    Base.metadata.create_all(bind=engine)

