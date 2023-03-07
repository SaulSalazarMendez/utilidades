import {generaDatos} from "../src/datos-aleactorios.js";

const mock = {
    nombre: 'nombre',
    apellido: 'apellido apellido',
    domicilio: 'calle, colonia CP codigopostal. municipio, estado.'
}

console.log(generaDatos(1, mock));