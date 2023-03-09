export class Formulario extends HTMLElement{
    constructor() {
        super();        
        this.onEditar = null;
        this.onAgregar = null;
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
    /**
     * 
     * @param {HTMLFormElement} form 
     * @returns 
     */
    getData(form) {
        let campos = new FormData(form);
        //let campos = form.querySelectorAll('[entrada]');
        let data = {};
        campos.forEach((val, key) => {
            data[key] = val;
        });
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
            //los radios ya furon inicializados         
            if (campo.type == 'radio'){
                campo.checked = false;
            }else 
                campo.value = '';
        }
    }
    validaRadio(radio, data){
        if (data[radio.name] == radio.value){
            radio.checked = true;
        }
    }
    setDatos(data) {
        let entradas = this.shadowRoot.querySelectorAll('[entrada]');  
        for(let campo of entradas) {
            if  (campo.tagName == 'SELECT') {                
                this.selectOption(campo, data[campo.name]);
            } else {
                if (campo.type == 'radio')
                    this.validaRadio(campo, data);
                else 
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