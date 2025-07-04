# 🔧 Solución de Problemas CORS

## ❌ Problema
El frontend no puede conectarse al backend desplegado en `https://api.io1.devhoo.me` debido a errores de CORS (Cross-Origin Resource Sharing).

## ✅ Soluciones Implementadas

### 1. **Configuración CORS en Backend** (`backendIO1/main.py`)

```python
# Middleware CORS actualizado
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
        "http://localhost:3000",  # React dev server alternativo
        "http://localhost:8002",  # Servidor de producción local
        "https://io1.devhoo.me",  # Dominio de producción (sin www)
        "https://www.io1.devhoo.me",  # Dominio de producción (con www)
        "https://proyecto-io1.vercel.app",  # Si usas Vercel
        "https://proyecto-io1.netlify.app",  # Si usas Netlify
        "https://proyecto-io1.herokuapp.com",  # Si usas Heroku
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)
```

### 2. **Configuración API Frontend** (`src/services/api.js`)

- ✅ URL base actualizada: `https://api.io1.devhoo.me/api`
- ✅ Timeout aumentado a 30 segundos
- ✅ Mejor manejo de errores de red/CORS
- ✅ Servicio de pruebas incluido

### 3. **Herramientas de Debug**

#### A. **Componente CORSDebugger** (solo en desarrollo)
- Aparece en la esquina inferior derecha durante desarrollo
- Botón "Probar Conectividad" para verificar conexión
- Muestra resultados detallados de todas las pruebas

#### B. **Script de Prueba Manual** (`cors-test.js`)
```javascript
// Ejecutar en consola del navegador
testCORS();
```

## 🚀 Pasos para Solucionar

### 1. **Actualizar Backend**
```bash
cd backendIO1
# Aplicar los cambios de CORS en main.py
# Redesplegar el backend con la nueva configuración
```

### 2. **Verificar Configuración**
- El backend debe incluir tu dominio frontend en `allow_origins`
- Si usas un dominio personalizado, agrégalo a la lista
- Para desarrollo temporal, puedes usar `allow_origins=["*"]`

### 3. **Probar Conectividad**
```bash
cd frontendIO1
npm run dev
# Abre el navegador y busca el componente CORSDebugger
# Haz clic en "Probar Conectividad"
```

### 4. **Verificación Manual**
```bash
# Probar endpoint básico
curl -H "Origin: https://tu-dominio.com" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://api.io1.devhoo.me/

# Debería retornar headers CORS apropiados
```

## 🔍 Diagnóstico de Problemas

### Errores Comunes y Soluciones

#### 1. **"CORS policy: No 'Access-Control-Allow-Origin' header"**
- ✅ Agregar tu dominio a `allow_origins` en el backend
- ✅ Verificar que el dominio esté escrito exactamente igual (https vs http)

#### 2. **"CORS policy: Request header 'authorization' is not allowed"**
- ✅ Verificar que `allow_headers=["*"]` esté configurado
- ✅ O agregar específicamente: `["Content-Type", "Authorization"]`

#### 3. **"Network Error" en desarrollo**
- ✅ Verificar que el backend esté funcionando: `curl https://api.io1.devhoo.me/`
- ✅ Revisar la configuración de red/firewall
- ✅ Probar con `allow_origins=["*"]` temporalmente

#### 4. **Funciona en localhost pero no en producción**
- ✅ Agregar el dominio de producción a `allow_origins`
- ✅ Verificar que `allow_credentials=True` si usas cookies/auth

## 📋 Checklist de Verificación

- [ ] Backend desplegado con nueva configuración CORS
- [ ] Dominio frontend incluido en `allow_origins`
- [ ] Métodos HTTP permitidos: GET, POST, PUT, DELETE, OPTIONS
- [ ] Headers permitidos: Content-Type, Authorization
- [ ] `allow_credentials=True` si usas autenticación
- [ ] Endpoint `/api/health` responde correctamente
- [ ] CORSDebugger muestra todas las pruebas en verde

## 🆘 Si Nada Funciona

### Configuración Temporal Permisiva
```python
# Solo para desarrollo/debug - NO usar en producción
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Contactar Soporte
Si el problema persiste:
1. Ejecutar `testCORS()` en la consola del navegador
2. Tomar screenshot de los errores en Network tab (F12)
3. Verificar logs del servidor backend
4. Compartir la configuración CORS actual

## 🔗 Enlaces Útiles

- [Documentación CORS MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [FastAPI CORS Middleware](https://fastapi.tiangolo.com/tutorial/cors/)
- [Testing CORS](https://www.test-cors.org/)

---

**Nota**: Después de aplicar estos cambios, asegúrate de redesplegar el backend y limpiar la caché del navegador (Ctrl+F5).
