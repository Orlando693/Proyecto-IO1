import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 8002

console.log('🚀 Iniciando servidor de producción...')

// Configurar middleware para servir archivos estáticos
const distPath = path.resolve(__dirname, '../dist')
console.log(`📂 Directorio de archivos: ${distPath}`)

// Servir archivos estáticos
app.use(express.static(distPath))

// Middleware personalizado para manejar rutas SPA
app.use((req, res, next) => {
  // Si la petición es para un archivo estático (tiene extensión), continuar normalmente
  if (path.extname(req.path) !== '') {
    next()
    return
  }

  // Si es una ruta de la aplicación, servir index.html
  console.log(`🎯 Sirviendo SPA para: ${req.path}`)
  res.sendFile(path.resolve(distPath, 'index.html'), (err) => {
    if (err) {
      console.error('❌ Error sirviendo index.html:', err)
      res.status(500).send('Error interno del servidor')
    }
  })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`)
  console.log(`📂 Sirviendo desde: ${distPath}`)
  console.log(`� La aplicación estará disponible en el navegador`)
})