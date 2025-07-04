"use client"

import { Settings, Sliders, TrendingUp } from "lucide-react"

export default function ParametrosForm({ delta, setDelta, lambda, setLambda }) {
  const manejarDelta = (e) => {
    const val = Number.parseFloat(e.target.value)
    if (!isNaN(val) && val >= 0 && val <= 1) {
      setDelta(val)
    }
  }

  const manejarLambda = (e) => {
    const val = Number.parseFloat(e.target.value)
    if (!isNaN(val) && val >= 0) {
      setLambda(val)
    }
  }

  return (
    <div lassName="relative bg-transparent md:bg-gradient-to-br md:from-white md:via-slate-50/30 md:to-white rounded-3xl md:shadow-2xl md:border border-slate-200/60 md:p-10 mb-12 overflow-hidden md:backdrop-blur-sm">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full bg-[radial-gradient(circle_at_40%_60%,rgba(234,179,8,0.3)_0%,transparent_50%),linear-gradient(rgba(234,179,8,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(234,179,8,0.1)_1px,transparent_1px)] bg-[size:300px_300px,24px_24px,24px_24px]" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-4 right-8 w-20 h-20 bg-gradient-to-br from-yellow-100/30 to-orange-100/20 rounded-full animate-pulse"></div>
      <div
        className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-br from-orange-100/30 to-yellow-100/20 rounded-full animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Mathematical Formula */}
      <div className="absolute top-6 right-6 text-yellow-200/40 text-sm font-mono">δ, λ ∈ ℝ⁺</div>

      {/* Gradient Border */}

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          <div className="relative group">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 via-yellow-600 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-300">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-400 rounded-full flex items-center justify-center animate-pulse">
              <Sliders className="w-3 h-3 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-2">
              Parámetros de Optimización
            </h2>
            <p className="text-slate-600 font-medium">Ajusta los valores antes de ejecutar el modelo MILP</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-500">Configuración avanzada</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Delta Parameter */}
          <div className="group space-y-4">
            <label className="flex items-center gap-3 text-sm font-bold text-slate-700">
              <div className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full shadow-sm"></div>
              Umbral δ (subutilización)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={delta}
                onChange={manejarDelta}
                className="w-full pl-6 pr-14 py-4 border-2 border-slate-200/60 rounded-2xl text-slate-800 focus:outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-100/50 transition-all duration-300 bg-gradient-to-r from-slate-50/50 to-white shadow-sm hover:shadow-md group-hover:border-slate-300"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 font-mono text-lg group-focus-within:text-yellow-500 transition-colors duration-200">
                δ
              </div>
            </div>
            <div className="text-xs text-slate-500 bg-yellow-50 p-3 rounded-xl border border-yellow-100">
              <strong>Rango:</strong> 0.0 - 1.0 | <strong>Actual:</strong> {delta}
            </div>
          </div>

          {/* Lambda Parameter */}
          <div className="group space-y-4">
            <label className="flex items-center gap-3 text-sm font-bold text-slate-700">
              <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-sm"></div>
              Penalización λ
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="0"
                value={lambda}
                onChange={manejarLambda}
                className="w-full pl-6 pr-14 py-4 border-2 border-slate-200/60 rounded-2xl text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100/50 transition-all duration-300 bg-gradient-to-r from-slate-50/50 to-white shadow-sm hover:shadow-md group-hover:border-slate-300"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 font-mono text-lg group-focus-within:text-orange-500 transition-colors duration-200">
                λ
              </div>
            </div>
            <div className="text-xs text-slate-500 bg-orange-50 p-3 rounded-xl border border-orange-100">
              <strong>Mínimo:</strong> 0.0 | <strong>Actual:</strong> {lambda}
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 p-6 bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-200/60">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-slate-600" />
            <h3 className="font-bold text-slate-800">Información de Parámetros</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <strong>δ (Delta):</strong> Controla el umbral de subutilización
              </div>
              <div className="text-xs text-slate-500 ml-4">Valores más altos permiten mayor subutilización</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <strong>λ (Lambda):</strong> Factor de penalización
              </div>
              <div className="text-xs text-slate-500 ml-4">Valores más altos penalizan más las violaciones</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
