"use client"

import { useState } from "react"
import { Clock, Plus, Calendar, X, Timer } from "lucide-react"
import "../index.css"

export default function HorarioForm({ onAgregarHorario }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [nuevoBloque, setNuevoBloque] = useState("")
  const [horariosAsignados, setHorariosAsignados] = useState([])
  const [error, setError] = useState("")

  const bloquesDisponibles = ["07:00-09:15", "09:15-11:30", "11:30-13:45", "14:00-16:15", "16:15-18:30", "18:30-20:45"]

  const abrirModal = () => {
    setModalVisible(true)
    setNuevoBloque("")
    setError("")
  }

  const cerrarModal = () => {
    setModalVisible(false)
    setNuevoBloque("")
    setError("")
  }

  const agregarBloque = () => {
    if (!nuevoBloque) {
      setError("Debe seleccionar un bloque horario")
      return
    }

    const existe = horariosAsignados.includes(nuevoBloque)
    if (existe) {
      setError("Este bloque ya fue asignado")
      return
    }

    const nuevosHorarios = [...horariosAsignados, nuevoBloque]

    setHorariosAsignados(nuevosHorarios)
    onAgregarHorario(nuevoBloque)
    cerrarModal()
  }

  return (
    <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/60 p-10 mb-12 overflow-hidden">
      {/* Fondo simplificado con líneas sutiles */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="w-full h-full bg-[linear-gradient(rgba(168,85,247,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* Elementos decorativos minimalistas */}
  
      <div className="absolute bottom-6 left-6 w-8 h-8 bg-purple-100/50 rounded-full"></div>

      {/* Borde superior elegante */}

      <div className="relative z-10">
        {/* Header mejorado */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center animate-pulse">
                <Clock className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-2">
                Gestión de Horarios
              </h2>
              <p className="text-slate-600 font-medium">Configuración de bloques temporales</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-500">Sistema de programación activo</span>
              </div>
            </div>
          </div>

          {/* Botón agregar reposicionado */}
          <button
            onClick={abrirModal}
            className="group relative overflow-hidden rounded-2xl bg-purple-600 hover:bg-purple-700 px-8 py-4 text-white font-bold shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative flex items-center gap-3">
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span>Nuevo Bloque</span>
            </div>

            {/* Shine Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000"></div>
            </div>
          </button>
        </div>

        {/* Contenido principal reorganizado */}
        <div className="space-y-8">
          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6 border border-purple-200/60">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-700">{horariosAsignados.length}</div>
                  <div className="text-sm text-purple-600 font-medium">Bloques Activos</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl p-6 border border-slate-200/60">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Timer className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-700">
                    {bloquesDisponibles.length - horariosAsignados.length}
                  </div>
                  <div className="text-sm text-slate-600 font-medium">Disponibles</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-6 border border-green-200/60">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-700">{bloquesDisponibles.length}</div>
                  <div className="text-sm text-green-600 font-medium">Total Bloques</div>
                </div>
              </div>
            </div>
          </div>

          {/* Lista de horarios mejorada */}
          <div className="bg-gradient-to-br from-slate-50/50 to-white rounded-2xl border border-slate-200/60 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Bloques Horarios Configurados</h3>
            </div>

            {horariosAsignados.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-10 h-10 text-slate-400" />
                </div>
                <h4 className="text-xl font-bold text-slate-600 mb-2">Sin bloques configurados</h4>
                <p className="text-slate-500 font-medium">Agrega tu primer bloque horario para comenzar</p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <div className="w-2 h-2 bg-slate-300 rounded-full animate-pulse"></div>
                  <span className="text-sm text-slate-400">Esperando configuración...</span>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {horariosAsignados.map((bloque, idx) => (
                  <div
                    key={idx}
                    className="group flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold text-sm">#{idx + 1}</span>
                      </div>
                      <div>
                        <div className="text-slate-800 font-bold text-lg">{bloque}</div>
                        <div className="text-slate-500 text-sm">Bloque horario configurado</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-slate-600 font-medium">Activo</span>
                      </div>
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-200">
                        <Clock className="w-4 h-4 text-purple-600" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal mejorado con diseño más limpio */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200/60 p-8 w-full max-w-md overflow-hidden">
            {/* Fondo del modal simplificado */}
            <div className="absolute inset-0 opacity-[0.01]">
              <div className="w-full h-full bg-[linear-gradient(rgba(168,85,247,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            {/* Borde superior del modal */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-t-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    Agregar Bloque
                  </h3>
                </div>
                <button
                  onClick={cerrarModal}
                  className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full shadow-sm"></div>
                    Seleccionar Horario
                  </label>
                  <div className="relative">
                    <select
                      value={nuevoBloque}
                      onChange={(e) => setNuevoBloque(e.target.value)}
                      className="w-full px-6 py-4 border-2 border-slate-200/60 rounded-2xl text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100/50 transition-all duration-300 bg-gradient-to-r from-slate-50/50 to-white shadow-sm appearance-none cursor-pointer"
                    >
                      <option value="">Seleccione un bloque horario</option>
                      {bloquesDisponibles.map((bloque) => (
                        <option key={bloque} value={bloque} className="bg-white">
                          {bloque}
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

                {error && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={cerrarModal}
                    className="flex-1 px-6 py-3 border-2 border-slate-200 rounded-2xl text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={agregarBloque}
                    className="group relative flex-1 overflow-hidden rounded-2xl bg-purple-600 hover:bg-purple-700 px-6 py-3 text-white font-bold shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative">Agregar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
