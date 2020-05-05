import React, { useReducer } from 'react'

import tareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import clienteAxios from '../../config/axios';

import
{ 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} 
from '../../types';

const TareaState = props => {
    const initialState = {
        tareas_proyecto: [],
        validacion: false,
        tarea_seleccionada: null
    }
    
    //Crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //Crear funciones

    //Obtener las tareas de un proyecto
    const obtenerTareas = async proyectoId => {
        try {
            const res = await clienteAxios.get('/tareas', { params: { proyectoId }});
            dispatch({
                type: TAREAS_PROYECTO,
                payload: res.data.tareas
            });
        } catch (error) {
            console.log(error);
        }
    }

    // Agregar tarea
    const agregarTarea = async tarea => {
      try {
        const res = await clienteAxios.post('/tarea', tarea);
        dispatch({
            type: AGREGAR_TAREA,
            payload: res.data.tarea
        })
      } catch (error) {
          console.log(error);
      }
    }

    //Validar tarea
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //Eliminar tarea
    const eliminarTarea = async (tareaId, proyectoId) =>{
       try {
           const res = await clienteAxios.delete(`/tarea/${tareaId}`, { params: { proyectoId }});
           console.log(res);
            dispatch({
                type: ELIMINAR_TAREA,
                payload: tareaId
            });
       } catch (error) {
           console.log(error);
       }
    }

    //Extraer una tarea para edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    } 

    //Actualizar tarea
    const actualizarTarea = async tarea => {
        try {
            const res = await clienteAxios.put(`/tarea/${tarea._id}`, tarea);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: res.data.tarea
            });
        } catch (error) {
            console.log(error);
        }
    }

    //Limpiar tarea selecionada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return (
        <tareaContext.Provider
            value={{ 
                tareas_proyecto: state.tareas_proyecto,
                validacion: state.validacion,
                tarea_seleccionada: state.tarea_seleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </tareaContext.Provider>
    )
}
 
export default TareaState;