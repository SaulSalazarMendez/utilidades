import { Tabla } from "../base/tabla.js";
import { CampoCatalogo, Campo, Modelo } from "../modelo.js";

const template = /*html*/`
    <div contenido class="container">
        <h5 class="btn btn-primary btn-sm" tipo=""><i class="bi bi-plus-circle"></i> Añadir <span id="titulo-add"></span></h5>        
        <table class="table table-bordered table-striped table-sm">        
        <thead><tr titulo>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Points</th>
        </tr>
        </thead>
        <tbody id="contenido-tabla">        
        </tbody>
        </table>        
    </div>
`;

const style = `
@import url('https://unpkg.com/css.gg@2.0.0/icons/css/chevron-down.css');
@import url('https://unpkg.com/css.gg@2.0.0/icons/css/chevron-up.css');
@import url('https://unpkg.com/css.gg@2.0.0/icons/css/sort-az.css');
@import url('https://unpkg.com/css.gg@2.0.0/icons/css/sort-za.css');
@import url('https://unpkg.com/css.gg@2.0.0/icons/css/bolt.css');
.hide {
    display: none;
}
#icono{
    display: block;    
}

.arriba:after {
    content: "\\25B4";
}
.abajo:after {
    content: "\\25BE";
}
.nada:after {
    content: "\\25CA";
}
`;



class TablaBo extends Tabla{
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
        <style>
            @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css");            
        </style>
            ${lib}                  
            <style>
            ${style}
            </style>
            ${template}
            <div class="container">
                <paginador-crud-bo tema="${this.tema}"></paginador-crud-bo>
            </div>     
        `;
    }

    addEventosPaginador() {
        let pag = this.shadowRoot.querySelector('paginador-crud-bo');        
        pag.addEventListener('siguiente', ev => {
            this.paginaDatos(1);
        });
        pag.addEventListener('anterior', ev => {
            this.paginaDatos(-1);
        });
    }

    imprimePagina() {
        let pag = this.shadowRoot.querySelector('paginador-crud-bo');
        pag.setPagina(''+(this.estado.offset/this.estado.limit +1) + '/' + Math.ceil(this.estado.total/this.estado.limit) );
    }

    paginaDatos(inc) {        
        let offset = this.estado.offset + inc*this.estado.limit;
        let dif = this.estado.total - offset;
        if (dif >=0) {
            this.estado.offset = offset;
        }
        if (this.estado.offset < 0 ) {
            this.estado.offset = 0;
        }
        this.despachaEventoEstado();
        this.cargarDatos();
        this.imprimePagina();
    }

    /**
     * 
     * @param {NodeListOf<HTMLElement>} titulos
     */
    removerTitulos(titulos) {
        for(let item of titulos) {
            let icono = item.querySelector('#icono');
            icono.classList.remove('arriba');
            icono.classList.remove('abajo');
            icono.classList.add('nada');
        }
    }    
    cargarDatos() {        
        this.onListar(this.estado).then( data => {
            this.loadDatos(data);
            this.estado.total = data.total;    
            this.imprimePagina();        
        });
    }
    /**
     * 
     * @param {HTMLElement} titulo 
     */
    addEventosTitulos(titulo) {
        let titulos = titulo.querySelectorAll('[titulo]');
        for(let item of titulos) {     
            item.addEventListener('click', ev=> {
                let icono = item.querySelector('#icono');
                let campo = item.getAttribute('nombre');
                let clase = 'arriba';
                let orden = 'asc';
                if (icono.classList.contains('arriba')) {
                    clase = 'abajo'
                    orden = 'desc';
                } else if (icono.classList.contains('abajo')) {
                    clase = 'nada';
                    orden = 'none';
                    campo = 'none';
                }
                this.removerTitulos(titulos);
                icono.classList.remove('nada');
                icono.classList.add(clase);
                this.estado.ordenar = {orden: orden, campo: campo};
                this.despachaEventoEstado();
                this.cargarDatos();
            });              
        }
        //'gg-chevron-down'
    }

    cargaTitulos() {
        let titulo = this.shadowRoot.querySelector('[titulo]');
        let out = '';
        for(let campo of this.modelo.campos) {
            if (campo.visible.tabla){
                out += /*html*/`<th titulo nombre="${campo.nombre}" ${this.validaNoVisible(campo)}>
                <span class="float-left">${campo.etiqueta}</span>
                <span class="float-right">
                <span id="icono" class="nada"></span> 
                </span>
                </th>`;
            }
        }
        out += '<th>Acciones</th>';
        titulo.innerHTML = out;
        this.addEventosTitulos(titulo);
    }
    
    /**
     * 
     * @param {Campo} campo 
     */
    validaNoVisible(campo) {        
        if (campo.getReglas().indexOf('no-visible')>=0){
            return 'class="hide"';
        }
        return '';
    }
    /**
     * 
     * @param {Campo} campo 
     * @param {Array[string]} data 
     */
    renderCampo(campo, data){        
        if (campo instanceof CampoCatalogo) {                
            return `<td ${this.validaNoVisible(campo)}>${ this.getValorLista(campo, data[campo.nombre])}</td>`;
        } 
        return `<td ${this.validaNoVisible(campo)}>${ this.validaCadena(data[campo.nombre])}</td>`;                
        
    }
    /**
     * 
     * @param {[string]} data 
     */
    renderDataColTabla(data) {
        let out = '';
        for(let campo of this.modelo.campos) {   
            if (campo.visible.tabla){         
                out += this.renderCampo(campo, data);
            }
        }
        return out;
    }

    getAcciones(data) {
        let acciones = '';
        if (this.acciones.ver) {
            acciones = /*html*/`<a href="#" class="btn btn-info btn-sm" id="${data[this.modelo.id]}" tipo="ver" title="Ver">
            <i class="bi bi-search"></i></a> `;
        }
        if (this.acciones.editar) {
            acciones += /*html*/`<a href="#" class="btn btn-warning btn-sm" id="${data[this.modelo.id]}" tipo="editar" title="Editar">
            <i class="bi bi-pencil"></i></a> `;
        }
        if (this.acciones.eliminar) {
            acciones += /*html*/`<a href="#" class="btn btn-danger btn-sm" id="${data[this.modelo.id]}" tipo="eliminar" title="Eliminar">
            <i class="bi bi-trash"></i></a>`;
        }
        return acciones;
    }

    renderDataAcciones(data) {
        let out = /*html*/`<td>        
        ${this.getAcciones(data)}
        </td>
        `;
        
        return out;
    }

    loadDatos(datos) {
        let contenidoTabla = this.shadowRoot.querySelector('#contenido-tabla');
        let datatable = '';
        for(let data of datos.items) {    
            datatable += /*html*/`
            <tr>
                ${this.renderDataColTabla(data)}
                ${this.renderDataAcciones(data)}
            </tr>
            `;    
        }        
        contenidoTabla.innerHTML = datatable;
        let btns = this.shadowRoot.querySelectorAll('.btn');        
        this.addEventos(btns);
    }
    
}

customElements.define('tabla-crud-bo', TablaBo);