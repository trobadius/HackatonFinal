import { useState, useEffect } from "react";
import React from "react";
import TareaFormulario from "./TareaFormulario";
// import '../hojas-de-estilo/ListaDeTareas.css';
import Tarea from "./Tarea";

export default function ListaDeTareas() {
    const [tareas, setTareas] = useState([]);
    useEffect(() => {
        const tareasGuardadas = localStorage.getItem('tareas');
        if (tareasGuardadas) {
            try {
                
                const tareasParsed = JSON.parse(tareasGuardadas);
                
                if (Array.isArray(tareasParsed)) {
                    setTareas(tareasParsed);
                }
            } catch (e) {
                
                console.error("No se pudieron cargar las tareas del Local Storage", e);
            }
        }
    }, []); 

    // 2. Guardar las tareas en el Local Storage cada vez que cambien
    useEffect(() => {
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }, [tareas]); // Se ejecuta cada vez que 'tareas' cambia

    // Funciones para agregar, eliminar y completar tareas

    const agregarTarea = tarea => {
        if (tarea.texto.trim()) {
            tarea.texto = tarea.texto.trim();
            const tareasActualizadas = [tarea, ...tareas];
            setTareas(tareasActualizadas);
        }
    }

    const eliminarTarea = id => {
        const tareasActualizadas = tareas.filter(tarea => tarea.id !== id);
        setTareas(tareasActualizadas);
    }

    const completarTarea = id => {
        const tareasActualizadas = tareas.map(tarea => {
            if (tarea.id === id) {
                tarea.completada = !tarea.completada;
            }
            return tarea;
        });
        setTareas(tareasActualizadas);
    }

    return (
        <>
            <TareaFormulario onSubmit={agregarTarea} />
            <div className="tareas-lista-contenedor">
                {tareas.map((tarea) =>
                    <Tarea
                        key={tarea.id}
                        id={tarea.id}
                        texto={tarea.texto}
                        completada={tarea.completada}
                        eliminarTarea={eliminarTarea}
                        completarTarea={completarTarea}
                    />
                )}
            </div>
        </>
    );
}