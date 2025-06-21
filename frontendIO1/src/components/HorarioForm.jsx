"use client"

import { useState } from "react"
import { Clock, Plus, Calendar } from "lucide-react"
import '../index.css'

export default function HorarioForm({ onAgregarHorario }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [nuevoDia, setNuevoDia] = useState("")
  const [nuevoBloque, setNuevoBloque] = useState("")
  const [horariosAsignados, setHorariosAsignados] = useState([])
  const [error, setError] = useState("")

  const diasDisponibles = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
  const bloquesDisponibles = [
    "07:00-09:15",
    "09:15-11:30",
    "11:30-13:45",
    "14:00-16:15",
    "16:15-18:30",
    "18:30-20:45"
  ]

  const abrirModal = () => {
    setModalVisible(true)
    setNuevoDia("")
    setNuevoBloque("")
    setError("")
  }

  const cerrarModal = () => {
    setModalVisible(false)
    setNuevoDia("")
    setNuevoBloque("")
    setError("")
  }

  const agregarBloque = () => {
    if (!nuevoDia || !nuevoBloque) {
      setError("Debe seleccionar día y bloque horario")
      return
    }

    const existe = horariosAsignados.some(h => h.dia === nuevoDia && h.bloque === nuevoBloque)
    if (existe) {
      setError("Este bloque ya fue asignado")
      return
    }

    const nuevoHorario = { dia: nuevoDia, bloque: nuevoBloque }
    const nuevosHorarios = [...horariosAsignados, nuevoHorario]

    setHorariosAsignados(nuevosHorarios)
    onAgregarHorario(nuevoHorario)
    cerrarModal()
  }

  return (
    <div className="relative bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-8 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-[linear-gradient(rgba(168,85,247,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.3)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">T</span>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Matriz de Horarios</h2>
            <p className="text-slate-500 text-sm">Optimización de distribución temporal</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <div className="flex justify-end">
            <button
              onClick={abrirModal}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Agregar Bloque
            </button>
          </div>

          <div className="mt-6">
            {horariosAsignados.length === 0 ? (
              <p className="text-slate-500 text-center">No hay bloques asignados aún</p>
            ) : (
              <ul className="space-y-2">
                {horariosAsignados.map((bloque, idx) => (
                  <li key={idx} className="flex items-center justify-between bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-slate-700 font-medium">
                      <Clock className="w-5 h-5 text-purple-500" />
                      {bloque.dia} - {bloque.bloque}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {modalVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Selecciona día y bloque</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label>Día</label>
                <select
                  value={nuevoDia}
                  onChange={(e) => setNuevoDia(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300"
                >
                  <option value="">Seleccione un día</option>
                  {diasDisponibles.map((dia) => (
                    <option key={dia} value={dia}>{dia}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label>Bloque Horario</label>
                <select
                  value={nuevoBloque}
                  onChange={(e) => setNuevoBloque(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300"
                >
                  <option value="">Seleccione un bloque</option>
                  {bloquesDisponibles.map((bloque) => (
                    <option key={bloque} value={bloque}>{bloque}</option>
                  ))}
                </select>
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <div className="flex justify-end gap-3">
                <button onClick={cerrarModal} className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50">
                  Cancelar
                </button>
                <button onClick={agregarBloque} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
