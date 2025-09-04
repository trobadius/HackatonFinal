import React from 'react';
import { useState } from 'react';
// import '../hojas-de-estilo/TareaFormulario.css';
import { v4 as uuidv4 } from 'uuid';

export default function TareaFormulario(props) {

  const [input, setInput] = useState('');

  const manejarCambio = e => {
    setInput(e.target.value);
    
  }

  const manejarEnvio = (e) => {
    e.preventDefault();
  
    
    
    const tareaNueva = {
      id: uuidv4(),
      texto: input,
      completada: false
    }
    props.onSubmit(tareaNueva);

  }

  return (
    <form className="tarea-formulario"
      onSubmit={manejarEnvio}>
      <input
        type="text"
        className="tarea-input"
        placeholder="Escribe una tarea"
        name="texto"
        value={input}
        onChange={manejarCambio}
      />
      <button className="tarea-boton" type="submit">
        Añadir a la agenda
      </button>
    </form>
  );
}