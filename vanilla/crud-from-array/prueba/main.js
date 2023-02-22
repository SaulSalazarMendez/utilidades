import { CrudFromArray } from "../crud-from-array.js";

let arregloPersonas = [
    {id: 1, nombre: 'Juan'},
    {id: 2, nombre: 'Pablo'},
    {id: 3, nombre: 'Leo'},
    {id: 4, nombre: 'Mariana'},
    {id: 5, nombre: 'Daniela'},
    {id: 6, nombre: 'Jesus'},
    {id: 7, nombre: 'María'},
    {id: 8, nombre: 'Luis'},
    {id: 9, nombre: 'José'},
    {id: 10, nombre: 'Fabi'},
]


function printJson(obj) {
    console.log(JSON.stringify(obj));
}

let persona = new CrudFromArray(arregloPersonas, 'id');

printJson(persona.list());
persona.post({nombre: 'jj', id: 11});
printJson(persona.list());

persona.delete(2);

printJson(persona.list());

persona.update(1, {nombre: 'coque'});

printJson(persona.list(0, 2));