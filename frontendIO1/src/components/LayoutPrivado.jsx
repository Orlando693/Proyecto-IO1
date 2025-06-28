import { Outlet, useNavigate } from "react-router-dom"

function LayoutPrivado({ children }) {
  const navigate = useNavigate()

  const cerrarSesion = () => {
    localStorage.removeItem("autenticado")
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="flex justify-end mb-6">
          <button
            onClick={cerrarSesion}
            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-semibold border border-red-300 transition-all"
          >
            Salir
          </button>
        </div>

        {/* Renderiza contenido interior */}
        {children || <Outlet />}
      </div>
    </div>
  )
}

export default LayoutPrivado
