import { Navigate, Outlet } from 'react-router-dom'

function RutaPrivada() {
  const estaAutenticado = localStorage.getItem('autenticado') === 'true'
  return estaAutenticado ? <Outlet /> : <Navigate to="/login" />
}

export default RutaPrivada
