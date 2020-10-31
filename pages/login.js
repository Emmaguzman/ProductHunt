import React, { useState } from 'react';

import Layout from '../components/layout/Layout'
import { Formulario, Campo, ImputSubmit, Error } from '../components/ui/Formulario';

//Firebase 
import firebase from '../firebase'

//Validacion
import useValidacion from '../hooks/useValidacion';
import validarIniciarSesion from '../validacion/validarIniciarSesion';

//router
import Router from 'next/router';

const STATE_INICIAL = {
    email: '',
    password: ''
}

const Login = () => {
    const [error, setError] = useState(false)

    const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion
        (STATE_INICIAL, validarIniciarSesion, iniciarSesion);

    const { email, password } = valores;

    async function iniciarSesion(){
            try {
               await firebase.login(email,password);
               Router.push('/')
                
            } catch (error) {
                console.error('ERROR AL AUTENTICAR EL USUARIO', error.message);
                setError(error.message);
            }
        
    }   
   
    return (
        <Layout>
            <>
                <h1>Iniciar Seción</h1>
                <Formulario
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <Campo>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Tu Email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Campo>

                    {errores.email && <Error>{errores.email}</Error>}
                    <Campo>
                        <label htmlFor="password">
                            Password
                </label>
                        <input
                            type="password"
                            placeholder="Tu Password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Campo>
                    {errores.password && <Error>{errores.password}</Error>}
                    {error && <Error>{error}</Error>}
                    <ImputSubmit
                        type="submit"
                        value="Iniciar Sesión"
                    />
                </Formulario>
            </>
        </Layout>
    );
}
 
export default Login;