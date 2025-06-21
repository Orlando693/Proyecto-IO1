"use client"
import { useState } from "react"
import { Users, Target, PieChart } from "lucide-react"
import '../index.css'

export default function GrupoForm({ onAgregarGrupo, grupos }) {
  const [nombre, setNombre] = useState("")
  const [materia, setMateria] = useState("")
  const [cantidad, setCantidad] = useState("")
  const [error, setError] = useState("")

  const manejarEnvio = (e) => {
    e.preventDefault()

    if (!nombre || !materia || !cantidad) {
      setError("Completa todos los campos")
      return
    }

    if (parseInt(cantidad) <= 0) {
      setError("La cantidad debe ser mayor a 0")
      return
    }

    const existe = grupos.some(grupo => grupo.nombre.toLowerCase() === nombre.toLowerCase())
    if (existe) {
      setError("Ya existe un grupo con ese nombre")
      return
    }

    onAgregarGrupo({
      nombre,
      materia,
      cantidad: Number.parseInt(cantidad),
    })

    setNombre("")
    setMateria("")
    setCantidad("")
    setError("")
  }

  return (
    <div className="relative bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-8 overflow-hidden">
      {/* Mathematical grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-[linear-gradient(rgba(34,197,94,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.3)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      {/* Mathematical formula decoration */}
      <div className="absolute top-4 right-4 text-green-100 text-sm font-mono opacity-20">min Σ cᵢⱼxᵢⱼ</div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">∑</span>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Asignar Grupo</h2>
            <p className="text-slate-500 text-sm">Minimizar conflictos de programación</p>
          </div>
        </div>

        <form onSubmit={manejarEnvio} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Nombre del Grupo */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Identificador del Grupo
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-slate-50/50"
                  placeholder="Grupo Alpha"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                  <Target className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Materia */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Área de Conocimiento
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={materia}
                  onChange={(e) => setMateria(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-slate-50/50"
                  placeholder="Investigación Operativa"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                  <PieChart className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Cantidad de Estudiantes */}
            <div className="space-y-3 lg:col-span-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Tamaño del Conjunto
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-slate-50/50"
                  placeholder="25"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 font-mono text-sm">
                  n
                </div>
              </div>
            </div>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          {/* ✅ Solo cambiamos el texto del botón */}
          <div className="pt-4">
            <button
              type="submit"
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-center justify-center gap-3">
                <span>Agregar Grupo</span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
