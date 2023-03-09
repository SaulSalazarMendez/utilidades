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


class FormularioBo extends HTMLElement{
    constructor() {
        super();        
        this.onEditar = null;
        this.onAgregar = null;
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
    despachaEvento() {
        let evento = new CustomEvent('accion', {
            detail: {
                tipo: 'tabla',                
            }
        });
        this.dispatchEvent(evento);
    }

    addListenerCancelar() {
        let btn = this.shadowRoot.querySelector('#btn-cancelar');
        btn.addEventListener('click', ev => {
            this.despachaEvento();
        });
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
    /**
     * 
     * @param {Modelo} modelo 
     */
    carga(modelo, onVer, onEditar, onAgregar) {
        this.modelo = modelo;
        this.tema = this.getAttribute('tema');        
        this.render();
        this.generaHelpCampos();        
        /**
         * @type {HTMLFormElement}
         */
        let form = this.shadowRoot.querySelector('form');
        let contenido = form.querySelector('div');
        contenido.innerHTML =this.renderModelo(modelo);
        let entradas = contenido.querySelectorAll('[entrada]');   
        this.initDatos();
        this.addEventsInputs(contenido, entradas);
        if (this.hasAttribute('id')) {            
            this.cargaDatos(onVer);
        }
        form.addEventListener('submit', ev => {
            ev.preventDefault();            
            this.guardaDatos(form);            
        });
        this.onEditar = onEditar;
        this.onAgregar = onAgregar;
    }

    getData(form) {
        let campos = form.querySelectorAll('[entrada]');
        let data = {};
        for(let campo of campos) {
            data[campo.name] = campo.value;
        }
        return data;
    }
    /**
     * 
     * @param {HTMLFormElement} form 
     */
    guardaDatos(form) {
        let data = this.getData(form);
        if (this.hasAttribute('id')) {
            this.onEditar(this.getAttribute('id'), data).then(re => {
                this.despachaEvento();
            });
        } else {
            data[this.modelo.id] = null;
            this.onAgregar(data).then(re => {
                this.despachaEvento();
            });
        }
        
    }

    cargaDatos(onVer) {        
        onVer(this.getAttribute('id')).then(data => {
            this.setDatos(data);
        });
    }
    /**
     * 
     * @param {HTMLSelectElement} sel 
     * @param {any} val 
     */
    selectOption(sel, val) {
        for(let opt of sel.options) {
            if (opt.value == val){
                opt.selected = true;                
            }
        }
    }

    initDatos() {
        let entradas = this.shadowRoot.querySelectorAll('[entrada]');  
        for(let campo of entradas) {            
            campo.value = '';
        }
    }

    setDatos(data) {
        let entradas = this.shadowRoot.querySelectorAll('[entrada]');  
        for(let campo of entradas) {
            if  (campo.tagName == 'SELECT') {                
                this.selectOption(campo, data[campo.name]);
            } else {
                campo.value = data[campo.name];
            }
            this.validaInput(campo);
        }
    }
    /**
     * 
     * @param {HTMLInputElement} input 
     */
    validaInput(input) {
        let help = this.shadowRoot.querySelector('#error-'+input.name);        
        if (input.validity.valid) {
            help.innerHTML = ``;
            help.classList.remove('w3-animate-left');
        } else {
            let label = this.shadowRoot.querySelector(`[for="${input.name}"]`).innerHTML;
            if (input.validity.patternMismatch) {
                if (input.hasAttribute('title')) {
                    help.innerHTML = `<i class="bi bi-x-circle"></i> ${label}: ${input.getAttribute('title')}<br>`;
                    help.classList.add('w3-animate-left');
                    return;
                }                
            }
            help.innerHTML = `<i class="bi bi-x-circle"></i>  ${label}: ${input.validationMessage}<br>`
            help.classList.add('w3-animate-left');
        }
    }
    
    addEventsInputs(contenido, entradas) {        
        for(let input of entradas) {
            input.addEventListener('invalid', ev => {         
                ev.preventDefault();
            });            
            input.addEventListener('input', ev => {        
                this.validaInput(input);
            });
            this.validaInput(input, contenido);   
        }        
    }
}

customElements.define('formulario-crud-bo', FormularioBo);