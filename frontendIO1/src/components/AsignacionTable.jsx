import { TableProperties, School, BookOpen, Building2, Clock, TrendingUp } from "lucide-react"

export default function AsignacionTable({ asignaciones }) {
  if (!asignaciones || asignaciones.length === 0) {
    return (
      <div className="relative bg-gradient-to-br from-white via-slate-50/30 to-white rounded-3xl shadow-2xl border border-slate-200/60 p-12 mt-12 overflow-hidden backdrop-blur-sm text-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="w-full h-full bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        {/* Gradient Border */}
       <div className="relative z-10 py-16 flex flex-col items-center">
          <div className="w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-300 rounded-3xl flex items-center justify-center mb-6 shadow-lg">
            <TableProperties className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-700 mb-3">No hay asignaciones disponibles aún</h3>
          <p className="text-slate-500 font-medium max-w-md">
            Las asignaciones aparecerán aquí cuando ejecutes el algoritmo de optimización
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-400">Esperando datos...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-gradient-to-br from-white via-slate-50/30 to-white rounded-3xl shadow-2xl border border-slate-200/60 p-10 mt-12 overflow-hidden backdrop-blur-sm">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3)_0%,transparent_50%),linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:300px_300px,24px_24px,24px_24px]" />
      </div>

     

      {/* Gradient Border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 opacity-60 rounded-t-3xl"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-6 mb-10">
          <div className="relative group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300">
              <TableProperties className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-xs text-white font-bold">A</span>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-2">
              Matriz de Asignación
            </h2>
            <p className="text-slate-600 font-medium">Solución óptima de distribución de recursos</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-500">{asignaciones.length} asignaciones optimizadas</span>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200/60 shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-700">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50 via-blue-100/50 to-blue-50">
                  <th className="px-6 py-5 text-blue-800 font-bold border-b-2 border-blue-200/60">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                        <School className="w-4 h-4 text-white" />
                      </div>
                      <span>Grupo</span>
                    </div>
                  </th>
                  <th className="px-6 py-5 text-blue-800 font-bold border-b-2 border-blue-200/60">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-sm">
                        <BookOpen className="w-4 h-4 text-white" />
                      </div>
                      <span>Materia</span>
                    </div>
                  </th>
                  <th className="px-6 py-5 text-blue-800 font-bold border-b-2 border-blue-200/60">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-sm">
                        <Building2 className="w-4 h-4 text-white" />
                      </div>
                      <span>Aula</span>
                    </div>
                  </th>
                  <th className="px-6 py-5 text-blue-800 font-bold border-b-2 border-blue-200/60">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                        <span className="text-white font-mono text-xs font-bold">n</span>
                      </div>
                      <span>Piso</span>
                    </div>
                  </th>
                  <th className="px-6 py-5 text-blue-800 font-bold border-b-2 border-blue-200/60">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center shadow-sm">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <span>Horario</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {asignaciones.map((a, i) => (
                  <tr
                    key={i}
                    className={`group transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 hover:shadow-sm ${
                      i !== asignaciones.length - 1 ? "border-b border-slate-100" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full group-hover:scale-125 transition-transform duration-200 shadow-sm"></div>
                        <span className="font-semibold text-slate-800">{a.grupo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-200 shadow-sm"></div>
                        <span className="text-slate-700">{a.materia}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-200 shadow-sm"></div>
                        <span className="text-slate-700 font-medium">{a.aula}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-200 shadow-sm"></div>
                        <span className="text-slate-700">{a.piso}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-200 shadow-sm"></div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-800 rounded-full text-xs font-bold border border-blue-200/60 group-hover:shadow-sm transition-all duration-200">
                          <Clock className="w-3 h-3" />
                          <span>
                            {a.dia} - {a.bloque}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200/60 flex items-center justify-center gap-3">
          <TrendingUp className="w-5 h-5 text-slate-500" />
          <span className="text-sm text-slate-600 font-medium">Asignación óptima cargada exitosamente</span>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
