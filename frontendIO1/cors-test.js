// Script de prueba para verificar CORS
// Puedes ejecutar esto en la consola del navegador

const testCORS = async () => {
  const apiUrl = 'https://api.io1.devhoo.me';
  
  console.log('🧪 Probando CORS con:', apiUrl);
  
  try {
    // Prueba 1: GET básico
    console.log('📡 Prueba 1: GET /');
    const response1 = await fetch(`${apiUrl}/`);
    const data1 = await response1.json();
    console.log('✅ GET / exitoso:', data1);
    
    // Prueba 2: GET health check
    console.log('📡 Prueba 2: GET /api/health');
    const response2 = await fetch(`${apiUrl}/api/health`);
    const data2 = await response2.json();
    console.log('✅ GET /api/health exitoso:', data2);
    
    // Prueba 3: POST login (debería fallar por credenciales pero CORS debería funcionar)
    console.log('📡 Prueba 3: POST /api/auth/login');
    const response3 = await fetch(`${apiUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@test.com',
        password: 'test123'
      })
    });
    
    if (response3.status === 401 || response3.status === 422) {
      console.log('✅ POST login - CORS funciona (error de credenciales esperado)');
    } else {
      const data3 = await response3.json();
      console.log('✅ POST login exitoso:', data3);
    }
    
    // Prueba 4: Información de CORS
    console.log('📡 Prueba 4: GET /api/cors-info');
    const response4 = await fetch(`${apiUrl}/api/cors-info`);
    const data4 = await response4.json();
    console.log('✅ GET /api/cors-info exitoso:', data4);
    
    console.log('🎉 Todas las pruebas CORS completadas exitosamente!');
    
  } catch (error) {
    console.error('❌ Error en pruebas CORS:', error);
    
    if (error.message.includes('CORS')) {
      console.log(`
🔧 SOLUCION SUGERIDA:
1. Asegúrate de que el backend incluya estos orígenes en CORS:
   - ${window.location.origin}
   - https://io1.devhoo.me
   - https://www.io1.devhoo.me

2. Verifica que allow_credentials esté configurado correctamente

3. Comprueba que allow_methods incluya: GET, POST, PUT, DELETE, OPTIONS

4. Asegúrate de que allow_headers incluya: Content-Type, Authorization
      `);
    }
  }
};

// Función para probar desde diferentes orígenes
const testFromOrigin = (origin) => {
  console.log(`🌐 Probando CORS desde origen: ${origin}`);
  testCORS();
};

// Ejecutar prueba
testCORS();

// También exportar funciones para uso manual
window.testCORS = testCORS;
window.testFromOrigin = testFromOrigin;

console.log(`
🔍 INSTRUCCIONES:
1. Abre las herramientas de desarrollador (F12)
2. Ve a la pestaña "Console"
3. Ejecuta: testCORS()
4. Revisa los resultados

Si ves errores de CORS, actualiza la configuración del backend.
`);
