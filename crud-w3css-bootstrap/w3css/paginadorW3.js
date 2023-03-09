import { Paginador } from "../base/paginador.js";

const template = /*html*/`
<div class="w3-bar w3-border">
    <div class="w3-row">
        <div class="w3-col s3">
        <a href="#" class="w3-button w3-text-theme w3-hover-theme" id="anterior">&#10094; Anterior</a>
        </div>
        <div class="w3-col s6 w3-center">
            <a href="#" class="w3-button w3-theme" id="pagina">1</a>
        </div>
        <div class="w3-col s3">
        <a href="#" class="w3-button w3-right w3-text-theme w3-hover-theme" id="siguiente">Siguiente &#10095;</a>
        </div>
    </div>
</div>
`;

class PaginadorW3 extends Paginador{
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
            ${template}
        `;
        this.addEventos();
    }
}

customElements.define('paginador-w3', PaginadorW3);