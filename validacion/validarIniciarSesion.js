export default function validarIniciarSesion(valores){
    let errores={};    
    if(!valores.email){
        errores.email='El email es Obligatorio';
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)){
        errores.email='Email no valido'
    }
    if(!valores.password){
        errores.password='El password es Obligatorio'
    }else if(valores.password.length <6){
        errores.password='El password debe ser al menos de 6 caracteres'
    }  
    return errores;
}