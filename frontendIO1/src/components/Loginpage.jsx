import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    // Lógica falsa de login (solo para probar)
    if (usuario === 'admin' && clave === '1234') {
      localStorage.setItem('autenticado', 'true') // Simula que guardamos sesión
      navigate('/aulas') // Redirige a una ruta protegida
    } else {
      alert('Credenciales incorrectas')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-indigo-100">
      <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-xl p-8 w-80 space-y-4 border border-slate-200">
        <h2 className="text-xl font-bold text-center text-slate-700">Iniciar Sesión</h2>

        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}

export default LoginPage
