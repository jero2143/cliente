import React, {useContext} from 'react'

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


const Tarea = ({tarea}) => {

    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;

    const [proyectoActual] = proyecto;

    const onEliminarTarea = tareaId => {
        eliminarTarea(tareaId, proyectoActual._id);
        obtenerTareas(proyectoActual._id);
    }

    //Cambiar el estado de tarea
    const cambiarEstado = tarea => {
        if(tarea.estado){
            tarea.estado = false;
        }else{
            tarea.estado = true;
        }
        actualizarTarea(tarea);
    }

    //Selecionar tarea a editar
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado 
                ?
                    ( 
                        <button className="completo" onClick={ () => cambiarEstado(tarea) }>
                            Completo
                        </button>
                     )
                :
                    ( 
                        <button className="incompleto" onClick={ () => cambiarEstado(tarea) }>
                            Incompleto
                        </button>
                     )
                }
            </div>
            <div className="acciones">
                <button className="btn btn-primario" onClick={ () => seleccionarTarea(tarea) }>
                    Editar
                </button>
                <button className="btn btn-secundario" onClick={ () => onEliminarTarea(tarea._id) }>
                    Eliminar
                </button>
            </div>
        </li>
     );
}
 
export default Tarea;