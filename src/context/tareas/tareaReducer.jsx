
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

export default (state, action) => {
    switch(action.type){
        case TAREAS_PROYECTO:
            return {
                ...state,
                tareas_proyecto: action.payload
            }
        case AGREGAR_TAREA:
            return {
                ...state,
                tareas_proyecto: [action.payload, ...state.tareas_proyecto ],
                validacion: false
            }
        case VALIDAR_TAREA:
            return {
                ...state,
                validacion: true
            }
        case ELIMINAR_TAREA:
            return {
                ...state,
                tareas_proyecto: state.tareas_proyecto.filter(tarea => tarea._id !== action.payload)
            }
        case ACTUALIZAR_TAREA:
            return {
                ...state,
                tareas_proyecto: state.tareas_proyecto.map(tarea => (
                    tarea._id === action.payload._id
                        ?
                            action.payload
                        :
                            tarea
                ))
            }
        case TAREA_ACTUAL:
            return {
                ...state,
                tarea_seleccionada: action.payload
            }
        case LIMPIAR_TAREA:
            return {
                ...state,
                tarea_seleccionada: null
            }
        default:
            return state;
    }
}