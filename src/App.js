import React, { useState } from 'react';
import { automata } from './automata';
import  './App.css' ;

const circlePositions = {
  q0: { top: '500px', left: '10px' },
  q1: { top: '400px', left: '110px' },
  q2: { top: '500px', left: '210px' },
  q3: { top: '500px', left: '310px' },
  q4: { top: '400px', left: '410px' },
  q5: { top: '400px', left: '510px' },
  q6: { top: '400px', left: '610px' },
  q7: { top: '500px', left: '710px' },
  q8: { top: '500px', left: '810px' },
  q9: { top: '500px', left: '910px' },
  q10: { top: '600px', left: '110px' },
  q11: { top: '600px', left: '410px' },
  q12: { top: '600px', left: '510px' },
  q13: { top: '600px', left: '610px' },
};

function App() {
  const [palabra, setPalabra] = useState('');
  const [error, setError] = useState(false);
  const [estados, setEstados] = useState({
    q0: false,
    q1: false,
    q2: false,
    q3: false,
    q4: false,
    q5: false,
    q6: false,
    q7: false,
    q8: false,
    q9: false,
    q10: false,
    q11: false,
    q12: false,
    q13: false,
  });

  const [cadenaIngresada, setCadenaIngresada] = useState('');
  const [estadosRecorridos, setEstadosRecorridos] = useState('');
  const [estadosAmarillos, setEstadosAmarillos] = useState([]); 

  
  const actualizarEstados = (mensaje) => {


    const nuevosEstados = { ...estados };
      
    for (const estado in nuevosEstados) {
      nuevosEstados[estado] = false;
    }
    const estadosIngresados = mensaje.split(" --> ");
    estadosIngresados.forEach((estado) => {
      nuevosEstados[estado] = true;
      
    });

    setEstados(nuevosEstados);
  };

  const reiniciar = () => {
    setPalabra('');
    setError(false);
    setEstados({
      q0: false,
      q1: false,
      q2: false,
      q3: false,
      q4: false,
      q5: false,
      q6: false,
      q7: false,
      q8: false,
      q9: false,
      q10: false,
      q11: false,
      q12: false,
      q13: false,
    });
    setCadenaIngresada('');
  };

  const handleInputChange = (event) => {
    setPalabra(event.target.value.toUpperCase());
  };

  const handleButtonClick = async () => {
    reiniciar();
    const palabraUpperCase = palabra.toUpperCase();
    const { success, msg } = await automata(palabraUpperCase);
  
    setCadenaIngresada(palabraUpperCase);
    const estadosRecorridosArray = msg.split(" --> ");
  
    if (!success) {
      setError("Cadena inválida");
      const estadosInvalidos = estadosRecorridosArray.slice(0);
      setEstadosAmarillos(estadosInvalidos);
    } else {
      actualizarEstados(msg);
    }
  
    setEstadosRecorridos(estadosRecorridosArray); // Actualizar estadosRecorridos en cualquier caso
  };
  
  
  

  
  
  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Ingrese una palabra"
          value={palabra.toUpperCase()}
          onChange={handleInputChange}
        />
        <button onClick={handleButtonClick}>Validar</button>
      </div>
        <div className="cadena-ingresada">
          <strong>Cadena ingresada:</strong> {cadenaIngresada.toUpperCase()}
        </div>
        <div className="estados-recorridos">
        <strong>Estados recorridos:</strong> {estadosRecorridos}
  </div>
      {error && <div className="error">La cadena no es válida</div>}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {Object.keys(estados).map((estado) => (
        <div key={estado} className="estado-container">
          <svg
            className={`estado ${estados[estado] ? "activo" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
            width="73"
            height="73"
            viewBox="0 0 73 73"
            fill="none"
            style={{ position: 'absolute', ...circlePositions[estado] }}
          >
            <circle
              cx="36.5"
              cy="36.5"
              r="36.5"
              fill={estadosAmarillos.includes(estado) ? "#F9E79F" : estados[estado] ? "#58D68D" : "#000000"}
            />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill={estadosAmarillos.includes(estado) ? "#000000" : estados[estado] ? "#000000" : "#D9D9D9"}
            >
              {estado}
            </text>
          </svg>
        </div>
      ))}
      </div>

    </div>
  );
}

export default App;