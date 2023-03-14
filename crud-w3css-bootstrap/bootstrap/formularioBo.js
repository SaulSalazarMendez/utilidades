import { Formulario } from "../base/formulario.js";
import { Modelo } from "../modelo.js";
import { renderBo } from "./renderBo.js";

const template = /*html*/`
    <form class="container">        
        <div id="contenido" class="row"></div>
        <div help></div>
        <div class="">
            <div class="float-right">
                <a class="btn btn-secondary btn-sm" id="btn-cancelar">Cancelar</a>
                <button type="submit" class="btn btn-primary btn-sm">Guardar</button>
            </div>
        </div>        
    </form> 
`;

const style = /*css*/`
[entrada]:disabled {
    cursor: not-allowed;
    background: grey;
    filter: invert(0.3);
}
[entrada]:invalid {
    border: rgba(255,0,0,0.5) solid !important;
    outline: rgba(255,0,0,0.5) solid !important;
}
[no-visible]{
    display: none;
}
`;


class FormularioBo extends Formulario{
    constructor() {
        super();        
    }

    render() {
        let shadowRoot = this.attachShadow({mode:'open'});        
        let titulo = 'Añadir';
        if (this.hasAttribute('id')) {
            titulo = 'Editar';
        }
        let lib = 'https://bootswatch.com/_vendor/bootstrap/dist/css/bootstrap.min.css';
        if (this.tema) {
            lib=`<link rel="stylesheet" href="https://bootswatch.com/4/${this.tema}/bootstrap.min.css">
            `
        }
        shadowRoot.innerHTML = /*html*/`
        <style>
            @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"); 
        </style>            
            ${lib}
            <style>${style}</style>
            <h3 class="container">${titulo} ${this.modelo.nombre}</h3>
            ${template}
        `;
        this.addListenerCancelar();
    }
    generaHelpCampos() {
        let help = this.shadowRoot.querySelector('[help]');
        for(let campo of this.modelo.campos) {
            if (campo.visible.formulario){
                help.innerHTML += `<label class="badge badge-danger" id="error-${campo.nombre}" for="${campo.nombre}" style="padding: 8px;"></label><br>`;
            }
        }
    }

    renderModelo(modelo) {
        let out = '';
        for(let campo of modelo.campos) {
            out += renderBo(campo);
        }
        return out;
    }
}

customElements.define('formulario-crud-bo', FormularioBo);