import React, { Fragment, useState, useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext';


const NuevoProyecto = () => {

    //Obtener el estate del formulario
    const proyectosContext = useContext(proyectoContext);

    const 
    { 
        formulario,
        validacion, 
        mostrarFormulario, 
        agregarProyecto,
        mostrarError 
    } 
    = proyectosContext;

    //State para proyecto
    const [ proyecto, setProyecto ] = useState({
        nombre: ''
    });

    const handleChange = e => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        //Validar proyecto
        if(nombre === ''){
            mostrarError();
            return;
        }

        //Agregar al state
        agregarProyecto(proyecto);

        //Reiniciar el form
        setProyecto({
            nombre: ''
        });
    }

    const { nombre } = proyecto;

    return (
        <Fragment>
            <button className="btn btn-block btn-primario" onClick={() => mostrarFormulario()}>Nuevo Proyecto</button> 
            { formulario 
                ?
                    (
                        <form className="formulario-nuevo-proyecto" onSubmit={handleSubmit}>
                            <input 
                            type="text" 
                            name="nombre" 
                            placeholder="Nombre Proyecto"
                            value={nombre}
                            onChange={handleChange}
                            className="input-text"/>

                            <input type="submit" value="Crear Proyecto" className="btn btn-primario btn-block"/>
                        </form>
                    )
                :
                    null
                }
            {validacion 
            ?
                <p className="mensaje error">El nombre del proyecto es obligatorio</p>
            :
                null
            }
        </Fragment>
     );
}
 
export default NuevoProyecto;