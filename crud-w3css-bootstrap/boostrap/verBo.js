import { Ver } from "../base/ver.js";
const template = /*html*/`
    <div contenido></div>
`;

class VerBo extends Ver{
    constructor(){
        super();
    }

    render() {
        let shadowRoot = this.attachShadow({mode:'open'});
        let lib = 'https://bootswatch.com/_vendor/bootstrap/dist/css/bootstrap.min.css';
        if (this.tema) {
            lib=`<link rel="stylesheet" href="https://bootswatch.com/4/${this.tema}/bootstrap.min.css">
            `
        }
        shadowRoot.innerHTML = /*html*/`
                       
            ${lib} 
            
            <div class="container">
                <h3>Ver ${this.modelo.nombre}</h3>
                ${template}
            </div>
        `;
        /**
         * @type {function}
         */        
    }

    loadDato(data) {
        let contenido = this.shadowRoot.querySelector('[contenido]');
        let out = '<div class="row">';
        for(let campo of this.modelo.campos) {
            if (!this.validaNoVisible(campo) && campo.visible.ver){
                out+= /*html*/`
                    <div class="col-sm-${campo.ancho}">
                    <label class=""><b>${campo.etiqueta}</b></label>
                    <div class="border">${this.getDato(data, campo)}</div>                
                    </div>
                `;
            }
        }
        out += `   
            <div class="col-sm-12">         
                <button class="btn btn-secondary float-right btn-sm" style="margin-top: 8px;">Cancelar</button>
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

customElements.define('ver-dato-crud-bo', VerBo);