import React, { useContext, useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router'

import Layout from '../../components/layout/Layout';
import Error404 from '../../components/layout/404';

import { FirebaseContext } from '../../firebase'
import { set } from 'date-fns';

import styled from '@emotion/styled';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';

import { Campo, ImputSubmit } from '../../components/ui/Formulario';
import Boton from '../../components/ui/Boton'

const Titulo = styled.h1`
text-align:center;
margin-top:5rem;
`;
const ContenedorProducto = styled.div`
    @media (min-width:768px){
        display:grid;
        grid-template-columns:2fr 1fr;
        grid-gap:1rem;
    }
`;
const Comentarios = styled.h2`
    margin:2rem 0;
`;
const Votos = styled.p`
    text-align:center;
`;
const ContainerVotos = styled.div`
    margin-top:5rem;
`;
const Comentario = styled.li`
border:1px solid #e1e1e1;
padding:2rem;
`;
const InputText = styled.input`
border:1px solid var(--gris3);
padding:1rem;
min-width:300px;
`;
const CreadorProducto = styled.p`
    padding:.5rem 2rem;
    background-color:#da552f;
    color:#fff;
    text-transform:uppercase;
    font-weight:bold;
    display:inline-block;
    text-align:center;
`;

const Producto = () => {
    const [producto, setProducto] = useState({});
    const [error, setError] = useState(false);
    const [comentario, setComentario] = useState({});
    const [consultarDB, setConsultarDB] = useState(true);

    const router = useRouter();
    const { query: { id } } = router;

    const { firebase, usuario } = useContext(FirebaseContext)
    useEffect(() => {
        if (id && consultarDB) {
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productoQuery.get();
                if (producto.exists) {
                    setProducto(producto.data());
                    setConsultarDB(false);
                } else {
                    setError(true);
                    setConsultarDB(false);
                }

            }
            obtenerProducto()
        }
    }, [id])

    if (Object.keys(producto).length === 0 && !error) return 'Cargando...';

    const { idProd, comentarios, creado, descripcion, empresa, nombre, url, urlImagen, votos, creador, haVotado } = producto;
    //administrar y validar los votos
    const votarProducto = () => {
        if (!usuario) {
            return router.push('/login');
        }
        //Obtener y sumar un nuevo voto
        const nuevoTotal = votos + 1;

        //verificar si el usuario actual ha votado
        if (haVotado.includes(usuario.uid)) return;
        //guardar el id del usuario que ha votado
        const nuevoHaVotado = [...haVotado, usuario.uid];

        //actualizar en la bd
        firebase.db.collection('productos').doc(id).update({ 
            votos: nuevoTotal, 
            haVotado: nuevoHaVotado 
        })
        //actualizar el state
        setProducto({
            ...producto,
            votos: nuevoTotal
        })
        setConsultarDB(true)
    }
    //Funciones para crear comentarios
    const comentarioChange = e => {
        setComentario({
            ...comentario,
            [e.target.name]: e.target.value
        })
    }
    const agregarComentario = e => {
        e.preventDefault();
        if (!usuario) {
            return router.push('./login');
        }
        //Informacion extra del comentario
        comentario.usuarioid = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;

        //Tomar copia de comentarios y agregarlos al arreglo

        const nuevosComentarios = [...comentarios, comentario];

        //actualizar la bd
        firebase.db.collection('productos').doc(id).update({
            comentarios: nuevosComentarios
        })
        //actualizar state
        setProducto({
            ...producto,
            comentarios: nuevosComentarios
        })
        setConsultarDB(true);

    }

    //identifica si el comentario es del creador del producto
    const esCreador = id => {
        if (creador.id == id) {
            return true;
        }

    }

    //funcion que revisa que el crador del producto sea el mismo que  esta autenticado
    const puedeBorrar = () => {
        if (!usuario) return false;

        if (creador.id === usuario.uid) {
            return true;
        }
    }
    const eliminarProducto = async () => {
        if (!usuario) { router.push('/login'); }
        if (creador.id !== usuario.uid) {
            router.push('/login');
        }
        try {
            await firebase.db.collection('productos').doc(id).delete();
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout>
            <>
                {error
                    ? <Error404 />
                    : (
                        <div className="contenedor">
                            <Titulo>{nombre}</Titulo>

                            <ContenedorProducto >
                                <div>
                                    <p>publicado hace:{formatDistanceToNow(new Date(creado), { locale: es })}</p>
                                    <p>Por:{creador.nombre} de  <strong>{empresa}</strong></p>
                                    <img src={urlImagen} />
                                    <p>{descripcion}</p>

                                    {usuario && (<>
                                        <h2>Agrega tu comentario</h2>
                                        <form>
                                            <Campo>
                                                <InputText
                                                    type="text"
                                                    name="mensaje"
                                                    onChange={comentarioChange}
                                                />
                                            </Campo>
                                            <ImputSubmit
                                                type="submit"
                                                value="Agregar Comentario"
                                                onClick={agregarComentario}
                                            />
                                        </form>
                                    </>
                                    )}
                                    <Comentarios>Comentarios</Comentarios>
                                    {comentarios.length === 0
                                        ? "Aun no hay comentarios"
                                        : <ul>
                                            {comentarios.map((comentario, i) => (

                                                <Comentario
                                                    key={`${comentario.usuarioid}-${i}`}
                                                >
                                                    <p>{comentario.mensaje}</p>
                                                    <p>Escrito por:{' '}<strong>{comentario.usuarioNombre}</strong></p>
                                                    {

                                                        esCreador(comentario.usuarioid) &&
                                                        <CreadorProducto>
                                                            Es Creador
                                                </CreadorProducto>
                                                    }
                                                </Comentario>
                                            ))}
                                        </ul>
                                    }

                                </div>
                                <aside>
                                    <Boton
                                        target="_blank"
                                        bgColor="true"
                                        href={url}
                                    >Visitar URL</Boton>
                                    {usuario && (
                                        <ContainerVotos>
                                            <Votos>{votos} Votos</Votos>
                                            <Boton
                                                onClick={votarProducto}
                                            >Votar</Boton>
                                        </ContainerVotos>
                                    )}
                                </aside>
                            </ContenedorProducto>
                            {puedeBorrar() &&
                                <Boton
                                    onClick={eliminarProducto}
                                >
                                    Eliminar Producto
                                </Boton>
                            }
                        </div>
                    )}

            </>
        </Layout>
    );
}

export default Producto;