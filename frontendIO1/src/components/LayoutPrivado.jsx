import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { LogOut, User } from "lucide-react"

function LayoutPrivado({ children }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const cerrarSesion = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 relative overflow-hidden">
      <div className="relative z-10 max-w-sm sm:max-w-2xl lg:max-w-6xl mx-auto px-4 sm:px-4 lg:px-6 py-4 sm:py-8 lg:py-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
          {/* User Info */}
          <div className="flex items-center gap-2 sm:gap-3 bg-white/70 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl border border-slate-200/60 shadow-sm">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-semibold text-slate-700 truncate max-w-[120px] sm:max-w-none">{user?.name || 'Usuario'}</p>
              <p className="text-xs text-slate-500 truncate max-w-[120px] sm:max-w-none">{user?.email || 'email@ejemplo.com'}</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={cerrarSesion}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg sm:rounded-xl font-semibold border border-red-300 transition-all transform hover:scale-105 text-xs sm:text-sm"
          >
            <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>

        {/* Renderiza contenido interior */}
        {children || <Outlet />}
      </div>
    </div>
  )
}

export default LayoutPrivado
