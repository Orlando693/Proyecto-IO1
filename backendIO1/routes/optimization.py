from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from schemas.user import Optimization, OptimizationCreate, OptimizationUpdate
from models.models import Usuario
from services import (
    create_optimization, get_optimizations, get_optimization_by_id,
    update_optimization, delete_optimization, update_optimization_result
)
from dependencies import get_db, get_current_user
from optimizador import optimizar_asignacion

optimization = APIRouter()

@optimization.get("/optimizations", response_model=List[Optimization], tags=["optimizations"])
def get_user_optimizations(
    skip: int = 0,
    limit: int = 100,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Obtener todas las optimizaciones del usuario actual"""
    optimizations = get_optimizations(db, current_user.id, skip, limit)
    return optimizations

@optimization.post("/optimizations", response_model=Optimization, tags=["optimizations"])
def create_new_optimization(
    optimization_data: OptimizationCreate,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Crear una nueva optimización"""
    optimization = create_optimization(db, optimization_data, current_user.id)
    return optimization

@optimization.get("/optimizations/{optimization_id}", response_model=Optimization, tags=["optimizations"])
def get_optimization(
    optimization_id: int,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Obtener una optimización específica por ID"""
    optimization = get_optimization_by_id(db, optimization_id, current_user.id)
    if not optimization:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Optimización no encontrada"
        )
    return optimization

@optimization.put("/optimizations/{optimization_id}", response_model=Optimization, tags=["optimizations"])
def update_optimization_endpoint(
    optimization_id: int,
    optimization_update: OptimizationUpdate,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Actualizar una optimización existente"""
    optimization = update_optimization(db, optimization_id, current_user.id, optimization_update)
    if not optimization:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Optimización no encontrada"
        )
    return optimization

@optimization.delete("/optimizations/{optimization_id}", tags=["optimizations"])
def delete_optimization_endpoint(
    optimization_id: int,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Eliminar una optimización"""
    deleted = delete_optimization(db, optimization_id, current_user.id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Optimización no encontrada"
        )
    return {"message": "Optimización eliminada exitosamente"}

@optimization.post("/optimizations/{optimization_id}/execute", response_model=Optimization, tags=["optimizations"])
def execute_optimization(
    optimization_id: int,
    current_user: Usuario = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Ejecutar una optimización y guardar los resultados"""
    # Obtener la optimización
    optimization_obj = get_optimization_by_id(db, optimization_id, current_user.id)
    if not optimization_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Optimización no encontrada"
        )
    
    try:
        # Ejecutar el optimizador
        resultado = optimizar_asignacion(
            optimization_obj.aulas,
            optimization_obj.grupos,
            optimization_obj.bloques_disponibles,
            optimization_obj.delta,
            optimization_obj.lambda_
        )
        
        # Actualizar la optimización con los resultados
        if "error" in resultado:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Error en la optimización: {resultado['error']}"
            )
        
        # Extraer el resumen si existe
        resumen_ia = resultado.get("resumen", None)
        asignacion = resultado.get("asignacion", [])
        
        updated_optimization = update_optimization_result(
            db, optimization_id, current_user.id, 
            {"asignacion": asignacion}, resumen_ia
        )
        
        return updated_optimization
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al ejecutar la optimización: {str(e)}"
        )
