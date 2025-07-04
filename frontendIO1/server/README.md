# Servidor de Producción - Sistema de Optimización

Este servidor Express.js está configurado para servir la aplicación React construida en producción.

## 📋 Características

- **Servidor Express**: Servir archivos estáticos desde el directorio `dist`
- **SPA Support**: Soporte completo para Single Page Applications con React Router
- **Rutas Configuradas**: Todas las rutas de la aplicación están mapeadas correctamente
- **Catch-all Route**: Maneja todas las rutas no especificadas para React Router

## 🚀 Cómo usar

### 1. Construir la aplicación
```bash
npm run build
```

### 2. Iniciar el servidor
```bash
npm run start
```

### 3. Construir y servir en un solo comando
```bash
npm run serve
```

## 📍 Rutas Configuradas

### Rutas Públicas
- `/login` - Página de inicio de sesión
- `/register` - Página de registro

### Rutas Privadas (requieren autenticación)
- `/` - Dashboard principal (redirige a `/aulas`)
- `/aulas` - Gestión de aulas
- `/grupos` - Gestión de grupos
- `/horarios` - Gestión de horarios
- `/parametros` - Configuración de parámetros
- `/resultados` - Resultados de optimización
- `/optimizaciones` - Lista de optimizaciones guardadas
- `/dashboard` - Dashboard alternativo

## 🔧 Configuración

### Puerto
El servidor corre en el puerto **3002** por defecto.

### Directorio de archivos
Los archivos estáticos se sirven desde `../dist` (directorio construido por Vite).

### Logs
El servidor muestra logs detallados incluyendo:
- Rutas configuradas
- Directorio de archivos servidos
- Rutas no especificadas (catch-all)

## 🌐 Despliegue

Este servidor está listo para despliegue en:
- **Heroku**
- **Railway**
- **Vercel** (con adaptaciones)
- **DigitalOcean**
- **AWS EC2**
- **Servidor VPS**

### Variables de entorno recomendadas
```env
NODE_ENV=production
PORT=3002
```

## 📝 Notas

- El servidor maneja automáticamente el routing del lado del cliente
- Todas las rutas no especificadas devuelven `index.html` para que React Router funcione
- Los archivos estáticos (CSS, JS, imágenes) se sirven directamente desde Express
- Compatible con aplicaciones SPA que usan React Router v6+

## 🔍 Debugging

Para ver qué rutas se están sirviendo, revisa los logs del servidor:
```bash
npm run start
```

Los logs mostrarán:
- Cada ruta configurada
- Rutas catch-all cuando se accede a rutas no especificadas
- Directorio desde donde se sirven los archivos
