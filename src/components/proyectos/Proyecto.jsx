import React, {useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';
import  tareaContext from '../../context/tareas/tareaContext';

const Proyectos = ({proyecto}) => {

    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const { obtenerTareas } = tareasContext;

    const handleClick = proyectoId => {
        proyectoActual(proyectoId);
        obtenerTareas(proyectoId);
    }

    return ( 
        <li>
            <button className="btn btn-blank" onClick={ () => handleClick(proyecto._id)  }>
                {proyecto.nombre}
            </button>
        </li>
     );
}
 
export default Proyectos;