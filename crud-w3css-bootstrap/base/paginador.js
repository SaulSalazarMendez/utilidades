export class Paginador extends HTMLElement{
    constructor() {
        super();        
    }
    
    setPagina(pagina) {
        let pag = this.shadowRoot.querySelector('#pagina');
        pag.innerHTML = pagina;
    }

    addEventos() {
        let sig = this.shadowRoot.querySelector('#siguiente');
        let ant = this.shadowRoot.querySelector('#anterior');
        sig.addEventListener('click', ev => {
            this.despachaEvento('siguiente');
        });
        ant.addEventListener('click', ev => {
            this.despachaEvento('anterior');
        })
    }

    despachaEvento(tipo) {
        let evento = new CustomEvent(tipo, {
            detail: {
                tipo: tipo
            }
        });
        this.dispatchEvent(evento);
    }

    connectedCallback(){
        this.tema = this.getAttribute('tema');
        this.render();
    }
}