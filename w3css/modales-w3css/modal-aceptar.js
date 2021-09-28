import { Modal,OpcionesModal } from "./modal.js";

export class ModalAceptar extends Modal{
    /**
     * 
     * @param {OpcionesModal} opciones 
     */
    constructor(opciones = {}) {
        super(opciones);
    }

    open() {        
        let div = document.createElement('div');
        let body = document.querySelector('body');
        this._el = div;
        this.inicializaDiv(div);
        body.appendChild(div);                
        const cerrar = div.shadowRoot.querySelector('#close');
        const cancelar = div.shadowRoot.querySelector('#cancelar');
        const aceptar = div.shadowRoot.querySelector('#aceptar');
        aceptar.focus();
        cancelar.remove();       
        return this.terminar(cerrar, null, aceptar);         
    }
}