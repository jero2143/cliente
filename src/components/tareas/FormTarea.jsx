import React, { useContext, useState, useEffect } from 'react'

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    const tareasContext = useContext(tareaContext);
    const 
    {
         validacion, 
         tarea_seleccionada, 
         agregarTarea, 
         validarTarea, 
         obtenerTareas, 
         actualizarTarea,
         limpiarTarea
    } 
    = tareasContext;

    useEffect(() => {
        if(tarea_seleccionada !== null){
            setTarea(tarea_seleccionada);
        }else{
            setTarea({
                nombre: ''
            });
        }
    }, [ tarea_seleccionada ]);

    const [tarea, setTarea] = useState({
        nombre: ''
    });

    const { nombre } = tarea;

    if(!proyecto) return null;

    const [ proyectoActual ] = proyecto;

    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        //Validar
        if(nombre.trim() === ''){
            validarTarea();
            return;
        }

        //Si es edicion o es nueva tarea
        if(tarea_seleccionada === null){
             //Agregar tarea
            tarea.proyectoId = proyectoActual._id;
            agregarTarea(tarea);
        }else{
            //Editar tarea
            actualizarTarea(tarea);

            //Elimina tarea seleccionada del state
            limpiarTarea();

        }

        //Obtener y filtrar las tareas del proyecto
        obtenerTareas(proyectoActual._id)

        //Reiniciar el form
        setTarea({
            nombre: ''
        });
    }

    return ( 
        <div className="formulario">
            <form onSubmit={handleSubmit}>
                <div className="contenedor-input">
                    <input 
                    type="text" 
                    name="nombre" 
                    placeholder="Nombre Tarea..."
                    onChange={handleChange} 
                    value={nombre}
                    className="input-text"/>
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit" 
                        className="btn btn-primario btn-submit btn-block" 
                        value={ tarea_seleccionada ? 'Editar Tarea' : 'Agregar Tarea' }/>
                </div>
            </form>
            { !validacion ? null : <p className="mensaje error">El nombre de la tarea es obligatorio</p> }
        </div>
     );
}
 
export default FormTarea;