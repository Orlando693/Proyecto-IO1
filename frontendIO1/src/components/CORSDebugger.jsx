import { useState } from 'react';
import { testService } from '../services/api';

export default function CORSDebugger() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    try {
      const testResults = await testService.runAllTests();
      setResults(testResults);
    } catch (error) {
      console.error('Error ejecutando pruebas:', error);
      setResults({ error: error.message });
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-md">
      <h3 className="text-lg font-bold mb-3">🔧 CORS Debugger</h3>
      
      <button
        onClick={runTests}
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-3 disabled:opacity-50"
      >
        {loading ? 'Probando...' : 'Probar Conectividad'}
      </button>

      {results && (
        <div className="space-y-2 text-sm">
          <div className="font-semibold">Resultados:</div>
          
          {/* Prueba de conexión */}
          <div className={`p-2 rounded ${results.connection?.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <div className="font-medium">Conexión: {results.connection?.success ? '✅' : '❌'}</div>
            {!results.connection?.success && (
              <div className="text-xs mt-1">{results.connection?.error?.message || 'Error desconocido'}</div>
            )}
          </div>

          {/* Prueba de health */}
          <div className={`p-2 rounded ${results.health?.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <div className="font-medium">Health: {results.health?.success ? '✅' : '❌'}</div>
            {!results.health?.success && (
              <div className="text-xs mt-1">{results.health?.error?.message || 'Error desconocido'}</div>
            )}
          </div>

          {/* Prueba de CORS */}
          <div className={`p-2 rounded ${results.cors?.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            <div className="font-medium">CORS: {results.cors?.success ? '✅' : '❌'}</div>
            {results.cors?.success && results.cors?.data && (
              <div className="text-xs mt-1">
                <div>Env: {results.cors.data.environment}</div>
                <div>Origins: {Array.isArray(results.cors.data.allowed_origins) 
                  ? results.cors.data.allowed_origins.join(', ') 
                  : results.cors.data.allowed_origins}</div>
              </div>
            )}
            {!results.cors?.success && (
              <div className="text-xs mt-1">{results.cors?.error?.message || 'Error desconocido'}</div>
            )}
          </div>

          {/* Información adicional */}
          <div className="mt-3 p-2 bg-gray-100 rounded text-xs">
            <div><strong>Origen actual:</strong> {window.location.origin}</div>
            <div><strong>API URL:</strong> https://api.io1.devhoo.me/api</div>
          </div>

          {/* Sugerencias */}
          {(!results.connection?.success || !results.health?.success || !results.cors?.success) && (
            <div className="mt-3 p-2 bg-yellow-100 text-yellow-800 rounded text-xs">
              <div className="font-medium">💡 Sugerencias:</div>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Verifica que el backend esté funcionando</li>
                <li>Confirma que CORS incluya: {window.location.origin}</li>
                <li>Revisa las herramientas de desarrollador (F12)</li>
                <li>Verifica la configuración de red/firewall</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
