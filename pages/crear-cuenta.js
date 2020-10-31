
import React, { useState } from 'react';

import Layout from '../components/layout/Layout'
import { Formulario, Campo, ImputSubmit, Error } from '../components/ui/Formulario';

//Firebase 
import firebase from '../firebase'

//Validacion
import useValidacion from '../hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta';

//router
import Router from 'next/router';

const STATE_INICIAL = {
    nombre: '',
    email: '',
    password: ''
}

const CrearCuenta = () => {
    const [error, setError] = useState(false)

    const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion
        (STATE_INICIAL, validarCrearCuenta, crearCuenta);

    const { nombre, email, password } = valores;

    async function crearCuenta() {
        try {
            await firebase.registrar(nombre, email, password);
            Router.push('/')
        } catch (error) {
            console.error('ERROR AL CREAR EL USUARIO', error.message);
            setError(error.message);
        }
    }
    return (
        <Layout>
            <>
                <h1>Crear cuenta</h1>
                <Formulario
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <Campo>
                        <label htmlFor="nombre">
                            Nombre
                         </label>
                        <input
                            type="text"
                            placeholder="Tu Nombre"
                            name="nombre"
                            value={nombre}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Campo>
                    {errores.nombre && <Error>{errores.nombre}</Error>}
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
                        value="Crear Cuenta"
                    />
                </Formulario>
            </>
        </Layout>
    );
}

export default CrearCuenta;