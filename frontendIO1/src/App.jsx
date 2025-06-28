import { useState } from "react"
import {
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom"

import AulaForm from "./components/AulaForm"
import GrupoForm from "./components/GrupoForm"
import HorarioForm from "./components/HorarioForm"
import AsignacionTable from "./components/AsignacionTable"
import ParametrosForm from "./components/ParametrosForm"
import LoginPage from "./components/Loginpage"
import RutaPrivada from "./components/RutaPrivada"
import LayoutPrivado from "./components/LayoutPrivado"

import {
  LayoutList,
  Users,
  CalendarDays,
  Settings,
  Clock,
  GraduationCap,
} from "lucide-react"

import "./index.css"

function Dashboard({
  aulas,
  grupos,
  horarios,
  totalAlumnos,
  generarAsignacion,
  asignaciones,
  resultIA,
}) {
  const { pathname } = useLocation()

  const tabs = [
    { to: "/aulas", icon: <LayoutList />, label: "Aulas", color: "blue" },
    { to: "/grupos", icon: <Users />, label: "Grupos", color: "green" },
    { to: "/horarios", icon: <CalendarDays />, label: "Horarios", color: "purple" },
    { to: "/parametros", icon: <Settings />, label: "Parámetros", color: "yellow" },
  ]

  const colorClasses = {
    blue: "bg-blue-600 text-white border-blue-600",
    green: "bg-green-600 text-white border-green-600",
    purple: "bg-purple-600 text-white border-purple-600",
    yellow: "bg-yellow-500 text-white border-yellow-500",
  }

  return (
    <>
      {/* HEADER */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-12 mb-16 text-center relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 opacity-40"></div>
        <h1 className="text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">
          Sistema de Optimización
        </h1>
        <p className="text-lg text-slate-500 font-medium">
          Investigación Operativa 
        </p>
      </div>

      {/* TABS */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-8">
        <div className="flex justify-center mb-8 space-x-4">
          {tabs.map(({ to, icon, label, color }) => {
            const active = pathname.startsWith(to)
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold border transition ${
                  active
                    ? `${colorClasses[color]} shadow-lg`
                    : "bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                {icon}
                {label}
              </Link>
            )
          })}
        </div>

        <Outlet />
      </div>

      {/* RESUMEN */}
      <div className="relative bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-8 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[linear-gradient(rgba(59,130,246,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.3)_1px,transparent_1px)] bg-[size:20px_20px]" />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Resumen de Datos Cargados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-500">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                  <LayoutList className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">{aulas.length}</div>
              <div className="text-slate-600 text-sm">Aulas Activas</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-l-4 border-green-500">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">{grupos.length}</div>
              <div className="text-slate-600 text-sm">Grupos Activos</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-l-4 border-purple-500">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-1">{horarios.length}</div>
              <div className="text-slate-600 text-sm">Horarios Activos</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-l-4 border-orange-500">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white">
                  <GraduationCap className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-1">{totalAlumnos}</div>
              <div className="text-slate-600 text-sm">Alumnos Activos</div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTÓN */}
      <div className="text-center mb-8">
        <button
          onClick={generarAsignacion}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition transform hover:scale-[1.02]"
        >
          Generar Asignación Óptima
        </button>
      </div>

      <AsignacionTable asignaciones={asignaciones} />

      {/* RESUMEN IA */}
      {resultIA && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mt-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Resumen de Optimización</h2>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 shadow-inner text-slate-700 space-y-4 max-h-[400px] overflow-y-auto">
            {resultIA.split("\n").map((line, idx) => (
              <p key={idx} className="text-sm">{line}</p>
            ))}
          </div>
        </div>
      )}
    </>
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
          <Route path="grupos" element={<GrupoForm onAgregarGrupo={(g) => setGrupos([...grupos, g])} grupos={grupos} />} />
          <Route path="horarios" element={<HorarioForm onAgregarHorario={(h) => setHorarios([...horarios, h])} />} />
          <Route path="parametros" element={<ParametrosForm delta={0.2} setDelta={() => {}} lambda={1} setLambda={() => {}} />} />
        </Route>
      </Route>
    </Routes>
  )
}
