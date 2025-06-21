import { useState } from 'react';
import AulaForm from './components/AulaForm';
import GrupoForm from './components/GrupoForm';

function App() {
  const [aulas, setAulas] = useState([]);
  const [grupos, setGrupos] = useState([]);

  const agregarAula = (aula) => {
    setAulas([...aulas, aula]);
  };

  const agregarGrupo = (grupo) => {
    setGrupos([...grupos, grupo]);
  };

  return (
    <div>
      <h1>Proyecto: Asignación de Aulas</h1>
      
      <AulaForm onAgregarAula={agregarAula} />
      <GrupoForm onAgregarGrupo={agregarGrupo} />

      <h3>Grupos registrados:</h3>
      <ul>
        {grupos.map((g, i) => (
          <li key={i}>
            {g.nombre} - {g.materia} - {g.cantidad} estudiantes
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
