import { CampoCatalogo, Modelo } from "../modelo.js";

export class Ver extends HTMLElement{
    constructor() {
        super();        
    }
    /**
     * 
     * @param {CampoCatalogo} campo 
     */
    getValorLista(campo, val) {
        let elemento = campo.lista.find(item => item.valor == val);
        if (elemento) {
            return elemento.etiqueta;
        }
        return '';
    }
    /**
     * 
     * @param {Modelo} modelo 
     */
    carga(modelo, onVer) {
        this.modelo = modelo;
        this.tema = this.getAttribute('tema');        
        this.render();
        this.id = this.getAttribute('id');        
        onVer(this.id).then(data => {
            this.loadDato(data);
        });
    }

    getDato(data, campo) {        
        if(campo.innerHtml) {
            let text = campo.innerHtml + '';
            let reg = new RegExp(`{${campo.nombre}}`, 'g');
            return text.replace(reg, data[campo.nombre]);
        }        
        if (campo instanceof CampoCatalogo) {
            return this.getValorLista(campo, data[campo.nombre]);
        }
        return data[campo.nombre];
    }

    validaNoVisible(campo) {        
        if (campo.getReglas().indexOf('no-visible')>=0){
            return true;
        }
        return false;
    }

    despachaEventoSalir() {
        let evento = new CustomEvent('accion', {
            detail: {
                tipo: 'tabla'
            }
        });
        this.dispatchEvent(evento);
    }
}