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
import os

app = FastAPI(
    title="Sistema de Optimización de Aulas",
    description="API para la optimización de asignación de aulas a grupos utilizando programación lineal entera mixta (MILP). Incluye autenticación de usuarios y gestión de optimizaciones.",
    version="1.0.0",
    openapi_tags=tags_metadata,
)

# Configuración de CORS más permisiva para desarrollo
# En producción, especifica los dominios exactos por seguridad
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

if ENVIRONMENT == "production":
    # CORS restrictivo para producción
    allowed_origins = [
        "https://io1.devhoo.me",
        "https://www.io1.devhoo.me",
        "https://proyecto-io1.vercel.app",
        "https://proyecto-io1.netlify.app",
        "https://proyecto-io1.herokuapp.com",
        # Agregar aquí los dominios específicos de producción
    ]
else:
    # CORS permisivo para desarrollo
    allowed_origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True if ENVIRONMENT == "production" else False,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Incluir routers
app.include_router(auth, prefix="/api/auth")
app.include_router(user, prefix="/api")
app.include_router(optimization, prefix="/api")

@app.get("/")
def home():
    return {
        "mensaje": "API de optimización MILP funcionando correctamente",
        "version": "1.0.0",
        "environment": ENVIRONMENT,
        "cors_origins": allowed_origins if ENVIRONMENT != "development" else "Todos los orígenes permitidos (desarrollo)",
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
    """
    Endpoint para ejecutar el optimizador MILP con los datos proporcionados.
    
    - **entrada**: Datos de entrada que incluyen aulas, grupos, horarios y parámetros
    - **return**: Resultado de la optimización con asignaciones y resumen
    """
    try:
        # Usar el optimizador existente
        resultado = optimizar_asignacion(entrada, current_user, db)
        return resultado
    except Exception as e:
        print(f"Error en optimización: {str(e)}")
        # En caso de error, retornar un formato consistente
        return {
            "asignacion": {"error": f"Error en la optimización: {str(e)}"},
            "mensaje": "Error durante el proceso de optimización"
        }

# Endpoint adicional para verificar CORS
@app.get("/api/health")
def health_check():
    """Endpoint simple para verificar que la API esté funcionando y CORS configurado"""
    return {
        "status": "healthy",
        "message": "API funcionando correctamente",
        "cors_test": "OK"
    }

# Endpoint para obtener configuración CORS (solo para debug)
@app.get("/api/cors-info")
def cors_info():
    """Información sobre la configuración CORS actual"""
    return {
        "environment": ENVIRONMENT,
        "allowed_origins": allowed_origins if ENVIRONMENT != "development" else "All origins (*)",
        "credentials_allowed": True if ENVIRONMENT == "production" else False
    }
