import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 8002

console.log('🚀 Iniciando servidor...')

// Configurar middleware para servir archivos estáticos
const distPath = path.resolve(__dirname, '../dist')
console.log(`📂 Directorio de archivos: ${distPath}`)

app.use(express.static(distPath))

// Manejo de errores para archivos estáticos
app.use((req, res, next) => {
  // Si es una petición de API o archivo estático, continuar
  if (req.path.startsWith('/api/') || 
      req.path.includes('.') || 
      req.path.startsWith('/_vite/')) {
    next()
    return
  }
  
  // Para todas las rutas de la SPA, servir index.html
  console.log(`🎯 Sirviendo SPA para: ${req.path}`)
  res.sendFile(path.resolve(distPath, 'index.html'))
})

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Error en servidor:', err)
  res.status(500).send('Error interno del servidor')
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor de producción corriendo en http://localhost:${PORT}`)
  console.log(`📂 Sirviendo archivos desde: ${distPath}`)
  console.log(`🌐 Accede a la aplicación en: http://localhost:${PORT}`)
  console.log(`🔧 Versión de Express: ${express.version || 'N/A'}`)
})

// Manejo de señales para cierre graceful
process.on('SIGTERM', () => {
  console.log('🔄 Cerrando servidor...')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('🔄 Cerrando servidor...')
  process.exit(0)
})
