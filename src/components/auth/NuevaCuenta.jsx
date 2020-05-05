import React, {useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

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
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    //Extraer datos
    const { nombre, email, password, confirmar } = usuario;

    const handleChange = e => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        //Validar campos vacios
        if(nombre.trim() === '' || email.trim() === "" || password.trim() === '' || confirmar.trim() === ''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        //Password minimo 6
        if(password.length < 6){
            mostrarAlerta('El password debe ser minimo de 6 caracteres', 'alerta-error');
            return;
        }

        //2 passwords iguales
        if(password !== confirmar){
            mostrarAlerta('Los passwords no son iguales', 'alerta-error');
            return;
        }

        //pasarlo al action
        registrarUsuario({
            nombre, email, password
        });

    }

    return ( 
        <div className="form-usuario">
        { alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una Cuenta</h1>
                <form onSubmit={handleSubmit}>
                
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                        id="nombre" 
                        type="text" 
                        name="nombre" 
                        value={nombre}
                        placeholder="Tu Nombre"
                        onChange={handleChange}
                         />
                    </div>

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

                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input 
                        id="confirmar" 
                        type="password" 
                        name="confirmar" 
                        value={confirmar}
                        placeholder="Confirmar Password"
                        onChange={handleChange}
                         />
                    </div>

                    <div className="compo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Registrar" />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">Iniciar Sesión</Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;