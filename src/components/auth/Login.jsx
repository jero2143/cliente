import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/autenticacion/authContext';
import AlertaContext from '../../context/alertas/alertaContext';

const Login = (props) => {

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;

    useEffect(() => {
        if(autenticado){
            props.history.push('/proyectos');
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
            return;
        }
         // eslint-disable-next-line
    }, [mensaje, autenticado, props.history])

    //State para iniciar sesión
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    //Extraer datos
    const { email, password } = usuario;

    const handleChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        //Validar campos vacios
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        }

        //pasarlo al action
        iniciarSesion({ email, password });

    }

    return ( 
        <div className="form-usuario">
        { alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>
                <form onSubmit={handleSubmit}>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                        id="email" 
                        type="email" 
                        name="email" 
                        value={email}
                        placeholder="Tu email"
                        onChange={handleChange}
                         />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                        id="password" 
                        type="password" 
                        name="password" 
                        value={password}
                        placeholder="Tu Password"
                        onChange={handleChange}
                         />
                    </div>

                    <div className="compo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Iniciar Sesión" />
                    </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">Obtener Cuenta</Link>
            </div>
        </div>
     );
}
 
export default Login;