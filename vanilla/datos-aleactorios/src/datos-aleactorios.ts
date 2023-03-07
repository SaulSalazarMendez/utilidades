import {nombre} from './sets/nombre';
import {apellido} from './sets/apellido';
import {color} from './sets/color';
import {calle} from './sets/calle';
import {colonia} from './sets/colonia';
import {municipio} from './sets/municipio';
import {estado} from './sets/estado';



function getDato() {
    const indice = Math.round(Math.random() * this.length);    
    return this[indice === this.lenght ? 0 : indice];
}

function getDigitoAleactorio() {
    return Math.round(Math.random()*9);
}

function getCodigoPostal(){
    const n1 = Math.round(Math.random()*8) +1;
    const n2 = getDigitoAleactorio();
    const n3 = getDigitoAleactorio();
    const n4 = getDigitoAleactorio();
    const n5 = getDigitoAleactorio();
    return ''+n1+n2+n3+n4+n5;
}

const funciones = {
    nombre: getDato.bind(nombre),
    apellido: getDato.bind(apellido),
    color: getDato.bind(color),
    calle: getDato.bind(calle),
    colonia: getDato.bind(colonia),
    municipio: getDato.bind(municipio),
    estado: getDato.bind(estado),
    codigopostal: getCodigoPostal
}

function calcula_email(nombre  = '', apellido = '', dominio = '@gmail.com') {
    const cad=nombre+'_'+apellido+'_'+dominio;
    return cad.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function copiaJson(mock) {
    return JSON.parse(JSON.stringify(mock));
}

function generarMock(n = 0, mock ) {
    let datos: any[] = [];
    for(let i= 0; i<n; i++){
        datos.push(copiaJson(mock));
    }
    return datos;
}

function remplazaValores(datos, key, cad) {
    for(let i = 0; i<datos.length; i++){
        for(const campo of cad){
            const fun = funciones[campo];
            if (typeof fun === 'function') {
                datos[i][key] = datos[i][key].replace(campo, fun());
            }
        }
    }
}

export function generaDatos(n = 100, mock) {
    let datos = generarMock(n, mock);
    for ( let key in mock) {
        const valor = mock[key];
        if(valor) {
            const cad = valor
            .replace(/,/g, '')
            .replace(/\./g, '')
            .replace(/#/g, '')	
            .split(' ');            
            remplazaValores(datos, key, cad);
        }
    }
    return datos;

}