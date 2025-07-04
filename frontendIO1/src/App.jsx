
import { useState, useEffect } from "react"
import { Routes, Route, Link, Navigate, Outlet, useLocation } from "react-router-dom"
import { optimizationService } from "./services/api"

import AulaForm from "./components/AulaForm"
import GrupoForm from "./components/GrupoForm"
import HorarioForm from "./components/HorarioForm"
import AsignacionTable from "./components/AsignacionTable"
import ParametrosForm from "./components/ParametrosForm"
import LoginPage from "./components/Loginpage"
import RegisterPage from "./components/RegisterPage"
import RutaPrivada from "./components/RutaPrivada"
import LayoutPrivado from "./components/LayoutPrivado"
import CORSDebugger from "./components/CORSDebugger"
import { AuthProvider } from "./contexts/AuthContext"

import { LayoutList, Users, CalendarDays, Settings, Clock, GraduationCap, Zap, TrendingUp } from "lucide-react"

import "./index.css"

// Componente para renderizar el resumen de la IA con formato mejorado
function ResumenIA({ contenido }) {
  if (!contenido) return null;

  const procesarContenido = (texto) => {
    const lineas = texto.split('\n');
    const elementos = [];
    let i = 0;

    while (i < lineas.length) {
      const linea = lineas[i].trim();
      
      if (!linea) {
        i++;
        continue;
      }

      // Títulos principales (###)
      if (linea.startsWith('###')) {
        elementos.push(
          <h3 key={i} className="text-lg sm:text-xl font-bold text-slate-800 mb-3 mt-6 first:mt-0 border-b-2 border-blue-200 pb-2 flex items-center gap-2">
            <span className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">📊</span>
            </span>
            {linea.replace('###', '').trim()}
          </h3>
        );
      }
      // Subtítulos (**texto:**)
      else if (linea.startsWith('**') && linea.endsWith(':**')) {
        elementos.push(
          <h4 key={i} className="text-base sm:text-lg font-semibold text-slate-700 mb-3 mt-4 first:mt-0 flex items-center gap-2">
            <span className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-md"></span>
            {linea.replace(/\*\*/g, '').replace(':', '')}
          </h4>
        );
      }
      // Listas numeradas
      else if (/^\d+\./.test(linea)) {
        const itemsLista = [];
        let j = i;
        
        while (j < lineas.length && /^\d+\./.test(lineas[j].trim())) {
          const item = lineas[j].trim();
          const numero = item.match(/^(\d+)\./)[1];
          const contenido = item.replace(/^\d+\./, '').trim();
          
          // Verificar si hay texto en negrita al inicio
          const textoFormateado = contenido.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          
          itemsLista.push(
            <li key={j} className="mb-3 text-sm sm:text-base leading-relaxed">
              <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors duration-200">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold rounded-full mt-0.5 shrink-0 shadow-sm">
                  {numero}
                </span>
                <span className="flex-1" dangerouslySetInnerHTML={{ __html: textoFormateado }} />
              </div>
            </li>
          );
          j++;
        }
        
        elementos.push(
          <ol key={i} className="space-y-2 mb-6">
            {itemsLista}
          </ol>
        );
        i = j - 1;
      }
      // Listas con viñetas (-)
      else if (linea.startsWith('-')) {
        const itemsLista = [];
        let j = i;
        
        while (j < lineas.length && lineas[j].trim().startsWith('-')) {
          const item = lineas[j].trim();
          const contenido = item.replace(/^-/, '').trim();
          const textoFormateado = contenido.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          
          itemsLista.push(
            <li key={j} className="mb-3 text-sm sm:text-base leading-relaxed">
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border-l-4 border-blue-400">
                <span className="inline-flex items-center justify-center w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mt-1 shrink-0"></span>
                <span className="flex-1" dangerouslySetInnerHTML={{ __html: textoFormateado }} />
              </div>
            </li>
          );
          j++;
        }
        
        elementos.push(
          <ul key={i} className="space-y-2 mb-6">
            {itemsLista}
          </ul>
        );
        i = j - 1;
      }
      // Párrafos normales
      else {
        const textoFormateado = linea.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-800">$1</strong>');
        elementos.push(
          <p key={i} className="text-sm sm:text-base leading-relaxed mb-4 text-slate-700 hover:text-slate-900 transition-colors duration-200 p-2 rounded-md hover:bg-slate-50">
            <span dangerouslySetInnerHTML={{ __html: textoFormateado }} />
          </p>
        );
      }
      
      i++;
    }

    return elementos;
  };

  return (
    <div className="prose prose-sm sm:prose-base max-w-none resumen-ia">
      {procesarContenido(contenido)}
    </div>
  );
}

