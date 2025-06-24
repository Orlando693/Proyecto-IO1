"use client"
import { useState } from 'react';
import { BarChart3, Calculator, TrendingUp } from "lucide-react"
import '../index.css'

export default function AulaForm({ onAgregarAula, aulas }) {
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

    if (parseInt(capacidad) <= 0) {
      setError("La capacidad debe ser un número mayor a 0")
      return
    }

    const existe = aulas.some(aula => aula.nombre.toLowerCase() === nombre.toLowerCase())
    if (existe) {
      setError("Ya existe un aula con ese nombre")
      return
    }

    onAgregarAula({
      nombre,
      capacidad: Number.parseInt(capacidad),
      piso: Number.parseInt(piso),
    })

    setNombre("")
    setCapacidad("")
    setPiso("1")
    setError("")
  }

  return (
    <div className="relative bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-8 overflow-hidden">
      {/* Mathematical grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-[linear-gradient(rgba(59,130,246,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.3)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div className="#">
             
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Optimizar Aula</h2>
            <p className="text-slate-500 text-sm">Maximizar eficiencia del espacio académico</p>
          </div>
        </div>

        <form onSubmit={manejarEnvio} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Nombre del Aula */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Identificador del Aula
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-slate-50/50"
                  placeholder="Aula 101"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                  <Calculator className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Capacidad */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Capacidad Óptima
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={capacidad}
                  onChange={(e) => setCapacidad(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 bg-slate-50/50 appearance-none"
                  placeholder="30"
                  inputMode="numeric"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Piso */}
            <div className="space-y-3 lg:col-span-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Piso del Aula
              </label>
              <div className="relative">
                <select
                  value={piso}
                  onChange={(e) => setPiso(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-300 bg-slate-50/50 appearance-none cursor-pointer"
                >
                  {[1, 2, 3, 4, 5].map((p) => (
                    <option key={p} value={p} className="bg-white">
                      Piso {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          {/* ✅ AQUÍ SOLO CAMBIAMOS EL TEXTO DEL BOTÓN */}
          <div className="pt-4">
            <button
              type="submit"
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-center justify-center gap-3">
                <span>Agregar Aula</span>
              </div>
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
