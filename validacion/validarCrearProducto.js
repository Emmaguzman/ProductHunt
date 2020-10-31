export default function validarIniciarSesion(valores){
    let errores={};    
    if(!valores.nombre){
        errores.nombre='El nombre es Obligatorio';
    }
    if(!valores.empresa){
        errores.empresa='El nombre de empresa es Obligatorio';
    }
    if(!valores.url){
        errores.url='La URL del producto es obligatoria';
    }else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)){
        errores.url="URL MAL FORMATEADA O NO VALIDA"
    }
    if(!valores.descripcion){
        errores.descripcion="Agrega una descripcion de tu producto"
    }


    return errores;
}