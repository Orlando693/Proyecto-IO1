import { useState, useEffect } from "react"
import { useNavigate, Link, useLocation } from "react-router-dom"
import { User, Lock, LogIn, AlertCircle, CheckCircle } from "lucide-react"
import { useAuth } from "../hooks/useAuth"

function validateEmail(email) {
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formErrors, setFormErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Verificar si hay un mensaje de éxito desde el registro
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message)
      if (location.state?.email) {
        setEmail(location.state.email)
      }
    }
  }, [location.state])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    // if (!validateForm()) return

    setIsLoading(true)
    try {
      const result = await login({ email, password })
      if (result.success) {
        navigate("/aulas")
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError("Error de conexión. Verifica que el servidor esté funcionando. " + err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100/50 flex items-center justify-center p-2 sm:p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3)_0%,transparent_50%),radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.3)_0%,transparent_50%),linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:200px_200px,200px_200px,15px_15px,15px_15px] sm:bg-[size:400px_400px,400px_400px,30px_30px,30px_30px]" />
      </div>

      {/* Floating Decorative Elements - Responsive */}
      <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-16 h-16 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full animate-pulse"></div>
      <div
        className="absolute top-20 right-16 sm:top-40 sm:right-32 w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-full animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-16 left-20 sm:bottom-32 sm:left-40 w-10 h-10 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-8 h-8 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full animate-pulse"
        style={{ animationDelay: "3s" }}
      ></div>

      {/* Main Login Container */}
      <div className="relative w-full max-w-sm sm:max-w-md">
        {/* Header Section */}
        <div className="text-center mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-2 leading-tight">
            Sistema de Optimización
          </h1>
        </div>

        {/* Login Form */}
        <div className="relative bg-gradient-to-br from-white via-slate-50/30 to-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-slate-200/60 p-4 sm:p-6 lg:p-8 backdrop-blur-sm overflow-hidden">
          {/* Form Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="w-full h-full bg-[linear-gradient(rgba(59,130,246,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.4)_1px,transparent_1px)] bg-[size:10px_10px] sm:bg-[size:20px_20px]" />
          </div>

          <div className="relative z-10">
            {/* Form Header */}
            <div className="text-center mb-4 sm:mb-6 lg:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                Iniciar Sesión
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">Accede a tu cuenta para continuar</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
              {/* Success Message */}
              {successMessage && (
                <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-green-700 text-sm">{successMessage}</span>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              {/* Email Input */}
              <div className="relative group">
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                  </div>
                  <input
                    type="email"
                    placeholder="Ingresa tu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gradient-to-r from-slate-50 to-white border ${
                      formErrors.email ? "border-red-400" : "border-slate-200"
                    } rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 ${
                      formErrors.email ? "focus:ring-red-400/50 focus:border-red-400" : "focus:ring-blue-500/50 focus:border-blue-500"
                    } transition-all duration-300 text-slate-700 placeholder-slate-400 shadow-sm hover:shadow-md text-sm sm:text-base`}
                    required
                  />
                </div>
                {formErrors.email && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="relative group">
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">Contraseña</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                  </div>
                  <input
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gradient-to-r from-slate-50 to-white border ${
                      formErrors.password ? "border-red-400" : "border-slate-200"
                    } rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 ${
                      formErrors.password ? "focus:ring-red-400/50 focus:border-red-400" : "focus:ring-blue-500/50 focus:border-blue-500"
                    } transition-all duration-300 text-slate-700 placeholder-slate-400 shadow-sm hover:shadow-md text-sm sm:text-base`}
                    required
                  />
                </div>
                {formErrors.password && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.password}</p>
                )}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full py-3 sm:py-4 px-4 sm:px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base lg:text-lg rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative flex items-center justify-center gap-2 sm:gap-3">
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="text-sm sm:text-base">Iniciando sesión...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
                      <span className="text-sm sm:text-base">Iniciar Sesión</span>
                    </>
                  )}
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000"></div>
                </div>
              </button>
            </form>

            {/* Footer - Register Link */}
            <div className="mt-4 sm:mt-6 lg:mt-8 text-center">
              <p className="text-slate-600 text-xs sm:text-sm">
                ¿No tienes cuenta?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                >
                  Crear cuenta aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
