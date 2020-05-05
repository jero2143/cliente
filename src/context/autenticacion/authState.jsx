
import React, { useReducer } from 'react';
import authContext from '../../context/autenticacion/authContext';
import authReducer from '../../context/autenticacion/authReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';

import
 { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} 
from '../../types';

const AuthState = (props) => {

    const initiaState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    const [ state, dispatch ] = useReducer(authReducer, initiaState);

    const registrarUsuario = async datos => {
        try {

           const res = await clienteAxios.post('/usuario', datos);

           dispatch({
               type: REGISTRO_EXITOSO,
               payload: res.data
           });
           usuarioAutenticado();
        } catch (error) {
            //console.log(error.response.data.message);
            const alerta = {
                msg: error.response.data.message,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            });
        }
    }

    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if(token){
            //Enviar toens por headers
            tokenAuth(token);
        }

        try {
            const res = await clienteAxios.get('/auth');
            dispatch({
                type: OBTENER_USUARIO,
                payload: res.data.usuario
            });
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            });
        }
    }

    const iniciarSesion = async datos => {
        try {
            const res = await clienteAxios.post('/auth', datos);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: res.data
            });
            usuarioAutenticado();
        } catch (error) {
              console.log(error.response.data.message);
              const alerta = {
                msg: error.response.data.message,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            });
        }
    }

    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        });
    }

    return ( 
        <authContext.Provider
            value={{ 
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
             }}
        >
            {props.children}
        </authContext.Provider>
     );
}
 
export default AuthState;

