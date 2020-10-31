import React from 'react'

import styles from '../styles/Home.module.css'
import Layout from '../components/layout/Layout'
import DetalleProducto from '../components/layout/DetallesProducto'

import useProductos from '../hooks/useProductos'


export default function Populares() {

    const {productos}=useProductos('votos');
 
  
  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <ul className="bg-white">
                {productos.map(producto=>(
                  <DetalleProducto
                    key={producto.id}
                    producto={producto}
                  />
                ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  )
}