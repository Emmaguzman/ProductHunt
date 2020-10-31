import React, { useContext } from 'react';


import styled from '@emotion/styled';
import Boton from '../ui/Boton'
import Link from 'next/link'

import Buscar from '../ui/buscar';
import Navegacion from './Navegacion';

//Usuario
import {FirebaseContext} from '../../firebase'

const Cabecera = styled.header`
    border-bottom:2px solid var(--gris3);
    padding:1rem 0;
`;
const ContenedorHeader = styled.div`
    max-width:1200px;
    width:95%;
    margin:0 auto;
    @media(min-width:768px){
        display:flex;
        justify-content:space-between;
    }
`;
const ContainerSaludo = styled.p`
    margin-right:2rem;
`;
const Logo = styled.p`
    color:var(--naranja);
    font-size:4rem;
    line-height:0;
    font-weight:700;
    font-family:'Roboto Slab',serif;
    margin-right:2rem;

    &:hover{
        cursor:pointer;
    }
`;
const ContainerNav = styled.div`
    display:flex;
    align-items:center;
    margin-right:2rem;    
`;
const ContainerLogoBusqueda = styled.div`
    display:flex;
    align-items:center;
`;


const Header = () => {

    const {usuario,firebase}=useContext(FirebaseContext);
    
    
    return (
        <Cabecera>
            <ContenedorHeader>
                <ContainerLogoBusqueda>
                    <Link href="/">
                        <Logo>P</Logo>
                    </Link>
                    <Buscar />
                    <Navegacion />
                </ContainerLogoBusqueda>
                <ContainerNav>
                    {
                    usuario
                            ? (
                                <>
                                    <ContainerSaludo>Hola {usuario.displayName}</ContainerSaludo>
                                    <Boton
                                        bgColor="true"
                                        onClick={()=>firebase.cerrarSesion()}
                                    >
                                        Cerrar Sesión
                                    </Boton>
                                </>
                            )
                            : (
                                <>
                                    <Link href="/login">
                                        <Boton
                                            bgColor="true"
                                        >Login
                                    </Boton>
                                    </Link>
                                    <Link href="/crear-cuenta">
                                        <Boton>Crear Cuenta</Boton>
                                    </Link>
                                </>
                            )
                    }
                </ContainerNav>
            </ContenedorHeader>
        </Cabecera>
    );
}

export default Header;