#!/usr/bin/env python3
"""
Script de diagnóstico para verificar el estado de la API en producción
"""

import requests
import json
import time
from urllib.parse import urljoin

# Configuración
PRODUCTION_API_URL = "https://api.io1.devhoo.me"
PRODUCTION_FRONTEND_URL = "https://io1.devhoo.me"

def test_endpoint(url, method="GET", data=None, headers=None):
    """Prueba un endpoint específico"""
    try:
        print(f"\n🔍 Probando {method} {url}")
        
        if headers is None:
            headers = {}
        
        # Agregar headers comunes
        headers.update({
            "User-Agent": "Mozilla/5.0 (compatible; Debug/1.0)",
            "Accept": "application/json",
            "Content-Type": "application/json"
        })
        
        if method == "GET":
            response = requests.get(url, headers=headers, timeout=10)
        elif method == "POST":
            response = requests.post(url, json=data, headers=headers, timeout=10)
        elif method == "OPTIONS":
            response = requests.options(url, headers=headers, timeout=10)
        else:
            raise ValueError(f"Método no soportado: {method}")
            
        print(f"✅ Status: {response.status_code}")
        print(f"✅ Headers: {dict(response.headers)}")
        
        if response.headers.get('content-type', '').startswith('application/json'):
            try:
                content = response.json()
                print(f"✅ Content: {json.dumps(content, indent=2)}")
            except:
                print(f"❌ Error parsing JSON: {response.text[:200]}...")
        else:
            print(f"✅ Content: {response.text[:200]}...")
            
        return response
        
    except requests.exceptions.Timeout:
        print(f"❌ TIMEOUT: La solicitud tardó más de 10 segundos")
        return None
    except requests.exceptions.ConnectionError as e:
        print(f"❌ CONNECTION ERROR: {str(e)}")
        return None
    except requests.exceptions.RequestException as e:
        print(f"❌ REQUEST ERROR: {str(e)}")
        return None
    except Exception as e:
        print(f"❌ UNEXPECTED ERROR: {str(e)}")
        return None

def test_cors_preflight(url, origin):
    """Prueba específica de CORS preflight"""
    print(f"\n🔍 Probando CORS preflight para {origin}")
    
    headers = {
        "Origin": origin,
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "Content-Type, Authorization"
    }
    
    return test_endpoint(url, method="OPTIONS", headers=headers)

def test_login_flow():
    """Prueba el flujo completo de login"""
    print("\n🔍 Probando flujo de login...")
    
    # Datos de prueba
    test_user = {
        "username": "testuser",
        "password": "testpass123"
    }
    
    # Intentar register primero
    register_url = urljoin(PRODUCTION_API_URL, "/api/auth/register")
    print(f"Intentando registrar usuario de prueba...")
    register_response = test_endpoint(register_url, method="POST", data=test_user)
    
    # Intentar login
    login_url = urljoin(PRODUCTION_API_URL, "/api/auth/login")
    print(f"Intentando hacer login...")
    login_response = test_endpoint(login_url, method="POST", data=test_user)
    
    return login_response

def main():
    """Función principal de diagnóstico"""
    print("🚀 Iniciando diagnóstico de producción...")
    print(f"API URL: {PRODUCTION_API_URL}")
    print(f"Frontend URL: {PRODUCTION_FRONTEND_URL}")
    
    # 1. Prueba básica de conectividad
    print("\n" + "="*50)
    print("1. PRUEBA DE CONECTIVIDAD BÁSICA")
    print("="*50)
    
    root_response = test_endpoint(PRODUCTION_API_URL + "/")
    if not root_response:
        print("❌ No se puede conectar al endpoint raíz. El servidor puede estar caído.")
        return
    
    # 2. Prueba de health check
    print("\n" + "="*50)
    print("2. PRUEBA DE HEALTH CHECK")
    print("="*50)
    
    health_response = test_endpoint(PRODUCTION_API_URL + "/api/health")
    
    # 3. Prueba de CORS info
    print("\n" + "="*50)
    print("3. PRUEBA DE CONFIGURACIÓN CORS")
    print("="*50)
    
    cors_response = test_endpoint(PRODUCTION_API_URL + "/api/cors-info")
    
    # 4. Prueba de CORS preflight
    print("\n" + "="*50)
    print("4. PRUEBA DE CORS PREFLIGHT")
    print("="*50)
    
    login_url = PRODUCTION_API_URL + "/api/auth/login"
    
    # Prueba desde el frontend de producción
    test_cors_preflight(login_url, PRODUCTION_FRONTEND_URL)
    
    # Prueba desde localhost (desarrollo)
    test_cors_preflight(login_url, "http://localhost:5173")
    
    # 5. Prueba de endpoints de auth
    print("\n" + "="*50)
    print("5. PRUEBA DE ENDPOINTS DE AUTENTICACIÓN")
    print("="*50)
    
    # Verificar si el endpoint existe
    test_endpoint(login_url, method="POST", data={"username": "invalid", "password": "invalid"})
    
    # 6. Prueba de flujo completo de login
    print("\n" + "="*50)
    print("6. PRUEBA DE FLUJO COMPLETO DE LOGIN")
    print("="*50)
    
    test_login_flow()
    
    print("\n" + "="*50)
    print("DIAGNÓSTICO COMPLETADO")
    print("="*50)
    
    print("""
📋 CHECKLIST DE POSIBLES PROBLEMAS:

1. ¿El servidor está ejecutándose correctamente?
2. ¿Las variables de entorno están configuradas (ENVIRONMENT=production)?
3. ¿La base de datos está conectada?
4. ¿El dominio está correctamente configurado?
5. ¿Los certificados SSL están válidos?
6. ¿Los headers CORS están correctamente configurados?
7. ¿El JWT_SECRET está configurado?
8. ¿Los logs del servidor muestran algún error?
    """)

if __name__ == "__main__":
    main()
