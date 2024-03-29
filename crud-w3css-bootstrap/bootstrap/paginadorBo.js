import { Paginador } from "../base/paginador.js";

const template = /*html*/`
<ul class="pagination">
    <li class="page-item"><a class="page-link" href="javascript:void(0);" id="anterior">&#10094; </a></li>
    <li class="page-item"><a class="page-link" href="javascript:void(0);" id="pagina">1</a></li>
    <li class="page-item"><a class="page-link" href="javascript:void(0);" id="siguiente"> &#10095;</a></li>
</ul>
`;

class PaginadorBo extends Paginador{
    
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
            ${template}
        `;
        this.addEventos();
    }
}

customElements.define('paginador-crud-bo', PaginadorBo);