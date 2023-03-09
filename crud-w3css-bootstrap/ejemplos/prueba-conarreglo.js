import '../boostrap/crudBo.js';

import { Campo, Modelo } from "../modelo.js";

let items = [
    {
        titulo: 'HTML Tutorial',
        descripcion: 'In this HTML tutorial, you will find more than 200 examples. With our online "Try it Yourself" editor, you can edit and test each example yourself!',
        fecha: Date.now()
    }
];

let modelo = new Modelo('Articulo');
modelo.campos.push(new Campo({
    nombre: 'titulo',
    etiqueta: 'Título', 
    tipo: 'text',
    reglas: 'required',
    ancho: '12'
}));

modelo.campos.push(new Campo({
    nombre: 'descripcion', 
    etiqueta: 'Descripción', 
    tipo: 'textarea', 
    reglas: 'required',
    ancho: '12'
}));

modelo.campos.push(new Campo({
    nombre: 'fecha',
    etiqueta: 'Fecha', 
    tipo: 'number',
    reglas: 'disabled|no-visible'
}));
modelo.setId('fecha');

let crud = document.querySelector('crud-bo');

crud.setAcciones({eliminar:false});
crud.setOnListar((estado) => {     
    return new Promise( (resolve,reject) => {  
        let res = items.slice(estado.offset, estado.offset + estado.limit);
        console.log(estado, res);
        resolve (
            {
                total:  items.length,
                offset: estado.offset + estado.limit,
                limit: estado.limit,
                items: res
            }
        );        
        
    });
});

crud.setOnVer((id) => {    
    return new Promise( (resolve, reject) => {        
        let item = items.find(x => x.fecha == id);
        resolve(item);
    });
});

crud.setOnEditar( (id, datos) => {
    return new Promise( (resolve, reject) => {        
        let index = items.findIndex(x => x.fecha == id);
        items[index] = datos;
        resolve(datos);
    });
});

crud.setOnAgregar( (datos) => {
    return new Promise( (resolve, reject) => {
        datos.fecha = Date.now();
        items.push(datos);
        resolve(datos);
    });
});

crud.setModelo(modelo);