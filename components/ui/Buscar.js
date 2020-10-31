import styled from '@emotion/styled';
import React, { useState } from 'react';
import Router from 'next/router'
const InputText=styled.input`
    border:1px solid var(--gris3);
    padding:1rem;
    min-width:300px;
`;

const InputSubmit=styled.button`
    height:3rem;
    width:8rem;
    margin-top:4px;
    display:block;
    background-size:4rem;    
    background:no-repeat;
    position:absolute;
    right:1rem;
    top:1px;
    text-align:center;
    background-color:white;
    //border:1 px solid black;
    border-radius:20%;
    //text-indent:-9999px;


&:hover{
    cursor: pointer;
}

`;
const Form=styled.form`
    position:relative;
`

const Buscar = () => {
    const [busqueda, setBusqueda] = useState('');
    
    const buscarProducto=e=>{
        e.preventDefault();
        if(busqueda.trim==='')return;
        //redireccionar al usuario a /buscar
        Router.push({
            pathname:'/buscar',
            query:{q:busqueda}
        })


    }


    return ( 
        <Form
            onSubmit={buscarProducto}
            
        >
            <InputText  
            placeholder="Buscar producto"
            type="text"
            onChange={e=>setBusqueda(e.target.value)}
            />
            <InputSubmit
             type="submit"
             >Buscar</InputSubmit>
        </Form>
     );
}
 
export default Buscar;
