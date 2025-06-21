"use client"

import { Settings } from "lucide-react";

export default function ParametrosForm({ delta, setDelta, lambda, setLambda }) {

  const manejarDelta = (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && val >= 0 && val <= 1) {
      setDelta(val);
    }
  };

  const manejarLambda = (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && val >= 0) {
      setLambda(val);
    }
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mt-8 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-[linear-gradient(rgba(59,130,246,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.2)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Parámetros de Optimización</h2>
            <p className="text-slate-500 text-sm">Ajusta los valores antes de ejecutar el modelo MILP</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium text-slate-700">Umbral δ (subutilización)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={delta}
              onChange={manejarDelta}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 bg-slate-50/50"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-slate-700">Penalización λ</label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={lambda}
              onChange={manejarLambda}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100 bg-slate-50/50"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
