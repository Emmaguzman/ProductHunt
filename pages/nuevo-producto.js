import React, { useContext, useState } from 'react';

import Layout from '../components/layout/Layout'
import { Formulario, Campo, ImputSubmit, Error } from '../components/ui/Formulario';


//Firebase 
import { FirebaseContext } from '../firebase'

import FileUploader from 'react-firebase-file-uploader'

//Validacion
import useValidacion from '../hooks/useValidacion';
import validarCrearProducto from '../validacion/validarCrearProducto';

//router
import Router, { useRouter } from 'next/router';
import Error404 from '../components/layout/404';


const STATE_INICIAL = {
    nombre: '',
    empresa: '',
    // imagen: '',
    url: '',
    descrpcion: ''
}


const NuevoProducto = () => {
    //state de las imagenes

    const [nombreImagen, setNombreImagen] = useState('');
    const [subiendo, setSubiendo] = useState(false);
    const [progreso, setProgreso] = useState(0);
    const [urlImagen, setUrlImagen] = useState('');

    const [error, setError] = useState(false)

    const { valores, errores, handleSubmit, handleChange, handleBlur } = useValidacion
        (STATE_INICIAL, validarCrearProducto, crearProducto);

    const { nombre, empresa, imagen, url, descripcion } = valores;

    //context con las operaciones crud de firebase
    const { usuario, firebase } = useContext(FirebaseContext);

    //hook de routing para redireccionar

    const router = useRouter();

    async function crearProducto() {
        //si el usuario no esta autenticado llevar al login
        if (!usuario) {
            router.push('/login');
        }
        //crear el objeto de nuevo producto
        const producto = {
            nombre,
            empresa,
            url,
            urlImagen,
            descripcion,
            votos: 0,
            comentarios: [],
            creado: Date.now(),
            creador:{
                id:usuario.uid,
                nombre:usuario.displayName
            },
            haVotado:[]
        }
        //insertarlo en la base de datos
        firebase.db.collection('productos').add(producto);

        return router.push('/')
    }
    const handleUploadStart = () => {
        setProgreso(0);
        setSubiendo(true);
    }
    const handleProgress = progreso => setProgreso({ progreso });
    const handleUploadError = error => {
        setSubiendo(error);
        console.error(error)
    };
    const handleUploadSuccess = nombre => {
        setProgreso(100);
        setSubiendo(false);
        setNombreImagen(nombre)
        firebase
            .storage
            .ref("productos")
            .child(nombre)
            .getDownloadURL()
            .then(url => {
                console.log(url);
                setUrlImagen(url)
            }
            );

    };

   
    return (
        <Layout>
            {!usuario 
            ? <Error404/>
            :
            <>
            <h1>Agregar Nuevo Producto</h1>
            <Formulario
                onSubmit={handleSubmit}
                noValidate
            >
                <fieldset> <legend>Informacion General</legend>
                    <Campo>
                        <label htmlFor="nombre">
                            Nombre
                         </label>
                        <input
                            type="text"
                            placeholder="Tu Nombre"
                            name="nombre"
                            id="nombre"
                            value={nombre}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Campo>
                    {errores.nombre && <Error>{errores.nombre}</Error>}
                    <Campo>
                        <label htmlFor="empresa">
                            Empresa
                         </label>
                        <input
                            type="text"
                            placeholder="Tu Empresa o Compañia"
                            id="empresa"
                            name="empresa"
                            value={empresa}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Campo>
                    {errores.empresa && <Error>{errores.empresa}</Error>}
                    <Campo>
                        <label htmlFor="empresa">
                            Imagen
                         </label>
                        <FileUploader
                            accept="image/*"
                            id="imagen"
                            name="imagen"                                
                            randomizeFilename
                            storageRef={firebase.storage.ref("productos")}
                            onUploadStart={handleUploadStart}
                            onUploadError={handleUploadError}
                            onUploadSuccess={handleUploadSuccess}
                            onProgress={handleProgress}

                        />
                    </Campo>
                    
                    <Campo>
                        <label htmlFor="url">
                            URL
                         </label>
                        <input
                            type="url"
                            id="url"
                            name="url"
                            value={url}
                            placeholder="URL de tu producto"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Campo>
                    {errores.url && <Error>{errores.url}</Error>}
                </fieldset>
                <fieldset>
                    <legend>Descripcion</legend>
                    <Campo>
                        <label htmlFor="descripcion">
                            URL
                         </label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            value={descripcion}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Campo>
                    {errores.descripcion && <Error>{errores.descripcion}</Error>}
                </fieldset>
                <ImputSubmit
                    type="submit"
                    value="Crear Producto"
                />
            </Formulario>
        </>
            }
           
        </Layout>
    );
}

export default NuevoProducto;