import { Ver } from "../base/ver.js";

const template = /*html*/`
    <div contenido class="w3-container"></div>
`;

class VerW3 extends Ver{
    constructor() {
        super();        
    }    

    render() {
        let shadowRoot = this.attachShadow({mode:'open'});
        let lib = '';
        if (this.tema) {
            lib=`<link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-${this.tema}.css">
            `
        }
        shadowRoot.innerHTML = /*html*/`
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">            
            ${lib}  
            <h3 class="w3-container w3-text-theme">Ver ${this.modelo.nombre}</h3>                  
            ${template}
        `;
        /**
         * @type {function}
         */        
    }
    
    loadDato(data) {
        let contenido = this.shadowRoot.querySelector('[contenido]');
        let out = '<div clasS="w3-row">';
        for(let campo of this.modelo.campos) {
            if (!this.validaNoVisible(campo)){
                out+= /*html*/`
                    <div class="w3-col m${campo.ancho}">
                    <label class=""><b>${campo.etiqueta}</b></label>
                    <div class="w3-border">${this.getDato(data, campo)}</div>                
                    </div>
                `;
            }
        }
        out += `
            <div class="w3-col m12">
                <button class="w3-btn w3-theme-action w3-margin-top w3-right">Cancelar</button>
            </div>
            </div>
        `;
        contenido.innerHTML = /*html*/`
            ${out}
        `;
        let btn = this.shadowRoot.querySelector('button');
        btn.addEventListener('click', ev => {
            this.despachaEventoSalir();
        });
    }
}

customElements.define('ver-dato-crud', VerW3);