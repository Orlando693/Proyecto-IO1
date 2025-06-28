"use client"

import { useState } from "react"
import { Routes, Route, Link, Navigate, Outlet, useLocation } from "react-router-dom"

import AulaForm from "./components/AulaForm"
import GrupoForm from "./components/GrupoForm"
import HorarioForm from "./components/HorarioForm"
import AsignacionTable from "./components/AsignacionTable"
import ParametrosForm from "./components/ParametrosForm"
import LoginPage from "./components/Loginpage"
import RutaPrivada from "./components/RutaPrivada"
import LayoutPrivado from "./components/LayoutPrivado"

import { LayoutList, Users, CalendarDays, Settings, Clock, GraduationCap, Zap, TrendingUp } from "lucide-react"

import "./index.css"

function Dashboard({ aulas, grupos, horarios, totalAlumnos, generarAsignacion, asignaciones, resultIA }) {
  const { pathname } = useLocation()

  const tabs = [
    { to: "/aulas", icon: <LayoutList />, label: "Aulas", color: "blue" },
    { to: "/grupos", icon: <Users />, label: "Grupos", color: "green" },
    { to: "/horarios", icon: <CalendarDays />, label: "Horarios", color: "purple" },
    { to: "/parametros", icon: <Settings />, label: "Parámetros", color: "yellow" },
  ]

  const colorClasses = {
    blue: "bg-blue-600 text-white border-blue-600 shadow-blue-200",
    green: "bg-green-600 text-white border-green-600 shadow-green-200",
    purple: "bg-purple-600 text-white border-purple-600 shadow-purple-200",
    yellow: "bg-yellow-500 text-white border-yellow-500 shadow-yellow-200",
  }

  return (
    <div className="#">
      {/* HEADER */}
      <div className="relative bg-gradient-to-br from-white via-slate-50/50 to-white rounded-3xl shadow-2xl border border-slate-200/60 p-16 mb-20 text-center overflow-hidden backdrop-blur-sm">
        {/* Background Pattern */}
   
        {/* Floating Elements */}
        <div className="absolute top-8 left-8 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full animate-pulse"></div>
        <div
          className="absolute top-12 right-16 w-16 h-16 bg-gradient-to-br from-green-200/30 to-blue-200/30 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Gradient Border */}
        <div className="#"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-4 mb-6">
           
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent tracking-tight">
              Sistema de Optimización
            </h1>
          </div>
          <p className="text-xl text-slate-600 font-medium mb-4">Investigación Operativa</p>
          <div className="#">
      
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="relative bg-gradient-to-br from-white via-slate-50/30 to-white rounded-3xl shadow-xl border border-slate-200/60 p-10 mb-12 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-transparent to-purple-50/20 rounded-3xl"></div>

        <div className="relative z-10">
          <div className="flex justify-center mb-10 space-x-6">
            {tabs.map(({ to, icon, label, color }) => {
              const active = pathname.startsWith(to)
              return (
                <Link
                  key={to}
                  to={to}
                  className={`group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-bold border-2 transition-all duration-300 transform hover:scale-105 ${
                    active
                      ? `${colorClasses[color]} shadow-xl hover:shadow-2xl`
                      : "bg-white/80 text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-lg hover:shadow-xl"
                  }`}
                >
                  <div
                    className={`transition-transform duration-300 ${active ? "scale-110" : "group-hover:scale-110"}`}
                  >
                    {icon}
                  </div>
                  <span className="text-sm tracking-wide">{label}</span>
                  {active && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-sm animate-pulse"></div>
                  )}
                </Link>
              )
            })}
          </div>

          <div className="relative">
            <Outlet />
          </div>
        </div>
      </div>

      {/* RESUMEN - Manteniendo el diseño anterior que te gustó */}
      <div className="relative bg-gradient-to-br from-slate-50 to-white rounded-3xl shadow-xl border border-slate-200/60 p-6 mb-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="w-full h-full bg-[linear-gradient(rgba(59,130,246,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.4)_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100/30 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

        <div className="relative z-10">
          {/* Header with enhanced styling */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
              Resumen de Datos Cargados
            </h2>
          </div>

          {/* Enhanced Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Aulas Card */}
            <div className="group relative bg-white rounded-2xl p-6 border border-slate-200/60 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-blue-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <LayoutList className="w-6 h-6" />
                  </div>
                  <div className="w-3 h-3 bg-blue-200 rounded-full group-hover:bg-blue-400 transition-colors duration-300"></div>
                </div>

                <div className="space-y-2">
                  <div className="text-3xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                    {aulas.length}
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold tracking-wide uppercase border border-blue-100">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    Aulas Activas
                  </div>
                </div>
              </div>
            </div>

            {/* Grupos Card */}
            <div className="group relative bg-white rounded-2xl p-6 border border-slate-200/60 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-green-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="w-3 h-3 bg-green-200 rounded-full group-hover:bg-green-400 transition-colors duration-300"></div>
                </div>

                <div className="space-y-2">
                  <div className="text-3xl font-bold text-green-600 group-hover:text-green-700 transition-colors duration-300">
                    {grupos.length}
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold tracking-wide uppercase border border-green-100">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    Grupos Activos
                  </div>
                </div>
              </div>
            </div>

            {/* Horarios Card */}
            <div className="group relative bg-white rounded-2xl p-6 border border-slate-200/60 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-purple-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div className="w-3 h-3 bg-purple-200 rounded-full group-hover:bg-purple-400 transition-colors duration-300"></div>
                </div>

                <div className="space-y-2">
                  <div className="text-3xl font-bold text-purple-600 group-hover:text-purple-700 transition-colors duration-300">
                    {horarios.length}
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold tracking-wide uppercase border border-purple-100">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    Horarios Activos
                  </div>
                </div>
              </div>
            </div>

            {/* Alumnos Card */}
            <div className="group relative bg-white rounded-2xl p-6 border border-slate-200/60 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-orange-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="w-3 h-3 bg-orange-200 rounded-full group-hover:bg-orange-400 transition-colors duration-300"></div>
                </div>

                <div className="space-y-2">
                  <div className="text-3xl font-bold text-orange-600 group-hover:text-orange-700 transition-colors duration-300">
                    {totalAlumnos}
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-full text-xs font-semibold tracking-wide uppercase border border-orange-100">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                    Alumnos Activos
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTÓN MEJORADO */}
      <div className="text-center mb-12">
        <div className="relative inline-block">
          <button
            onClick={generarAsignacion}
            className="group relative px-10 py-5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-3">
              
              <span>Generar Asignación Óptima</span>
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000"></div>
            </div>
          </button>
        </div>
      </div>

      <AsignacionTable asignaciones={asignaciones} />

      {/* RESUMEN IA MEJORADO */}
      {resultIA && (
        <div className="relative bg-gradient-to-br from-white via-slate-50/30 to-white rounded-3xl shadow-xl border border-slate-200/60 p-10 mt-16 overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-green-50/20 via-transparent to-blue-50/20 rounded-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Resumen de Optimización
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent"></div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200/60 shadow-inner">
              <div className="max-h-[400px] overflow-y-auto space-y-4 text-slate-700">
                {resultIA.split("\n").map((line, idx) => (
                  <p key={idx} className="text-sm leading-relaxed hover:text-slate-900 transition-colors duration-200">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [aulas, setAulas] = useState([])
  const [grupos, setGrupos] = useState([])
  const [horarios, setHorarios] = useState([])
  const [asignaciones, setAsignaciones] = useState([])
  const [resultIA, setResultIA] = useState("")

  const totalAlumnos = grupos.reduce((sum, g) => sum + g.cantidad, 0)

  const generarAsignacion = () => {
    if (!aulas.length || !grupos.length || !horarios.length) {
      alert("Debes ingresar al menos un aula, un grupo y un horario.")
      return
    }
    const datos = {
      aulas,
      grupos,
      bloques_disponibles: horarios,
      delta: 0.2,
      lambda_: 1,
    }

    fetch("http://localhost:8000/optimizar/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    })
      .then((res) => res.json())
      .then((data) => {
        setAsignaciones(data.asignacion.asignacion || [])
        setResultIA(data.asignacion.resumen_generado || "")
      })
      .catch((err) => {
        console.error("Error al comunicarse con el backend:", err)
        alert("Ocurrió un error al comunicarse con el servidor.")
      })
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<RutaPrivada />}>
        <Route
          path="/*"
          element={
            <LayoutPrivado>
              <Dashboard
                aulas={aulas}
                grupos={grupos}
                horarios={horarios}
                totalAlumnos={totalAlumnos}
                generarAsignacion={generarAsignacion}
                asignaciones={asignaciones}
                resultIA={resultIA}
              />
            </LayoutPrivado>
          }
        >
          <Route index element={<Navigate to="/aulas" replace />} />
          <Route path="aulas" element={<AulaForm onAgregarAula={(a) => setAulas([...aulas, a])} aulas={aulas} />} />
          <Route
            path="grupos"
            element={<GrupoForm onAgregarGrupo={(g) => setGrupos([...grupos, g])} grupos={grupos} />}
          />
          <Route path="horarios" element={<HorarioForm onAgregarHorario={(h) => setHorarios([...horarios, h])} />} />
          <Route
            path="parametros"
            element={<ParametrosForm delta={0.2} setDelta={() => {}} lambda={1} setLambda={() => {}} />}
          />
        </Route>
      </Route>
    </Routes>
  )
}
