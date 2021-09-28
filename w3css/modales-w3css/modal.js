import { getZindez } from "./zindexModal.js";

export class OpcionesModal{
    constructor() {
        /**texto de aceptar */
        this.aceptar = 'Aceptar';
        /**texto de cancelar */
        this.cancelar = 'Cancelar';
        /**Host de w3.css */
        this.hostw3css = 'https://www.w3schools.com/w3css/4/w3.css';
        /** color principal */
        this.colorActivo = 'w3-blue';
        /** color fondo*/
        this.colorFondo = 'w3-white';
        /** color cancelar*/
        this.colorCancelar = 'w3-red';
        /** border radius */
        this.borderRadius = '0';
        /** Ancho de la modal */
        this.ancho = '50%';
    }
}

export class Modal{
    /**
     * 
     * @param {OpcionesModal} opciones 
     */
    constructor(opciones = {}) {
        /** contenido de la modal */
        this._innerHtml = 'Modal';
        /** titulo de la modal */
        this._titulo = 'Titulo';        
        this._el = null;
        /** configuraciones de la modal */
        this.opciones = new OpcionesModal();
        Object.assign(this.opciones, opciones);
    }
    set innerHtml(val) {
        this._innerHtml = val;
    }
    get innerHtml() {
        return this._innerHtml;
    }
    set titulo(val) {
        this._titulo = val;
    }
    get titulo() {
        return this._titulo;
    }

    inicializaDiv(div) {
        div.style.zIndex = getZindez();
        div.style.background = "rgba(50,50,50,0.5)";
        div.style.position = "fixed";
        div.style.top = 0;
        div.style.left = 0;
        div.style.bottom = 0;
        div.style.width = "100%";
        div.style.height = "100vh";
        div.style.display = "none";
        div.attachShadow({mode:'open'});
        div.shadowRoot.innerHTML = this.createWin();
        let link = div.shadowRoot.querySelector('link');
        link.onload = () =>{            
            div.style.display = "block";
        }
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
        return this.terminar(cerrar, cancelar, aceptar);        
    }

    dataAceptar(){
        return null;
    }
    
    terminar(cerrar, cancelar, aceptar) {
        
        return new Promise((resolve,reject) => {
            if (cerrar){
                cerrar.addEventListener('click', (e)=>{
                    this._el.remove();
                    resolve({val: false, op:'cerrar' });
                });
            }
            if (cancelar) {
                cancelar.addEventListener('click', (e)=>{
                    this._el.remove();
                    resolve({val: false, op:'cancelar' });
                });
            }
            if(aceptar) {
                aceptar.addEventListener('click', (e)=>{
                    const data = this.dataAceptar();
                    this._el.remove();
                    resolve({val: true, op:'aceptar', data: data });
                });
            }
            
        });
    }

    createWin() {
        return /*html*/`
        <link rel="stylesheet" href="${this.opciones.hostw3css}">
        <div class="w3-card-4 ${this.opciones.colorFondo}" id="ventana" 
        style="
            width: ${this.opciones.ancho};
            margin-left: auto;
            margin-right: auto;
            margin-top: 10%;
            border-radius: ${this.opciones.borderRadius};
        ">
            <div class="w3-bar ${this.opciones.colorActivo}" id="barra-titulo">
                <div class="w3-bar-item" id="titulo">${this._titulo}</div>
                <div class="w3-right">
                    <span class="w3-button w3-black" id="close">x</span>
                </div>
            </div>
            <div class="w3-container">
                <div class="ventana-body" style="max-height: calc(100vh / 2.5 );
                overflow-y: auto;
                padding: 4px;">
                    ${this._innerHtml}
                </div>               
            </div>
            <div class="w3-container" botones>
                <button class="w3-button w3-border ${this.opciones.colorActivo} w3-right w3-margin" id="aceptar">${this.opciones.aceptar}</button>
                <button class="w3-button w3-border ${this.opciones.colorCancelar} w3-right w3-margin" id="cancelar">${this.opciones.cancelar}</button>
            </div>
        </div>
        `;
    }
}