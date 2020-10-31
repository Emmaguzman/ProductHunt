import React from 'react';
import styled from '@emotion/styled';

const MensajeError = styled.h1`
    margin-top:5rem;
    text-align:center;
    color:red;
    border:2px solid red;
    background-color:yellow;    
`;

const ContainerMensaje = styled.div`
    align-items:center
`;

const Error404 = () => {
    return (
        <ContainerMensaje>
            <MensajeError>No se puede mostrar</MensajeError>
        </ContainerMensaje>
    );
}

export default Error404;