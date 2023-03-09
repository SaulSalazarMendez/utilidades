import { Formulario } from "../base/formulario.js";
import { Modelo } from "../modelo.js";
import { renderW3 } from "./renderW3.js";

const template = /*html*/`
    <form class="">        
        <div id="contenido"></div>
        <div help class="w3-row w3-padding"></div>
        <div class="w3-row w3-padding">
            <div class="w3-right">
                <a class="w3-btn w3-theme-l4" id="btn-cancelar">Cancelar</a>
                <button type="submit" class="w3-btn w3-theme-action w3-hover-theme">Guardar</button>
            </div>
        </div>        
    </form> 
`;

const style = /*css*/`
[entrada]:disabled {
    cursor: not-allowed;
    filter: invert(0.5);
}
[entrada]:invalid {
    background: rgba(255,0,0,0.5) !important;
}
[no-visible]{
    display: none;
}
`;


class FormularioW3 extends Formulario{
    constructor() {
        super();
    }



    render() {
        let shadowRoot = this.attachShadow({mode:'open'});
        let lib = '';
        let titulo = 'Añadir';
        if (this.hasAttribute('id')) {
            titulo = 'Editar';
        }
        if (this.tema) {
            lib=`<link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-${this.tema}.css">
            `
        }
        shadowRoot.innerHTML = /*html*/`
        <style>
            @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"); 
        </style>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
            ${lib}
            <style>${style}</style>
            <h3 class="w3-container w3-text-theme">${titulo} ${this.modelo.nombre}</h3>
            ${template}
        `;
        this.addListenerCancelar();
    }
    
    generaHelpCampos() {
        let help = this.shadowRoot.querySelector('[help]');
        for(let campo of this.modelo.campos) {
            help.innerHTML += `<label class="w3-tag w3-theme-dark w3-margin-top w3-round" id="error-${campo.nombre}" for="${campo.nombre}"></label><br>`;
        }
    }

    renderModelo(modelo) {
        let out = '';        
        for(let campo of modelo.campos) {
            out += renderW3(campo);
        }
        return out;
    }
}

customElements.define('formulario-crud', FormularioW3);