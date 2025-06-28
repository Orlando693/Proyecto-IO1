"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { User, Lock, LogIn, Shield } from "lucide-react"

function LoginPage() {
  const [usuario, setUsuario] = useState("")
  const [clave, setClave] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular delay de autenticación
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Lógica falsa de login (solo para probar)
    if (usuario === "admin" && clave === "1234") {
      localStorage.setItem("autenticado", "true") // Simula que guardamos sesión
      navigate("/aulas") // Redirige a una ruta protegida
    } else {
      alert("Credenciales incorrectas")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3)_0%,transparent_50%),radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.3)_0%,transparent_50%),linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:400px_400px,400px_400px,30px_30px,30px_30px]" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full animate-pulse"></div>
      <div
        className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-full animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-32 left-40 w-20 h-20 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-20 right-20 w-16 h-16 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full animate-pulse"
        style={{ animationDelay: "3s" }}
      ></div>

      {/* Main Login Container */}
      <div className="relative w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
         
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-2">
            Sistema de Optimización
          </h1>
        </div>

        {/* Login Form */}
        <div className="relative bg-gradient-to-br from-white via-slate-50/30 to-white rounded-3xl shadow-2xl border border-slate-200/60 p-8 backdrop-blur-sm overflow-hidden">
          {/* Form Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="w-full h-full bg-[linear-gradient(rgba(59,130,246,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.4)_1px,transparent_1px)] bg-[size:20px_20px]" />
          </div>

          {/* Gradient Border */}

          <div className="relative z-10">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                Iniciar Sesión
              </h2>
              <p className="text-slate-500 text-sm">Accede a tu cuenta para continuar</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Usuario Input */}
              <div className="relative group">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Usuario</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                  </div>
                  <input
                    type="text"
                    placeholder="Ingresa tu usuario"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-slate-700 placeholder-slate-400 shadow-sm hover:shadow-md"
                    required
                  />
                </div>
              </div>

              {/* Contraseña Input */}
              <div className="relative group">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Contraseña</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                  </div>
                  <input
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gradient-to-r from-slate-50 to-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-slate-700 placeholder-slate-400 shadow-sm hover:shadow-md"
                    required
                  />
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Iniciando sesión...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                      <span>Iniciar Sesión</span>
                    </>
                  )}
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000"></div>
                </div>
              </button>
            </form>

            {/* Footer Info */}
            <div className="mt-8 text-center">
              

              <div className="mt-4 text-xs text-slate-500">
                <p>Credenciales de prueba:</p>
                <p className="font-mono bg-slate-100 px-2 py-1 rounded mt-1">
                  Usuario: <span className="font-semibold">admin</span> | Contraseña:{" "}
                  <span className="font-semibold">1234</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