// Componente para mostrar la lista de optimizaciones
function ListaOptimizaciones({ optimizaciones, optimizacionSeleccionada, onSeleccionar, onNueva, isLoading }) {
  if (!optimizaciones.length) {
    return (
      <div className="mt-6 p-6 sm:p-8 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border-2 border-dashed border-slate-300 text-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <LayoutList className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <p className="text-slate-600 text-sm sm:text-base font-medium mb-4">No hay optimizaciones guardadas</p>
        <button
          onClick={onNueva}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          🚀 Crear Primera Optimización
        </button>
      </div>
    )
  }

  return (
    <div className="mt-6 w-full max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <LayoutList className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-800">Optimizaciones Guardadas</h3>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
            {optimizaciones.length}
          </span>
        </div>
        <button
          onClick={onNueva}
          disabled={isLoading}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
            isLoading 
              ? 'bg-slate-400 text-slate-600 cursor-not-allowed' 
              : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
          }`}
        >
          <span className="text-base">+</span>
          <span>Nueva Optimización</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
        {optimizaciones.map((opt) => (
          <div
            key={opt.id}
            onClick={() => !isLoading && onSeleccionar(opt)}
            className={`group relative bg-white rounded-xl border-2 transition-all duration-300 overflow-hidden ${
              isLoading 
                ? 'opacity-50 cursor-not-allowed' 
                : 'cursor-pointer hover:shadow-xl hover:-translate-y-1'
            } ${
              optimizacionSeleccionada?.id === opt.id
                ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg scale-105'
                : 'border-slate-200 hover:border-blue-300'
            }`}
          >
            {/* Header con gradiente */}
            <div className={`h-2 w-full ${
              optimizacionSeleccionada?.id === opt.id
                ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                : opt.resultado?.asignacion?.length > 0 
                  ? 'bg-gradient-to-r from-green-500 to-green-600'
                  : 'bg-gradient-to-r from-orange-400 to-orange-500'
            }`} />
            
            {/* Contenido principal */}
            <div className="p-4 sm:p-5">
              {/* Título y estado */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-base sm:text-lg text-slate-800 truncate group-hover:text-blue-700 transition-colors">
                    {opt.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 line-clamp-2">
                    {opt.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  {opt.resultado?.asignacion?.length > 0 ? (
                    <div className="flex items-center gap-1" title="Con resultados">
                      <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs font-semibold text-green-600">✓</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1" title="Sin resultados">
                      <span className="w-3 h-3 bg-orange-400 rounded-full" />
                      <span className="text-xs font-semibold text-orange-600">⏳</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Estadísticas */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                <div className="bg-blue-50 rounded-lg p-2 text-center">
                  <div className="text-lg sm:text-xl font-bold text-blue-600">
                    {opt.aulas?.length || 0}
                  </div>
                  <div className="text-xs text-blue-500 font-medium">Aulas</div>
                </div>
                <div className="bg-green-50 rounded-lg p-2 text-center">
                  <div className="text-lg sm:text-xl font-bold text-green-600">
                    {opt.grupos?.length || 0}
                  </div>
                  <div className="text-xs text-green-500 font-medium">Grupos</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-2 text-center">
                  <div className="text-lg sm:text-xl font-bold text-purple-600">
                    {opt.bloques_disponibles?.length || 0}
                  </div>
                  <div className="text-xs text-purple-500 font-medium">Horarios</div>
                </div>
              </div>

              {/* Footer con fecha */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <div className="text-xs text-slate-400">
                  {new Date(opt.created_at).toLocaleDateString('es-ES', { 
                    day: '2-digit', 
                    month: 'short',
                    year: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-slate-500">
                    {opt.resultado?.asignacion?.length > 0 ? 'Optimizado' : 'Pendiente'}
                  </span>
                  {optimizacionSeleccionada?.id === opt.id && (
                    <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full font-semibold">
                      ACTIVO
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Efecto hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  )
}

function Dashboard({ aulas, grupos, horarios, totalAlumnos, generarAsignacion, asignaciones, resultIA, optimizaciones, optimizacionSeleccionada, onSeleccionarOptimizacion, onNuevaOptimizacion, isLoading }) {
  const { pathname } = useLocation()

  const tabs = [
    { to: "/aulas", icon: <LayoutList size={20} />, label: "Aulas", color: "blue" },
    { to: "/grupos", icon: <Users size={20} />, label: "Grupos", color: "green" },
    { to: "/horarios", icon: <CalendarDays size={20} />, label: "Horarios", color: "purple" },
    { to: "/parametros", icon: <Settings size={20} />, label: "Parámetros", color: "yellow" },
  ]

  const colorClasses = {
    blue: "bg-blue-600 text-white border-blue-600 shadow-blue-200",
    green: "bg-green-600 text-white border-green-600 shadow-green-200",
    purple: "bg-purple-600 text-white border-purple-600 shadow-purple-200",
    yellow: "bg-yellow-500 text-white border-yellow-500 shadow-yellow-200",
  }

  return (
    <div className="min-h-screen md:p-2 sm:p-4 lg:p-6">
      {/* HEADER */}
      <div className="relative bg-gradient-to-br from-white via-slate-50/50 to-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl lg:shadow-2xl border border-slate-200/60 p-4 sm:p-8 lg:p-16 mb-4 sm:mb-8 lg:mb-20 text-center overflow-hidden backdrop-blur-sm">
        {/* Background Pattern */}

        {/* Floating Elements - Responsive sizes */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 lg:top-8 lg:left-8 w-8 h-8 sm:w-12 sm:h-12 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full animate-pulse"></div>
        <div
          className="absolute top-3 right-4 sm:top-6 sm:right-8 lg:top-12 lg:right-16 w-6 h-6 sm:w-10 sm:h-10 lg:w-16 lg:h-16 bg-gradient-to-br from-green-200/30 to-blue-200/30 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 lg:bottom-8 lg:right-8 w-4 h-4 sm:w-8 sm:h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Gradient Border */}
        <div className="#"></div>

        <div className="relative z-10">
          <div className="flex flex-col items-center gap-2 mb-3 sm:mb-4 lg:mb-6">
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent tracking-tight leading-tight text-center">
              Sistema de Optimización
            </h1>
            {optimizacionSeleccionada && !isLoading && (
              <div className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 rounded-full text-xs sm:text-sm font-semibold border border-blue-200 shadow-sm">
                <span className="hidden sm:inline">Editando:</span> {optimizacionSeleccionada.name}
              </div>
            )}
            {isLoading && (
              <div className="px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-50 text-orange-800 rounded-full text-xs sm:text-sm font-semibold border border-orange-200 shadow-sm animate-pulse">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 spinner"></div>
                  <span>Optimizando asignaciones...</span>
                </div>
              </div>
            )}
          </div>
          <p className="text-sm sm:text-lg lg:text-xl text-slate-600 font-medium mb-2 sm:mb-4">Investigación Operativa</p>
          <div className="w-full max-w-7xl mx-auto">
            <ListaOptimizaciones 
              optimizaciones={optimizaciones}
              optimizacionSeleccionada={optimizacionSeleccionada}
              onSeleccionar={onSeleccionarOptimizacion}
              onNueva={onNuevaOptimizacion}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="relative bg-gradient-to-br from-white via-slate-50/30 to-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl border border-slate-200/60 p-4 sm:p-6 lg:p-10 mb-4 sm:mb-8 lg:mb-12 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-transparent to-purple-50/20 rounded-xl sm:rounded-2xl lg:rounded-3xl"></div>

        <div className="relative z-10">
          <div className="flex justify-center mb-2 sm:mb-4 space-x-1 sm:space-x-2 lg:space-x-6 overflow-x-auto w-full relative shrink-0 pb-2 sm:pb-4 lg:pb-8">
            {tabs.map(({ to, icon, label, color }) => {
              const active = pathname.startsWith(to)
              return (
                <Link
                  key={to}
                  to={to}
                  className={`group relative flex items-center gap-1 sm:gap-2 lg:gap-3 px-3 sm:px-3 lg:px-4 py-3 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl lg:rounded-2xl font-bold border-2 transition-all shrink-0 duration-300 transform hover:scale-105 text-xs sm:text-sm lg:text-base ${active
                      ? `${colorClasses[color]} shadow-lg sm:shadow-xl hover:shadow-xl lg:hover:shadow-2xl`
                      : "bg-white/80 text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm sm:shadow-lg hover:shadow-md sm:hover:shadow-xl"
                    }`}
                >
                  <div
                    className={`transition-transform duration-300 shrink-0 flex ${active ? "scale-110" : "group-hover:scale-110"}`}
                  >
                    <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 flex shrink">
                      {icon}
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm tracking-wide hidden sm:flex whitespace-nowrap">{label}</span>
                  {active && (
                    <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full shadow-sm animate-pulse"></div>
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

      {/* RESUMEN - Responsive Cards */}
      <div className="relative bg-gradient-to-br from-slate-50 to-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl border border-slate-200/60 p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="w-full h-full bg-[linear-gradient(rgba(59,130,246,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.4)_1px,transparent_1px)] bg-[size:12px_12px] sm:bg-[size:20px_20px] lg:bg-[size:24px_24px]" />
        </div>

        {/* Decorative Elements - Responsive */}
        <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-full -translate-y-8 sm:-translate-y-12 lg:-translate-y-16 translate-x-8 sm:translate-x-12 lg:translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 sm:w-18 sm:h-18 lg:w-24 lg:h-24 bg-gradient-to-tr from-purple-100/30 to-transparent rounded-full translate-y-6 sm:translate-y-9 lg:translate-y-12 -translate-x-6 sm:-translate-x-9 lg:-translate-x-12"></div>

        <div className="relative z-10">
          {/* Header with responsive text */}
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2 sm:mb-4">
              Resumen de Datos Cargados
            </h2>
          </div>

          {/* Responsive Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {/* Aulas Card */}
            <div className="group relative bg-white rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 border border-slate-200/60 shadow-sm sm:shadow-lg hover:shadow-md sm:hover:shadow-xl lg:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-blue-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center text-white shadow-sm sm:shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <LayoutList className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6" />
                  </div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 bg-blue-200 rounded-full group-hover:bg-blue-400 transition-colors duration-300"></div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                    {aulas.length}
                  </div>
                  <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs sm:text-xs font-semibold tracking-wide uppercase border border-blue-100">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-500 rounded-full"></div>
                    <span className="hidden sm:inline">Aulas Activas</span>
                    <span className="sm:hidden">Aulas</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Grupos Card */}
            <div className="group relative bg-white rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 border border-slate-200/60 shadow-sm sm:shadow-lg hover:shadow-md sm:hover:shadow-xl lg:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-green-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-green-500 to-green-600"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center text-white shadow-sm sm:shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6" />
                  </div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 bg-green-200 rounded-full group-hover:bg-green-400 transition-colors duration-300"></div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-green-600 group-hover:text-green-700 transition-colors duration-300">
                    {grupos.length}
                  </div>
                  <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-green-50 text-green-700 rounded-full text-xs sm:text-xs font-semibold tracking-wide uppercase border border-green-100">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-500 rounded-full"></div>
                    <span className="hidden sm:inline">Grupos Activos</span>
                    <span className="sm:hidden">Grupos</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Horarios Card */}
            <div className="group relative bg-white rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 border border-slate-200/60 shadow-sm sm:shadow-lg hover:shadow-md sm:hover:shadow-xl lg:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-purple-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center text-white shadow-sm sm:shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6" />
                  </div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 bg-purple-200 rounded-full group-hover:bg-purple-400 transition-colors duration-300"></div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-purple-600 group-hover:text-purple-700 transition-colors duration-300">
                    {horarios.length}
                  </div>
                  <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs sm:text-xs font-semibold tracking-wide uppercase border border-purple-100">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-500 rounded-full"></div>
                    <span className="hidden sm:inline">Horarios Activos</span>
                    <span className="sm:hidden">Horarios</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Alumnos Card */}
            <div className="group relative bg-white rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 border border-slate-200/60 shadow-sm sm:shadow-lg hover:shadow-md sm:hover:shadow-xl lg:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-orange-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center text-white shadow-sm sm:shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6" />
                  </div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 bg-orange-200 rounded-full group-hover:bg-orange-400 transition-colors duration-300"></div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-orange-600 group-hover:text-orange-700 transition-colors duration-300">
                    {totalAlumnos}
                  </div>
                  <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 bg-orange-50 text-orange-700 rounded-full text-xs sm:text-xs font-semibold tracking-wide uppercase border border-orange-100">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-orange-500 rounded-full"></div>
                    <span className="hidden sm:inline">Alumnos Activos</span>
                    <span className="sm:hidden">Alumnos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTÓN MEJORADO - Responsive */}
      <div className="text-center mb-6 sm:mb-8 lg:mb-12">
        <div className="relative inline-block">
          <button
            onClick={generarAsignacion}
            disabled={isLoading}
            className={`group relative px-4 sm:px-6 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-lg sm:rounded-xl lg:rounded-2xl font-bold text-sm sm:text-base lg:text-lg shadow-lg sm:shadow-xl lg:shadow-2xl transition-all duration-300 transform overflow-hidden button-transition ${
              isLoading 
                ? 'loading-button' 
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-500/25 hover:scale-105 hover:-translate-y-1'
            } text-white`}
          >
            {!isLoading && (
              <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            )}
            <div className="relative flex items-center gap-2 sm:gap-3">
              {isLoading ? (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 spinner"></div>
                  <span className="whitespace-nowrap">Procesando Optimización...</span>
                </>
              ) : (
                <>
                  <span className="whitespace-nowrap">
                    {optimizacionSeleccionada ? 'Actualizar Asignación' : 'Generar Asignación Óptima'}
                  </span>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
                </>
              )}
            </div>
            {!isLoading && (
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000"></div>
              </div>
            )}
          </button>
        </div>
        {isLoading && (
          <p className="mt-3 text-sm text-slate-500 animate-pulse">
            Este proceso puede tardar unos momentos...
          </p>
        )}
      </div>

      <AsignacionTable asignaciones={asignaciones} />

      {/* RESUMEN IA MEJORADO - Responsive */}
      {resultIA && (
        <div className="relative bg-gradient-to-br from-white via-slate-50/30 to-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl border border-slate-200/60 p-4 sm:p-6 lg:p-10 mt-6 sm:mt-10 lg:mt-16 overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-green-50/20 via-transparent to-blue-50/20 rounded-xl sm:rounded-2xl lg:rounded-3xl"></div>

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center shadow-sm sm:shadow-lg shrink-0">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Resumen de Optimización
              </h2>
              <div className="hidden sm:block flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent"></div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-white rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-200/60 shadow-inner">
              <div className="max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] overflow-y-auto space-y-2 sm:space-y-3 lg:space-y-4 text-slate-700 custom-scrollbar">
                <ResumenIA contenido={resultIA} />
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
  const [optimizaciones, setOptimizaciones] = useState([])
  const [optimizacionSeleccionada, setOptimizacionSeleccionada] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const totalAlumnos = grupos.reduce((sum, g) => sum + g.cantidad, 0)

  // Cargar optimizaciones del usuario al iniciar
  useEffect(() => {
    cargarOptimizaciones()
  }, [])

  const cargarOptimizaciones = async () => {
    try {
      const response = await optimizationService.getOptimizations()
      setOptimizaciones(response)
    } catch (error) {
      console.error("Error al cargar optimizaciones:", error)
    }
  }

  const seleccionarOptimizacion = (optimizacion) => {
    setOptimizacionSeleccionada(optimizacion)
    
    // Cargar datos de la optimización en los formularios
    setAulas(optimizacion.aulas || [])
    setGrupos(optimizacion.grupos || [])
    setHorarios(optimizacion.bloques_disponibles?.map((bloque, index) => ({
      id: Date.now() + index,
      bloque: bloque,
      fechaCreacion: new Date().toLocaleString()
    })) || [])
    
    // Si tiene resultados, mostrarlos
    if (optimizacion.resultado && optimizacion.resultado.asignacion) {
      setAsignaciones(optimizacion.resultado.asignacion)
    } else {
      setAsignaciones([])
    }
    
    if (optimizacion.resumen_ia) {
      setResultIA(optimizacion.resumen_ia)
    } else {
      setResultIA("")
    }
  }

  const crearNuevaOptimizacion = () => {
    setOptimizacionSeleccionada(null)
    setAulas([])
    setGrupos([])
    setHorarios([])
    setAsignaciones([])
    setResultIA("")
  }

  const generarAsignacion = async () => {
    if (!aulas.length || !grupos.length || !horarios.length) {
      alert("Debes ingresar al menos un aula, un grupo y un horario.")
      return
    }
    
    setIsLoading(true)
    
    try {
      let response

      if (optimizacionSeleccionada) {
        // Primero actualizar los datos de la optimización
        const datosActualizados = {
          name: optimizacionSeleccionada.name,
          description: optimizacionSeleccionada.description,
          aulas,
          grupos,
          bloques_disponibles: horarios.map(h => h.bloque),
          delta: 0.2,
          lambda_: 1,
        }
        
        await optimizationService.updateOptimization(optimizacionSeleccionada.id, datosActualizados)
        
        // Luego ejecutar la optimización actualizada
        response = await optimizationService.executeOptimization(optimizacionSeleccionada.id)
      } else {
        // Crear nueva optimización usando el endpoint legacy
        const datos = {
          aulas,
          grupos,
          bloques_disponibles: horarios,
          delta: 0.2,
          lambda_: 1,
        }
        response = await optimizationService.generateOptimalAssignment(datos)
      }
      
      // Verificar si hubo un error en la respuesta
      if (response.asignacion && response.asignacion.error) {
        alert(`Error en la optimización:\n\n${response.asignacion.error}`)
        return
      }
      
      if (response.error) {
        alert(`Error en la optimización:\n\n${response.error}`)
        return
      }
      
      // Manejar diferentes formatos de respuesta
      let asignacionData = []
      let resumenData = ""
      
      if (optimizacionSeleccionada) {
        // Respuesta del endpoint de ejecución
        asignacionData = response.resultado?.asignacion || []
        resumenData = response.resumen_ia || ""
      } else {
        // Respuesta del endpoint legacy
        asignacionData = response.asignacion?.asignacion || []
        resumenData = response.asignacion?.resumen_generado || ""
      }
      
      setAsignaciones(asignacionData)
      setResultIA(resumenData)
      
      // Recargar la lista de optimizaciones para mostrar cambios
      await cargarOptimizaciones()
      
    } catch (error) {
      console.error("Error al comunicarse con el backend:", error)
      
      // Mostrar mensaje de error más específico
      let errorMessage = "Ocurrió un error al comunicarse con el servidor."
      
      if (error.response && error.response.data) {
        if (error.response.data.detail) {
          errorMessage = `Error: ${error.response.data.detail}`
        } else if (error.response.data.error) {
          errorMessage = `Error de optimización:\n\n${error.response.data.error}`
        }
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`
      }
      
      alert(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
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
                  optimizaciones={optimizaciones}
                  optimizacionSeleccionada={optimizacionSeleccionada}
                  onSeleccionarOptimizacion={seleccionarOptimizacion}
                  onNuevaOptimizacion={crearNuevaOptimizacion}
                  isLoading={isLoading}
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
            <Route path="horarios" element={
              <HorarioForm 
                onAgregarHorario={setHorarios} 
                horarios={horarios}
                onEliminarHorario={(id) => setHorarios(prev => prev.filter(h => h.id !== id))}
              />
            } />
            <Route
              path="parametros"
              element={<ParametrosForm delta={0.2} setDelta={() => { }} lambda={1} setLambda={() => { }} />}
            />
          </Route>
        </Route>
      </Routes>
      
      {/* CORS Debugger - solo en desarrollo */}
      {import.meta.env.DEV && <CORSDebugger />}
    </AuthProvider>
  )
}
