import React, {useReducer} from 'react'
import clienteAxios from '../../config/axios';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import 
{ 
    FORMULARIO_PROYECTO, 
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO ,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR
} 
from '../../types';

const ProyectoState = props => {

    const initialState = {
        formulario: false,
        proyectos: [],
        validacion: false,
        proyecto: null,
        mensaje: null
    }

    //dispatch para ejecutar las acciones
    const [ state, dispatch ] = useReducer(proyectoReducer, initialState);

    //Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

     //Agregar nuevo proyecto
     const agregarProyecto = async proyecto => {
        try {
            const res = await clienteAxios.post('/proyecto', proyecto);
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: res.data.proyecto
            })
        } catch (error) {
            const alerta = {
                message: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
            console.log(error);
        }
    }

    //Obtener proyectos
    const obtenerProyectos = async () => {
        try {
            const res = await clienteAxios.get('/proyectos');
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: res.data.proyectos
            });
        } catch (error) {
            const alerta = {
                message: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
            console.log(error);
        }
    }

    //Valida el formulario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    //Seleccionar proyecto
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    //Eliminar proyecto
    const eliminarProyecto = async proyectoId => {
        try {
            await clienteAxios.delete(`/proyecto/${proyectoId}`);
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            })
        } catch (error) {
            const alerta = {
                message: 'Hubo un error',
                categoria: 'alerta-error'
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            });
            console.log(error);
        }
    }

    return (
        <proyectoContext.Provider
            value={{ 
                formulario: state.formulario,
                proyectos: state.proyectos,
                validacion: state.validacion,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
             }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;