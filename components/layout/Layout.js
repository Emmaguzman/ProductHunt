import React from 'react';
import {Global,css} from '@emotion/core'
import Header from './Header';
import Head from 'next/head'


const Layout = props => {
    return (
        <> 
        <Global
            styles={css`
            :root{
                --gris:#3d3d3d;
                --gris2:#6f6f6f;
                --gris3:#e1e1e1;
                --naranja:#da552f;
            }
            html{
                font-size:62.5%;
                box-sizing:border-box;
            }
            *,*:before,*:after{
                box-sizing:inherit;
            }
            body{
                font-family:'PT Sans' sans-serif;
                font-size:1.6rem;
                line-height:1.5;                
            }
            h1,h2,h3{
                margin: 0 0 2rem 0;
            }
            ul{
                list-style:none;
                margin:0;
                padding:0;                
            }
            a{
                text-decoration:none;
                font-family:'Roboto Slab',serif;
            }
            h1,h2{
                font-family:'Roboto Slab',serif;
                font-weight:700;
            }
            h3{
                font-family:'PT Sans' sans-serif;
            }
            img{
                max-width:100%;
            }

            `}
        />
        <Head>
            <html lang="es"/>
            <title>Product Hunt Firebase y next</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Roboto+Slab:wght@400;700&display=swap" rel="stylesheet"/>        </Head>
        <Header/>
        <main>
            {props.children}
        </main>
        </>
     ); 
}
 
export default Layout;