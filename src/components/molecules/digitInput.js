import React, { useState } from 'react';
import DigitCircle from '../atoms/digitCircle';

const DigitInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [digitColors, setDigitColors] = useState([]);
  const [transitions, setTransitions] = useState([]);
  const [showTransitions, setShowTransitions] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setResult('');
    setDigitColors(Array(e.target.value.length).fill('yellow'));
    setTransitions([]);
    setShowTransitions(false);
  };

  const handleStartEvaluation = () => {
    let estadoActual = 'q0';
    let isValid = true;
    const newDigitColors = [...digitColors];
    const newTransitions = [];

    for (let i = 0; i < inputValue.length; i++) {
      const caracter = inputValue[i];
      let transitionMsg = `Transición aceptada a ${estadoActual}`;

      switch (estadoActual) {
        case 'q0':
          if (caracter === 'w') {
            estadoActual = 'q1';
          } else if (caracter === 'x') {
            estadoActual = 'q10';
          } else {
            isValid = false;
          }
          break;
  
          case 'q1':
            if (caracter === 'y' || caracter === 'z') {
              estadoActual = 'q2';
            } else {
              isValid = false;
            }
            break;
          
          case 'q2':
            if (caracter === '-') {
              estadoActual = 'q3';
            } else {
              isValid = false;
            }
            break;
  
          case 'q3':
            if (caracter === "0") {
              estadoActual = 'q4';
            } else if (/[1-9]/.test(caracter)) {
              estadoActual = 'q11';
            } else {
              isValid = false;
            }
            break;
          
          case 'q4':
            if (caracter === "0") {
              estadoActual = 'q5';
            } else if (/[1-9]/.test(caracter)) {
              estadoActual = 'q12';
            } else {
              isValid = false;
            }
            break;
          
          case 'q5':
            if (caracter === "0") {
              estadoActual = 'q6';
            } else if (/[1-9]/.test(caracter)) {
              estadoActual = 'q13';
            } else {
             isValid = false;
            }
            break;
          
          case 'q6':
            if (/[1-9]/.test(caracter)) {
              estadoActual = 'q7';
            } else {
              isValid = false;
            }
            break;
          
          case 'q7':
            if (caracter === '-') {
              estadoActual = 'q8';
            } else {
              isValid = false;
            }
            break;
          
          case 'q8':
            if (/[a-zA-Z]/.test(caracter)) {
              estadoActual = 'q9';
            } else {
              isValid = false;
            }
            break;
          
          case 'q10':
            if (/[a-e]/.test(caracter)) {
              estadoActual = 'q2';
            } else {
              isValid = false;
            }
            break;
          
          case 'q11':
            if (/[0-9]/.test(caracter)) {
              estadoActual = 'q12';
            } else {
              isValid = false;
            }
            break;
          
          case 'q12':
            if (/[0-9]/.test(caracter)) {
              estadoActual = 'q13';
            } else {
              isValid = false;
            }
            break;
          
          case 'q13':
            if (/[0-9]/.test(caracter)) {
              estadoActual = 'q7';
            } else {
              isValid = false;
            }
            break;

        default:
          isValid = false;
          transitionMsg = 'Transición no válida';
          break;
      }

      newDigitColors[i] = isValid ? 'green' : 'red';
      newTransitions.push(transitionMsg);

      transitionMsg = `Transición aceptada a ${estadoActual}`;
    }

    if (isValid || estadoActual === 'q9') {
      setResult('Cadena aceptada');
    } else {
      setResult('Cadena no válida');
    }

    setIsEvaluating(true);
    setDigitColors(newDigitColors);
    setTransitions(newTransitions);
    setShowTransitions(true);
  };

  return (
    <div className="digit-input">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Ingresa una cadena"
        className={isEvaluating ? (result === 'Cadena no válida' ? 'red' : 'green') : 'yellow'}
      />
      <button onClick={handleStartEvaluation}>Iniciar Evaluación</button>
      <div className="result">{result}</div>
      <div className="digit-circles">
        {inputValue.split('').map((digit, index) => (
          <div key={index}>
            <DigitCircle digit={digit} color={digitColors[index]} />
            {isEvaluating && showTransitions && <span>{transitions[index]}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DigitInput;
