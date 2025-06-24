import { TableProperties, School, BookOpen, Building2, Clock } from "lucide-react"

export default function AsignacionTable({ asignaciones }) {
  if (!asignaciones || asignaciones.length === 0) {
    return (
      <div className="relative bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mt-8 overflow-hidden text-center">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[linear-gradient(rgba(59,130,246,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.3)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        </div>

        <div className="relative z-10 py-12 flex flex-col items-center">
          <TableProperties className="w-12 h-12 text-slate-300 mb-4" />
          <p className="text-slate-500 font-medium">No hay asignaciones disponibles aún.</p>
          <p className="text-slate-400 text-sm mt-2">Las asignaciones aparecerán aquí cuando estén disponibles.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mt-8 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-[linear-gradient(rgba(59,130,246,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.3)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <div className="absolute top-4 right-4 text-blue-100 text-sm font-mono opacity-20">∀g ∈ G, ∃a ∈ A, ∃t ∈ T</div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <TableProperties className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">A</span>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Matriz de Asignación</h2>
            <p className="text-slate-500 text-sm">Solución óptima de distribución de recursos</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-700 border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="sticky top-0 px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold rounded-tl-xl border-b-2 border-blue-200">
                  <div className="flex items-center gap-2">
                    <School className="w-4 h-4 text-blue-500" />
                    <span>Grupo</span>
                  </div>
                </th>
                <th className="sticky top-0 px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold border-b-2 border-blue-200">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-green-500" />
                    <span>Materia</span>
                  </div>
                </th>
                <th className="sticky top-0 px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold border-b-2 border-blue-200">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-orange-500" />
                    <span>Aula</span>
                  </div>
                </th>
                <th className="sticky top-0 px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold border-b-2 border-blue-200">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 flex items-center justify-center text-purple-500 font-mono text-xs">
                      n
                    </span>
                    <span>Piso</span>
                  </div>
                </th>
                <th className="sticky top-0 px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold rounded-tr-xl border-b-2 border-blue-200">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-500" />
                    <span>Horario</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {asignaciones.map((a, i) => (
                <tr
                  key={i}
                  className={`group transition-colors hover:bg-blue-50 ${i === asignaciones.length - 1 ? "border-b-0" : "border-b border-slate-100"}`}
                >
                  <td className="px-4 py-3 font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-125 transition-transform"></div>
                      {a.grupo}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      {a.materia}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      {a.aula}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      {a.piso}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="py-1 px-2 bg-blue-50 text-blue-700 rounded-md group-hover:bg-blue-100 transition-colors">
                        {a.dia} - {a.bloque}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 flex justify-center text-xs text-slate-500">
          Asignación óptima cargada
        </div>
      </div>
    </div>
  )
}
