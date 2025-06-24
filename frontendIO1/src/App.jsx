import { useState } from "react"
import AulaForm from "./components/AulaForm"
import GrupoForm from "./components/GrupoForm"
import HorarioForm from "./components/HorarioForm"
import AsignacionTable from "./components/AsignacionTable"
import ParametrosForm from "./components/ParametrosForm"

import {
  LayoutList,
  Users,
  CalendarDays,
  Settings,
  TrendingUp,
  Clock,
  GraduationCap,
} from "lucide-react"

import './index.css'

function App() {
  const [aulas, setAulas] = useState([])
  const [grupos, setGrupos] = useState([])
  const [horarios, setHorarios] = useState([])
  const [asignaciones, setAsignaciones] = useState([])
  const [resultIA, setResultIA] = useState('')

  const [delta, setDelta] = useState(0.20)
  const [lambda, setLambda] = useState(1)

  const [tab, setTab] = useState("aulas")

  const agregarAula = (aula) => setAulas([...aulas, aula])
  const agregarGrupo = (grupo) => setGrupos([...grupos, grupo])
  const agregarHorario = (bloqueObj) => setHorarios([...horarios, bloqueObj])

  const totalAlumnos = grupos.reduce((sum, grupo) => sum + grupo.cantidad, 0);

  const generarAsignacion = () => {
    if (aulas.length === 0 || grupos.length === 0 || horarios.length === 0) {
      alert("Debes ingresar al menos un aula, un grupo y un horario.");
      return;
    }

    const datos = {
      aulas: aulas,
      grupos: grupos,
      bloques_disponibles: horarios,
      delta: delta,
      lambda_: lambda
    };

    fetch("http://localhost:8000/optimizar/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    })
      .then(res => res.json())
      .then(data => {
        setAsignaciones(data.asignacion.asignacion || []);
        setResultIA(data.asignacion.resumen_generado || '');
      })
      .catch(err => {
        console.error("Error al comunicarse con el backend:", err);
        alert("Ocurrió un error al comunicarse con el servidor.");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">

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
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <div className="flex justify-center mb-8 space-x-4">
            <button onClick={() => setTab("aulas")} className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all border ${tab === "aulas" ? "bg-blue-600 text-white border-blue-600 shadow-lg" : "bg-white text-slate-700 hover:bg-blue-100"}`}>
              <LayoutList className="w-5 h-5" /> Aulas
            </button>
            <button onClick={() => setTab("grupos")} className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all border ${tab === "grupos" ? "bg-green-600 text-white border-green-600 shadow-lg" : "bg-white text-slate-700 hover:bg-green-100"}`}>
              <Users className="w-5 h-5" /> Grupos
            </button>
            <button onClick={() => setTab("horarios")} className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all border ${tab === "horarios" ? "bg-purple-600 text-white border-purple-600 shadow-lg" : "bg-white text-slate-700 hover:bg-purple-100"}`}>
              <CalendarDays className="w-5 h-5" /> Horarios
            </button>
            <button onClick={() => setTab("parametros")} className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all border ${tab === "parametros" ? "bg-yellow-500 text-white border-yellow-500 shadow-lg" : "bg-white text-slate-700 hover:bg-yellow-100"}`}>
              <Settings className="w-5 h-5" /> Parámetros
            </button>
          </div>

          <div>
            {tab === "aulas" && <AulaForm onAgregarAula={agregarAula} aulas={aulas} />}
            {tab === "grupos" && <GrupoForm onAgregarGrupo={agregarGrupo} grupos={grupos} />}
            {tab === "horarios" && <HorarioForm onAgregarHorario={agregarHorario} />}
            {tab === "parametros" && <ParametrosForm delta={delta} setDelta={setDelta} lambda={lambda} setLambda={setLambda} />}
          </div>
        </div>

        {/* RESUMEN */}
        <div className="h-12"></div>
        <div className="relative bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-8 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full bg-[linear-gradient(rgba(59,130,246,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.3)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="relative">
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-1">Resumen de Datos Cargados</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="relative group">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border-l-4 border-blue-500 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <LayoutList className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{aulas.length}</div>
                  <div className="text-slate-600 text-sm font-medium">Aulas Activas</div>
                </div>
              </div>
              <div className="relative group">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-l-4 border-green-500 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">{grupos.length}</div>
                  <div className="text-slate-600 text-sm font-medium">Grupos Activos</div>
                </div>
              </div>
              <div className="relative group">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border-l-4 border-purple-500 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">{horarios.length}</div>
                  <div className="text-slate-600 text-sm font-medium">Horarios Activos</div>
                </div>
              </div>
              <div className="relative group">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border-l-4 border-orange-500 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">{totalAlumnos}</div>
                  <div className="text-slate-600 text-sm font-medium">Alumnos Activos</div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-slate-500">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Estado del sistema: Operativo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTÓN FINAL */}
        <div className="text-center mt-8">
          <button
            onClick={generarAsignacion}
            className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-center gap-3">
              <span>Generar Asignación Óptima</span>
            </div>
          </button>
        </div>

        <AsignacionTable asignaciones={asignaciones} />

        {resultIA && (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mt-10">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">
              Resumen de Optimización
            </h2>
            <div className="prose max-w-none text-slate-700 leading-relaxed">
              {resultIA.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
