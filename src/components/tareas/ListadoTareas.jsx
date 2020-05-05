import React, { Fragment, useContext } from 'react';
import Tarea from './Tarea';
import { CSSTransition, TransitionGroup} from 'react-transition-group'

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const ListadoTareas = () => {

    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const { tareas_proyecto } = tareasContext;

    if(!proyecto) return <h2>Selecciona un proyecto</h2> ;

    const [ proyectoActual ] = proyecto;

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                { tareas_proyecto.length === 0 
                    ?
                    ( <li className="tarea">No hay tareas</li> )
                    :
                    <TransitionGroup>
                        {
                            tareas_proyecto.map(tarea => (
                                <CSSTransition key={tarea._id} timeout={200} classNames="tarea">
                                    <Tarea tarea={tarea} />
                                </CSSTransition>
                            ))
                        }
                    </TransitionGroup>
                }
            </ul>
            <button className="btn btn-eliminar" onClick={() => eliminarProyecto(proyectoActual._id)}>
                Eliminar Proyecto &times;
            </button>
        </Fragment>
     );
}
 
export default ListadoTareas;