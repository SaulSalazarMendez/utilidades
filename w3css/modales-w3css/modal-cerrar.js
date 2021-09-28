import { Modal,OpcionesModal } from "./modal.js";

export class ModalCerrar extends Modal{
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
        let botones = div.shadowRoot.querySelector('[botones]');
        botones.remove();           
        return this.terminar(cerrar, null, null);        
    }
}