"use client"
import { useState } from "react"
import { BarChart3, Calculator, TrendingUp, Plus, Trash2, Building2 } from "lucide-react"
import "../index.css"

export default function AulaForm({ onAgregarAula, aulas = [] }) {
  const [nombre, setNombre] = useState("")
  const [capacidad, setCapacidad] = useState("")
  const [piso, setPiso] = useState("1")
  const [error, setError] = useState("")

  const manejarEnvio = (e) => {
    e.preventDefault()

    if (!nombre || !capacidad) {
      setError("Completa todos los campos")
      return
    }

    if (Number.parseInt(capacidad) <= 0) {
      setError("La capacidad debe ser un número mayor a 0")
      return
    }

    const existe = aulas.some((aula) => aula.nombre.toLowerCase() === nombre.toLowerCase())
    if (existe) {
      setError("Ya existe un aula con ese nombre")
      return
    }

    onAgregarAula({
      id: Date.now(),
      nombre,
      capacidad: Number.parseInt(capacidad),
      piso: Number.parseInt(piso),
    })

    setNombre("")
    setCapacidad("")
    setPiso("1")
    setError("")
  }

  const eliminarAula = (id) => {
    // This would need to be implemented in the parent component
    console.log("Eliminar aula:", id)
  }

  return (
    <div className="relative bg-transparent md:bg-gradient-to-br md:from-white md:via-slate-50/30 md:to-white rounded-3xl md:shadow-2xl md:border border-slate-200/60 md:p-10 mb-12 overflow-hidden md:backdrop-blur-sm">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3)_0%,transparent_50%),linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:300px_300px,24px_24px,24px_24px]" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-4 right-8 w-20 h-20 bg-gradient-to-br from-blue-100/30 to-purple-100/20 rounded-full animate-pulse"></div>
      <div
        className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-br from-green-100/30 to-blue-100/20 rounded-full animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Mathematical Formula */}
      <div className="absolute top-6 right-6 text-blue-200/40 text-sm font-mono">max Σ uᵢ</div>

      {/* Gradient Border */}
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          <div className="relative group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
              <Plus className="w-3 h-3 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-2">
              Optimizar Aula
            </h2>
            <p className="text-slate-600 font-medium">Maximizar eficiencia del espacio académico</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-500">Sistema de optimización activo</span>
            </div>
          </div>
        </div>

        <form onSubmit={manejarEnvio} className="space-y-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Nombre del Aula */}
            <div className="group space-y-4">
              <label className="flex items-center gap-3 text-sm font-bold text-slate-700">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm"></div>
                Identificador del Aula
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full pl-6 pr-14 py-4 border-2 border-slate-200/60 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 transition-all duration-300 bg-gradient-to-r from-slate-50/50 to-white shadow-sm hover:shadow-md group-hover:border-slate-300"
                  placeholder="Aula 101"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200">
                  <Calculator className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Capacidad */}
            <div className="group space-y-4">
              <label className="flex items-center gap-3 text-sm font-bold text-slate-700">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-sm"></div>
                Capacidad Óptima
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={capacidad}
                  onChange={(e) => setCapacidad(e.target.value)}
                  className="w-full pl-6 pr-14 py-4 border-2 border-slate-200/60 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100/50 transition-all duration-300 bg-gradient-to-r from-slate-50/50 to-white shadow-sm hover:shadow-md group-hover:border-slate-300 appearance-none"
                  placeholder="30"
                  inputMode="numeric"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors duration-200">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Piso */}
            <div className="group space-y-4 lg:col-span-2">
              <label className="flex items-center gap-3 text-sm font-bold text-slate-700">
                <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-sm"></div>
                Piso del Aula
              </label>
              <div className="relative">
                <select
                  value={piso}
                  onChange={(e) => setPiso(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-slate-200/60 rounded-2xl text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100/50 transition-all duration-300 bg-gradient-to-r from-slate-50/50 to-white shadow-sm hover:shadow-md group-hover:border-slate-300 appearance-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5].map((p) => (
                    <option key={p} value={p} className="bg-white">
                      Piso {p}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          {/* Botón mejorado */}
          <div className="pt-6">
            <button
              type="submit"
              className="group relative w-full overflow-hidden rounded-2xl bg-blue-600 hover:bg-blue-700 px-8 py-5 text-white font-bold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative flex items-center justify-center gap-3">
                <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                <span>Agregar Aula</span>
                <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse"></div>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000"></div>
              </div>
            </button>
          </div>
        </form>

        {aulas.length > 0 && (
          <div className="mt-12 bg-gradient-to-br from-slate-50/50 to-white rounded-2xl border border-slate-200/60 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Aulas Configuradas</h3>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-600">{aulas.length} aulas</span>
              </div>
            </div>

            <div className="grid gap-4">
              {aulas.map((aula, idx) => (
                <div
                  key={aula.id || idx}
                  className="group flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-sm">#{idx + 1}</span>
                    </div>
                    <div>
                      <div className="text-slate-800 font-bold text-lg">{aula.nombre}</div>
                      <div className="text-slate-500 text-sm flex items-center gap-4">
                        <span>Capacidad: {aula.capacidad} estudiantes</span>
                        <span>Piso: {aula.piso}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-slate-600 font-medium">Disponible</span>
                    </div>
                    <button
                      onClick={() => eliminarAula(aula.id || idx)}
                      className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded-lg flex items-center justify-center transition-colors duration-200 group-hover:scale-110"
                      title="Eliminar aula"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
