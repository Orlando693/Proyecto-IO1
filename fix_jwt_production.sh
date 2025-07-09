#!/bin/bash

# Script para solucionar el problema de JWT en producción
# Ejecutar este script en el servidor de producción

echo "🔧 Solucionando problema de JWT en producción..."

# Navegar al directorio del proyecto
cd /root/prod/Proyecto-IO1/backendIO1

echo "📦 Desinstalando paquete jwt conflictivo..."
# Desinstalar el paquete jwt conflictivo
pip uninstall jwt -y

echo "🔄 Reinstalando dependencias..."
# Reinstalar dependencias desde requirements.txt actualizado
pip install -r requirements.txt

echo "🔍 Verificando instalación de PyJWT..."
python -c "import jwt; print('PyJWT version:', jwt.__version__)"

echo "🚀 Reiniciando aplicación con PM2..."
# Reiniciar la aplicación
pm2 restart api-io1

echo "✅ Corrección completada. El login debería funcionar ahora."

echo "🧪 Prueba rápida:"
echo "curl -X POST https://api.io1.devhoo.me/api/auth/login -H 'Content-Type: application/json' -d '{\"email\":\"test@test.com\",\"password\":\"test123\"}'"
